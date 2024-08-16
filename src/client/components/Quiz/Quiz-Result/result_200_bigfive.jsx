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
    text: `<p>Ekstroversi biasanya dicirikan oleh kecenderungan seseorang untuk mencari interaksi sosial dan stimulasi, serta tingkat antusiasme dan keberanian mereka dalam situasi sosial. Individu yang memiliki skor tinggi pada dimensi ini cenderung ramah, suka bergaul, dan mudah berbicara dengan orang lain. Mereka menikmati berada di tengah orang banyak dan mencari situasi sosial. Mereka sering digambarkan sebagai orang yang penuh energi, antusias, dan berani. Selain itu, mereka mungkin lebih cenderung terlibat dalam perilaku yang menantang, seperti berpesta, minum, atau mencari kesenangan lain.</p>
    <p>Sebaliknya, individu yang memiliki skor rendah pada ekstroversi lebih introvert dan pendiam. Mereka mungkin lebih suka menghabiskan waktu sendiri atau bersama kelompok kecil, dan merasa tidak nyaman dalam pertemuan sosial yang besar. Mereka juga cenderung lebih hati-hati dan kurang tegas dalam berinteraksi dengan orang lain.</p>`,
  },
  Agreeableness: {
    img: img_bigfive_agr,

    text: `<p>Orang yang memiliki skor tinggi pada kesesuaian biasanya digambarkan sebagai orang yang hangat, ramah, dan perhatian. Mereka cenderung bekerja sama dengan orang lain dan termotivasi untuk menjaga hubungan sosial yang harmonis. Mereka mungkin juga memiliki rasa empati yang kuat dan kepedulian terhadap kesejahteraan orang lain.</p>
    <p>Sebaliknya, orang yang memiliki skor rendah pada kesesuaian cenderung lebih kompetitif dan skeptis. Mereka mungkin kurang termotivasi untuk menjaga keharmonisan sosial dan lebih cenderung menyatakan pendapat mereka dengan tegas, meskipun mungkin bertentangan dengan orang lain.</p>`,
  },
  EmotionalStability: {
    img: img_bigfive_est,
    text: `<p>Orang yang memiliki skor tinggi pada stabilitas emosional cenderung lebih tangguh secara emosional, tenang, dan tidak mudah terpengaruh oleh situasi. Mereka jarang mengalami emosi negatif dan lebih mampu mengatasi stres serta tantangan hidup. Selain itu, mereka juga lebih mungkin merasakan emosi positif, seperti kebahagiaan, kepuasan, dan antusiasme.</p>
    <p>Sebaliknya, orang yang memiliki skor rendah pada stabilitas emosional lebih rentan terhadap emosi negatif, seperti kecemasan, depresi, dan kemarahan. Mereka mungkin lebih reaktif terhadap stres dan kesulitan dalam menghadapi situasi yang menantang. Mereka juga cenderung menunjukkan perilaku maladaptif, seperti penyalahgunaan zat atau melukai diri sendiri.</p>`,
  },
  Conscientiousness: {
    img: img_bigfive_csn,
    text: `<p>Orang yang memiliki skor tinggi pada ketelitian biasanya digambarkan sebagai individu yang dapat diandalkan, pekerja keras, dan efisien. Mereka cenderung terorganisir dengan baik, bertanggung jawab, dan termotivasi untuk mencapai tujuan mereka. Mereka juga mungkin menunjukkan disiplin diri yang kuat dan ketekunan dalam menghadapi tantangan.</p>
    <p>Sebaliknya, orang yang memiliki skor rendah pada ketelitian cenderung lebih impulsif dan kurang terorganisir. Mereka mungkin kesulitan menetapkan dan mencapai tujuan, serta lebih mungkin terlibat dalam perilaku yang kurang menguntungkan bagi diri mereka.</p>`,
  },
  OpennessToExperience: {
    img: img_bigfive_opn,
    text: `<p>Orang yang memiliki skor tinggi pada keterbukaan terhadap pengalaman biasanya digambarkan sebagai individu yang imajinatif, penuh rasa ingin tahu, dan terbuka terhadap ide-ide serta pengalaman baru. Mereka cenderung tertarik secara intelektual dan menikmati eksplorasi konsep serta gagasan baru. Mereka juga mungkin menunjukkan preferensi terhadap kreativitas dan estetika.</p>
    <p>Sebaliknya, orang yang memiliki skor rendah pada keterbukaan terhadap pengalaman cenderung lebih tradisional dan konservatif. Mereka mungkin lebih menyukai pengalaman yang familiar dan dapat diprediksi, serta kurang tertarik untuk mencari pengalaman baru.</p>`,
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
      <h2>Hasil Identifikasi Nurtured Personality - Big Five Personality</h2>

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
                <div
                  dangerouslySetInnerHTML={{ __html: karakteristik[type].text }}
                />
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
