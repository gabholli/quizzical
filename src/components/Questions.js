import React from "react";

const Questions = ({ item, answers, correctAnswer, getId, questionId, selectedAnswer, gameOver }) => {
    return (
        <div className="questions">
            <div className="question">
                <h1 className="prompt">{item}</h1>
                {answers.map((answer, index) => {
                    const isCorrect = answer === correctAnswer;
                    const isSelected = answer === selectedAnswer;
                    // Apply green background if gameOver, the answer is correct, and it was selected
                    const answerStyle = gameOver && !isSelected && isCorrect ? { backgroundColor: 'lightgreen' } : {};

                    return (
                        <div key={index}>
                            <input
                                type="radio"
                                id={`${questionId}-answer-${index}`}
                                name={questionId}
                                value={answer}
                                onChange={(e) => getId(e, questionId)}
                                disabled={gameOver}  // Disable after submit
                                className="answer-radio"
                            />
                            <label htmlFor={`${questionId}-answer-${index}`} style={answerStyle}>
                                {answer}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Questions