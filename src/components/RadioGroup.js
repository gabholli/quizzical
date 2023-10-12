import React from "react"

const RadioGroup = ({ name, options, selectedAnswer, onOptionChange }) => {

    const optionsMap = options?.map((option, index) => (
        <div>
            <label>
                <input
                    className="answer"
                    type="radio"
                    name={name}
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => onOptionChange(option)}
                />
                {option}
            </label>
        </div >
    ))
    return (
        <div>
            {optionsMap}
        </div>
    )
}

export default RadioGroup