// src/client/components/Quiz/quiz-result-multipleintelligences.jsx
import React from "react";
import PropTypes from "prop-types";
import ChartMultipleIntelligences from "../Quiz-Chart/chart_multipieIntelligences";

import {
  img_mi_result,
  img_mi_spasial,
  img_mi_interpersonal,
  img_mi_intrapersonal,
  img_mi_kinestetik,
  img_mi_linguistik,
  img_mi_logika,
  img_mi_musikal,
  img_mi_naturalis,
} from "../../imagepath";

const karakteristik = {
type_logika: {
  img: img_mi_logika,
  text: "Anda memiliki kemampuan luar biasa untuk berpikir secara logis dan menganalisis masalah dengan cermat. Kecerdasan logis-matematis Anda memungkinkan Anda untuk memahami konsep yang kompleks, melihat pola-pola tersembunyi, dan menemukan solusi yang efisien. Dengan keterampilan ini, Anda dapat mengeksplorasi dunia melalui angka, rumus, dan logika, yang memungkinkan Anda memecahkan masalah dengan cara yang sistematis dan tepat. Ini adalah anugerah yang memungkinkan Anda untuk menjadi seorang pemikir kritis dan inovatif.",
},
type_linguistik: {
  img: img_mi_linguistik,
  text: "Anda memiliki bakat luar biasa dalam berbahasa, baik secara lisan maupun tulisan. Kecerdasan linguistik Anda memungkinkan Anda untuk menyampaikan ide dengan jelas, menginspirasi orang lain, dan mempengaruhi pandangan mereka melalui kata-kata. Dengan kemampuan ini, Anda dapat mengartikulasikan pikiran yang kompleks menjadi kata-kata yang sederhana dan mudah dipahami, serta mengekspresikan emosi dan konsep dengan cara yang memikat. Ini adalah anugerah yang memungkinkan Anda menjembatani gagasan dan menciptakan hubungan yang mendalam melalui bahasa.",
},
type_spasial: {
  img: img_mi_spasial,
  text: "Memiliki kecerdasan spasial berarti Anda dianugerahi kemampuan luar biasa untuk melihat dunia melalui perspektif visual yang kaya. Anda mampu mengamati detail dengan cermat, mengenali pola, dan memahami ruang serta bentuk dengan cara yang tidak semua orang bisa lakukan. Kecerdasan ini memungkinkan Anda memvisualisasikan konsep-konsep yang rumit dan menerjemahkannya ke dalam bentuk visual yang jelas dan dapat dimengerti. Baik dalam desain, seni, arsitektur, atau sekadar menyusun ruang di sekitar Anda, kemampuan ini memberi Anda keunggulan dalam menciptakan sesuatu yang indah dan fungsional.",
},
type_musikal: {
  img: img_mi_musikal,
  text: "Anda memiliki hubungan yang mendalam dengan musik dan mampu merasakan ritme serta melodi dengan tajam. Kecerdasan musikal Anda adalah kemampuan unik yang memungkinkan Anda untuk mendengar dan memahami musik dengan cara yang sangat mendalam. Anda dapat menangkap nuansa nada, melodi, dan harmoni, serta mampu mengekspresikan perasaan dan ide melalui bahasa musik yang kaya. Musik bukan hanya sebuah suara bagi Anda; itu adalah medium yang kuat untuk mengomunikasikan emosi dan menciptakan ikatan.",
},
type_kinestetik: {
  img: img_mi_kinestetik,
  text: "Anda memiliki kemampuan luar biasa dalam mengendalikan tubuh Anda dan menggunakan gerakan untuk mengekspresikan diri. Kecerdasan kinestetik ini memungkinkan Anda merasakan dunia melalui tindakan fisik, baik itu melalui olahraga, tari, atau aktivitas sehari-hari. Anda memiliki kepekaan tinggi terhadap gerakan, koordinasi, dan keseimbangan, serta kemampuan untuk memahami dan merespons dengan cepat terhadap rangsangan fisik. Ini memberi Anda cara yang unik untuk berinteraksi dengan dunia, di mana Anda tidak hanya berpikir atau merasakan tetapi juga bertindak dan bergerak.",
},
type_interpersonal: {
  img: img_mi_interpersonal,
  text: "Anda memiliki bakat alami yang luar biasa dalam memahami dan terhubung dengan orang lain. Kecerdasan interpersonal Anda memberi Anda kemampuan untuk merasakan emosi, kebutuhan, dan motivasi orang-orang di sekitar Anda, sering kali sebelum mereka mengungkapkannya. Kemampuan ini memungkinkan Anda untuk membangun hubungan yang mendalam dan bermakna dengan orang lain, baik dalam konteks pribadi maupun profesional. Anda bukan hanya seorang komunikator yang efektif, tetapi juga seorang yang mampu menciptakan ikatan emosional yang kuat, yang menjadi fondasi bagi hubungan yang sehat dan saling mendukung.",
},
type_intrapersonal: {
  img: img_mi_intrapersonal,
  text: "Anda memiliki kesadaran diri yang tinggi dan kemampuan unik untuk memahami perasaan serta motivasi Anda sendiri. Ini adalah kekuatan besar yang memungkinkan Anda untuk mengenali tujuan hidup dan nilai-nilai pribadi dengan jelas. Dengan kecerdasan intrapersonal ini, Anda mampu mengenali emosi yang muncul dalam diri Anda, memahami penyebabnya, dan menentukan bagaimana perasaan tersebut memengaruhi tindakan Anda. Kemampuan ini membantu Anda menjalani hidup dengan lebih sadar, membuat keputusan yang sesuai dengan prinsip dan nilai-nilai Anda.",
},
type_naturalis: {
  img: img_mi_naturalis,
  text: "Anda memiliki kepekaan yang luar biasa terhadap alam dan kemampuan untuk mengenali serta memahami dunia alami di sekitar Anda. Kecerdasan naturalis Anda memberi Anda kekuatan untuk merasakan, memahami, dan merawat lingkungan alam dengan cara yang mendalam. Anda mampu melihat keindahan dan keragaman kehidupan di bumi, dari flora dan fauna hingga ekosistem yang kompleks. Kemampuan ini memungkinkan Anda untuk hidup selaras dengan alam, menjaga keseimbangan ekosistem, dan berkontribusi pada kelestarian lingkungan.",
},
};

const interpolateScore = (score) => ((score + 30) / 60) * 100;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const QuizResult_MultipleIntelligences = ({ totalscores }) => {
  const sortedScores = Object.entries(totalscores)
    .sort(([, a], [, b]) => interpolateScore(b) - interpolateScore(a))
    .slice(0, 3);

  return (
    <div className="quiz-result-container">
      <h2>Hasil Identifikasi Nurtured Talents - Multiple Intelligence</h2>
      
      <div className="row">
        <div className="col-md-6">
          <img src={img_mi_result} className="img-fluid" alt="Multiple Intelligences Result" />
        </div>
        <div className="col-md-6">
          <ChartMultipleIntelligences totalscores={totalscores} />
        </div>
      </div>
      
      {sortedScores.map(([type, score], index) => (
        <div key={type} className="result-item mt-4">
          <div className="row">
            <div className="col-md-3">
              <img src={karakteristik[type].img} className="img-fluid" alt={type} />
            </div>
            <div className="col-md-9">
              <h3>{index + 1}. {capitalizeFirstLetter(type.replace('type_', '').replace('_', ' '))}</h3>
              <p><strong>Skor:</strong> {interpolateScore(score).toFixed(2)}</p>
              <p>{karakteristik[type].text}</p>
            </div>
          </div>
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