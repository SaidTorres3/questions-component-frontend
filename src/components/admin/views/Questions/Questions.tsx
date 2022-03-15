import React, { useEffect } from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Table from '../../components/Table/Table';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import { createStyles } from '@material-ui/core';
import { useGetQuestionsQuery } from './operations.gql'
import Button from '../../components/CustomButtons/Button';
import { Link } from 'react-router-dom';
import SpinLoader from '../../components/SpinLoader/SpinLoader';

function TableList(props: any) {
  const { classes } = props;
  const [pagination, setPagination] = React.useState({
    page: 1,
    take: 5,
    skip: 0,
    hasMore: true
  });

  const { data, loading } = useGetQuestionsQuery({
    variables: {
      take: pagination.take,
      skip: pagination.skip
    }
  })

  useEffect(() => {
    if (!data) return;
    setPagination(prev => {
      return {
        ...prev,
        hasMore: data.getQuestions.hasMore
      }
    })
  }, [data])

  const scrollTop = () => {
    const element = document.getElementById('mainPanel');
    element?.scrollTo(0, 0);
  }

  const handleNextPage = () => {
    if (!pagination.hasMore) return;
    scrollTop();
    setPagination(prev => {
      return {
        ...prev,
        page: prev.page + 1,
        skip: prev.skip + prev.take
      }
    })
  }

  const handlePrevPage = () => {
    if (pagination.page <= 1) return;
    scrollTop();
    setPagination(prev => {
      return {
        ...prev,
        page: prev.page - 1,
        skip: prev.skip - prev.take
      }
    })
  }

  return (
    <GridContainer style={{innerHeight: 'fit-content'}}>
      <GridItem xs={12} sm={12} md={12}>
        <Link to="/admin/preguntas/crear">
          <Button type="button" color="success">Agregar pregunta</Button>
        </Link>
      </GridItem>
      {loading ? <SpinLoader /> : <SpinLoader />}
      {
        data?.getQuestions.items.map((question, index) => {
          return <GridItem xs={12} sm={12} md={12} key={index}>
            <Card>
              <CardHeader color="primary">
                <div className={classes.cardHeader}>
                  <div>
                    <h4 className={classes.cardTitleWhite}>
                      {question.es}
                    </h4>
                    <p className={classes.cardCategoryWhite}>
                      {question.en}
                    </p>
                  </div>
                  <div className={classes.cardButtons}>
                    <div className={classes.cardButton}>
                      <Link to={`/admin/preguntas/${question.uuid}/editar`} >
                        <Button type="button" color="warning" size="sm">
                          <span className="material-icons">
                            edit
                          </span>
                        </Button>
                      </Link>
                    </div>
                    <div className={classes.cardButton}>
                      <Link to={`/admin/preguntas/${question.uuid}`} >
                        <Button type="button" color="info" size="sm">
                          <span className="material-icons">
                            visibility
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={['Valor', 'Repuesta español', 'Respuesta inglés'/*, 'Cantidad de veces que ha sido seleccionada'*/]}
                  tableData={
                    question.answers.map((answer => {
                      return [answer.value, answer.es, answer.en]
                    }))
                  }
                />
              </CardBody>
            </Card>
          </GridItem>
        })
      }
      <button onClick={handlePrevPage}>Prev</button>
      <button>{pagination.page}</button>
      <button onClick={handleNextPage}>Next</button>
    </GridContainer>
  );
}

const styles = createStyles({
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 300,
    fontFamily: '\'Roboto\', \'Helvetica\', \'Arial\', sans-serif',
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: 400,
      lineHeight: 1
    }
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    "@media (max-width: 700px)": {
      flexDirection: 'column'
    }
  },
  cardButtons: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'end',
    "@media (max-width: 700px)": {
      justifyContent: 'center'
    }
  },
  cardButton: {
    margin: 5
  }
});

export default withStyles(styles)(TableList);
