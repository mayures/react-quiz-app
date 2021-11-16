import { useEffect, useState } from "react";
import "./quiz.css";
import { CircularProgress } from "@material-ui/core";
import Question from "../../components/Question/Question";

const Quiz = ({ name, score, questions, setQuestions, setScore }) => {
    const [options, setOptions] = useState();
    const [currQues, setCurrQues] = useState(0);

    useEffect(() => {

        setOptions(
            questions &&
            handleShuffle([
                questions[currQues]?.correct_answer,
                ...questions[currQues]?.incorrect_answers,
            ])
        );
    }, [questions, currQues]);

    const handleShuffle = (options) => {
        return options.sort(() => Math.random() - 0.5);
    };

    return (
        <div className="quiz">
            <span class="subtitle">Welcome, {name}</span>
            {
                questions ? (
                    <>
                        <div className="quizInfo">
                            <span>{questions[currQues].category}</span>
                        </div>
                        <Question
                            currQues={currQues}
                            setCurrQues={setCurrQues}
                            questions={questions}
                            setQuestions={setQuestions}
                            options={options}
                            score={score}
                            setScore={setScore}
                            correct={questions[currQues]?.correct_answer}
                        />
                    </>
                ) : (
                    <CircularProgress
                        style={{ margin: 100 }}
                        color='inherit'
                        size={150}
                        thickness={1}
                    />
                )
            }
        </div>
    );
};

export default Quiz;