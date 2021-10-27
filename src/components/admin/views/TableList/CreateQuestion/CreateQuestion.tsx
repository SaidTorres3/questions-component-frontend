import React, { useState } from 'react';
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
import { CreateAnswerInput, CreateQuestionInput } from 'src/graphql';
import CustomInput from 'src/components/admin/components/CustomInput/CustomInput';
import CardFooter from 'src/components/admin/components/Card/CardFooter';
import { useCreateQuestionMutation } from './operations.gql';
import { useHistory } from "react-router-dom";

function CreateQuestion(props: any) {
  const { classes } = props;
  const history = useHistory()

  const [state, setState] = useState<CreateQuestionInput>({
    imgUrl: "",
    es: '',
    en: '',
    answers: [
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

  const [submited, setSubmited] = useState<boolean>(false)
  const [createQuestionMutation] = useCreateQuestionMutation();
  const [numericValues, setNumericValues] = useState<boolean>(false)

  React.useEffect(() => {
    if (numericValues) setAnswerValuesWithNumericValues()
    else clearAnswerValues()
  }, [numericValues])

  const setAnswerValuesWithNumericValues = () => {
    setState((prevState) => {
      let stateCopy = { ...prevState, answers: prevState.answers.slice() }
      const answersAmount = stateCopy.answers.length
      stateCopy.answers = stateCopy.answers.map((answer, index) => {
        answer.value = (answersAmount - index)
        return answer
      })
      return stateCopy
    })
  }

  const clearAnswerValues = () => {
    setState((prevState) => {
      let stateCopy = { ...prevState, answers: prevState.answers.slice() }
      stateCopy.answers = stateCopy.answers.map((answer) => {
        answer.value = ''
        return answer
      })
      return stateCopy
    })
  }

  const addAnswer = () => {
    setState({
      ...state,
      answers: state.answers.concat({ value: '', es: '', en: '' })
    });
    if (numericValues) setAnswerValuesWithNumericValues()
  }

  const deleteAnswer = (index: number) => {
    if (state.answers.length > 2)
      setState({
        ...state,
        answers: [...state.answers.slice(0, index), ...state.answers.slice(index + 1)]
      });
    if (numericValues) setAnswerValuesWithNumericValues()
  }

  const handleChange = (evt: any) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }


  const handleChangeAnswer = (evt: any, index: number) => {
    setState({
      ...state,
      answers: state.answers.map((answerE, indexE): CreateAnswerInput => {
        const answer: CreateAnswerInput = index === indexE ? {
          ...answerE,
          [evt.target.name]: evt.target.value
        } : answerE
        return answer
      })
    })
  }

  const handleSubmit = (): void => {
    setSubmited(true)

    if (state.en.trim() && state.es.trim()) {
      const doesAnswerHasAllValues = (answer: CreateAnswerInput): boolean => {
        if (
          answer.en.trim() &&
          answer.es.trim() &&
          answer.value
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
      createQuestionMutation({
        variables: {
          input: state
        }
      })
        .then((res) => {
          history.replace(`/admin/preguntas/${res.data?.createQuestion.createdUuid}`)
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
                      value: state.es,
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
                      value: state.en,
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
                      value: state.imgUrl,
                      onChange: handleChange
                    }}
                  />
                </GridItem>
              </GridContainer>
              <h3 style={{ textAlign: 'center' }}>Respuestas:</h3>
              <div onClick={() => setNumericValues(!numericValues)} className={classes.numericValueLabelContainer}>
                <input checked={numericValues} type="radio" />
                <label>{'Llenar valores de mejor a peor (considerar pregunta para obtener puntaje)'}</label>
              </div>
              {
                state.answers.map((answer, index) => {
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
                          value: answer.value,
                          onChange: (evt: any) => handleChangeAnswer(evt, index),
                          disabled: numericValues
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
                    <GridItem xs={12} sm={12} md={1}>
                      <Button
                        disabled={state.answers.length <= 2}
                        color="danger"
                        onClick={() => deleteAnswer(index)}
                      >
                        X
                      </Button>
                    </GridItem>
                  </GridContainer>
                })
              }
              <Button color="success" onClick={addAnswer}>Agregar respuesta</Button>
            </div>
          </CardBody>
          <CardFooter>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={submited}
            >
              Crear pregunta
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

export default withStyles(styles)(CreateQuestion);