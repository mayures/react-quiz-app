import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import './Question.css'
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Question = ({
    currQues,
    setCurrQues,
    questions,
    setQuestions,
    options,
    score,
    setScore,
    correct,
}) => {

    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);

    const history = useHistory();

    const handleSelect = (i) => {
        if (selected === i) {
            return "select";
        }
    };

    const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) setScore(score+1);
        setError(false);
    };

    const handleNext = () => {
        if (currQues > 8) {
            history.push("/result")
        } else if (selected) {
            setCurrQues(currQues + 1);
            setSelected();
        }
    };

    const handlePrevious = () => {
        if (currQues > 8) {
            history.push("/result")
        } else if (selected) {
            setCurrQues(currQues - 1);
            setSelected();
        }
    };

    const handleQuit = () => {
        setCurrQues(0);
        setQuestions();
    }

    return (
        <div className="question">
            <h1>Question {currQues + 1}</h1>
            <div className="singleQuestion">
                <h2>{questions[currQues].question}</h2>
                <div className="options">
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {options &&
                        options.map((i) => (
                            <button
                                onClick={() => { handleCheck(i) }}
                                className={`singleOption ${selected && handleSelect(i)}`}
                                key={i}
                            >
                                {i}
                            </button>
                        ))}
                </div>
                <div className="controls">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ width: 185 }}
                        onClick={handlePrevious}
                    >
                        Previous Question
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        style={{ width: 185 }}
                        href="/"
                        onClick={handleQuit}
                    >
                        Quit
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ width: 185 }}
                        onClick={handleNext}
                    >
                        Next Question
                    </Button>
                </div>
            </div>
        </div>);
}

export default Question;