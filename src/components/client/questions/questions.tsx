import { FC, useEffect, useState } from "react";
import Question from "src/components/client/question/question";
import './questions.css'
import { useCreatePostedAnswersMutation, useGetQuestionsQuery } from "./operations.gql";
import enFlag from './en-FLAG.png'
import esFlag from './es-FLAG.jpg'

enum Languages {
  "spanish" = "es",
  "english" = "en"
}

const QuestionsScreen: FC = () => {
  const [language, setLanguage] = useState<Languages>(Languages.spanish);
  const [questions, setQuestions] = useState<QuestionData[]>()
  const [question, setQuestion] = useState<ActualQuestion>()
  const [questionIndex, setQuestionIndex] = useState<number>(0)

  const [registeredAnswers, setRegisteredAnswers] = useState<string[]>()
  const [finished, setFinished] = useState<boolean>(false);

  const { data } = useGetQuestionsQuery()
  const [CreatePostedAnswersMutation] = useCreatePostedAnswersMutation()

  useEffect(() => {
    if (finished && registeredAnswers) {
      CreatePostedAnswersMutation({
        variables: {
          input: {
            answersUuid: registeredAnswers
          }
        }
      })
    }
  }, [finished])

  useEffect(() => {
    if (!data?.getQuestions.questions) return
    setQuestionsFromData()
    // eslint-disable-next-line
  }, [data])

  useEffect(() => {
    updateActualQuestionAccordingToActualIndex()
    // eslint-disable-next-line
  }, [questionIndex, questions, language])

  const setActualQuestion = (questionInQuestionDataForm: QuestionData) => {
    const setLang = (questionInQuestionDataForm: QuestionData, lang: Languages) => {
      let answers: ActualQuestion['answers']
      let question: ActualQuestion['question']
      question = lang === Languages.english ? questionInQuestionDataForm.en : questionInQuestionDataForm.es
      answers = questionInQuestionDataForm.answers.map((answer) => {
        let answerLabel = answer.value;
        answerLabel = lang === Languages.english ? answer.en : answer.es
        return { value: answer.value, label: answerLabel, uuid: answer.uuid }
      })
      setQuestion({ imgUrl: questionInQuestionDataForm.imgUrl, answers, question })
    }

    switch (language) {
      case (Languages.spanish):
        setLang(questionInQuestionDataForm, Languages.spanish); break;
      case (Languages.english):
        setLang(questionInQuestionDataForm, Languages.english); break;
      default: setLang(questionInQuestionDataForm, Languages.spanish)
    }
  }

  const storeThisAnswer = (answer: string) => {
    if (registeredAnswers?.length) {
      const existAPreviousAnswerInThisQuestion = typeof registeredAnswers[questionIndex] !== 'undefined'
      if (!existAPreviousAnswerInThisQuestion) {
        pushAnswerToRegisteredAnswers(answer)
      } else {
        replaceAnswerOfRegisteredAnswersWithThisAnswer(answer)
      }
    } else {
      setRegisteredAnswers([answer])
    }
  }

  const handleNext = (answer: string) => {
    storeAnswerAndSetNextQuestion(answer)
  }

  const handlePrev = (answer: string | undefined) => {
    storeAnswerAndSetPrevQuestion(answer)
  }

  // UTILITIES *******************************************************************************************************

  const setQuestionsFromData = () => {
    if (!data || data.getQuestions.questions.length <= 0) return
    setQuestions(data.getQuestions.questions)
    setActualQuestion(data.getQuestions.questions[0])
  }

  const updateActualQuestionAccordingToActualIndex = () => {
    if (!questions?.length) return
    setActualQuestion(questions[questionIndex])
  }

  const storeAnswerAndSetNextQuestion = (answer: any) => {
    const nextIndex = questionIndex + 1
    if (!questions?.length) return

    storeThisAnswer(answer)
    if (nextIndex >= questions?.length) { console.log('end'); setFinished(true); return };
    setQuestionIndex(nextIndex)
  }

  const storeAnswerAndSetPrevQuestion = (answer: any) => {
    const prevIndex = questionIndex - 1
    if (!questions?.length) return

    if (typeof answer !== 'undefined') storeThisAnswer(answer)
    if (prevIndex < 0) return
    setQuestionIndex(prevIndex)
  }

  const pushAnswerToRegisteredAnswers = (answer: any) => {
    if (!registeredAnswers?.length) return
    const existARegisteredAnswerInThisQuestion = typeof registeredAnswers[questionIndex] !== 'undefined'
    if (!existARegisteredAnswerInThisQuestion) {
      const newArray = [...registeredAnswers]
      newArray.push(answer)
      setRegisteredAnswers(newArray)
    }
  }

  const replaceAnswerOfRegisteredAnswersWithThisAnswer = (answer: any) => {
    if (!registeredAnswers?.length) return
    const newArray = [...registeredAnswers]
    newArray[questionIndex] = answer
    setRegisteredAnswers(newArray)
  }

  // END OF UTILITIES *******************************************************************************************************

  const QuestionScreenFinished: FC = () => {
    return (
      <div className="questions-screen__finished">
        <h1 className="questions-screen__finished__thxTxt">{language === Languages.spanish ? '¡Gracias por contestar!' : 'Thanks for answering!'}</h1>
        {questions && registeredAnswers ?
          <QuestionsWithAnswersInTable
            questions={questions}
            answeredQuestions={registeredAnswers}
            language={language}
          /> : undefined
        }
      </div>
    )
  }

  return (
    <body
      className="questions-screen"
      style={question?.imgUrl ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${question.imgUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      } : undefined}
    >
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      {!finished ?
        <div className="questions-screen__question">
          <header className="questions-screen__question__question-counter">
            <div className="questions-screen__question__question-counter__txt">
              {questionIndex + 1}/{data?.getQuestions.questions.length || 0}
            </div>
            <div className="questions-screen__question__question-counter__progress-bar">
              <div
                className="questions-screen__question__question-counter__progress-bar__progress"
                style={{ width: questions?.length ? ((((questionIndex + 1) / questions.length) * 100) + '%') : undefined }}
              />
            </div>
            <button
              onClick={() => { language === Languages.spanish ? setLanguage(Languages.english) : setLanguage(Languages.spanish) }}
              className="questions-screen__question__question-counter__lang-button"
            >
              {language === Languages.spanish ?
                <img className="questions-screen__question__question-counter__lang-button__flag" src={enFlag} /> :
                <img className="questions-screen__question__question-counter__lang-button__flag" src={esFlag} />}
            </button>
          </header>
          {(data && data.getQuestions.questions.length > 0) ?
            <Question
              question={question?.question || ""}
              answers={question?.answers || [{ value: '', uuid: '', label: '' }]}
              onNext={answer => handleNext(answer)}
              prevAnswer={registeredAnswers?.length ? registeredAnswers[questionIndex] : undefined}
              onPrev={answer => handlePrev(answer)}
              language={language}
            />
            :
            !data ?
            <h1>No hay conexión con el servidor :(</h1>
            :
            <h1>No hay preguntas :(</h1>
          }
        </div>
        :
        <QuestionScreenFinished />
      }
    </body>
  )
}

const QuestionsWithAnswersInTable: FC<{ questions: QuestionData[], answeredQuestions: any[], language: Languages }> = ({ questions, answeredQuestions, language }) => {
  if (questions.length >= 0 && questions.length === answeredQuestions.length) {
    const questionsWithAnswer = questions.map((question, index) => {
      let questionTxt = language === Languages.spanish ? question.es : question.en;
      let answer = answeredQuestions[index]
      if (typeof answer === 'boolean') {
        answer ? answer = 'true' : answer = 'false';
      }
      const questionWithAnswer = [questionTxt, answer]
      return (
        <tr key={index}>
          <td>
            {questionWithAnswer[0]}
          </td>
          <td>
            {questionWithAnswer[1]}
          </td>
        </tr>
      )
    })
    return (
      <>
        <table className="questions-screen__finished__table">
          {questionsWithAnswer}
        </table>
      </>
    )
  }
  return (
    <>
    </>
  )
}

interface QuestionData {
  uuid: string
  es: string,
  en: string,
  imgUrl?: string | null
  answers: { value: any, es?: string, en?: string, uuid: string }[]
}
interface ActualQuestion {
  question: string
  imgUrl?: string | null
  answers: Answer[]
}
interface Answer {
  value: any,
  label: string,
  uuid: string
}

export default QuestionsScreen