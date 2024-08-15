// src/client/components/pages/asesmenpage/page_308_dismorfiktubuh.jsx
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../header';
import QuizTypeA from '../../Quiz/quiz-type-a';
import QuizResult from '../../Quiz/Quiz-Result/result_308_dismorfiktubuh';
import axios from 'axios';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../../../AuthContext";
import FooterHome6 from "../../home/EyeCareHome/FooterHome6";
import config from '../../../../config';

import { img_ls_opening } from "../../imagepath";

const Asesment308DismorfikTubuh = (props) => {
  const { user } = useAuth();
  const history = useHistory();
  const [showQuiz, setShowQuiz] = useState(false);
  const [totalScores, setTotalScores] = useState({});
  const [hasQuizResult, setHasQuizResult] = useState(false);
  const [mongoUserId, setMongoUserId] = useState("");
  const [showLatestResult, setShowLatestResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizInfo, setQuizInfo] = useState(null);
  const [latestQuizResponse, setLatestQuizResponse] = useState(null);

  const scoreTypes = ["visual", "auditory", "kinesthetic"];

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const db = getFirestore();
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setMongoUserId(data.mongoUserId || "");

        if (data.mongoUserId) {
          try {
            // Fetch quiz info
            const quizInfoResponse = await axios.get(`${config.API_URL}/quizzes/quiz_308_dismorfiktubuh`);
            setQuizInfo(quizInfoResponse.data);

            // Fetch latest in-progress quiz response
            try {
              const latestInProgressResponse = await axios.get(`${config.API_URL}/quiz-responses/${data.mongoUserId}/quiz_308_dismorfiktubuh/latest-in-progress`);
              setLatestQuizResponse(latestInProgressResponse.data);
            } catch (error) {
              if (error.response && error.response.status !== 404) {
                console.error("Error fetching in-progress quiz response:", error);
              }
            }

            // Fetch latest finished quiz response
            try {
              const latestFinishedResponse = await axios.get(`${config.API_URL}/quiz-responses/${data.mongoUserId}/quiz_308_dismorfiktubuh/latest-finished`);
              setTotalScores(latestFinishedResponse.data.total_scores);
              setHasQuizResult(true);
            } catch (error) {
              if (error.response && error.response.status !== 404) {
                console.error("Error fetching finished quiz response:", error);
              }
              setHasQuizResult(false);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      }
    };

    fetchData();
  }, [user]);

const renderQuizStatusMessage = () => {
  if (!quizInfo) return null;

  let alertClass = "alert alert-info";
  let message = "";

  if (latestQuizResponse && latestQuizResponse.status === "in progress") {
    const progress = Math.round((latestQuizResponse.last_question_index / quizInfo.statement_count) * 100);
    alertClass = "alert alert-warning";
    message = (
      <>
        You have an unfinished quiz (progress: {progress}%). 
        Click the &quot;Continue Quiz&quot; button to resume where you left off.
      </>
    );
  } else if (hasQuizResult) {
    alertClass = "alert alert-success";
    message = "You have completed this quiz. You can start a new attempt or view your latest result.";
  } else {
    message = "Start a new quiz to assess your learning style.";
  }

  return (
    <div className={alertClass} role="alert">
      <i className="fas fa-info-circle me-2"></i>
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
        console.error("❌ No mongoUserId available");
        return;
      }

      console.log("📞 Attempting to fetch latest quiz response...");
      const url = `${config.API_URL}/quiz-responses/${mongoUserId}/quiz_308_dismorfiktubuh/latest`;
      console.log("🔗 API URL:", url);

      try {
        const response = await axios.get(url);
        console.log("📊 Latest quiz response:", response.data);

        if (latestQuizResponse && latestQuizResponse.status === "in progress") {
          console.log("🔄 Resuming existing quiz to index =", latestQuizResponse.last_question_index);
          setCurrentQuestionIndex(latestQuizResponse.last_question_index);
          setTotalScores(latestQuizResponse.total_scores);
        } else {
          console.log("🆕 Starting new quiz");
          setCurrentQuestionIndex(0);
          setTotalScores({});
        }

        setShowQuiz(true);
        setShowLatestResult(false);
  
      } catch (error) {
        console.error("❌ Error in API call:", error.message);
        if (error.response) {
          console.error("Error response status:", error.response.status);
          console.error("Error response data:", error.response.data);
        }
        if (error.response && error.response.status === 404) {
          console.log("🆕 No existing quiz found, starting new quiz");
          setCurrentQuestionIndex(0);
          setTotalScores({});
          setShowQuiz(true);
          setShowLatestResult(false);
        } else {
          console.error("❌ Unexpected error fetching quiz response");
        }
      }
    } catch (error) {
      console.error("❌ Unexpected error in startQuiz:", error);
    }
  };

  const showResult = () => {
    setShowLatestResult(true);
  };

  const handleBackToIntro = () => {
    setShowLatestResult(false);
    setShowQuiz(false);
    history.push('/asesmen/learning-style');
  };

  return (
    <div>
      <Header {...props} />
      <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">Learning Style Assessment</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index-6">Home</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Learning Style Assessment
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
              <div className="container-fluid">
                <div className="row">
                <div className="col-12">
                  {showLatestResult ? (
                    <QuizResult totalScores={totalScores} onBackToIntro={handleBackToIntro} />
                  ) : (
                    <div>
                      {!showQuiz && (
                        <>
                          <img src={img_ls_opening} alt="" className="img-fluidme" />
                          <h3>Learning Style Assessment</h3>
                          <p>
                            This assessment will help you identify your preferred learning style.
                            Understanding your learning style can help you choose more effective study methods and improve your learning experience.
                          </p>
                          {renderQuizStatusMessage()}
                          <button 
                            onClick={startQuiz} 
                            className="btn btn-primary"
                            style={{ marginRight: '20px' }}
                          >
                            {latestQuizResponse && latestQuizResponse.status === "in progress" ? "Continue Quiz" : "Start Quiz"}
                          </button>
                          {hasQuizResult && (
                            <button onClick={showResult} className="btn btn-secondary">
                              See Latest Result
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                    {showQuiz && (
                      <QuizTypeA
                        quizId="quiz_308_dismorfiktubuh"
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

export default Asesment308DismorfikTubuh;