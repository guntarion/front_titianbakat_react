import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../../header';
import QuizTypeA from '../../Quiz/quiz-type-a';
import QuizResult from '../../Quiz/Quiz-Result/result_102_riasec';
import axios from 'axios';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../../../AuthContext';
import FooterHome6 from '../../home/EyeCareHome/FooterHome6';
import config from '../../../../config';

import { img_riasec_opening } from '../../imagepath';

const Asesment102Riasec = (props) => {
  const { user } = useAuth();
  const history = useHistory();
  const [showQuiz, setShowQuiz] = useState(false);
  const [totalScores, setTotalScores] = useState({});
  const [hasQuizResult, setHasQuizResult] = useState(false);
  const [mongoUserId, setMongoUserId] = useState('');
  const [showLatestResult, setShowLatestResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizInfo, setQuizInfo] = useState(null);
  const [latestQuizResponse, setLatestQuizResponse] = useState(null);
  const [isFromResult, setIsFromResult] = useState(false);
  const location = useLocation();

  const scoreTypes = [
    'Realistic',
    'Investigative',
    'Artistic',
    'Social',
    'Enterprising',
    'Conventional',
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const db = getFirestore();
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // Reset state if coming from result page
      if (location.state && location.state.fromResult) {
        setIsFromResult(true);
        setLatestQuizResponse(null);
        setHasQuizResult(false);
        setCurrentQuestionIndex(0);
        setTotalScores({});
      }

      if (docSnap.exists()) {
        const data = docSnap.data();
        setMongoUserId(data.mongoUserId || '');

        if (data.mongoUserId) {
          try {
            // Fetch quiz info
            const quizInfoResponse = await axios.get(
              `${config.API_URL}/quizzes/quiz_102_riasec`
            );
            setQuizInfo(quizInfoResponse.data);

            // Fetch latest in-progress quiz response
            try {
              const latestInProgressResponse = await axios.get(
                `${config.API_URL}/quiz-responses/${data.mongoUserId}/quiz_102_riasec/latest-in-progress`
              );
              setLatestQuizResponse(latestInProgressResponse.data);
            } catch (error) {
              if (error.response && error.response.status !== 404) {
                console.error(
                  'Error fetching in-progress quiz response:',
                  error
                );
              }
            }

            // Fetch latest finished quiz response
            try {
              const latestFinishedResponse = await axios.get(
                `${config.API_URL}/quiz-responses/${data.mongoUserId}/quiz_102_riasec/latest-finished`
              );
              setTotalScores(latestFinishedResponse.data.total_scores);
              setHasQuizResult(true);
            } catch (error) {
              if (error.response && error.response.status !== 404) {
                console.error('Error fetching finished quiz response:', error);
              }
              setHasQuizResult(false);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      }
    };

    fetchData();
  }, [user, location]);

  const renderQuizStatusMessage = () => {
    if (!quizInfo) return null;

    let alertClass = 'alert alert-info';
    let message = '';

    if (isFromResult) {
      alertClass = 'alert alert-info';
      message = 'You can start a new quiz attempt.';
    } else if (
      latestQuizResponse &&
      latestQuizResponse.status === 'in progress'
    ) {
      const progress = Math.round(
        (latestQuizResponse.last_question_index / quizInfo.statement_count) *
          100
      );
      alertClass = 'alert alert-warning';
      message = (
        <>
          You have an unfinished quiz (progress: {progress}%). Click the
          &quot;Continue Quiz&quot; button to resume where you left off.
        </>
      );
    } else if (hasQuizResult) {
      alertClass = 'alert alert-success';
      message =
        'You have completed this quiz. You can start a new attempt or view your latest result.';
    } else {
      message = 'Start a new quiz to assess your multiple intelligence.';
    }

    return (
      <div className={alertClass} role='alert'>
        <i className='fas fa-info-circle me-2'></i>
        {message}
      </div>
    );
  };

  const calculateScores = (responses, statementTypeMap) => {
    const scores = scoreTypes.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {});

    Object.entries(responses).forEach(([statementId, score]) => {
      const statementIdNumber = parseInt(statementId);
      Object.entries(statementTypeMap).forEach(([type, statementIds]) => {
        if (statementIds.includes(statementIdNumber)) {
          scores[type] += score;
        }
      });
    });

    return scores;
  };

  const handleQuizComplete = (scores) => {
    setTotalScores(scores);
    setShowQuiz(false);
    setHasQuizResult(true);
    setShowLatestResult(true);
  };

  const startQuiz = async () => {
    try {
      if (!mongoUserId) {
        console.error('❌ No mongoUserId available');
        return;
      }

      console.log('📞 Attempting to fetch latest quiz response...');
      const url = `${config.API_URL}/quiz-responses/${mongoUserId}/quiz_102_riasec/latest`;
      console.log('🔗 API URL:', url);

      try {
        const response = await axios.get(url);
        console.log('📊 Latest quiz response:', response.data);

        if (latestQuizResponse && latestQuizResponse.status === 'in progress') {
          console.log(
            '🔄 Resuming existing quiz to index =',
            latestQuizResponse.last_question_index
          );
          setCurrentQuestionIndex(latestQuizResponse.last_question_index);
          setTotalScores(latestQuizResponse.total_scores);
        } else {
          console.log('🆕 Starting new quiz');
          setCurrentQuestionIndex(0);
          setTotalScores({});
        }

        setShowQuiz(true);
        setShowLatestResult(false);
      } catch (error) {
        console.error('❌ Error in API call:', error.message);
        if (error.response) {
          console.error('Error response status:', error.response.status);
          console.error('Error response data:', error.response.data);
        }
        if (error.response && error.response.status === 404) {
          console.log('🆕 No existing quiz found, starting new quiz');
          setCurrentQuestionIndex(0);
          setTotalScores({});
          setShowQuiz(true);
          setShowLatestResult(false);
        } else {
          console.error('❌ Unexpected error fetching quiz response');
        }
      }
    } catch (error) {
      console.error('❌ Unexpected error in startQuiz:', error);
    }
  };

  const showResult = () => {
    setShowLatestResult(true);
  };

  const handleBackToIntro = (fromResult = false) => {
    setShowLatestResult(false);
    setShowQuiz(false);
    if (fromResult) {
      setIsFromResult(true);
      setLatestQuizResponse(null);
      setHasQuizResult(false);
      setCurrentQuestionIndex(0);
      setTotalScores({});
    }
    history.push('/asesmen/multipleintelligence', { fromResult });
  };

  return (
    <div>
      <Header {...props} />
      <div className='breadcrumb-bar-two'>
        <div className='container'>
          <div className='row align-items-center inner-banner'>
            <div className='col-md-12 col-12 text-center'>
              <h2 className='breadcrumb-title'>Holland Codes RIASEC</h2>
              <nav aria-label='breadcrumb' className='page-breadcrumb'>
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link to='/index-6'>Home</Link>
                  </li>
                  <li className='breadcrumb-item' aria-current='page'>
                    Holland Codes RIASEC
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              {showLatestResult ? (
                <QuizResult
                  totalScores={totalScores}
                  onBackToIntro={handleBackToIntro}
                />
              ) : (
                <div>
                  {!showQuiz && (
                    <>
                      <img
                        src={img_riasec_opening}
                        alt=''
                        className='img-fluidme'
                      />
                      <h3>Assessment OCCUPATIONAL THEMES</h3>

                      <br></br>

                      <p>
                        <strong>RIASEC</strong> adalah model yang dikembangkan
                        oleh psikolog John Holland untuk membantu individu
                        memahami kepribadian dan minat karier mereka. Model ini
                        mengelompokkan orang ke dalam enam tipe kepribadian
                        utama: Realistic, Investigative, Artistic, Social,
                        Enterprising, dan Conventional. Setiap tipe mencerminkan
                        kecenderungan seseorang terhadap jenis pekerjaan dan
                        lingkungan kerja tertentu.
                      </p>
                      <p>
                        <strong>Manfaat Mengetahui Hasil RIASEC</strong>
                      </p>
                      <ol>
                        <li>
                          <p>
                            <strong>Bagi Pelajar:</strong>
                          </p>
                          <ul>
                            <li>
                              <strong>Pemilihan Jurusan dan Karier</strong>:
                              Mengetahui tipe RIASEC dapat membantu pelajar
                              memilih jurusan yang sesuai dengan minat dan bakat
                              mereka, serta merencanakan karier yang mereka
                              nikmati dan cocok.
                            </li>
                            <li>
                              <strong>Pengembangan Diri</strong>: Pelajar dapat
                              memahami kekuatan dan kelemahan mereka, serta
                              fokus pada pengembangan keterampilan yang relevan
                              dengan tipe kepribadian mereka.
                            </li>
                          </ul>
                        </li>
                        <br></br>
                        <li>
                          <p>
                            <strong>Bagi Pekerja:</strong>
                          </p>
                          <ul>
                            <li>
                              <strong>Kepuasan Kerja</strong>: Memilih pekerjaan
                              yang sesuai dengan tipe RIASEC dapat meningkatkan
                              kepuasan dan motivasi kerja, karena pekerjaan
                              tersebut sesuai dengan minat dan kepribadian.
                            </li>
                            <li>
                              <strong>Pengembangan Karier</strong>: Pekerja
                              dapat merencanakan langkah-langkah pengembangan
                              karier yang lebih strategis dengan memahami tipe
                              RIASEC mereka.
                            </li>
                          </ul>
                        </li>
                      </ol>
                      <p>
                        <strong>Proses Pengisian Asesmen RIASEC</strong>
                      </p>
                      <p>
                        Asesmen RIASEC terdiri dari sejumlah pertanyaan yang
                        dirancang untuk memberikan hasil yang akurat dan
                        optimal. Kami memahami bahwa jumlah pertanyaan ini cukup
                        banyak, namun setiap pertanyaan sangat penting untuk
                        memastikan bahwa hasil yang Anda terima benar-benar
                        mencerminkan kepribadian dan minat Anda.
                      </p>
                      <p>
                        Anda tidak perlu menyelesaikan seluruh asesmen dalam
                        satu sesi. Aplikasi kami memungkinkan Anda untuk
                        menyimpan progres dan melanjutkan pengisian di lain
                        waktu. Anda dapat membagi pengisian asesmen menjadi
                        beberapa sesi yang lebih pendek sesuai dengan kenyamanan
                        Anda. Hal ini memastikan bahwa Anda dapat mengisi
                        pertanyaan dengan penuh perhatian tanpa merasa
                        terburu-buru.
                      </p>
                      <hr />
                      <p>
                        <strong>Mulai Asesmen Anda</strong>
                      </p>
                      <p>
                        Siap untuk mengetahui tipe RIASEC Anda? Mulailah asesmen
                        sekarang dan temukan jalur pendidikan dan karier yang
                        paling sesuai dengan diri Anda. Anda dapat melanjutkan
                        di lain waktu jika perlu. Selamat mengeksplorasi potensi
                        Anda!
                      </p>
                      {renderQuizStatusMessage()}
                      <button
                        onClick={startQuiz}
                        className='btn btn-primary'
                        style={{ marginRight: '20px' }}
                      >
                        {isFromResult ||
                        !latestQuizResponse ||
                        latestQuizResponse.status !== 'in progress'
                          ? 'Start Quiz'
                          : 'Continue Quiz'}
                      </button>
                      {hasQuizResult && (
                        <button
                          onClick={showResult}
                          className='btn btn-secondary'
                        >
                          See Latest Result
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
              {showQuiz && (
                <QuizTypeA
                  quizId='quiz_102_riasec'
                  onQuizComplete={handleQuizComplete}
                  scoreTypes={scoreTypes}
                  initialQuestionIndex={currentQuestionIndex}
                  calculateScores={calculateScores}
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

export default Asesment102Riasec;
