// src/client/components/Quiz/Chart_MultipleIntelligences.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';
import './Chart_OccupationalThemes.css'; // Import the CSS file

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart_MultipleIntelligences = ({ totalscores }) => {
  const labels = ['Logical-Mathematical', 'Linguistic', 'Spatial', 'Musical', 'Kinesthetic', 'Interpersonal', 'Intrapersonal', 'Naturalist'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Multiple Intelligences',
        data: [
          totalscores.type_logika,
          totalscores.type_linguistik,
          totalscores.type_spasial,
          totalscores.type_musikal,
          totalscores.type_kinestetik,
          totalscores.type_interpersonal,
          totalscores.type_intrapersonal,
          totalscores.type_naturalis,
        ].map(score => ((score + 30) / 60) * 100), // Interpolating the scores
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(201, 203, 207, 0.5)',
          'rgba(100, 149, 237, 0.5)',
        ]
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false, // Allow custom sizing
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Multiple Intelligences berbasis Kuesioner'
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

Chart_MultipleIntelligences.propTypes = {
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

export default Chart_MultipleIntelligences;
