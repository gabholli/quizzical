import React from "react"
import { useState, useEffect } from 'react'
import './App.css'
import HomePage from "./components/HomePage"
import Questions from "./components/Questions"
import { decode } from "html-entities"

function App() {

  const [home, setHome] = useState(false)
  const [question, setQuestion] = useState([])
  const [options, setOptions] = useState([])

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

  const randomlyInsertString = (targetArray, stringToInsert) => {
    const randomIndex = Math.floor(Math.random() * (targetArray.length + 1))

    const firstPart = targetArray.slice(0, randomIndex)
    const secondPart = targetArray.slice(randomIndex)

    const newArray = [...firstPart, stringToInsert, ...secondPart]

    return newArray
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(response => response.json())
      .then(data => {
        setQuestion(data.results)
      })
  }, [])

  const handleClick = () => {
    setHome(prevState => prevState = !prevState)
  }

  console.log(question)

  const questionData = question.map(item => {
    return (
      <Questions
        item={decode(item.question)}
        answers={randomlyInsertString(item.incorrect_answers, item.correct_answer)}
      />
    )
  })

  console.log(questionData)

  return (
    <div className="app">
      {!home && <HomePage
        handleClick={handleClick}
      />}
      {home && questionData}
      {home && <button className="check-answers-button">Check Answers</button>}
    </div>
  );
}

export default App;
