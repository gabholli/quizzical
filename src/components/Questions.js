import React from "react"
import { decode } from "html-entities"

function Questions(props) {

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }

    const shuffledAnswers = shuffleArray(props.incorrectAnswer.concat(props.correctAnswer))

    return (
        <div className="questions">
            <div className="question">
                <h1 className="prompt">
                    {decode(props.item)}
                </h1>
                {/* <p onClick={props.getId}
                    className="answer"
                    data-id={shuffledAnswers[0] === props.correctAnswer}>
                    {shuffledAnswers[0]}</p>
                <p onClick={props.getId}
                    className="answer"
                    data-id={shuffledAnswers[1] === props.correctAnswer}>
                    {shuffledAnswers[1]}</p>
                <p onClick={props.getId}
                    className="answer"
                    data-id={shuffledAnswers[2] === props.correctAnswer}>
                    {shuffledAnswers[2]}</p>
                <p onClick={props.getId}
                    className="answer"
                    data-id={shuffledAnswers[3] === props.correctAnswer}>
                    {shuffledAnswers[3]}</p> */}
                <input type="radio"
                    name="questionOne"
                    id="question-one-one"
                    value="question-one-one"
                    onChange={props.handleChange} />
                <label htmlFor="question-one-one">{shuffledAnswers[0]}</label>
                <input type="radio"
                    name="questionOne"
                    id="question-one-two"
                    value="question-one-two"
                    onChange={props.handleChange} />
                <label htmlFor="question-one-two">{shuffledAnswers[1]}</label>
                <input type="radio"
                    name="questionOne"
                    id="question-one-three"
                    value="question-one-three"
                    onChange={props.handleChange} />
                <label htmlFor="question-one-three">{shuffledAnswers[2]}</label>
                <input type="radio"
                    name="questionOne"
                    id="question-one-four"
                    value="question-one-four"
                    onChange={props.handleChange} />
                <label htmlFor="question-one-four">{shuffledAnswers[3]}</label>
            </div>
        </div >
    )

}

export default Questions