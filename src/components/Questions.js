import React from "react"
import { decode } from "html-entities"

function Questions(props) {

    return (
        <div className="questions">
            <div className="question">
                <h1 className="prompt">
                    {decode(props.item)}
                </h1>
                <button onClick={props.getId}
                    className="answer"
                    data-id={props.answers[0] === props.correctAnswer}>
                    {decode(props.answers[0])}</button>
                <button onClick={props.getId}
                    className="answer"
                    data-id={props.answers[1] === props.correctAnswer}>
                    {decode(props.answers[1])}</button>
                <button onClick={props.getId}
                    className="answer"
                    data-id={props.answers[2] === props.correctAnswer}>
                    {decode(props.answers[2])}</button>
                <button onClick={props.getId}
                    className="answer"
                    data-id={props.answers[3] === props.correctAnswer}>
                    {decode(props.answers[3])}</button>
                {/* <input type="radio"
                    name="questionOne"
                    id="question-one-one"
                    value="question-one-one"
                    onChange={props.handleChange} />
                <label htmlFor="question-one-one">{props.answers[0]}</label>
                <input type="radio"
                    name="questionOne"
                    id="question-one-two"
                    value="question-one-two"
                    onChange={props.handleChange} />
                <label htmlFor="question-one-two">{props.answers[1]}</label>
                <input type="radio"
                    name="questionOne"
                    id="question-one-three"
                    value="question-one-three"
                    onChange={props.handleChange} />
                <label htmlFor="question-one-three">{props.answers[2]}</label>
                <input type="radio"
                    name="questionOne"
                    id="question-one-four"
                    value="question-one-four"
                    onChange={props.handleChange} />
                <label htmlFor="question-one-four">{props.answers[3]}</label> */}
            </div>
        </div >
    )

}

export default Questions