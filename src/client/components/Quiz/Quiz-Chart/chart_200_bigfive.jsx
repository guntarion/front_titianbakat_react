// src/client/components/Quiz-Chart/chart_200_bigfive.jsx
import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import PropTypes from 'prop-types';
import './chart_result.css';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const ChartBigFivePersonality = ({ totalScores }) => {
  console.log('Chart totalScores:', totalScores);

  const labels = [
    'Extroversion',
    'Agreeableness',
    'OpennessToExperience',
    'Conscientiousness',
    'EmotionalStability',
  ];

  if (!totalScores || typeof totalScores !== 'object') {
    console.error('Invalid totalScores prop:', totalScores);
    return <div>No data available for chart</div>;
  }

  // Function to scale the score
  const scaleScore = (score) => {
    // Assuming max possible score is 60, scale it to 100
    return ((score / 60) * 100).toFixed(2);
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Big Five Personality',
        data: labels.map((label) => scaleScore(totalScores[label] || 0)),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Big Five Personality berbasis Kuesioner',
      },
    },
  };

  return (
    <div className='chart-container'>
      <Radar data={data} options={options} />
    </div>
  );
};

ChartBigFivePersonality.propTypes = {
  totalScores: PropTypes.shape({
    Extroversion: PropTypes.number,
    Agreeableness: PropTypes.number,
    OpennessToExperience: PropTypes.number,
    Conscientiousness: PropTypes.number,
    EmotionalStability: PropTypes.number,
  }),
};

export default ChartBigFivePersonality;
