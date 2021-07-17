import axios from 'axios';
import "./App.css";
import Header from "./components/Header/Header";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/quiz";
import Result from "./Pages/Result/Result";
import { useState } from "react";

function App() {

    const [name, setName] = useState("");
    const [questions, setQuestions] = useState("");
    const [score, setScore] = useState(0);

    const fetchQuestions = async (category = "", difficulty = "") => {
        const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&type=multiple`);

        setQuestions(data.results);
    };

    return (
        <BrowserRouter>
            <div className="app" style={{ backgroundImage: 'url(./ques1.png)' }}>
                <Header />

                <Switch>
                    <Route exact path="/">
                        <Home
                            name={name}
                            setName={setName}
                            fetchQuestions={fetchQuestions}
                        />
                    </Route>
                    <Route exact path="/quiz">
                        <Quiz
                            name={name}
                            questions={questions}
                            score={score}
                            setScore={setScore}
                            setQuestions={setQuestions}
                        />
                    </Route>
                    <Route exact path="/result">
                        <Result name={name} score={score} />
                    </Route>
                </Switch>
            </div>
            <Footer />
        </BrowserRouter>);

}

export default App;