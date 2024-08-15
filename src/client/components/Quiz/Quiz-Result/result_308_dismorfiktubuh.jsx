// src/client/components/Quiz/result_101_learningstyle.jsx
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ChartLearningStyles from "../Quiz-Chart/chart_308_dismorfiktubuh";

import {
  img_ls_result,
  img_ls_visual,
  img_ls_auditory,
  img_ls_kinesthetic,
} from "../../imagepath";

const karakteristik = {
  visual: {
    img: img_ls_visual,
    text: "Anda memiliki gaya belajar visual yang kuat. Ini berarti Anda belajar paling efektif melalui pengamatan dan informasi visual. Anda cenderung memahami dan mengingat informasi dengan lebih baik ketika disajikan dalam bentuk gambar, diagram, grafik, atau video. Kemampuan ini memungkinkan Anda untuk dengan cepat memahami konsep kompleks ketika disajikan secara visual, dan Anda sering kali dapat 'melihat' solusi dalam pikiran Anda sebelum mengartikulasikannya.",
  },
  auditory: {
    img: img_ls_auditory,
    text: "Anda memiliki gaya belajar auditori yang dominan. Ini berarti Anda belajar paling baik melalui mendengarkan dan diskusi verbal. Anda cenderung mengingat informasi dengan lebih baik ketika disampaikan melalui ceramah, diskusi kelompok, atau bahkan ketika Anda menjelaskannya kepada orang lain. Kemampuan ini membuat Anda menjadi pendengar yang baik dan sering kali mampu memahami nuansa dalam komunikasi verbal yang mungkin terlewatkan oleh orang lain.",
  },
  kinesthetic: {
    img: img_ls_kinesthetic,
    text: "Anda memiliki gaya belajar kinestetik yang kuat. Ini berarti Anda belajar paling efektif melalui pengalaman langsung dan aktivitas fisik. Anda cenderung memahami dan mengingat informasi dengan lebih baik ketika Anda dapat melakukan, menyentuh, atau memanipulasi objek secara fisik. Gaya belajar ini memberi Anda keunggulan dalam situasi yang memerlukan koordinasi fisik dan keterampilan praktis, dan Anda sering kali dapat 'merasakan' solusi secara intuitif.",
  },
};

const interpolateScore = (score) => ((score / 60) * 100).toFixed(2);

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const QuizResult308DismorfikTubuh = ({ totalScores, onBackToIntro   }) => {
  console.log("Result totalScores = ", totalScores);
  
  // Ensure totalScores is an object and has entries
  if (!totalScores || typeof totalScores !== 'object' || Object.keys(totalScores).length === 0) {
    return <div>No scores available</div>;
  }

  const sortedScores = Object.entries(totalScores)
    .sort(([, a], [, b]) => interpolateScore(b) - interpolateScore(a))
    .slice(0, 3);

  return (
    <div className="quiz-result-container">
      <h2>Hasil Identifikasi Nurtured Talents - Learning Styles</h2>
      
      <div className="row">
        <div className="col-md-6">
          <img src={img_ls_result} className="img-fluid" alt="Learning Styles Result" />
        </div>
        <div className="col-md-6">
          <ChartLearningStyles totalScores={totalScores} />
        </div>
      </div>
      
      {sortedScores.map(([type, score], index) => {
        const cleanType = type.replace('type_', '');
        if (!karakteristik[cleanType]) {
          console.error(`No karakteristik found for type: ${cleanType}`);
          return null; // Skip this iteration if no matching karakteristik is found
        }
        return (
          <div key={type} className="result-item mt-4">
            <div className="row">
              <div className="col-md-3">
                <img src={karakteristik[cleanType].img} className="img-fluid" alt={cleanType} />
              </div>
              <div className="col-md-9">
                <h3>{index + 1}. {capitalizeFirstLetter(cleanType)}</h3>
                <p><strong>Skor:</strong> {interpolateScore(score)}</p>
                <p>{karakteristik[cleanType].text}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="mt-4">
        <button onClick={onBackToIntro} className="btn btn-primary">
          Back to Quiz Intro
        </button>
      </div>

    </div>
  );
};

QuizResult308DismorfikTubuh.propTypes = {
  onBackToIntro: PropTypes.func.isRequired,
  totalScores: PropTypes.shape({
    visual: PropTypes.number,
    auditory: PropTypes.number,
    kinesthetic: PropTypes.number,
  })
};

export default QuizResult308DismorfikTubuh;