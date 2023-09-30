import React from "react"

function Questions(props) {

    return (
        <div className="questions">
            <div className="question">
                <h1 className="prompt">
                    {props.item}
                </h1>
                <p className="answer">{props.answers[0]}</p>
                <p className="answer">{props.answers[1]}</p>
                <p className="answer">{props.answers[2]}</p>
                <p className="answer">{props.answers[3]}</p>
            </div>
        </div>
    )

}

export default Questions