// src/client/components/Quiz/Quiz-Result/result_101_learningstyle.jsx
import React from 'react';
import PropTypes from 'prop-types';
import ChartLearningStyles from '../Quiz-Chart/chart_101_learningstyle';

import {
  img_ls_result,
  img_ls_visual,
  img_ls_auditory,
  img_ls_kinesthetic,
} from '../../imagepath';

const karakteristik = {
  Visual: {
    img: img_ls_visual,
    text: 'Orang dengan preferensi modalitas visual cenderung memahami dan mengingat informasi lebih baik ketika disajikan dalam bentuk gambar, diagram, grafik, atau bentuk visual lainnya. Mereka mungkin merasa lebih mudah untuk belajar dari materi yang mencakup ilustrasi, peta konsep, atau presentasi yang kaya akan elemen visual. Mengingat dan memahami informasi melalui penglihatan membantu mereka mengasosiasikan ide-ide dan konsep dengan representasi visual yang kuat.',
  },
  Auditory: {
    img: img_ls_auditory,
    text: 'Orang dengan preferensi modalitas auditory lebih efektif dalam memahami dan mengingat informasi ketika mendengarkannya. Mereka cenderung belajar lebih baik melalui diskusi, ceramah, atau mendengarkan rekaman audio. Mendengarkan penjelasan dan instruksi secara verbal membantu mereka menangkap dan menyimpan informasi dengan lebih baik. Mereka mungkin lebih mudah mengingat detail dari percakapan atau penjelasan yang mereka dengar daripada dari bacaan atau gambar.',
  },
  Kinesthetic: {
    img: img_ls_kinesthetic,
    text: 'Orang dengan preferensi modalitas kinestetik belajar dengan baik melalui pengalaman langsung dan aktivitas fisik. Mereka lebih memahami dan mengingat informasi ketika mereka dapat menyentuh, merasakan, atau berpartisipasi secara fisik dalam proses belajar. Belajar melalui percobaan, praktek, dan gerakan membantu mereka menghubungkan konsep-konsep dengan pengalaman nyata. Mereka sering merasa lebih mudah memahami materi melalui kegiatan yang melibatkan gerakan atau manipulasi objek.',
  },
};

const interpolateScore = (score) => ((score / 60) * 100).toFixed(2);

const QuizResult101LearningStyles = ({ totalScores, onBackToIntro }) => {
  console.log('Result totalScores = ', totalScores);

  if (
    !totalScores ||
    typeof totalScores !== 'object' ||
    Object.keys(totalScores).length === 0
  ) {
    return <div>No scores available</div>;
  }

  const handleBackToIntro = () => {
    onBackToIntro(true);
  };

  const sortedScores = Object.entries(totalScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className='quiz-result-container'>
      <h2>Hasil Identifikasi Gaya Belajar (Learning Style)</h2>

      <div className='row'>
        <div className='col-md-6'>
          <img
            src={img_ls_result}
            className='img-fluid'
            alt='Learning Styles Result'
          />
        </div>
        <div className='col-md-6'>
          <ChartLearningStyles totalscores={totalScores} />
        </div>
      </div>

      {sortedScores.map(([type, score], index) => (
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
                {index + 1}. {type}
              </h3>
              <p>
                <strong>Skor:</strong> {interpolateScore(score)}
              </p>
              <p>{karakteristik[type].text}</p>
            </div>
          </div>
        </div>
      ))}

      <div className='mt-4'>
        <button onClick={() => onBackToIntro(true)} className='btn btn-primary'>
          Back to Quiz Intro
        </button>
      </div>
    </div>
  );
};

QuizResult101LearningStyles.propTypes = {
  onBackToIntro: PropTypes.func.isRequired,
  totalScores: PropTypes.shape({
    Visual: PropTypes.number,
    Auditory: PropTypes.number,
    Kinesthetic: PropTypes.number,
  }),
};

export default QuizResult101LearningStyles;
