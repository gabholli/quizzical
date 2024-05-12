import React from "react"

const Questions = ({ item, answers, correctAnswer, getId, questionId }) => {
    return (
        <div className="questions">
            <div className="question">
                <h1 className="prompt">{item}</h1>
                {answers.map((answer, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`${questionId}-answer-${index}`}
                            name={questionId}
                            value={answer}
                            data-id={answer === correctAnswer}
                            onChange={(e) => getId(e, questionId)}
                            className="answer-radio"
                        />
                        <label htmlFor={`${questionId}-answer-${index}`}>{answer}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Questions
