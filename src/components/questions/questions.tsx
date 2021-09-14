import { FC, useEffect, useState } from "react";
import Question from "src/components/question/question";
import './questions.css'
import * as data from './dataExample.json'

const QuestionsScreen: FC = () => {
  const [actualQuestion, setActualQuestion] = useState<QuestionData>()
  const [questions, setQuestions] = useState<QuestionData[]>()
  const [questionIndex, setQuestionIndex] = useState<number>(0)

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
    if (nextIndex >= questions?.length) return;
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
    <div
      className="questions-screen"
      style={actualQuestion?.img ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${actualQuestion.img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      } : undefined}
    >
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <div className="questions-screen__question">
        <div className="questions-screen__question__question-counter">
          <div className="questions-screen__question__question-counter__txt">
            {questionIndex + 1}/{data.questions.length || 0}
          </div>
          <div className="questions-screen__question__question-counter__progress-bar">
            <div
              className="questions-screen__question__question-counter__progress-bar__progress"
              style={{ width: questions?.length ? ((((questionIndex + 1) / questions.length) * 100) + '%') : undefined }}
            />
          </div>
        </div>
        <Question
          question={actualQuestion?.question || ""}
          answers={actualQuestion?.answers || [{ value: '' }]}
          onNext={answer => handleNext(answer)}
          prevAnswer={answeredQuestions?.length ? answeredQuestions[questionIndex] : undefined}
          onPrev={answer => handlePrev(answer)}
        />
      </div>
    </div>
  )
}

interface QuestionData {
  question: string,
  img?: string,
  answers: { value: any, label?: string }[]
}

export default QuestionsScreen