// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';
import Table from '../../../components/Table/Table';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
import CardBody from '../../../components/Card/CardBody';
import { createStyles } from '@material-ui/core';
import Button from '../../../components/CustomButtons/Button';
import { useGetQuestionQuery, useGetQuestionStatsQuery } from './operations.gql';
import { Link, useParams } from "react-router-dom";
import { URLParams } from 'src/routes'
import ChartistGraph from 'react-chartist';

function Question(props: any) {
  const { classes } = props;

  const { pregunta } = useParams<URLParams>()
  const { data } = useGetQuestionQuery({ variables: { input: { questionUuid: pregunta } } })
  const { data: chartData } = useGetQuestionStatsQuery({ variables: { input: { questionUuid: pregunta } } })

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div className={classes.cardHeader}>
              <div>
                <h4 className={classes.cardTitleWhite}>
                  {data?.getQuestion.question.es}
                </h4>
                <p className={classes.cardCategoryWhite}>
                  {data?.getQuestion.question.en}
                </p>
              </div>
              <div className={classes.cardButtons}>
                <div className={classes.cardButton}>
                  <Link to={`/admin/preguntas/${data?.getQuestion.question.uuid}/editar`} >
                    <Button type="button" color="warning" size="sm">
                      <span className="material-icons">
                        edit
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
                data?.getQuestion.question.answers.map((answer => {
                  return [answer.value, answer.es, answer.en]
                })) || [[1], [2], [3]]
              }
            />

          </CardBody>
          {chartData ?
            <Card chart={true}>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={{ labels: chartData.getQuestionStats.selectedAnswersChart.labels, series: [chartData.getQuestionStats.selectedAnswersChart.count] }}
                  type="Bar"
                  options={{
                    axisX: {
                      showGrid: false
                    },
                    low: 0,
                    high: chartData.getQuestionStats.selectedAnswersChart.hightestCount,
                    chartPadding: {
                      top: 0,
                      right: 5,
                      bottom: 0,
                      left: 0
                    }
                  }}
                />
              </CardHeader>
            </Card> : undefined
          }
        </Card>
      </GridItem>
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

export default withStyles(styles)(Question);
