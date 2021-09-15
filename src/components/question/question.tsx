import React, { FC, useEffect } from 'react'
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import './question.css'

enum Languages {
  "spanish" = "es",
  "english" = "en"
}

const Question: FC<QuestionRequirements> = ({ onNext, onPrev, question, answers, prevAnswer, language }) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState(prevAnswer)

  useEffect(() => {
    focusQuestionScreen()
    if (typeof prevAnswer === 'undefined' || !answers) return
    if (typeof selectedAnswer === 'undefined') {
      setSelectedAnswer(prevAnswer)
    }
    // eslint-disable-next-line
  }, [prevAnswer, answers, setSelectedAnswer, selectedAnswer])

  const resetAnswer = () => {
    setSelectedAnswer(undefined)
  }

  const answerValueToIndex = (answerToFindIndex: RadioAnswerRequirements) => {
    const index = answers.findIndex(answer => answer.value === answerToFindIndex)
    return index
  }

  const indexToAnswerValue = (index: number) => {
    const answer = answers[index]
    return answer
  }

  const moveToNextAnswer = (direction: 'Up' | 'Down') => {
    const limit = answers.length - 1
    const selectedAnswerIndex = answerValueToIndex(selectedAnswer)
    let nextIndex: number;
    if (selectedAnswerIndex || selectedAnswerIndex === 0) { //If selectedAnswerIndex exist
      nextIndex = selectedAnswerIndex + (direction === 'Down' ? 1 : -1);
      if (nextIndex > limit && direction === 'Down') {
        nextIndex = 0
      } else if (nextIndex < 0 && direction === 'Up') {
        nextIndex = limit
      }
    } else {
      if (direction === 'Down') {
        nextIndex = 0
      } else {
        nextIndex = limit
      }
    }
    const answer = indexToAnswerValue(nextIndex)
    setSelectedAnswer(answer.value)
  }

  // HANDLERS ******************************************************************************
  const prevHandler = () => {
    if (onPrev) onPrev(selectedAnswer);
    resetAnswer()
  }

  const nextHandler = () => {
    if (onNext && typeof selectedAnswer !== 'undefined') onNext(selectedAnswer);
    resetAnswer()
  }

  const keyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') { nextHandler() }
    if (e.key === 'Backspace') { prevHandler() }
    if (e.key === 'ArrowRight') { nextHandler() }
    if (e.key === 'ArrowLeft') { prevHandler() }
    if (e.key === 'ArrowDown') { moveToNextAnswer('Down') }
    if (e.key === 'ArrowUp') { moveToNextAnswer('Up') }
  }
  // END OF HANDLERS ***********************************************************************

  const AnswersMap = () => {
    return answers.map((answer, index) => {
      return (
        <RadioAnswer
          value={answer.value}
          label={answer.label}
          onSelect={(answerValue) => setSelectedAnswer(answerValue)}
          selectedAnswer={selectedAnswer}
          key={index}
        />
      )
    })
  }

  const questionScreen = React.useRef<HTMLDivElement>(null)

  const focusQuestionScreen = () => {
    questionScreen.current?.focus()
  }

  return (
    <div
      className="question-screen"
      onKeyDown={(e) => keyHandler(e)}
      tabIndex={100}
      ref={questionScreen}
      onBlur={() => focusQuestionScreen}
    >
      <div className="question-screen__question-container">
        <div className="question-screen__question-container__question-title">
          {question}
        </div>

        <div className="question-screen__question-container__radio-answers">
          {AnswersMap()}
        </div>

        <div className="question-screen__question-container__buttons-container">
          <div
            className="question-screen__question-container__buttons-container__button question-screen__question-container__buttons-container__button--prev"
            onClick={e => prevHandler()}
          >
            <MdNavigateBefore className="question-screen__question-container__buttons-container__button__icon"></MdNavigateBefore>
            {language === Languages.spanish ? "Anterior" : "Previous"}
          </div>
          <div
            className="question-screen__question-container__buttons-container__button question-screen__question-container__buttons-container__button--next"
            style={typeof selectedAnswer === 'undefined' ? { backgroundColor: 'white', color: '#0008', cursor: 'default' } : undefined}
            onClick={() => nextHandler()}
          >
            {language === Languages.spanish ? "Siguiente" : "Next"}
            <MdNavigateNext className="question-screen__question-container__buttons-container__button__icon" color="white"></MdNavigateNext>
          </div>
        </div>
      </div>
    </div>
  )
}

const RadioAnswer: FC<InternalRadioAnswerRequeriments> = ({ selectedAnswer, label, value, onSelect }) => {
  if (!label) {
    label = value
  }
  const [thisIsSelected, setThisIsSelected] = React.useState<boolean>(false)
  React.useEffect(() => {
    if (selectedAnswer === value) {
      setThisIsSelected(true)
    } else {
      setThisIsSelected(false)
    }
  }, [selectedAnswer, setThisIsSelected, value])
  return (
    <div
      className="question-screen__question-container__radio-answers__radio_answer"
      onClick={() => onSelect ? onSelect(value) : undefined}
    >
      <div
        className="question-screen__question-container__radio-answers__radio_answer__radio"
        style={thisIsSelected ? { backgroundColor: 'var(--next-background-color)' } : { backgroundColor: 'white' }}
      />
      <label
        className="question-screen__question-container__radio-answers__radio_answer__text"
        style={thisIsSelected ? { color: 'var(--next-background-color)' } : { color: 'white' }}
      >
        {label}
      </label>
    </div>
  )
}

interface InternalRadioAnswerRequeriments {
  selectedAnswer: any,
  label?: string,
  value: any,
  onSelect: (value: any) => void
}

interface QuestionRequirements {
  question: string
  answers: RadioAnswerRequirements[]
  onNext?: (value: any) => void
  onPrev?: (value?: any) => void
  prevAnswer?: any,
  language: Languages
}

interface RadioAnswerRequirements {
  label?: string,
  value: any,
}

export default Question