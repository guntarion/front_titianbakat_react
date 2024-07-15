// src/client/components/example/QuizTypeOne.jsx

import React, { useState } from "react";

const questions = [
  "I can tell when music is off-key.",
  "I enjoy teaching others.",
  "I enjoy camping, hiking, walking and climbing.",
  "I love to meet new people and make friends.",
  "I feel alive when I come in contact with nature.",
  "I prefer books with a lot of pictures in them."
];

const QuizTypeOne = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleAnswerClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
    } else {
      alert("Quiz completed!");
    }
  };

  return (
    <div className="quiz-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        {progress.toFixed(0)}%
      </div>
      <div className="question-container">
        <h3>{questions[currentQuestionIndex]}</h3>
        <div className="options">
          {["Never", "Rarely", "Often", "Always"].map((option) => (
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