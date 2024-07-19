// src/client/components/Quiz/OccupationalThemesChart.jsx
import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, ArcElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import './OccupationalThemesChart.css'; // Import the CSS file
import PropTypes from "prop-types";

ChartJS.register(RadialLinearScale, PointElement, ArcElement, LineElement, Filler, Tooltip, Legend);

const OccupationalThemesChart = ({ totalscores }) => {
  const labels = ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Occupational Themes',
        data: [
          totalscores.type_realistic,
          totalscores.type_investigative,
          totalscores.type_artistic,
          totalscores.type_social,
          totalscores.type_enterprising,
          totalscores.type_conventional
        ].map(score => ((score + 30) / 60) * 100), // Interpolating the scores
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom sizing
    scales: {
      r: {
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 18
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Occupational Themes'
      }
    }
  };

  return (
    <div className="chart-container">
      <PolarArea data={data} options={options} />
    </div>
  );
};

OccupationalThemesChart.propTypes = {
  totalscores: PropTypes.shape({
    type_realistic: PropTypes.number,
    type_investigative: PropTypes.number,
    type_artistic: PropTypes.number,
    type_social: PropTypes.number,
    type_enterprising: PropTypes.number,
    type_conventional: PropTypes.number
  })
};

export default OccupationalThemesChart;
