// src/client/components/pages/asesmenpage/occupational-themes.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../header";
import FooterHome6 from "../../home/EyeCareHome/FooterHome6";
import QuizTypeOne from "../../Quiz/quiz-type-one";
import QuizResultOccupationalThemes from "../../Quiz/Quiz-Result/result-occupationalthemes";
import axios from "axios";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../../../AuthContext"; 
import config from '../../../../config'; 

import {
  img_riasec_opening,
} from "../../imagepath";


const OccupationalThemeAssessment = (props) => {
  const { user } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const [totalscores, setTotalscores] = useState({});
  const [hasQuizResult, setHasQuizResult] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [mongoUserId, setMongoUserId] = useState("");

  const scoreTypes = [
    "type_realistic",
    "type_investigative",
    "type_artistic",
    "type_social",
    "type_enterprising",
    "type_conventional",
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const db = getFirestore();
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setMongoUserId(data.mongoUserId || "");

        if (data.mongoUserId) {
          try {
            const response = await axios.get(`${config.API_URL}/quizresponse/${data.mongoUserId}/quiz_01_riasec`);
            if (response.data && response.data.status === "finished") {
              setTotalscores(response.data.total_scores);
              setHasQuizResult(true);
            } else {
              setHasQuizResult(false);
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.log("Quiz response not found.");
              setHasQuizResult(false);
            } else {
              console.error("Error fetching quiz response:", error);
            }
          }
        }
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleQuizComplete = (scores) => {
    setTotalscores(scores);
    setShowQuiz(false);
    setHasQuizResult(true);
  };

  const startQuiz = () => {
    setShowQuiz(true);
  };

  return (
    <div>
      <Header {...props} />
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Occupational Themes</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/index-6">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Occupational Themes
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
      </>

      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {hasQuizResult && !showQuiz ? (
                <QuizResultOccupationalThemes totalscores={totalscores} />
              ) : (
                <div>
                  {!showQuiz && (
                    <>
                      <img src={img_riasec_opening} alt="" className="img-fluidme" />
                      <h3>Assessment OCCUPATIONAL THEMES</h3>
                      
                      <br></br>
                      
                      <p><strong>RIASEC</strong> adalah model yang dikembangkan oleh psikolog John Holland untuk membantu individu memahami kepribadian dan minat karier mereka. Model ini mengelompokkan orang ke dalam enam tipe kepribadian utama: Realistic, Investigative, Artistic, Social, Enterprising, dan Conventional. Setiap tipe mencerminkan kecenderungan seseorang terhadap jenis pekerjaan dan lingkungan kerja tertentu.</p>
                      <p><strong>Manfaat Mengetahui Hasil RIASEC</strong></p>
                      <ol>
                        <li>
                          <p><strong>Bagi Pelajar:</strong></p>
                          <ul>
                            <li><strong>Pemilihan Jurusan dan Karier</strong>: Mengetahui tipe RIASEC dapat membantu pelajar memilih jurusan yang sesuai dengan minat dan bakat mereka, serta merencanakan karier yang mereka nikmati dan cocok.</li>
                            <li><strong>Pengembangan Diri</strong>: Pelajar dapat memahami kekuatan dan kelemahan mereka, serta fokus pada pengembangan keterampilan yang relevan dengan tipe kepribadian mereka.</li>
                          </ul>
                        </li>
                        <br></br>
                        <li>
                          <p><strong>Bagi Pekerja:</strong></p>
                          <ul>
                            <li><strong>Kepuasan Kerja</strong>: Memilih pekerjaan yang sesuai dengan tipe RIASEC dapat meningkatkan kepuasan dan motivasi kerja, karena pekerjaan tersebut sesuai dengan minat dan kepribadian.</li>
                            <li><strong>Pengembangan Karier</strong>: Pekerja dapat merencanakan langkah-langkah pengembangan karier yang lebih strategis dengan memahami tipe RIASEC mereka.</li>
                          </ul>
                        </li>
                      </ol>
                      <p><strong>Proses Pengisian Asesmen RIASEC</strong></p>
                      <p>Asesmen RIASEC terdiri dari sejumlah pertanyaan yang dirancang untuk memberikan hasil yang akurat dan optimal. Kami memahami bahwa jumlah pertanyaan ini cukup banyak, namun setiap pertanyaan sangat penting untuk memastikan bahwa hasil yang Anda terima benar-benar mencerminkan kepribadian dan minat Anda.</p>
                      <p>Anda tidak perlu menyelesaikan seluruh asesmen dalam satu sesi. Aplikasi kami memungkinkan Anda untuk menyimpan progres dan melanjutkan pengisian di lain waktu. Anda dapat membagi pengisian asesmen menjadi beberapa sesi yang lebih pendek sesuai dengan kenyamanan Anda. Hal ini memastikan bahwa Anda dapat mengisi pertanyaan dengan penuh perhatian tanpa merasa terburu-buru.</p>
                      <hr />
                      <p><strong>Mulai Asesmen Anda</strong></p>
                      <p>Siap untuk mengetahui tipe RIASEC Anda? Mulailah asesmen sekarang dan temukan jalur pendidikan dan karier yang paling sesuai dengan diri Anda. Anda dapat melanjutkan di lain waktu jika perlu. Selamat mengeksplorasi potensi Anda!</p>
                      <button onClick={startQuiz} className="btn btn-primary">
                        Start Quiz
                      </button>
                    </>
                  )}
                </div>
              )}
              {showQuiz && (
                <QuizTypeOne
                  quizId="quiz_01_riasec"
                  onQuizComplete={handleQuizComplete}
                  scoreTypes={scoreTypes}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterHome6 {...props} />
    </div>
  );
};

export default OccupationalThemeAssessment;
