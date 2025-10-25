import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, total, questions, answers } = state || { score: 0, total: 0, questions: [], answers: {} };

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center p-6 text-white">
      <div className="bg-white text-gray-800 rounded-2xl shadow-xl w-full max-w-3xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Quiz Completed!</h1>
        <p className="text-lg font-semibold mb-6">
          Your Score: <span className="text-blue-700">{score}</span> / {total}
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Review Answers</h2>
        <div className="space-y-4 max-h-80 overflow-y-auto text-left">
          {questions.map((q, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <p
                className="font-medium mb-1"
                dangerouslySetInnerHTML={{ __html: `${index + 1}. ${q.question}` }}
              />
              <p className="text-sm">
                <span className="font-semibold">Your Answer:</span>{" "}
                <span
                  className={
                    answers[index] === q.correct_answer
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {answers[index]}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Correct Answer:</span>{" "}
                <span className="text-blue-700">{q.correct_answer}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => navigate("/quiz")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Retake Quiz
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
