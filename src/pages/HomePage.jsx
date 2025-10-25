import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleStartQuiz = () => {
    if (!category || !difficulty) {
      alert("Please select both category and difficulty before starting the quiz.");
      return;
    }
    navigate("/quiz", { state: { category, difficulty } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white px-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
          Choose Your Quiz Settings
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Select Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              <option value="9">General Knowledge</option>
              <option value="21">Sports</option>
              <option value="23">History</option>
              <option value="17">Science & Nature</option>
              <option value="18">Computers</option>
              <option value="22">Geography</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Music</option>
              <option value="15">Video Games</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Select Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
