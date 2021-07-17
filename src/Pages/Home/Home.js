import "./Home.css";
import { Button, MenuItem, TextField } from "@material-ui/core";
import Categories from "../../Data/Categories";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Home = ({ name, setName, fetchQuestions }) => {

    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();

    const handleSubmit = () => {
        if (!name || !category || !difficulty) {
            setError(true);
            return;
        }
        else {
            setError(false);
            fetchQuestions(category, difficulty);
            history.push('/quiz');
        }
    };

    return (
        <div className="content">
            <div className="settings">
                <span style={{ fontSize: 30 }}>Quiz Setting</span>

                <div className="settings_select">
                    {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}
                    <TextField
                        style={{ marginBottom: 25 }}
                        label="Enter Your Name"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                    <TextField
                        select
                        style={{ marginBottom: 30 }}
                        label="Select Your Category"
                        variant="outlined"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    >
                        {Categories.map((cat) => (
                            <MenuItem key={cat.category} value={cat.value}>
                                {cat.category}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Select your Difficulty"
                        variant="outlined"
                        onChange={(e) => setDifficulty(e.target.value)}
                        value={difficulty}
                        style={{ marginBottom: 30 }}
                    >
                        <MenuItem key="Easy" value="Easy">Easy</MenuItem>
                        <MenuItem key="Hard" value="Hard">Hard</MenuItem>
                        <MenuItem key="Difficult" value="Difficult">Difficult</MenuItem>
                    </TextField>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSubmit}
                    >
                        Start your Quiz
                    </Button>
                </div>
            </div>

            <img src="/quiz.svg" className="banner" alt="quiz img" />
        </div>
    );
};

export default Home;