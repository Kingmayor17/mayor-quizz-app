import React from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Welcome to Mayor Quiz App 🎯</h1>
      <p>Here we test your knowledge across multiple topics!</p>
      <p>Are you ready to test your knowledge and challenge your mind?</p>
      <button onClick={() => navigate("/home")}>Click me to start your quiz</button>
    </div>
  );
};

export default App;
