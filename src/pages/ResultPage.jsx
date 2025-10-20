import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, total, questions, answers } = state || { score: 0, total: 0, questions: [], answers: {} };

  return (
    <div>
      <h1>Quiz Completed!</h1>
      <p>Your Score: {score} / {total}</p>

      <h2>Review Answers</h2>
      {questions.map((q, index) => (
        <div key={index}>
          <p dangerouslySetInnerHTML={{ __html: `${index + 1}. ${q.question}` }} />
          <p>Your Answer: {answers[index]}</p>
          <p>Correct Answer: {q.correct_answer}</p>
        </div>
      ))}

      <button onClick={() => navigate("/quiz")}>Retake Quiz</button>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default ResultPage;
