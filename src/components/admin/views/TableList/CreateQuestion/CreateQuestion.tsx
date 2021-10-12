import React, { useState } from 'react';
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
import { Link, useParams } from "react-router-dom";
import { URLParams } from 'src/routes'
import { AnswerInterface, CreateQuestionInput } from 'src/graphql';
import CustomInput from 'src/components/admin/components/CustomInput/CustomInput';
import CardFooter from 'src/components/admin/components/Card/CardFooter';

function CreateQuestion(props: any) {
  const { classes } = props;

  const [state, setState] = useState<CreateQuestionInput>({
    imgUrl: "",
    es: '',
    en: '',
    answersParams: [
      {
        es: '',
        en: '',
        value: ''
      },
      {
        es: '',
        en: '',
        value: ''
      }
    ],
  })

  const handleChange = (evt: any) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  const addAnswer = (e: any) => {
    setState({
      ...state,
      answersParams: state.answersParams.concat({ value: '', es: '', en: '' })
    });
  }

  const handleChageAnswer = (e: any, index: number) => {
    const value = e.target.value
    setState({
      ...state,
      answersParams: state.answersParams.map((answerE, indexE): AnswerInterface => {
        const answer: AnswerInterface = index === indexE ? {
          ...answerE,
          [e.target.name]: value
        } : answerE
        return answer
      })
    })
  }


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <div className={classes.form}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Pregunta en español*"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    id="es"
                    inputProps={{
                      name: "es",
                      value: state.es,
                      onChange: handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Pregunta en inglés*"
                    id="en"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "en",
                      value: state.en,
                      onChange: handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Imagen"
                    id="imgUrl"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "imgUrl",
                      value: state.imgUrl,
                      onChange: handleChange
                    }}
                  />
                </GridItem>
              </GridContainer>
              <Button>Agregar respuesta</Button>
            </div>
          </CardBody>
          <CardFooter>
            <Button color="primary">Crear pregunta</Button>
          </CardFooter>
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export default withStyles(styles)(CreateQuestion);
