// src/client/components/Quiz/quiz-result-occupationalthemes.jsx
import React from "react";
import PropTypes from "prop-types";
import OccupationalThemesChart from './OccupationalThemesChart'; // Import the chart component

import {
  img_riasec_realistic,
  img_riasec_artistic,
  img_riasec_conventional,
  img_riasec_enterprising,
  img_riasec_investigative,
  img_riasec_social,
} from "../imagepath";

const karakteristik = {
  type_realistic: {
    img: img_riasec_realistic,
    text: "Pekerjaan-pekerjaan yang banyak melibatkan aktivitas kerja yang bersifat praktis, yang membutuhkan partisipasi aktif secara langsung dalam mensolusikan sesuatu. Orang Realistic cocok dalam berurusan dengan tanaman, hewan, dan obyek dunia nyata seperti kayu, peralatan, dan permesinan. Pekerjaan yang sesuai biasanya terkait dengan pekerjaan di luar ruang, yang tidak melibatkan banyak kerja dokumen atau yang yang membutuhkan interaksi kerja erat dengan orang lain.",
  },
  type_investigative: {
    img: img_riasec_investigative,
    text: "Pekerjaan-pekerjaan yang di sana melibatkan kerja dengan ide-ide dan yang memerlukan aktivitas berpikir yang sangat banyak. Perihal yang terkait dengan bidang pekerjaan ini semisal pencarian fakta dan penyelidikan masalah.",
  },
  type_artistic: {
    img: img_riasec_artistic,
    text: "Pekerjaan-pekerjaan yang sering melibatkan kerja dengan bentuk-bentuk, desain, dan pola. Orang Artistic sering membutuhkan pengekspresian diri, dan kerja mereka dapat terselesaikan tanpa mengikuti seperangkat aturan yang jelas.",
  },
  type_social: {
    img: img_riasec_social,
    text: "Pekerjaan-pekerjaan yang banyak terkait dengan kerja bersama, berkomunikasi satu sama lain, dan mengajar orang lain. Pekerjaan ini banyak terkait dengan aktivitas membantu orang lain atau memberikan pelayanan kepada orang lain.",
  },
  type_enterprising: {
    img: img_riasec_enterprising,
    text: "Pekerjaan-pekerjaan yang terkait dengan mengawali sesuatu dan menjalankan suatu proyek. Terkait juga adalah perihal memimpin orang lain dan membuat banyak keputusan. Pekejaan ini terkadang memerlukan pengambilan risiko dan seringkali terkait dengan urusan bisnis.",
  },
  type_conventional: {
    img: img_riasec_conventional,
    text: "Pekerjaan-pekerjaan yang mengandung rutinitas dan terkait dengan mengikuti prosedur yang telah ditetapkan. Pekerjaan ini bisa mencakup kerja dengan data dan rincian. Biasanya dalam kerja ini ada garis otoritas yang jelas untuk mengikuti.",
  },
};

const QuizResult_OccupationalThemes = ({ totalscores }) => {
  const highestScoreType = Object.keys(totalscores).reduce((a, b) => (totalscores[a] > totalscores[b] ? a : b));

  return (
    <div className="quiz-result-container">
      <h2>Quiz Results</h2>

      <div className="quiz-result-container">
        <p>Realistic: {totalscores.type_realistic}</p>
        <p>Investigative: {totalscores.type_investigative}</p>
        <p>Artistic: {totalscores.type_artistic}</p>
        <p>Social: {totalscores.type_social}</p>
        <p>Enterprising: {totalscores.type_enterprising}</p>
        <p>Conventional: {totalscores.type_conventional}</p>
      </div>

      <div className="result-item">
        <img src={karakteristik[highestScoreType].img} className="img-fluid" alt="#" />
        <OccupationalThemesChart totalscores={totalscores} />
        <h3>{highestScoreType.replace('type_', '').replace('_', ' ')}</h3>
        <p>{karakteristik[highestScoreType].text}</p>
      </div>
    </div>
  );
};

QuizResult_OccupationalThemes.propTypes = {
  totalscores: PropTypes.shape({
    type_realistic: PropTypes.number,
    type_investigative: PropTypes.number,
    type_artistic: PropTypes.number,
    type_social: PropTypes.number,
    type_enterprising: PropTypes.number,
    type_conventional: PropTypes.number,
  }),
};

export default QuizResult_OccupationalThemes;
