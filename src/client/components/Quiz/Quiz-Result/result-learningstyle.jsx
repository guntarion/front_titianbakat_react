import React from 'react';
import PropTypes from 'prop-types';

const QuizResult = ({ totalScores }) => {
  const learningStyles = [
    { type: 'visual', description: 'You learn best through visual aids like charts, graphs, and images.' },
    { type: 'auditory', description: 'You learn best through listening and verbal communication.' },
    { type: 'kinesthetic', description: 'You learn best through hands-on experiences and physical activities.' },
  ];

  const sortedScores = Object.entries(totalScores).sort((a, b) => b[1] - a[1]);
  const dominantStyle = sortedScores[0][0];

  return (
    <div className="quiz-result-container">
      <h2>Your Learning Style Results</h2>
      
      {sortedScores.map(([type, score], index) => (
        <div key={type} className="result-item mt-4">
          <h3>{index + 1}. {type.charAt(0).toUpperCase() + type.slice(1)} Learning</h3>
          <p><strong>Score:</strong> {score.toFixed(2)}</p>
          <p>{learningStyles.find(style => style.type === type).description}</p>
        </div>
      ))}

      <div className="mt-5">
        <h3>Your Dominant Learning Style: {dominantStyle.charAt(0).toUpperCase() + dominantStyle.slice(1)}</h3>
        <p>
          Based on your responses, your dominant learning style is {dominantStyle}. 
          This means you tend to learn best through {learningStyles.find(style => style.type === dominantStyle).description.toLowerCase()}
        </p>
        <p>
          Remember, while you may have a dominant learning style, it is beneficial to use a combination of all styles for the most effective learning experience.
        </p>
      </div>
    </div>
  );
};

QuizResult.propTypes = {
  totalScores: PropTypes.shape({
    visual: PropTypes.number,
    auditory: PropTypes.number,
    kinesthetic: PropTypes.number
  }).isRequired
};

export default QuizResult;