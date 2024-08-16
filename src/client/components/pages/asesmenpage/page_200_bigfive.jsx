// src/client/components/pages/asesmenpage/page_200_bigfive.jsx
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../../header';
import QuizTypeA from '../../Quiz/quiz-type-a';
import QuizResult from '../../Quiz/Quiz-Result/result_200_bigfive';
import axios from 'axios';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../../../AuthContext';
import FooterHome6 from '../../home/EyeCareHome/FooterHome6';
import config from '../../../../config';

import { img_bigfive_opening } from '../../imagepath';

const Asesment103MultipleIntelligence = (props) => {
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
    'Extroversion',
    'Agreeableness',
    'OpennessToExperience',
    'Conscientiousness',
    'EmotionalStability',
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
              `${config.API_URL}/quizzes/quiz_200_bigfive`
            );
            setQuizInfo(quizInfoResponse.data);

            // Fetch latest in-progress quiz response
            try {
              const latestInProgressResponse = await axios.get(
                `${config.API_URL}/quiz-responses/${data.mongoUserId}/quiz_200_bigfive/latest-in-progress`
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
                `${config.API_URL}/quiz-responses/${data.mongoUserId}/quiz_200_bigfive/latest-finished`
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
      const url = `${config.API_URL}/quiz-responses/${mongoUserId}/quiz_200_bigfive/latest`;
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
    history.push('/asesmen/bigfive', { fromResult });
  };

  return (
    <div>
      <Header {...props} />
      <div className='breadcrumb-bar-two'>
        <div className='container'>
          <div className='row align-items-center inner-banner'>
            <div className='col-md-12 col-12 text-center'>
              <h2 className='breadcrumb-title'>Big Five Personality</h2>
              <nav aria-label='breadcrumb' className='page-breadcrumb'>
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link to='/index-6'>Home</Link>
                  </li>
                  <li className='breadcrumb-item' aria-current='page'>
                    Big Five Personality
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
                        src={img_bigfive_opening}
                        alt=''
                        className='img-fluidme'
                      />
                      <h3 id='pengenalan-big-five-personality-test-'>
                        Big Five Personality Test
                      </h3>
                      <p>
                        Selamat datang di halaman &quot;Big Five Personality
                        Test&quot;! Sebelum Anda memulai perjalanan penemuan
                        diri melalui tes ini, kami ingin memberi Anda wawasan
                        tentang apa itu Big Five, mengapa tes ini sangat diakui
                        secara ilmiah, dan bagaimana tes ini dapat memberikan
                        manfaat yang berarti dalam hidup Anda.
                      </p>
                      <h4 id='-apa-itu-big-five-personality-test-'>
                        <strong>Apa itu Big Five Personality Test?</strong>
                      </h4>
                      <p>
                        Big Five Personality Test, juga dikenal sebagai OCEAN
                        atau CANOE, adalah salah satu model kepribadian yang
                        paling diterima dan digunakan secara luas di dunia
                        psikologi. Model ini mengukur kepribadian berdasarkan
                        lima dimensi utama yang dikenal sebagai{' '}
                        <strong>
                          Extroversion (Ekstraversi), Agreeableness (Keterbukaan
                          Sosial), Stability (Stabilitas Emosional),
                          Conscientiousness (Ketelitian), dan Openness to
                          Experience (Keterbukaan terhadap Pengalaman)
                        </strong>
                        .
                      </p>
                      <p>
                        Dikembangkan melalui dekade penelitian yang ketat, Big
                        Five memberikan pandangan yang komprehensif dan terukur
                        tentang kepribadian seseorang, membantu kita memahami
                        bagaimana kita cenderung berperilaku di berbagai situasi
                        dan bagaimana kita berinteraksi dengan dunia di sekitar
                        kita.
                      </p>
                      <h4 id='-mengapa-big-five-berbeda-'>
                        <strong>Mengapa Big Five Berbeda?</strong>
                      </h4>
                      <p>
                        Ada beberapa alasan mengapa Big Five dianggap sebagai
                        salah satu alat kepribadian terbaik dan paling
                        terpercaya:
                      </p>
                      <ul>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>Berbasis Penelitian yang Solid:</strong> Big
                            Five didukung oleh penelitian ilmiah yang ekstensif
                            dan telah divalidasi melalui berbagai studi di
                            seluruh dunia. Ini memberikan keandalan yang tinggi
                            dalam mengukur kepribadian manusia.
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>Komprehensif dan Mudah Dipahami:</strong>{' '}
                            Kelima dimensi ini mencakup aspek-aspek utama dari
                            kepribadian kita, namun tetap mudah dipahami dan
                            diterapkan dalam kehidupan sehari-hari. Anda akan
                            mendapatkan wawasan yang jelas tentang bagaimana
                            setiap dimensi mempengaruhi kehidupan Anda.
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>Fleksibilitas dan Aplikasi Luas:</strong>{' '}
                            Model Big Five dapat diterapkan dalam berbagai
                            konteks, mulai dari pengembangan diri dan hubungan
                            interpersonal hingga seleksi pekerjaan dan
                            pengembangan karir. Ini adalah alat yang serbaguna
                            yang dapat membantu Anda dalam berbagai aspek
                            kehidupan Anda.
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>
                              Pendekatan Netral dan Non-Judgmental:
                            </strong>{' '}
                            Tidak ada dimensi yang dianggap lebih baik atau
                            lebih buruk; masing-masing hanya menunjukkan
                            kecenderungan alami Anda. Ini memungkinkan Anda
                            untuk memahami diri sendiri tanpa merasa dihakimi.
                          </p>
                        </li>
                      </ul>
                      <h4 id='-manfaat-mengikuti-big-five-personality-test-'>
                        <strong>
                          Manfaat Mengikuti Big Five Personality Test
                        </strong>
                      </h4>
                      <p>
                        Mengapa Anda perlu mengikuti Big Five Personality Test?
                        Berikut beberapa alasan kuat yang mungkin menarik bagi
                        Anda:
                      </p>
                      <ul>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>Pemahaman Diri yang Lebih Baik:</strong>{' '}
                            Dengan Big Five, Anda akan mendapatkan wawasan
                            mendalam tentang berbagai aspek kepribadian Anda,
                            seperti seberapa ekstrovert atau introvert Anda,
                            bagaimana Anda cenderung bereaksi dalam situasi
                            sosial, dan bagaimana Anda mengelola emosi dan
                            stres.
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>Peningkatan Hubungan:</strong> Memahami
                            kecenderungan kepribadian Anda dan orang lain dapat
                            membantu Anda berkomunikasi lebih efektif, membangun
                            hubungan yang lebih kuat, dan mengurangi konflik
                            dalam kehidupan pribadi dan profesional Anda.
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>Pengembangan Karir:</strong> Big Five sering
                            digunakan dalam dunia kerja untuk membantu individu
                            menemukan peran yang paling sesuai dengan
                            kepribadian mereka. Dengan memahami dimensi seperti
                            ketelitian dan keterbukaan terhadap pengalaman, Anda
                            dapat membuat keputusan karir yang lebih baik dan
                            lebih memuaskan.
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>Alat untuk Pertumbuhan Pribadi:</strong>{' '}
                            Hasil dari Big Five dapat menjadi dasar bagi
                            perencanaan pengembangan diri Anda, membantu Anda
                            mengenali area yang mungkin perlu ditingkatkan atau
                            dimanfaatkan lebih baik.
                          </p>
                        </li>
                      </ul>
                      <h4 id='-siap-untuk-memulai-'>
                        <strong>Siap untuk Memulai?</strong>
                      </h4>
                      <p>
                        Kami mengundang Anda untuk meluangkan waktu beberapa
                        menit untuk mengikuti &quot;Big Five Personality
                        Test&quot;. Tes ini akan memberi Anda gambaran yang
                        jelas dan objektif tentang kepribadian Anda, yang dapat
                        Anda gunakan untuk meningkatkan berbagai aspek kehidupan
                        Anda, mulai dari hubungan pribadi hingga pilihan karir.{' '}
                      </p>
                      <p>
                        Dengan hasil dari Big Five, Anda tidak hanya akan lebih
                        memahami siapa diri Anda, tetapi juga bagaimana Anda
                        dapat berkembang lebih lanjut dan mencapai potensi penuh
                        Anda.
                      </p>
                      <p>
                        Mulailah perjalanan Anda menuju pemahaman diri yang
                        lebih baik dengan Big Five—alat yang telah terbukti
                        efektif dalam membantu jutaan orang di seluruh dunia
                        mengenali dan mengembangkan kepribadian mereka.
                      </p>
                      <p>
                        Selamat mengisi, dan semoga Anda menemukan wawasan yang
                        berarti!
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
                  quizId='quiz_200_bigfive'
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

export default Asesment103MultipleIntelligence;
