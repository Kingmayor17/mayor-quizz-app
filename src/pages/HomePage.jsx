import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const startQuiz = () => {
    if (!category || !difficulty) {
      alert("Please select both category and difficulty.");
      return;
    }
    navigate("/quiz", { state: { category, difficulty } });
  };

  return (
    <div>
      <h1>Welcome to the Quiz App</h1>

      <label>
        Select Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Select Category --</option>
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
          <option value="17">Science & Nature</option>
          <option value="22">Geography</option>
        </select>
      </label>

      <label>
        Select Difficulty:
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">-- Select Difficulty --</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <button onClick={startQuiz} disabled={!category || !difficulty}>
        Start Quiz
      </button>
    </div>
  );
};

export default HomePage;
