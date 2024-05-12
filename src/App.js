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

  const handleEnterClick = () => {
    setHome(prevState => prevState = !prevState)
    setGame(true)
  }

  // useEffect(() => {
  //   fetch("https://opentdb.com/api.php?amount=5&type=multiple")
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //       setQuestions(data.results)
  //     })
  // }, [game])

  // useEffect(() => {
  //   if (score === 5) {
  //     setShowConfetti(true);
  //     const timer = setTimeout(() => {
  //       setShowConfetti(false);  // Automatically turn off confetti after 5000 ms (5 seconds)
  //     }, 10000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [score]);


  // useEffect(() => {
  //   fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
  //     .then(response => {
  //       if (!response.ok) {
  //         throw Error("Data not available")
  //       }
  //       return response.json()
  //     })
  //     .then(data => {
  //       setQuestions(data.results)
  //     })
  //     .catch(error => {
  //       console.log("Fetch error: ", error)
  //       // setError(error)
  //     })

  // }, [game])

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
        const decodedIncorrectAnswers = item.incorrect_answers.map(answer => decode(answer));
        const decodedCorrectAnswer = decode(item.correct_answer);
        const answers = [...decodedIncorrectAnswers, decodedCorrectAnswer];
        return {
          ...item,
          answers: shuffleArray(answers), // Shuffle once and store
          questionId: decode(item.question),
        };
      });
      setQuestions(processedQuestions);
    }
    if (game) {
      fetchQuestions().catch(console.error);
    }
  }, [game])

  const getIdClick = useCallback((event, question) => {
    const selectedValue = event.target.value
    const isCorrect = event.target.dataset.id === 'true'
    console.log(isCorrect)
    // Update the selected answer state
    setSelectedAnswer(prev => ({
      ...prev,
      [question]: selectedValue
    }));

    // Update score if necessary
    if (isCorrect && !selectedAnswer[question]) { // Only update score if not already answered
      setScore(prevScore => prevScore + 1)
    }
  }, [selectedAnswer])

  const questionComponents = questions.map(item => (
    <Questions
      key={item.question}
      item={decode(item.question)}
      correctAnswer={decode(item.correct_answer)}
      answers={item.answers} // Use pre-shuffled answers
      getId={(event) => getIdClick(event, item.questionId)}
      questionId={item.questionId}
      selectedAnswer={selectedAnswer[item.questionId]}
    />
  ));

  const handleSubmitAnswers = () => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(selectedAnswer).length;
    const isAllAnswered = totalQuestions === answeredQuestions;

    // Optionally alert the user to answer all questions first
    if (!isAllAnswered) {
      alert("Please answer all questions before submitting.")
      return
    }

    // Check if the score is 5, assuming that `setScore` correctly updates the score
    if (score === 5) {
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
      }, 10000)
    } else {
      alert("Try again! Your score: " + score);
    }
  }


  const backToHome = () => {
    setHome(prevState => !prevState)
    setGame(false)
    setScore(0)
    // window.location.reload(true)
  }

  // if (error) {
  //   return (
  //     <div className="error-container">
  //       <h1>There was an error loading the questions</h1>
  //       <button onClick={backToHome}>Go to home</button>
  //     </div>
  //   )
  // }

  return (
    <div className="app">
      {/* <svg className="lemon-blob" xmlns="http://www.w3.org/2000/svg" width="126" height="131" viewBox="0 0 126 131" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M63.4095 71.3947C35.1213 40.8508 -2.68211 11.7816 1.17274 -29.6933C5.43941 -75.599 39.854 -115.359 82.4191 -133.133C122.797 -149.994 170.035 -140.256 205.822 -115.149C235.947 -94.0141 236.823 -53.8756 246.141 -18.271C256.17 20.0508 282.521 60.8106 260.501 93.7792C237.538 128.159 188.991 133.432 147.931 128.768C112.318 124.723 87.7505 97.6768 63.4095 71.3947Z" fill="#FFFAD1" />
      </svg>
      <svg className="lavender-blob" xmlns="http://www.w3.org/2000/svg" width="65" height="62" viewBox="0 0 65 62" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M-38.919 2.96445C-10.8241 1.07254 20.4975 -5.87426 40.8434 11.5469C63.3629 30.8293 69.9281 62.0589 61.4141 88.8747C53.3376 114.313 28.2818 132.992 -0.0909882 140.475C-23.9759 146.775 -45.6063 132.093 -68.3914 123.11C-92.9153 113.441 -125.606 110.575 -133.794 87.7612C-142.333 63.9714 -124.677 39.0277 -104.912 21.3621C-87.7687 6.03978 -63.0936 4.59238 -38.919 2.96445Z" fill="#DEEBF8" />
      </svg> */}
      {!home && <HomePage
        handleClick={handleEnterClick}
      />}
      {game && <h1 className="quiz-heading">Quizzical</h1>}
      {game && questionComponents}
      {/* {error && <h1>There was an error loading the questions</h1>} */}
      {game && <p className="score-text">Your Score: {score}/5</p>}
      {game && <button onClick={backToHome} className="back-home-button" >{score === 5 ? "New Game" : "Back To Home"}</button>}
      {game && (
        <button onClick={handleSubmitAnswers} className="submit-answers-button">
          Submit Answers
        </button>
      )}

      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </div >
  );
}

export default App
