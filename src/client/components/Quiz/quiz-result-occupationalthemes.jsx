import React from "react";
import PropTypes from "prop-types";

const QuizResult = ({ totalscores }) => {
  return (
    <div className="quiz-result-container">
      <h2>Quiz Results</h2>
      <div className="result-item">
        <h3>Realistic</h3>
        <p>{totalscores.type_realistic}</p>
      </div>
      <div className="result-item">
        <h3>Investigative</h3>
        <p>{totalscores.type_investigative}</p>
      </div>
      <div className="result-item">
        <h3>Artistic</h3>
        <p>{totalscores.type_artistic}</p>
      </div>
      <div className="result-item">
        <h3>Social</h3>
        <p>{totalscores.type_social}</p>
      </div>
      <div className="result-item">
        <h3>Enterprising</h3>
        <p>{totalscores.type_enterprising}</p>
      </div>
      <div className="result-item">
        <h3>Conventional</h3>
        <p>{totalscores.type_conventional}</p>
      </div>
    </div>
  );
};

QuizResult.propTypes = {
  totalscores: PropTypes.shape({
    type_realistic: PropTypes.number,
    type_investigative: PropTypes.number,
    type_artistic: PropTypes.number,
    type_social: PropTypes.number,
    type_enterprising: PropTypes.number,
    type_conventional: PropTypes.number
  })
};

export default QuizResult;