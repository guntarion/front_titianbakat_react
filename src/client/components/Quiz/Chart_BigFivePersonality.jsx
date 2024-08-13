import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Chart_BigFivePersonality = ({ totalscores }) => {
  const labels = ['Extraversion', 'Agreeableness', 'Emotional Stability', 'Conscientiousness', 'Openness'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Big Five Personality',
        data: [
          totalscores.Extroversion_EXT,
          totalscores.Agreeableness_AGR,
          totalscores.Stability_EST,
          totalscores.Conscientiousness_CSN,
          totalscores.Experience_OPN,
        ].map(score => ((score + 30) / 60) * 100), // Interpolating the scores
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Big Five Personality Profile'
      }
    }
  };

  return (
    <div style={{ height: '400px' }}>
      <Radar data={data} options={options} />
    </div>
  );
};

Chart_BigFivePersonality.propTypes = {
  totalscores: PropTypes.shape({
    Extroversion_EXT: PropTypes.number,
    Agreeableness_AGR: PropTypes.number,
    Stability_EST: PropTypes.number,
    Conscientiousness_CSN: PropTypes.number,
    Experience_OPN: PropTypes.number
  })
};

export default Chart_BigFivePersonality;