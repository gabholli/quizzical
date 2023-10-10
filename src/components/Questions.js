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

    const shuffledOneAnswers = shuffleArray(props.answerOneIncorrect.concat(props.answerOneCorrect))
    const shuffledTwoAnswers = shuffleArray(props.answerTwoIncorrect.concat(props.answerTwoCorrect))
    const shuffledThreeAnswers = shuffleArray(props.answerThreeIncorrect.concat(props.answerThreeCorrect))
    const shuffledFourAnswers = shuffleArray(props.answerFourIncorrect.concat(props.answerFourCorrect))
    const shuffledFiveAnswers = shuffleArray(props.answerFiveIncorrect.concat(props.answerFiveCorrect))

    console.log(shuffledOneAnswers)

    return (
        <div className="questions">

            <div className="question">
                <h1 className="prompt">
                    {decode(props.questionOne)}
                </h1>
                <input type="radio"
                    name="questionOne"
                    id="question-one-one"
                    value="question-one-one"
                    onChange={props.handleChange} />
                <label htmlFor="question-one-one">{shuffledOneAnswers[0]}</label>
                <input type="radio"
                    name="questionOne"
                    id="question-one-two"
                    value="question-one-two"
                    onChange={props.handleChange} />
                <label htmlFor="question-one-two">{shuffledOneAnswers[1]}</label>
                <input type="radio"
                    name="questionOne"
                    id="question-one-three"
                    value="question-one-three"
                    onChange={props.handleChange} />
                <label htmlFor="question-one-three">{shuffledOneAnswers[2]}</label>
                <input type="radio"
                    name="questionOne"
                    id="question-one-four"
                    value="question-one-four"
                    onChange={props.handleChange} />
                <label htmlFor="question-one-four">{shuffledOneAnswers[3]}</label>
            </div>

            <div className="question">
                <h1 className="prompt">{decode(props.questionTwo)}</h1>
                <input type="radio"
                    name="questionTwo"
                    id="question-two-one"
                    value="question-two-one"
                    onChange={props.handleChange} />
                <label htmlFor="question-two-one">{shuffledTwoAnswers[0]}</label>
                <input type="radio"
                    name="questionTwo"
                    id="question-two-two"
                    value="question-two-two"
                    onChange={props.handleChange} />
                <label htmlFor="question-two-two">{shuffledTwoAnswers[1]}</label>
                <input type="radio"
                    name="questionTwo"
                    id="question-two-three"
                    value="question-two-three"
                    onChange={props.handleChange} />
                <label htmlFor="question-two-three">{shuffledTwoAnswers[2]}</label>
                <input type="radio"
                    name="questionTwo"
                    id="question-two-four"
                    value="question-two-four"
                    onChange={props.handleChange} />
                <label htmlFor="question-two-four">{shuffledTwoAnswers[3]}</label>
            </div>

            <div className="question">
                <h1 className="prompt">{decode(props.questionThree)}</h1>
                <input type="radio"
                    name="questionThree"
                    id="question-three-one"
                    value="question-three-one"
                    onChange={props.handleChange} />
                <label htmlFor="question-three-one">{shuffledThreeAnswers[0]}</label>
                <input type="radio"
                    name="questionThree"
                    id="question-three-two"
                    value="question-three-two"
                    onChange={props.handleChange} />
                <label htmlFor="question-three-two">{shuffledThreeAnswers[1]}</label>
                <input type="radio"
                    name="questionThree"
                    id="question-three-three"
                    value="question-three-three"
                    onChange={props.handleChange} />
                <label htmlFor="question-three-three">{shuffledThreeAnswers[2]}</label>
                <input type="radio"
                    name="questionThree"
                    id="question-three-four"
                    value="question-three-four"
                    onChange={props.handleChange} />
                <label htmlFor="question-three-four">{shuffledThreeAnswers[3]}</label>
            </div>

            <div className="question">
                <h1 className="prompt">{decode(props.questionFour)}</h1>
                <input type="radio"
                    name="questionFour"
                    id="question-four-one"
                    value="question-four-one"
                    onChange={props.handleChange} />
                <label htmlFor="question-four-one">{shuffledFourAnswers[0]}</label>
                <input type="radio"
                    name="questionFour"
                    id="question-four-two"
                    value="question-four-two"
                    onChange={props.handleChange} />
                <label htmlFor="question-four-two">{shuffledFourAnswers[1]}</label>
                <input type="radio"
                    name="questionFour"
                    id="question-four-three"
                    value="question-four-three"
                    onChange={props.handleChange} />
                <label htmlFor="question-four-three">{shuffledFourAnswers[2]}</label>
                <input type="radio"
                    name="questionFour"
                    id="question-four-four"
                    value="question-four-four"
                    onChange={props.handleChange} />
                <label htmlFor="question-four-four">{shuffledFourAnswers[3]}</label>
            </div>

            <div className="question">
                <h1 className="prompt">{decode(props.questionFive)}</h1>
                <input type="radio"
                    name="questionFive"
                    id="question-five-one"
                    value="question-five-one"
                    onChange={props.handleChange} />
                <label htmlFor="question-five-one">{shuffledFiveAnswers[0]}</label>
                <input type="radio"
                    name="questionFive"
                    id="question-five-two"
                    value="question-five-two"
                    onChange={props.handleChange} />
                <label htmlFor="question-five-two">{shuffledFiveAnswers[1]}</label>
                <input type="radio"
                    name="questionFive"
                    id="question-five-three"
                    value="question-five-three"
                    onChange={props.handleChange} />
                <label htmlFor="question-five-three">{shuffledFiveAnswers[2]}</label>
                <input type="radio"
                    name="questionFive"
                    id="question-five-four"
                    value="question-five-four"
                    onChange={props.handleChange} />
                <label htmlFor="question-five-four">{shuffledFiveAnswers[3]}</label>
            </div>
            {/* <button onClick={props.getId}
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
                    {decode(props.answers[3])}</button> */}


        </div >
    )

}

export default Questions