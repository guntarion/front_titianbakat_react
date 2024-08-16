// src/client/components/Quiz/Quiz-Chart/chart_101_learningstyle.jsx
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

const ChartLearningStyles = ({ totalscores }) => {
  const labels = Object.keys(totalscores);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Learning Styles',
        data: labels.map((label) =>
          ((totalscores[label] / (5 * 12)) * 100).toFixed(2)
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
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
        text: 'Learning Styles Assessment Results',
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
  totalscores: PropTypes.shape({
    Visual: PropTypes.number,
    Auditory: PropTypes.number,
    Kinesthetic: PropTypes.number,
  }).isRequired,
};

export default ChartLearningStyles;
