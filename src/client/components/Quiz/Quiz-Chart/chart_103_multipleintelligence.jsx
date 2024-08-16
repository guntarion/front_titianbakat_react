// src/client/components/Quiz/Quiz-Chart/chart_103_multipleintelligence.jsx
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

const ChartMultipleIntelligences = ({ totalscores }) => {
  const labels = Object.keys(totalscores);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Multiple Intelligences',
        data: labels.map((label) =>
          ((totalscores[label] / (5 * 9)) * 100).toFixed(2)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
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

ChartMultipleIntelligences.propTypes = {
  totalscores: PropTypes.object.isRequired,
};

export default ChartMultipleIntelligences;
