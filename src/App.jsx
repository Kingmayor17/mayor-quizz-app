import React from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-center drop-shadow-md">
        Welcome to the Mayor Quiz App 🎯
      </h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Test your knowledge across different categories and difficulty levels.
      </p>
      <button
        onClick={() => navigate("/home")}
        className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
      >
        Start Quiz
      </button>
    </div>
  );
};


export default App;
