import React, { useEffect, useState } from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
import CardBody from '../../../components/Card/CardBody';
import { createStyles } from '@material-ui/core';
import Button from '../../../components/CustomButtons/Button';
import { EditAnswerInput, EditQuestionInput } from 'src/graphql';
import CustomInput from 'src/components/admin/components/CustomInput/CustomInput';
import CardFooter from 'src/components/admin/components/Card/CardFooter';
import { useHistory, useParams } from "react-router-dom";
import { useEditQuestionMutation, useGetQuestionQuery } from './operations.gql';
import { URLParams } from 'src/routes';

function EditQuestion(props: any) {
  const { classes } = props;
  const history = useHistory()

  const [state, setState] = useState<EditQuestionInput>()
  const { pregunta } = useParams<URLParams>()
  const { data } = useGetQuestionQuery({ variables: { input: { questionUuid: pregunta } } })
  useEffect(() => {
    if (!data?.getQuestion.question) return
    const question = data.getQuestion.question
    const ansuas = question.answers.map((ansua) => {
      return {
        uuid: ansua.uuid,
        en: ansua.en,
        es: ansua.es
      }
    })
    setState({
      uuid: question.uuid,
      en: question.en,
      es: question.es,
      imgUrl: question.imgUrl,
      answers: ansuas
    })
  }, [data])

  const [submited, setSubmited] = useState<boolean>(false)
  const [editQuestionMutation] = useEditQuestionMutation();

  const handleChange = (evt: any) => {
    const value = evt.target.value;
    if (!state) return
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  const handleChangeAnswer = (evt: any, index: number) => {
    if (!state) return
    setState({
      ...state,
      answers: state.answers.map((answerE, indexE): EditAnswerInput => {
        const answer = index === indexE ? {
          ...answerE,
          [evt.target.name]: evt.target.value
        } : answerE
        return answer
      })
    })
  }

  const handleSubmit = (): void => {
    if (!state) return
    setSubmited(true)

    if (state.en.trim() && state.es.trim()) {
      const doesAnswerHasAllValues = (answer: EditAnswerInput): boolean => {
        if (
          answer.en.trim() &&
          answer.es.trim()
        ) return true
        return false
      }
      const results = state.answers.map((answer) => doesAnswerHasAllValues(answer))
      for (let result of results) {
        if (!result) {
          setSubmited(false)
          return
        }
      }
      editQuestionMutation({
        variables: {
          input: state
        }
      })
        .then((res) => {
          history.replace(`/admin/preguntas/${res.data?.editQuestion.questionUuid}`)
        })
    } else {
      setSubmited(false)
    }
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <div className={classes.form}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Pregunta en español*"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    id="es"
                    inputProps={{
                      name: "es",
                      value: state?.es || "Cargando...",
                      onChange: handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Pregunta en inglés*"
                    id="en"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "en",
                      value: state?.en || "Cargando...",
                      onChange: handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Imagen"
                    id="imgUrl"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "imgUrl",
                      value: state?.imgUrl || "Cargando...",
                      onChange: handleChange
                    }}
                  />
                </GridItem>
              </GridContainer>
              <h3 style={{ textAlign: 'center' }}>Respuestas:</h3>
              {
                state?.answers.map((answer, index) => {
                  return <GridContainer key={index} className={classes.formArray}>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Valor*"
                        id="value"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "value",
                          value: data?.getQuestion.question.answers[index].value || "Cargando...",
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Respuesta en español*"
                        id="es"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "es",
                          value: answer.es,
                          onChange: (evt: any) => handleChangeAnswer(evt, index)
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Respuesta en inglés*"
                        id="en"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "en",
                          value: answer.en,
                          onChange: (evt: any) => handleChangeAnswer(evt, index)
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                })
              }
            </div>
          </CardBody>
          <CardFooter>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={submited}
            >
              Editar pregunta
            </Button>
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
  },
  formArray: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f00'
  },
  numericValueLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
  }
});

export default withStyles(styles)(EditQuestion);