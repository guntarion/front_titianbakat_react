// src/client/components/Quiz/result_200_bigfive.jsx
import React from 'react';
import PropTypes from 'prop-types';
import ChartBigFivePersonality from '../Quiz-Chart/chart_200_bigfive';

import {
  img_bigfive_result,
  img_bigfive_ext,
  img_bigfive_agr,
  img_bigfive_est,
  img_bigfive_csn,
  img_bigfive_opn,
} from '../../imagepath';

const karakteristik = {
  Extroversion: {
    img: img_bigfive_ext,
    text: 'Extroversion menggambarkan tingkat keterlibatan seseorang dengan dunia luar. Orang yang ekstrovert cenderung energik, antusias, dan berorientasi pada aksi. Mereka menikmati interaksi sosial dan cenderung bersemangat.',
  },
  Agreeableness: {
    img: img_bigfive_agr,
    text: 'Agreeableness mencerminkan cara seseorang berinteraksi dengan orang lain. Orang yang skornya tinggi dalam trait ini cenderung penuh perhatian, ramah, murah hati, suka menolong, dan mau berkompromi dengan orang lain.',
  },
  EmotionalStability: {
    img: img_bigfive_est,
    text: 'Emotional Stability (atau kebalikannya, Neuroticism) mengacu pada kemampuan seseorang mengelola emosi. Orang dengan skor tinggi cenderung tenang, percaya diri, dan aman. Mereka jarang merasa cemas atau tertekan.',
  },
  Conscientiousness: {
    img: img_bigfive_csn,
    text: 'Conscientiousness menggambarkan tingkat organisasi dan ketekunan seseorang. Individu yang conscientious cenderung disiplin, efisien, terorganisir, dan berorientasi pada pencapaian tujuan.',
  },
  OpennessToExperience: {
    img: img_bigfive_opn,
    text: 'Openness to Experience mencerminkan tingkat keingintahuan intelektual, kreativitas, dan preferensi untuk variasi. Orang yang terbuka terhadap pengalaman cenderung imajinatif, berwawasan luas, dan mudah beradaptasi dengan ide-ide baru.',
  },
};

const interpolateScore = (score) => ((score / 60) * 100).toFixed(2);

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const QuizResult200BigFive = ({ totalScores, onBackToIntro }) => {
  console.log('Result totalScores = ', totalScores);

  if (
    !totalScores ||
    typeof totalScores !== 'object' ||
    Object.keys(totalScores).length === 0
  ) {
    return <div>No scores available</div>;
  }

  const sortedScores = Object.entries(totalScores).sort(
    ([, a], [, b]) => interpolateScore(b) - interpolateScore(a)
  );

  return (
    <div className='quiz-result-container'>
      <h2>Hasil Identifikasi Nurtured Talents - Big Five Personality</h2>

      <div className='row'>
        <div className='col-md-6'>
          <img
            src={img_bigfive_result}
            className='img-fluid'
            alt='Big Five Personality Result'
          />
        </div>
        <div className='col-md-6'>
          <ChartBigFivePersonality totalScores={totalScores} />
        </div>
      </div>

      {sortedScores.map(([type, score], index) => {
        if (!karakteristik[type]) {
          console.error(`No karakteristik found for type: ${type}`);
          return null;
        }
        return (
          <div key={type} className='result-item mt-4'>
            <div className='row'>
              <div className='col-md-3'>
                <img
                  src={karakteristik[type].img}
                  className='img-fluid'
                  alt={type}
                />
              </div>
              <div className='col-md-9'>
                <h3>
                  {index + 1}. {capitalizeFirstLetter(type)}
                </h3>
                <p>
                  <strong>Skor:</strong> {interpolateScore(score)}
                </p>
                <p>{karakteristik[type].text}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div className='mt-4'>
        <button onClick={onBackToIntro} className='btn btn-primary'>
          Back to Quiz Intro
        </button>
      </div>
    </div>
  );
};

QuizResult200BigFive.propTypes = {
  onBackToIntro: PropTypes.func.isRequired,
  totalScores: PropTypes.shape({
    Extroversion: PropTypes.number,
    Agreeableness: PropTypes.number,
    OpennessToExperience: PropTypes.number,
    Conscientiousness: PropTypes.number,
    EmotionalStability: PropTypes.number,
  }),
};

export default QuizResult200BigFive;
