// src/client/components/quiz-type-one/quiz-type-one.jsx

import React, { useState } from "react";
import "./quiz-type-one.css"; // Import the CSS file

const questions = [
  "I can tell when music is off-key.",
  "I enjoy teaching others.",
  "I enjoy camping, hiking, walking and climbing.",
  "I love to meet new people and make friends.",
  "I feel alive when I come in contact with nature.",
];

const QuizTypeOne = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Quiz completed!");
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="progress mb-3">
        <div
          className="progress-bar progress-bar-striped bg-success"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {progress.toFixed(0)}%
        </div>
      </div>
      <div className="question-container">
        <h3>{questions[currentQuestionIndex]}</h3>
        <div className="options">
          {["Nggak Banget", "Nggak", "Netral", "Iya", "Iya Banget"].map((option) => (
            <button key={option} onClick={handleAnswerClick}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <p>{currentQuestionIndex + 1} of {questions.length} questions completed.</p>
    </div>
  );
};

export default QuizTypeOne;
