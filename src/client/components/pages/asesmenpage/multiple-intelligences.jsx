// src/client/components/pages/asesmenpage/multiple-intelligences.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../header";
import QuizTypeOne from "../../Quiz/quiz-type-one";
import QuizResultMultipleIntelligences from "../../Quiz/quiz-result-multipleintelligences";
import FollowupMultipleIntelligences from "../../Quiz/followup_multipleintelligences";
import axios from "axios";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../../../AuthContext"; 
import FooterHome6 from "../../home/EyeCareHome/FooterHome6";
import config from '../../../../config'; 

import {
  img_mi_opening,
} from "../../imagepath";

const MultipleIntelligencesAssessment = (props) => {
  const { user } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const [totalscores, setTotalscores] = useState({});
  const [hasQuizResult, setHasQuizResult] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [mongoUserId, setMongoUserId] = useState("");
  const [highestScoreType, setHighestScoreType] = useState("");

  const scoreTypes = [
    "type_logika",
    "type_linguistik",
    "type_spasial",
    "type_musikal",
    "type_kinestetik",
    "type_interpersonal",
    "type_intrapersonal",
    "type_naturalis",
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
            const response = await axios.get(`${config.API_URL}/quizresponse/${data.mongoUserId}/quiz_02_multipleintelligences`);
            if (response.data && response.data.status === "finished") {
              setTotalscores(response.data.total_scores);
              setHighestScoreType(Object.keys(response.data.total_scores).reduce((a, b) => response.data.total_scores[a] > response.data.total_scores[b] ? a : b));
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
    setHighestScoreType(Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b));
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
                <h2 className="breadcrumb-title">Multiple Intelligences</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/index-6">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Multiple Intelligences
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
                <>
                <QuizResultMultipleIntelligences totalscores={totalscores} />
                {/* <FollowupMultipleIntelligences type={highestScoreType} category="aktivitas" />
                <FollowupMultipleIntelligences type={highestScoreType} category="proyek" />
                <FollowupMultipleIntelligences type={highestScoreType} category="kebiasaan" /> */}
                </>
                
              ) : (
                <div>
                  {!showQuiz && (
                    <>
                      <img src={img_mi_opening} alt="" className="img-fluidme" />
                      <br></br>
                      <h2 id="pengenalan-multiple-intelligences-dan-manfaatnya">Assessment Multiple Intelligences</h2>
                      <br></br>
                      <p><strong>Multiple Intelligences</strong> adalah teori yang dikembangkan oleh psikolog Howard Gardner, yang menyatakan bahwa kecerdasan manusia tidak hanya terbatas pada kemampuan kognitif seperti yang diukur oleh tes IQ tradisional. Gardner mengidentifikasi delapan jenis kecerdasan utama, yaitu: Linguistic, Logical-Mathematical, Spatial, Bodily-Kinesthetic, Musical, Interpersonal, Intrapersonal, dan Naturalist. Setiap individu memiliki kombinasi unik dari berbagai kecerdasan ini.</p>
                      <p><strong>Manfaat Mengetahui Multiple Intelligences</strong></p>
                      <ol>
                        <li>
                          <p><strong>Bagi Pelajar:</strong></p>
                          <ul>
                            <li><i className="fas fa-circle-check" /> <strong>Penyesuaian Metode Belajar</strong>: Mengetahui tipe kecerdasan dapat membantu pelajar memahami cara belajar yang paling efektif bagi mereka, sehingga mereka dapat mencapai potensi penuh mereka dalam studi.</li>
                            <li><i className="fas fa-circle-check" /> <strong>Pemilihan Kegiatan Ekstrakurikuler</strong>: Pelajar dapat memilih kegiatan ekstrakurikuler yang sesuai dengan kecerdasan dominan mereka, seperti bergabung dengan klub musik bagi yang memiliki kecerdasan musikal.</li>
                          </ul>
                        </li>
                        <br></br>
                        <li>
                          <p><strong>Bagi Pekerja:</strong></p>
                          <ul>
                            <li><i className="fas fa-circle-check" /> <strong>Peningkatan Kinerja Kerja</strong>: Mengetahui kecerdasan yang dominan dapat membantu pekerja menemukan cara-cara terbaik untuk mengaplikasikan kemampuan mereka di tempat kerja, meningkatkan produktivitas dan kepuasan kerja.</li>
                            <li><i className="fas fa-circle-check" /> <strong>Pengembangan Karier</strong>: Dengan memahami kecerdasan yang mereka miliki, pekerja dapat merencanakan jalur karier yang sesuai dengan kelebihan mereka dan mengembangkan keterampilan yang relevan.</li>
                          </ul>
                        </li>
                      </ol>
                      <p><strong>Proses Pengisian Asesmen Multiple Intelligences</strong></p>
                      <p>Asesmen Multiple Intelligences terdiri dari sejumlah pertanyaan yang dirancang untuk memberikan hasil yang akurat dan komprehensif. Kami menyadari bahwa jumlah pertanyaan ini cukup banyak, namun hal ini diperlukan untuk memastikan bahwa hasil yang Anda terima benar-benar mencerminkan kecerdasan Anda yang sebenarnya.</p>
                      <p>Anda tidak perlu menyelesaikan seluruh asesmen dalam satu sesi. Aplikasi kami memungkinkan Anda untuk menyimpan progres dan melanjutkan pengisian di lain waktu. Anda dapat membagi pengisian asesmen menjadi beberapa sesi yang lebih pendek sesuai dengan kenyamanan Anda, sehingga Anda dapat menjawab setiap pertanyaan dengan cermat tanpa merasa terburu-buru.</p>
                      <hr />
                      <p><strong>Mulai Asesmen Anda</strong></p>
                      <p>Siap untuk mengetahui kecerdasan majemuk Anda? Mulailah asesmen sekarang dan temukan cara terbaik untuk belajar, bekerja, dan mengembangkan diri Anda berdasarkan kecerdasan yang Anda miliki. Anda dapat melanjutkan di lain waktu jika perlu. Selamat mengeksplorasi potensi Anda!</p>
                      <button onClick={startQuiz} className="btn btn-primary">
                        Start Quiz
                      </button>
                    </>
                  )}
                </div>
              )}
              {showQuiz && (
                <QuizTypeOne
                  quizId="quiz_02_multipleintelligences"
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

export default MultipleIntelligencesAssessment;
