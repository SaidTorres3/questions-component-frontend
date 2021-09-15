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
  
  const [registeredAnswers, setRegisteredAnswers] = useState<any[]>()
  const [finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    setQuestions(data.questions)
    setActualQuestionWithQuestionData(data.questions[0])
    // eslint-disable-next-line
  }, [])

  const setActualQuestionWithQuestionData = (questionInQuestionDataForm: QuestionData) => {
    let answers: ActualQuestion['answers']
    let question: ActualQuestion['question']

    if (language === Languages.spanish) {
      question = questionInQuestionDataForm.question.es
      answers = questionInQuestionDataForm.answers.map((answer) => {
        let answerLabel = answer.value;
        if (answer.es) answerLabel = answer.es
        return { value: answer.value, label: answerLabel }
      })
      setActualQuestion({img: questionInQuestionDataForm.img, answers, question})
    }

    if (language === Languages.english) {
      question = questionInQuestionDataForm.question.en
      answers = questionInQuestionDataForm.answers.map((answer) => {
        let answerLabel = answer.value;
        if (answer.es) answerLabel = answer.en
        return { value: answer.value, label: answerLabel }
      })
      setActualQuestion({img: questionInQuestionDataForm.img, answers, question})
    }
  }

  useEffect(() => {
    if (!questions?.length) return
    setActualQuestionWithQuestionData(questions[questionIndex])
    // eslint-disable-next-line
  }, [questionIndex, questions, language])

  useEffect(() => {
    console.log(registeredAnswers)
  }, [registeredAnswers])

  const storeThisAnswer = (answer: any) => {
    if (registeredAnswers?.length) {
      if (typeof registeredAnswers[questionIndex] === 'undefined') {
        const newArray = [...registeredAnswers]
        newArray.push(answer)
        setRegisteredAnswers(newArray)
      } else {
        const newArray = [...registeredAnswers]
        newArray[questionIndex] = answer
        setRegisteredAnswers(newArray)
      }
    } else {
      setRegisteredAnswers([answer])
    }
  }

  const handleNext = (answer: any) => {
    const nextIndex = questionIndex + 1
    if (!questions?.length) return

    storeThisAnswer(answer)
    if (nextIndex >= questions?.length) { console.log('end'); setFinished(true); return };
    setQuestionIndex(nextIndex)
  }

  const handlePrev = (answer: any) => {
    const prevIndex = questionIndex - 1
    if (!questions?.length) return

    if (typeof answer !== 'undefined') storeThisAnswer(answer)
    if (prevIndex < 0) return
    setQuestionIndex(prevIndex)
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
      <button
        onClick={()=>{language===Languages.spanish ? setLanguage(Languages.english) : setLanguage(Languages.spanish)}}
        style={{height: '3vh', width: '18vh', fontSize: '1.60vh', padding: '0.1vh', borderWidth: '0.1vh'}}
      >
        {language === Languages.spanish ? "Change language" : "Cambiar idioma"}
      </button>
      {!finished ?
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
        :
        <div className="questions-screen__finished">
          <h1 className="questions-screen__finished__thxTxt">{language === Languages.spanish ? '¡Gracias por contestar!' : 'Thanks for answering!'}</h1>
          {/* <img className="questions-screen__finished__gif" src="https://i.giphy.com/media/l1INk1qF0fw73snz2p/giphy.webp" alt="" /> */}
          {
            questions && registeredAnswers ?
              <QuestionsWithAnswersInTable
                questions={questions}
                answeredQuestions={registeredAnswers}
                language={language}
              /> : undefined
          }
        </div>
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
  question: { es: string, en: string },
  img?: string,
  answers: { value: any, es?: string, en?: string }[]
}

interface ActualQuestion {
  question: string
  img?: string
  answers: { value: any, label?: string }[]
}

export default QuestionsScreen