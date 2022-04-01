/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import { Rating } from "react-simple-star-rating";

import { emailsSubscriptionChart } from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import { useGetStatsQuery } from "./operations.gql";

const Dashboard = (props: any) => {
  const { classes } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, error } = useGetStatsQuery();

  useEffect(() => {
    console.log(data?.getStats.selectedAnswersChart);
  }, [data]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats={true} icon={true}>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>
                Calificación promedio mensual
              </p>
              <h3 className={classes.cardTitle}>
                {data?.getStats.monthlyAverageScore}/100
                <Rating
                  initialValue={
                    (data?.getStats.monthlyAverageScore || 0) / 2 / 10
                  }
                  ratingValue={0}
                  readonly
                ></Rating>
              </h3>
            </CardHeader>
            <CardFooter stats={true}>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="" onClick={(e) => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats={true} icon={true}>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>
                Calificación promedio historica
              </p>
              <h3 className={classes.cardTitle}>
                {data?.getStats.averageScore}/100
              </h3>
            </CardHeader>
            <CardFooter stats={true}>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats={true} icon={true}>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>
                Encuestas realizadas este mes
              </p>
              <h3 className={classes.cardTitle}>
                {data?.getStats.monthlyRespondentsAmount}
              </h3>
            </CardHeader>
            <CardFooter stats={true}>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats={true} icon={true}>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>
                Encuestas realizadas historicamente
              </p>
              <h3 className={classes.cardTitle}>
                {data?.getStats.respondentsAmount}
              </h3>
            </CardHeader>
            <CardFooter stats={true}>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart={true}>
            <CardHeader color="success">
              {data?.getStats.selectedAnswersChart.labels &&
              data?.getStats.selectedAnswersChart.count ? (
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: data.getStats.selectedAnswersChart.labels,
                    series: [data.getStats.selectedAnswersChart.count],
                  }}
                  type="Bar"
                  options={{
                    low: 0,
                    high: data.getStats.selectedAnswersChart.hightestCount, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    },
                  }}
                  // listener={dailySalesChart.animation}
                />
              ) : undefined}
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                Conteo de respuestas a preguntas
              </h4>
              <p className={classes.cardCategory}>
                Conteo del puntaje de las respuestas a las preguntas que son
                aptas para sacar una calificación.
              </p>
            </CardBody>
            <CardFooter chart={true}>
              <div className={classes.stats}>
                <ArrowUpward className={classes.upArrowCardCategory} /> Cantidad
                de veces que aparece el puntaje seleccionado más abundante:{" "}
                {data?.getStats.selectedAnswersChart.hightestCount}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart={true}>
            <CardHeader color="warning">
              {data?.getStats.monthlyAnswersChart.monthlyCount ? (
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: emailsSubscriptionChart.data.labels,
                    series: [data.getStats.monthlyAnswersChart.monthlyCount],
                  }}
                  type="Line"
                  options={{
                    axisX: {
                      showGrid: false,
                    },
                    low: 0,
                    high: data.getStats.monthlyAnswersChart.hightestCount,
                    chartPadding: {
                      top: 0,
                      right: 5,
                      bottom: 0,
                      left: 0,
                    },
                  }}
                />
              ) : undefined}
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                Encuestas realizadas en el {new Date().getFullYear()}
              </h4>
              <p className={classes.cardCategory}>
                {/* <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{' '} */}
                Conteo mensual de todas las encuestas realizadas en el año{" "}
                {new Date().getFullYear()}.
              </p>
            </CardBody>
            <CardFooter chart={true}>
              <div className={classes.stats}>
                <ArrowUpward className={classes.upArrowCardCategory} /> Mayor
                cantidad de encuestas realizadas en un mes:{" "}
                {data?.getStats.monthlyAnswersChart.hightestCount}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(dashboardStyle)(Dashboard);
