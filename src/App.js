import React from "react"
import { useState, useEffect } from 'react'
import './App.css'
import HomePage from "./components/HomePage"
import Questions from "./components/Questions"
import { decode } from "html-entities"

function App() {

  const [home, setHome] = useState(false)
  const [question, setQuestion] = React.useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setQuestion(data.results)
      })
  }, [])

  const handleClick = () => {
    setHome(prevState => prevState = !prevState)
  }

  const questionData = question.map(item => {
    return (
      <Questions
        item={decode(item.question)}
        correctAnswer={decode(item.correct_answer)}
        incorrectAnswer={item.incorrect_answers.map(answer => decode(answer))}
      />
    )
  })

  console.log(questionData)

  const correctArray = question.map(item => item.correct_answer)

  const incorrectArray = question.map(item => item.incorrect_answers)

  const answers = correctArray.concat(incorrectArray)

  // let answersOne = []
  // let answersTwo = []
  // let answersThree = []
  // let answersFour = []
  // let answersFive = []

  // answersOne.push(answers[0])
  // answersOne.push(answers[5])
  // answersTwo.push(answers[1])
  // answersTwo.push(answers[6])
  // answersThree.push(answers[2])
  // answersThree.push(answers[7])
  // answersFour.push(answers[3])
  // answersFour.push(answers[8])
  // answersFive.push(answers[4])
  // answersFive.push(answers[9])

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
