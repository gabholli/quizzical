import React from "react"
import { useState, useEffect, useCallback } from 'react'
import './App.css'
import HomePage from "./components/HomePage"
import Questions from "./components/Questions"
import { decode } from "html-entities"
import Confetti from "react-confetti"


const App = () => {

  const [home, setHome] = useState(false)
  const [game, setGame] = useState(false)
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  // const [error, setError] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState({})
  const [showConfetti, setShowConfetti] = useState(false)
  const [answersSubmitted, setAnswersSubmitted] = useState(false);

  const handleEnterClick = () => {
    setHome(prevState => prevState = !prevState)
    setGame(true)
  }


  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple");
      if (!response.ok) {
        throw new Error("Data not available");
      }
      const data = await response.json();
      const processedQuestions = data.results.map((item) => {
        const decodedIncorrectAnswers = item.incorrect_answers.map(answer => decode(answer))
        const decodedCorrectAnswer = decode(item.correct_answer)
        const answers = [...decodedIncorrectAnswers, decodedCorrectAnswer]
        return {
          ...item,
          answers: shuffleArray(answers), // Shuffle once and store
          questionId: decode(item.question),
        }
      })
      setQuestions(processedQuestions)
      const initialAnswers = {};
      processedQuestions.forEach(question => {
        initialAnswers[question.questionId] = null; // Or any other default value
      });
      setSelectedAnswer(initialAnswers);
    }
    if (game) {
      fetchQuestions().catch(console.error);
    }
  }, [game])

  const getIdClick = useCallback((event, question) => {
    const selectedValue = event.target.value;
    // Just store the user's selected answer
    setSelectedAnswer(prevSelectedAnswers => ({
      ...prevSelectedAnswers,
      [question]: selectedValue
    }));
  }, [setSelectedAnswer]);  // Ensure setSelectedAnswer is included in the dependency array

  const questionComponents = questions.map(item => (
    <Questions
      key={item.question}
      item={decode(item.question)}
      correctAnswer={decode(item.correct_answer)}
      answers={item.answers} // Use pre-shuffled answers
      getId={(event) => getIdClick(event, item.questionId)}
      questionId={item.questionId}
      selectedAnswer={selectedAnswer[item.questionId]}
      gameOver={answersSubmitted}
    />
  ));

  const handleSubmitAnswers = () => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(selectedAnswer).filter(key => selectedAnswer[key] !== null).length;
    const isAllAnswered = totalQuestions === answeredQuestions;

    // Optionally alert the user to answer all questions first
    if (!isAllAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setAnswersSubmitted(true)

    // Calculate the score based on correct answers
    const newScore = questions.reduce((acc, question) => {
      const userAnswer = selectedAnswer[question.questionId]
      const correctAnswer = decode(question.correct_answer)
      if (userAnswer === correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setScore(newScore); // Set the new score

    // Display results or confetti if the score is perfect
    if (newScore === questions.length) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
    } else {
      alert("Your score: " + newScore);
    }
  }

  const backToHome = () => {
    setHome(prevState => !prevState)
    setGame(false)
    setScore(0)
    setAnswersSubmitted(false)
  }

  return (
    <div className="app">
      {!home && <HomePage
        handleClick={handleEnterClick}
      />}
      {game && <h1 className="quiz-heading">Quizzical</h1>}
      {game && questionComponents}
      {/* {error && <h1>There was an error loading the questions</h1>} */}
      {game && (
        <button onClick={handleSubmitAnswers} className="submit-answers-button">
          Submit Answers
        </button>
      )}
      {game && <button onClick={backToHome} className="back-home-button" >{score === 5 ? "New Game" : "Back To Home"}</button>}


      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </div >
  );
}