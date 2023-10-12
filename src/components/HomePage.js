import React from "react"

const HomePage = (props) => {
    return (
        <div className="home-page">
            <h1 className="home-title">Quizzical</h1>
            <p className="home-subheading">Prepare Yourself!</p>
            <button onClick={props.handleClick} className="home-button">Start Quiz</button>
        </div>
    )
}

export default HomePage