// src/client/components/Quiz/quiz-result-multipleintelligences.jsx
import React from "react";
import PropTypes from "prop-types";

const QuizResult_MultipleIntelligences = ({ totalscores }) => {
  return (
    <div className="quiz-result-container">
      <h2>Quiz Results</h2>
      <div className="result-item">
      <div className="result-item">
        <h3>Visual-Spatial</h3>
        <p>{totalscores.type_spasial}</p>
      </div>
        <h3>Logical-Mathematical</h3>
        <p>{totalscores.type_logika}</p>
      </div>
      <div className="result-item">
        <h3>Verbal-Linguistic</h3>
        <p>{totalscores.type_linguistik}</p>
      </div>
      <div className="result-item">
        <h3>Musical</h3>
        <p>{totalscores.type_musikal}</p>
      </div>
      <div className="result-item">
        <h3>Bodily-Kinesthetic</h3>
        <p>{totalscores.type_kinestetik}</p>
      </div>
      <div className="result-item">
        <h3>Interpersonal</h3>
        <p>{totalscores.type_interpersonal}</p>
      </div>
      <div className="result-item">
        <h3>Intrapersonal</h3>
        <p>{totalscores.type_intrapersonal}</p>
      </div>
      <div className="result-item">
        <h3>Naturalistic</h3>
        <p>{totalscores.type_naturalis}</p>
      </div>
    </div>
  );
};

QuizResult_MultipleIntelligences.propTypes = {
  totalscores: PropTypes.shape({
    type_logika: PropTypes.number,
    type_linguistik: PropTypes.number,
    type_spasial: PropTypes.number,
    type_musikal: PropTypes.number,
    type_kinestetik: PropTypes.number,
    type_interpersonal: PropTypes.number,
    type_intrapersonal: PropTypes.number,
    type_naturalis: PropTypes.number
  })
};

export default QuizResult_MultipleIntelligences;
