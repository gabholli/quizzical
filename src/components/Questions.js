import React from "react"
import { useState } from "react"

function Questions(props) {


    return (
        <div className="questions">
            <div className="question">
                <h1 className="prompt">
                    {props.item}
                </h1>
                <p onClick={props.getId} className="answer" data-id={props.answers[0]}>{props.answers[0]}</p>
                <p onClick={props.getId} className="answer" data-id={props.answers[1]}>{props.answers[1]}</p>
                <p onClick={props.getId} className="answer" data-id={props.answers[2]}>{props.answers[2]}</p>
                <p onClick={props.getId} className="answer" data-id={props.answers[3]}>{props.answers[3]}</p>
            </div>
        </div >
    )

}

export default Questions