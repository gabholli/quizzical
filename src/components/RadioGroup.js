import React from "react"

const RadioGroup = ({ name, options, value, onChange, id }) => {

    const optionsMap = options?.map((option, index) => (
        <div>
            <input
                className="answer"
                id={id}
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={onChange}
            />
            <label htmlFor={id}>{option}</label>
        </div >
    ))

    return (
        <div>
            {optionsMap}
        </div>
    )
}

export default RadioGroup