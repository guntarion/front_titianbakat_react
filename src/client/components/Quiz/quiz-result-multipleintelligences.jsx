// src/client/components/Quiz/quiz-result-multipleintelligences.jsx
import React from "react";
import PropTypes from "prop-types";
import Chart_MultipleIntelligences from "./Chart_MultipleIntelligences";

import {
  img_mi_spasial,
  img_mi_interpersonal,
  img_mi_intrapersonal,
  img_mi_kinestetik,
  img_mi_linguistik,
  img_mi_logika,
  img_mi_musikal,
  img_mi_naturalis,
} from "../imagepath";

const karakteristik = {
type_logika: {
  img: img_mi_logika,
  text: "Kecerdasan logis-matematis adalah kemampuan untuk berpikir logis, analitis, dan sistematis. Ini melibatkan kemampuan dalam matematika, logika, dan pemecahan masalah. Contoh: Ilmuwan, matematikawan, insinyur, programmer.",
},
type_linguistik: {
  img: img_mi_linguistik,
  text: "Kecerdasan linguistik adalah kemampuan untuk menggunakan bahasa secara efektif, baik secara lisan maupun tulisan. Ini melibatkan kemampuan membaca, menulis, berbicara, dan memahami bahasa. Contoh: Penulis, penyair, jurnalis, pembicara publik.",
},
type_spasial: {
  img: img_mi_spasial,
  text: "Kecerdasan visual-spasial adalah kemampuan untuk memahami dan memanipulasi ruang dan bentuk. Ini melibatkan kemampuan dalam visualisasi, seni, dan desain. Contoh: Arsitek, desainer grafis, pelukis, pilot.",
},
type_musikal: {
  img: img_mi_musikal,
  text: "Kecerdasan musikal adalah kemampuan untuk memahami, menciptakan, dan menikmati musik dan ritme. Ini melibatkan kemampuan mendengarkan, bermain alat musik, dan menulis lagu. Contoh: Musisi, penyanyi, komposer, dirigen.",
},
type_kinestetik: {
  img: img_mi_kinestetik,
  text: "Kecerdasan kinestetik adalah kemampuan untuk menggunakan tubuh secara terampil dan efektif. Ini melibatkan koordinasi motorik, keterampilan fisik, dan kontrol tubuh. Contoh: Atlet, penari, aktor, ahli bedah.",
},
type_interpersonal: {
  img: img_mi_interpersonal,
  text: "Kecerdasan interpersonal adalah kemampuan untuk memahami dan berinteraksi secara efektif dengan orang lain. Ini melibatkan empati, komunikasi, dan keterampilan sosial. Contoh: Guru, konselor, pemimpin, pekerja sosial.",
},
type_intrapersonal: {
  img: img_mi_intrapersonal,
  text: "Kecerdasan intrapersonal adalah kemampuan untuk memahami diri sendiri, termasuk perasaan, motivasi, dan tujuan pribadi. Ini melibatkan refleksi diri dan kesadaran akan emosi pribadi. Contoh: Psikolog, filsuf, penulis, konselor.",
},
type_naturalis: {
  img: img_mi_naturalis,
  text: "Kecerdasan naturalis adalah kemampuan untuk mengenali, mengklasifikasikan, dan memahami flora, fauna, dan lingkungan alam. Ini melibatkan apresiasi terhadap alam dan keterampilan dalam konservasi. Contoh: Ahli biologi, botanis, konservasionis, petani.",
},
};

const interpolateScore = (score) => ((score + 30) / 60) * 100;

const QuizResult_MultipleIntelligences = ({ totalscores }) => {
  const sortedScores = Object.entries(totalscores)
    .sort(([, a], [, b]) => interpolateScore(b) - interpolateScore(a))
    .slice(0, 3);

  const [highestScoreType] = sortedScores[0];

  return (
    <div className="quiz-result-container">
      <h2>Quiz Results</h2>
      
      <div className="row">
        <div className="col-md-6">
          <img src={karakteristik[highestScoreType].img} className="img-fluid" alt="#" />
        </div>
        <div className="col-md-6">
          <Chart_MultipleIntelligences totalscores={totalscores} />
        </div>
      </div>
      
      {sortedScores.map(([type, score], index) => (
        <div key={type} className="result-item mt-4">
          <h3>{index + 1}. {type.replace('type_', '').replace('_', ' ')}</h3>
          <p><strong>Score:</strong> {interpolateScore(score).toFixed(2)}</p>
          <p>{karakteristik[type].text}</p>
        </div>
      ))}
    </div>
  );
};

QuizResult_MultipleIntelligences.propTypes = {
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

export default QuizResult_MultipleIntelligences;