import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './quiz-type-two.css';
import config from '../../../config'; 

// eslint-disable-next-line react/prop-types
const QuizTypeTwo = ({ quizId }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const totalQuestions = quiz ? quiz.questions.length : 0;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/quizzes/${quizId}`);
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleOptionClick = (index) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: index
    });
  };

  const handleNextClick = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBackClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Question {currentQuestion + 1} of {totalQuestions}</h2>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}></div>
        </div>
      </div>
      <div className="quiz-body">
        <h3>{quiz.questions[currentQuestion].question_text}</h3>
        <div className="options">
          {Object.entries(quiz.questions[currentQuestion].options).map(([type, option], index) => (
            <div
              key={type}
              className={`option ${selectedOptions[currentQuestion] === index ? 'selected' : ''}`}
              onClick={() => handleOptionClick(index)}
            >
              <span className="icon">{selectedOptions[currentQuestion] === index ? '✔️' : '❌'}</span>
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="quiz-footer">
        {currentQuestion > 0 && <button onClick={handleBackClick}>Back</button>}
        {currentQuestion < totalQuestions - 1 && <button onClick={handleNextClick}>Next</button>}
        {currentQuestion === totalQuestions - 1 && <button onClick={() => alert('Quiz Completed!')}>Finish</button>}
      </div>
    </div>
  );
};

export default QuizTypeTwo;
