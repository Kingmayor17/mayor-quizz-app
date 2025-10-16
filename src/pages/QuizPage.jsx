import { Link } from "react-router-dom";

function QuizPage() {
  return (
    <div>
      <h1>Quiz Time!</h1>
      <p>Let’s begin your questions 🎉</p>
      <Link to="/">
        <button>Go Back Home</button>
      </Link>
    </div>
  );
}

export default QuizPage;
