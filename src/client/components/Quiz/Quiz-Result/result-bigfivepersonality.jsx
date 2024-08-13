import React from "react";
import PropTypes from "prop-types";
import ChartBigFivePersonality from '../Quiz-Chart/chart_bigfivepersonality';

import {
  img_bigfive_ext,
  img_bigfive_agr,
  img_bigfive_est,
  img_bigfive_csn,
  img_bigfive_opn,
} from "../../imagepath";

const karakteristik = {
  Extroversion_EXT: {
    img: img_bigfive_ext,
    text: "Extraversion reflects a person's tendency to be outgoing, energetic, and sociable. High scorers tend to be talkative and enjoy social interactions, while low scorers are more reserved and prefer solitude.",
  },
  Agreeableness_AGR: {
    img: img_bigfive_agr,
    text: "Agreeableness represents a person's tendency to be cooperative, compassionate, and trusting. High scorers are often empathetic and kind, while low scorers may be more competitive or skeptical.",
  },
  Stability_EST: {
    img: img_bigfive_est,
    text: "Emotional Stability (or its inverse, Neuroticism) reflects a person's tendency to experience negative emotions. High scorers tend to be calm and resilient, while low scorers may be more prone to anxiety and mood swings.",
  },
  Conscientiousness_CSN: {
    img: img_bigfive_csn,
    text: "Conscientiousness represents a person's tendency to be organized, responsible, and goal-oriented. High scorers are often disciplined and detail-oriented, while low scorers may be more spontaneous and flexible.",
  },
  Experience_OPN: {
    img: img_bigfive_opn,
    text: "Openness to Experience reflects a person's tendency to be curious, imaginative, and open to new ideas. High scorers are often creative and enjoy intellectual pursuits, while low scorers may prefer familiar routines and concrete thinking.",
  },
};

const interpolateScore = (score) => ((score + 30) / 60) * 100;

const QuizResult_BigFivePersonality = ({ totalscores }) => {
  const sortedScores = Object.entries(totalscores)
    .sort(([, a], [, b]) => interpolateScore(b) - interpolateScore(a));

  return (
    <div className="quiz-result-container">
      <h2>Big Five Personality Test Results</h2>
      
      <div className="row">
        <div className="col-md-12">
          <ChartBigFivePersonality totalscores={totalscores} />
        </div>
      </div>
      
      {sortedScores.map(([type, score], index) => (
        <div key={type} className="result-item mt-4">
          <div className="row">
            <div className="col-md-3">
              <img src={karakteristik[type].img} className="img-fluid" alt={type} />
            </div>
            <div className="col-md-9">
              <h3>{index + 1}. {type.split('_')[0]}</h3>
              <p><strong>Score:</strong> {interpolateScore(score).toFixed(2)}</p>
              <p>{karakteristik[type].text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

QuizResult_BigFivePersonality.propTypes = {
  totalscores: PropTypes.shape({
    Extroversion_EXT: PropTypes.number,
    Agreeableness_AGR: PropTypes.number,
    Stability_EST: PropTypes.number,
    Conscientiousness_CSN: PropTypes.number,
    Experience_OPN: PropTypes.number,
  })
};

export default QuizResult_BigFivePersonality;