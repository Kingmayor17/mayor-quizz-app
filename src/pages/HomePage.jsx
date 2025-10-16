import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Mayor’s Quiz App 🧠</h1>
      <p>Welcome! Test your knowledge and have fun!</p>
      <Link to="/quiz">
        <button>Start Quiz</button>
      </Link>
    </div>
  );
}

export default HomePage;
