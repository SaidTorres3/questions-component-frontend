import { FC, useEffect, useState } from "react";
import Question from "src/components/question/question";
import './questions.css'
import * as data from './dataExample.json'

enum Languages {
  "spanish" = "es",
  "english" = "en"
}

const QuestionsScreen: FC = () => {
  const [language, setLanguage] = useState<Languages>(Languages.spanish);
  const [questions, setQuestions] = useState<QuestionData[]>()
  const [actualQuestion, setActualQuestion] = useState<ActualQuestion>()
  const [questionIndex, setQuestionIndex] = useState<number>(0)

  const [registeredAnswers, createRegisteredAnswersArrayWithThisAnswer] = useState<any[]>()
  const [finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    setQuestionsFromJSONData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    updateActualQuestionAccordingToActualIndex()
    // eslint-disable-next-line
  }, [questionIndex, questions, language])

  const setActualQuestionWithQuestionData = (questionInQuestionDataForm: QuestionData) => {
    switch(language) {
      case (Languages.spanish):
        setActualQuestionInSpanish(questionInQuestionDataForm); break;
      case (Languages.english):
        setActualQuestionInEnglish(questionInQuestionDataForm); break;
      default: setActualQuestionInSpanish(questionInQuestionDataForm);
    }
  }

  const storeThisAnswer = (answer: any) => {
    if (registeredAnswers?.length) {
      const existAPreviousAnswerInThisQuestion = typeof registeredAnswers[questionIndex] !== 'undefined'
      if (!existAPreviousAnswerInThisQuestion) {
        pushAnswerToRegisteredAnswers(answer)
      } else {
        replaceAnswerOfRegisteredAnswersWithThisAnswer(answer)
      }
    } else {
      createRegisteredAnswersArrayWithThisAnswer([answer])
    }
  }

  const handleNext = (answer: any) => {
    storeAnswerAndSetNextQuestion(answer)
  }

  const handlePrev = (answer: any) => {
    storeAnswerAndSetPrevQuestion(answer)
  }

  // UTILITIES *******************************************************************************************************

  const setQuestionsFromJSONData = () => {
    setQuestions(data.questions)
    setActualQuestionWithQuestionData(data.questions[0])
  }

  const updateActualQuestionAccordingToActualIndex = () => {
    if (!questions?.length) return
    setActualQuestionWithQuestionData(questions[questionIndex])
  }

  const setActualQuestionInSpanish = (questionInQuestionDataForm: QuestionData) => {
    let answers: ActualQuestion['answers']
    let question: ActualQuestion['question']
    question = questionInQuestionDataForm.question.es
    answers = questionInQuestionDataForm.answers.map((answer) => {
      let answerLabel = answer.value;
      if (answer.es) answerLabel = answer.es
      return { value: answer.value, label: answerLabel }
    })
    setActualQuestion({ img: questionInQuestionDataForm.img, answers, question })
  }

  const setActualQuestionInEnglish = (questionInQuestionDataForm: QuestionData) => {
    let answers: ActualQuestion['answers']
    let question: ActualQuestion['question']
    question = questionInQuestionDataForm.question.en
    answers = questionInQuestionDataForm.answers.map((answer) => {
      let answerLabel = answer.value;
      if (answer.es) answerLabel = answer.en
      return { value: answer.value, label: answerLabel }
    })
    setActualQuestion({ img: questionInQuestionDataForm.img, answers, question })
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
      createRegisteredAnswersArrayWithThisAnswer(newArray)
    }
  }

  const replaceAnswerOfRegisteredAnswersWithThisAnswer = (answer: any) => {
    if (!registeredAnswers?.length) return
    const newArray = [...registeredAnswers]
    newArray[questionIndex] = answer
    createRegisteredAnswersArrayWithThisAnswer(newArray)
  }

  // END OF UTILITIES *******************************************************************************************************

  const QuestionScreenQuestion: FC = () => {
    return (
      <div className="questions-screen__question">
        <header className="questions-screen__question__question-counter">
          <div className="questions-screen__question__question-counter__txt">
            {questionIndex + 1}/{data.questions.length || 0}
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
            {language === Languages.spanish ? "Change language" : "Cambiar idioma"}
          </button>
        </header>
        <Question
          question={actualQuestion?.question || ""}
          answers={actualQuestion?.answers || [{ value: '' }]}
          onNext={answer => handleNext(answer)}
          prevAnswer={registeredAnswers?.length ? registeredAnswers[questionIndex] : undefined}
          onPrev={answer => handlePrev(answer)}
          language={language}
        />
      </div>
    )
  }

  const QuestionScreenFinished: FC = () => {
    return (
      <div className="questions-screen__finished">
        <h1 className="questions-screen__finished__thxTxt">{language === Languages.spanish ? '¡Gracias por contestar!' : 'Thanks for answering!'}</h1>
        { questions && registeredAnswers ?
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
      style={actualQuestion?.img ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${actualQuestion.img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      } : undefined}
    >
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      {!finished ?
        <QuestionScreenQuestion />
        :
        <QuestionScreenFinished />
      }
    </body>
  )
}

const QuestionsWithAnswersInTable: FC<{ questions: QuestionData[], answeredQuestions: any[], language: Languages }> = ({ questions, answeredQuestions, language }) => {
  if (questions.length >= 0 && questions.length === answeredQuestions.length) {
    const questionsWithAnswer = questions.map((question, index) => {
      let questionTxt = language === Languages.spanish ? question.question.es : question.question.en;
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
  id: number
  question: { es: string, en: string }
  img?: string
  answers: { value: any, es?: string, en?: string }[]
}

interface ActualQuestion {
  question: string
  img?: string
  answers: { value: any, label?: string }[]
}

export default QuestionsScreen