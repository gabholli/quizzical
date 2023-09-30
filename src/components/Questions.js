import React from "react"

function Questions(props) {

    return (
        <div className="questions">
            <div className="question">
                <h1 className="prompt">
                    {props.item}
                </h1>
                <p className="answer">{props.correctAnswer}</p>
                <p className="answer">{props.incorrectAnswer[0]}</p>
                <p className="answer">{props.incorrectAnswer[1]}</p>
                <p className="answer">{props.incorrectAnswer[2]}</p>
            </div>
        </div>
    )

}

export default Questions