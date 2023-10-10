import React from "react"
import { useState, useEffect } from 'react'
import './App.css'
import HomePage from "./components/HomePage"
import Questions from "./components/Questions"

function App() {

  const [home, setHome] = useState(false)
  const [questions, setQuestions] = useState([])
  const [completed, setCompleted] = useState(false)
  const [buttonColor, setButtonColor] = useState(false)
  const [score, setScore] = useState(0)

  const handleEnterClick = () => {
    setHome(prevState => prevState = !prevState)
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setQuestions(data.results)
      })
  }, [home])

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = 0
      j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }

    return shuffled
  }

  const generateQuestionData = () => {
    const questionData = questions.map(item => {
      return (
        <Questions
          // item={item}
          key={item.question}
          item={item.question}
          correctAnswer={item.correct_answer}
          incorrectAnswer={item.incorrect_answers.map(answer => answer)}
          // answers={randomlyInsertString(item.incorrect_answers, item.correct_answer)}
          answers={shuffleArray(item.incorrect_answers.concat(item.correct_answer))}
          // handleChange={handleChange}
          getId={getIdClick}
        // styles={styles}
        />
      )
    })
    return questionData
  }

  const getIdClick = (event) => {
    const id = event.currentTarget.dataset.id
    if (!buttonColor) {
      event.target.style.backgroundColor = "#D6DBF5"
      setButtonColor(true)
    } else {
      event.target.style.backgroundColor = "white"
      setButtonColor(false)
    }
    if (id === "true" && score < 5) {
      setScore(prevScore => prevScore + 1)
    }

    if (score === 5) {
      setCompleted(true)
    }

    console.log(id)
  }

  const backToHome = () => {
    setHome(prevState => prevState = !prevState)
    setScore(0)
    setCompleted(false)
  }

  console.log(questions)

  return (
    <div className="app">
      <svg className="lemon-blob" xmlns="http://www.w3.org/2000/svg" width="126" height="131" viewBox="0 0 126 131" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M63.4095 71.3947C35.1213 40.8508 -2.68211 11.7816 1.17274 -29.6933C5.43941 -75.599 39.854 -115.359 82.4191 -133.133C122.797 -149.994 170.035 -140.256 205.822 -115.149C235.947 -94.0141 236.823 -53.8756 246.141 -18.271C256.17 20.0508 282.521 60.8106 260.501 93.7792C237.538 128.159 188.991 133.432 147.931 128.768C112.318 124.723 87.7505 97.6768 63.4095 71.3947Z" fill="#FFFAD1" />
      </svg>
      <svg className="lavender-blob" xmlns="http://www.w3.org/2000/svg" width="65" height="62" viewBox="0 0 65 62" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M-38.919 2.96445C-10.8241 1.07254 20.4975 -5.87426 40.8434 11.5469C63.3629 30.8293 69.9281 62.0589 61.4141 88.8747C53.3376 114.313 28.2818 132.992 -0.0909882 140.475C-23.9759 146.775 -45.6063 132.093 -68.3914 123.11C-92.9153 113.441 -125.606 110.575 -133.794 87.7612C-142.333 63.9714 -124.677 39.0277 -104.912 21.3621C-87.7687 6.03978 -63.0936 4.59238 -38.919 2.96445Z" fill="#DEEBF8" />
      </svg>
      {!home && <HomePage
        handleClick={handleEnterClick}
      />}
      {home && <h1 className="quiz-heading">Quizzical</h1>}
      {home && generateQuestionData()}
      {home && completed && <p>Your Score: {score}</p>}
      {home && <button onClick={backToHome} className="back-home-button" >{score === 5 ? "New Game" : "Back To Home"}</button>}
    </div >
  );
}

export default App;
