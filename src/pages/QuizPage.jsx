import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, difficulty } = location.state || { category: "9", difficulty: "easy" };
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getQuiz = async (retries = 3) => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        if (!data.results || data.results.length === 0) {
          if (retries > 0) {
            setTimeout(() => getQuiz(retries - 1), 1000);
            return;
          }
          throw new Error("No questions found after several attempts.");
        }
        const formatted = data.results.map((q) => ({
          ...q,
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        }));
        setQuestions(formatted);
      } catch (err) {
        if (!navigator.onLine) {
          setError(" You appear to be offline. Please check your internet connection.");
        } else if (err.name === "TypeError" && err.message.includes("Failed to fetch")) {
          setError(" Network error. Unable to reach the quiz server. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    getQuiz();
  }, [category, difficulty]);

  const handleAnswer = (index, answer) => {
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion((p) => p + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion((p) => p - 1);
  };

  const handleSubmit = () => {
    const score = questions.reduce((total, q, i) => total + (q.correct_answer === answers[i] ? 1 : 0), 0);
    navigate("/result", { state: { score, total: questions.length, questions, answers } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-lg w-full max-w-2xl p-8">
        {loading && <p className="text-center text-blue-600 font-medium">Loading questions...</p>}
        {error && (
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && questions.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Question {currentQuestion + 1} / {questions.length}
            </h2>
            <p
              className="text-lg font-medium mb-6 text-center"
              dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }}
            />
            <div className="space-y-3 mb-6">
              {questions[currentQuestion].options.map((option, i) => (
                <label
                  key={i}
                  className={`block p-3 rounded-lg border cursor-pointer transition ${
                    answers[currentQuestion] === option
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={answers[currentQuestion] === option}
                    onChange={() => handleAnswer(currentQuestion, option)}
                    className="hidden"
                  />
                  <span dangerouslySetInnerHTML={{ __html: option }} />
                </label>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  currentQuestion === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Previous
              </button>
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                >
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
