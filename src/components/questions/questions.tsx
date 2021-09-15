import { FC, useEffect, useState } from "react";
import Question from "src/components/question/question";
import './questions.css'
import * as data from './dataExample.json'

const QuestionsScreen: FC = () => {
  const [actualQuestion, setActualQuestion] = useState<QuestionData>()
  const [questions, setQuestions] = useState<QuestionData[]>()
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [finished, setFinished] = useState<boolean>(false);

  const [answeredQuestions, setAnsweredQuestions] = useState<any[]>()

  useEffect(() => {
    setQuestions(data.questions)
    setActualQuestion(data.questions[0])
  }, [])

  useEffect(() => {
    if (!questions?.length) return
    setActualQuestion(questions[questionIndex])
  }, [questionIndex, questions])

  useEffect(() => {
    console.log(answeredQuestions)
  }, [answeredQuestions])

  const storeThisAnswer = (answer: any) => {
    if (answeredQuestions?.length) {
      if (typeof answeredQuestions[questionIndex] === 'undefined') {
        const newArray = [...answeredQuestions]
        newArray.push(answer)
        setAnsweredQuestions(newArray)
      } else {
        const newArray = [...answeredQuestions]
        newArray[questionIndex] = answer
        setAnsweredQuestions(newArray)
      }
    } else {
      setAnsweredQuestions([answer])
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
            prevAnswer={answeredQuestions?.length ? answeredQuestions[questionIndex] : undefined}
            onPrev={answer => handlePrev(answer)}
          />
        </div>
        :
        <div className="questions-screen__finished">
          <h1 className="questions-screen__finished__thxTxt">¡Gracias por contestar!</h1>
          {/* <img className="questions-screen__finished__gif" src="https://i.giphy.com/media/l1INk1qF0fw73snz2p/giphy.webp" alt="" /> */}
          {
            questions && answeredQuestions ?
              <QuestionsWithAnswersInTable
                questions={questions}
                answeredQuestions={answeredQuestions}
              /> : undefined
          }
        </div>
      }
    </body>
  )
}

const QuestionsWithAnswersInTable: FC<{ questions: QuestionData[], answeredQuestions: any[] }> = ({ questions, answeredQuestions }) => {
  if (questions.length >= 0 && questions.length === answeredQuestions.length) {
    const questionsWithAnswer = questions.map((question, index) => {
      let questionTxt = question.question
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
  question: string,
  img?: string,
  answers: { value: any, label?: string }[]
}

export default QuestionsScreen