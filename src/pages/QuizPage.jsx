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
    const fetchQuiz = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
        );

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();

        if (!data.results || data.results.length === 0) throw new Error("No questions found.");

        const formattedQuestions = data.results.map((q) => ({
          ...q,
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        }));

        setQuestions(formattedQuestions);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch quiz. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [category, difficulty]);

  const handleAnswer = (questionIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  const handleSubmit = () => {
    const score = questions.reduce((total, q, index) => {
      return total + (q.correct_answer === answers[index] ? 1 : 0);
    }, 0);

    navigate("/result", { state: { score, total: questions.length, questions, answers } });
  };

  return (
    <div>
      {loading && <p>Loading questions...</p>}
      {error && <p>{error}</p>}

      {questions.length > 0 && !loading && (
        <div>
          <h2>
            Question {currentQuestion + 1}/{questions.length}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} />
          <div>
            {questions[currentQuestion].options.map((option, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleAnswer(currentQuestion, option)}
                />
                <span dangerouslySetInnerHTML={{ __html: option }} />
              </label>
            ))}
          </div>

          <div>
            <button onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</button>
            {currentQuestion < questions.length - 1 ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <button onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
