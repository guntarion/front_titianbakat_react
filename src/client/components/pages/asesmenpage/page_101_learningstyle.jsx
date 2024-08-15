// src/client/components/pages/asesmenpage/page_101_learningstyle.jsx
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../header';
import QuizTypeA from '../../Quiz/quiz-type-a';
import QuizResult from '../../Quiz/Quiz-Result/result_101_learningstyle';
import axios from 'axios';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../../../AuthContext';
import FooterHome6 from '../../home/EyeCareHome/FooterHome6';
import config from '../../../../config';

import { img_ls_opening } from '../../imagepath';

const Asesment101LearningStyle = (props) => {
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

  const scoreTypes = ['Visual', 'Auditory', 'Kinesthetic'];

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const db = getFirestore();
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setMongoUserId(data.mongoUserId || '');

        if (data.mongoUserId) {
          try {
            // Fetch quiz info
            const quizInfoResponse = await axios.get(
              `${config.API_URL}/quizzes/quiz_101_learningstyle`
            );
            setQuizInfo(quizInfoResponse.data);

            // Fetch latest in-progress quiz response
            try {
              const latestInProgressResponse = await axios.get(
                `${config.API_URL}/quiz-responses/${data.mongoUserId}/quiz_101_learningstyle/latest-in-progress`
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
                `${config.API_URL}/quiz-responses/${data.mongoUserId}/quiz_101_learningstyle/latest-finished`
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
  }, [user]);

  const renderQuizStatusMessage = () => {
    if (!quizInfo) return null;

    let alertClass = 'alert alert-info';
    let message = '';

    if (latestQuizResponse && latestQuizResponse.status === 'in progress') {
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
      message = 'Start a new quiz to assess your learning style.';
    }

    return (
      <div className={alertClass} role='alert'>
        <i className='fas fa-info-circle me-2'></i>
        {message}
      </div>
    );
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
      const url = `${config.API_URL}/quiz-responses/${mongoUserId}/quiz_101_learningstyle/latest`;
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

  const handleBackToIntro = () => {
    setShowLatestResult(false);
    setShowQuiz(false);
    history.push('/asesmen/learningstyle');
  };

  return (
    <div>
      <Header {...props} />
      <div className='breadcrumb-bar-two'>
        <div className='container'>
          <div className='row align-items-center inner-banner'>
            <div className='col-md-12 col-12 text-center'>
              <h2 className='breadcrumb-title'>Learning Style Assessment</h2>
              <nav aria-label='breadcrumb' className='page-breadcrumb'>
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link to='/index-6'>Home</Link>
                  </li>
                  <li className='breadcrumb-item' aria-current='page'>
                    Learning Style Assessment
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
                        src={img_ls_opening}
                        alt=''
                        className='img-fluidme'
                      />
                      <h3 id='pengenalan-learning-style-visual-auditory-and-kinesthetic-vak-'>
                        Pengenalan &quot;Learning Style - Visual, Auditory, and
                        Kinesthetic (VAK)&quot;
                      </h3>
                      <p>
                        Selamat datang di halaman &quot;Learning Style - Visual,
                        Auditory, and Kinesthetic (VAK) &quot;! Sebelum Anda
                        memulai pengisian kuesioner ini, kami ingin memberikan
                        Anda wawasan tentang apa itu Learning Style VAK, mengapa
                        penting untuk memahami gaya belajar Anda, dan bagaimana
                        asesmen ini dapat membantu Anda meningkatkan efektivitas
                        belajar dan produktivitas dalam kehidupan sehari-hari.
                      </p>
                      <h4 id='-apa-itu-learning-style-vak-'>
                        <strong>Apa itu Learning Style VAK?</strong>
                      </h4>
                      <p>
                        Learning Style VAK adalah model yang mengidentifikasi
                        tiga gaya utama dalam cara individu menyerap, memproses,
                        dan menyimpan informasi. Model ini membagi gaya belajar
                        ke dalam tiga kategori utama:{' '}
                        <strong>
                          Visual (belajar melalui penglihatan), Auditory
                          (belajar melalui pendengaran),
                        </strong>{' '}
                        dan{' '}
                        <strong>
                          Kinesthetic (belajar melalui gerakan dan sentuhan).
                        </strong>
                      </p>
                      <ul>
                        <li>
                          <i className='fas fa-circle-check' />{' '}
                          <strong>Visual Learners:</strong> Mereka yang lebih
                          mudah memahami informasi melalui gambar, diagram,
                          grafik, dan video. Mereka cenderung lebih cepat
                          menangkap materi ketika dapat melihatnya dalam bentuk
                          visual.
                        </li>
                        <li>
                          <i className='fas fa-circle-check' />{' '}
                          <strong>Auditory Learners:</strong> Mereka yang lebih
                          mudah menyerap informasi melalui pendengaran, seperti
                          dalam ceramah, diskusi, atau mendengarkan audio.
                          Mereka cenderung belajar lebih baik dengan mendengar
                          dan berbicara tentang informasi.
                        </li>
                        <li>
                          <i className='fas fa-circle-check' />{' '}
                          <strong>Kinesthetic Learners:</strong> Mereka yang
                          belajar paling baik melalui pengalaman langsung,
                          gerakan, dan manipulasi fisik. Mereka lebih suka
                          belajar dengan melakukan, menyentuh, atau bergerak.
                        </li>
                      </ul>
                      <h4 id='-mengapa-learning-style-vak-berbeda-'>
                        <strong>Mengapa Learning Style VAK Berbeda?</strong>
                      </h4>
                      <p>
                        Ada beberapa alasan mengapa memahami Learning Style VAK
                        sangat penting:
                      </p>
                      <ul>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>Personalized Learning:</strong> Dengan
                            mengetahui gaya belajar Anda, Anda dapat
                            menyesuaikan metode belajar yang paling efektif
                            untuk Anda. Ini membantu Anda belajar lebih cepat
                            dan mengingat informasi lebih lama.
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>
                              Peningkatan Kinerja Akademik dan Profesional:
                            </strong>{' '}
                            Ketika Anda menggunakan metode belajar yang sesuai
                            dengan gaya belajar Anda, Anda lebih mungkin
                            berhasil dalam studi atau pekerjaan Anda. Anda akan
                            merasa lebih nyaman dan efisien dalam menyerap
                            informasi baru.
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>
                              Fleksibilitas dalam Berbagai Situasi:
                            </strong>{' '}
                            Memahami gaya belajar Anda memungkinkan Anda untuk
                            mengadaptasi teknik belajar Anda di berbagai
                            situasi, baik itu dalam ruang kelas, pelatihan
                            profesional, atau belajar mandiri.
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>
                              Peningkatan Komunikasi dan Hubungan:
                            </strong>{' '}
                            Memahami gaya belajar tidak hanya bermanfaat bagi
                            diri sendiri, tetapi juga bagi bagaimana Anda
                            berinteraksi dan bekerja dengan orang lain. Anda
                            dapat berkomunikasi lebih efektif dengan orang yang
                            memiliki gaya belajar berbeda.
                          </p>
                        </li>
                      </ul>
                      <h4 id='-manfaat-mengikuti-asesmen-learning-style-vak-'>
                        <strong>
                          Manfaat Mengikuti Asesmen Learning Style VAK
                        </strong>
                      </h4>
                      <p>
                        Mengapa Anda harus mengikuti asesmen Learning Style VAK?
                        Berikut adalah beberapa alasan yang kuat:
                      </p>
                      <ul>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>Optimalkan Proses Belajar Anda:</strong>{' '}
                            Mengetahui apakah Anda seorang visual, auditory,
                            atau kinesthetic learner akan membantu Anda
                            mengoptimalkan cara Anda belajar dan memproses
                            informasi. Ini berarti Anda dapat mengurangi waktu
                            yang dihabiskan untuk belajar dan meningkatkan hasil
                            yang Anda capai.
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>Peningkatan Produktivitas:</strong> Dengan
                            menyesuaikan metode belajar dengan gaya belajar
                            Anda, Anda dapat meningkatkan produktivitas baik
                            dalam konteks akademik maupun profesional. Anda akan
                            lebih fokus dan lebih efisien dalam bekerja.
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>
                              Kemampuan Beradaptasi yang Lebih Baik:
                            </strong>{' '}
                            Dengan pemahaman tentang gaya belajar Anda, Anda
                            dapat dengan mudah menyesuaikan diri dengan berbagai
                            metode pengajaran atau pelatihan, serta lebih baik
                            dalam mengatasi tantangan belajar yang mungkin
                            muncul.
                          </p>
                        </li>
                        <li>
                          <p>
                            <i className='fas fa-circle-check' />{' '}
                            <strong>Pengembangan Keterampilan Hidup:</strong>{' '}
                            Gaya belajar tidak hanya berlaku untuk pendidikan
                            formal. Mengetahui gaya belajar Anda dapat membantu
                            Anda mengembangkan keterampilan hidup yang lebih
                            baik, seperti keterampilan memecahkan masalah,
                            komunikasi, dan pengambilan keputusan.
                          </p>
                        </li>
                      </ul>
                      <h4 id='-siap-untuk-memulai-'>
                        <strong>Siap untuk Memulai?</strong>
                      </h4>
                      <p>
                        Kami mengundang Anda untuk meluangkan beberapa menit
                        untuk mengikuti kuesioner Learning Style VAK ini. Hasil
                        dari asesmen ini akan memberikan Anda wawasan yang jelas
                        tentang bagaimana Anda belajar secara paling efektif,
                        membantu Anda menerapkan metode belajar yang paling
                        sesuai dengan gaya alami Anda.
                      </p>
                      <p>
                        Jangan lewatkan kesempatan ini untuk mengenali cara
                        belajar yang paling cocok untuk Anda dan mulai
                        meningkatkan hasil belajar Anda dengan strategi yang
                        tepat.
                      </p>
                      <p>
                        Mulailah perjalanan Anda menuju pemahaman diri yang
                        lebih baik dengan Learning Style VAK—sebuah alat yang
                        telah membantu banyak orang di seluruh dunia untuk
                        mencapai keberhasilan dalam belajar dan pengembangan
                        pribadi.
                      </p>
                      <p>
                        Selamat mengisi, dan semoga hasilnya memberi Anda
                        inspirasi dan strategi yang efektif untuk belajar lebih
                        baik!
                      </p>

                      {renderQuizStatusMessage()}
                      <button
                        onClick={startQuiz}
                        className='btn btn-primary'
                        style={{ marginRight: '20px' }}
                      >
                        {latestQuizResponse &&
                        latestQuizResponse.status === 'in progress'
                          ? 'Continue Quiz'
                          : 'Start Quiz'}
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
                  quizId='quiz_101_learningstyle'
                  onQuizComplete={handleQuizComplete}
                  scoreTypes={scoreTypes}
                  initialQuestionIndex={currentQuestionIndex}
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

export default Asesment101LearningStyle;
