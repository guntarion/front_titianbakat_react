import React from "react";
import PropTypes from "prop-types";

const QuizResult = ({ totalscores }) => {
  return (
    <div className="quiz-result-container">
      <h3>Quiz Results</h3>
      <div>
        <p>Type Realistic: {totalscores.type_realistic}</p>
        <p>Type Investigative: {totalscores.type_investigative}</p>
        <p>Type Artistic: {totalscores.type_artistic}</p>
        <p>Type Social: {totalscores.type_social}</p>
        <p>Type Enterprising: {totalscores.type_enterprising}</p>
        <p>Type Conventional: {totalscores.type_conventional}</p>
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