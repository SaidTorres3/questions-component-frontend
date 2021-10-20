import React, { FC, useEffect } from 'react'
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import './question.css'

enum Languages {
  "spanish" = "es",
  "english" = "en"
}

const Question: FC<QuestionRequirements> = ({ onNext, onPrev, question, answers, prevAnswer, language }) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState<string|undefined>(prevAnswer)
  const questionScreen = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    focusQuestionScreen()
    setPrevAnswerAsActualAnswer()
    // eslint-disable-next-line
  }, [prevAnswer, answers, setSelectedAnswer, selectedAnswer])

  const prevHandler = () => {
    goPrevQuestion()
    resetAnswer()
  }

  const nextHandler = () => {
    goNextQuestion()
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

  const moveToNextAnswer = (direction: 'Up' | 'Down') => {
    const lastAnswerIndex = answers.length - 1
    const selectedAnswerIndex = answerUuidToAnswerIndex(selectedAnswer!)
    let nextIndex: number;
    const isThereASelectedAnswer = selectedAnswerIndex >= 0
    if (isThereASelectedAnswer) { //If selectedAnswerIndex exist
      nextIndex = selectedAnswerIndex + (direction === 'Down' ? 1 : -1);
      if (nextIndex > lastAnswerIndex && direction === 'Down') {
        nextIndex = 0
      } else if (nextIndex < 0 && direction === 'Up') {
        nextIndex = lastAnswerIndex
      }
    } else {
      if (direction === 'Down') {
        nextIndex = 0
      } else {
        nextIndex = lastAnswerIndex
      }
    }
    const answer = answerIndexToAnswer(nextIndex)
    setSelectedAnswer(answer.uuid)
  }

  // UTILITIES *******************************************************************************************************

  const resetAnswer = () => {
    setSelectedAnswer(undefined)
  }

  const goPrevQuestion = () => {
    if (onPrev) onPrev(selectedAnswer);
  }

  const goNextQuestion = () => {
    if (onNext && typeof selectedAnswer !== 'undefined') onNext(selectedAnswer);
  }

  const setPrevAnswerAsActualAnswer = () => {
    if (typeof prevAnswer === 'undefined' || !answers) return
    if (typeof selectedAnswer === 'undefined') {
      setSelectedAnswer(prevAnswer)
    }
  }

  const focusQuestionScreen = () => {
    questionScreen.current?.focus()
  }

  const answerUuidToAnswerIndex = (answerUuid: string): number => {
    const index = answers.findIndex(answer => answer.uuid === answerUuid)
    return index
  }

  const answerIndexToAnswer = (index: number): RadioAnswerRequirements => {
    const answer = answers[index]
    return answer
  }

  // END OF UTILITIES *******************************************************************************************************

  const AnswersMap = () => {
    return answers.map((answer, index) => {
      return (
        <RadioAnswer
          value={answer.value}
          label={answer.label}
          uuid={answer.uuid}
          onSelect={(answerValue) => setSelectedAnswer(answerValue)}
          selectedAnswer={selectedAnswer}
          key={index}
        />
      )
    })
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

const RadioAnswer: FC<InternalRadioAnswerRequeriments> = ({ selectedAnswer, label, value, onSelect, uuid }) => {
  if (!label) {
    label = value
  }
  const [thisIsSelected, setThisIsSelected] = React.useState<boolean>(false)
  React.useEffect(() => {
    if (selectedAnswer === uuid) {
      setThisIsSelected(true)
    } else {
      setThisIsSelected(false)
    }
  }, [selectedAnswer, setThisIsSelected, value])
  return (
    <div
      className="question-screen__question-container__radio-answers__radio_answer"
      onClick={() => onSelect ? onSelect(uuid) : undefined}
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
  selectedAnswer: string|undefined,
  label?: string,
  value: any,
  uuid: string
  onSelect: (string: any) => void
}

interface QuestionRequirements {
  question: string
  answers: RadioAnswerRequirements[]
  onNext?: (value: string) => void
  onPrev?: (value?: string) => void
  prevAnswer?: string,
  language: Languages
}

interface RadioAnswerRequirements {
  label?: string,
  value: any,
  uuid: string
}

export default Question