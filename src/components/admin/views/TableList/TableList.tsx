import React from 'react';
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

function TableList(props: any) {
  const { classes } = props;

  const { data } = useGetQuestionsQuery()

  return (
    <GridContainer>
      {
        data?.getQuestions.questions.map(question => {
          return <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  {question.es}
                </h4>
                <p className={classes.cardCategoryWhite}>
                  {question.en}
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={['Valor', 'Repuesta español', 'Respuesta inglés', 'Cantidad de veces que ha sido seleccionada']}
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
  }
});

export default withStyles(styles)(TableList);
