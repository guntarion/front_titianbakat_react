// src/client/components/Quiz-Chart/chart_learningStyles.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import PropTypes from 'prop-types';
import './chart_result.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartLearningStyles = ({ totalScores }) => {
  console.log('Chart totalScores:', totalScores);

  const labels = ['Visual', 'Auditory', 'Kinesthetic'];

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
        label: 'Learning Styles',
        data: [
          scaleScore(totalScores.Visual || 0),
          scaleScore(totalScores.Auditory || 0),
          scaleScore(totalScores.Kinesthetic || 0),
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Learning Styles berbasis Kuesioner',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className='chart-container'>
      <Bar data={data} options={options} />
    </div>
  );
};

ChartLearningStyles.propTypes = {
  totalScores: PropTypes.shape({
    Visual: PropTypes.number,
    Auditory: PropTypes.number,
    Kinesthetic: PropTypes.number,
  }),
};

export default ChartLearningStyles;
