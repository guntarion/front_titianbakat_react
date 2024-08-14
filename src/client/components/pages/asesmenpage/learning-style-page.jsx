// src/client/components/pages/asesmenpage/learning-style-page.jsx
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../header';
import QuizTypeA from '../../Quiz/quiz-type-a';
import QuizResult from '../../Quiz/Quiz-Result/result-learningstyle';
import axios from 'axios';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../../../AuthContext";
import FooterHome6 from "../../home/EyeCareHome/FooterHome6";
import config from '../../../../config';

import { img_ls_opening } from "../../imagepath";

const LearningStyleAssessment = (props) => {
  const { user } = useAuth();
  const history = useHistory();
  const [showQuiz, setShowQuiz] = useState(false);
  const [totalScores, setTotalScores] = useState({});
  const [hasQuizResult, setHasQuizResult] = useState(false);
  const [mongoUserId, setMongoUserId] = useState("");
  const [showLatestResult, setShowLatestResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const scoreTypes = ["visual", "auditory", "kinesthetic"];

  useEffect(() => {
    const fetchUserData = async () => {
      const db = getFirestore();
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setMongoUserId(data.mongoUserId || "");
        console.log("📋 data.mongoUserId:", data.mongoUserId);

        if (data.mongoUserId) {
          try {
            const response = await axios.get(`${config.API_URL}/quiz-responses/${data.mongoUserId}/quiz_101_learningstyle`);
            console.log("📋 response.data:", response.data);
            console.log("📋 response.data.status:", response.data.status);
            console.log("📋 response.data.total_scores:", response.data.total_scores);
            if (response.data && response.data.status === "finished") {
                setTotalScores(response.data.total_scores);
                setHasQuizResult(true);            
            } else {
              setHasQuizResult(false);
            }
            
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.log("Quiz response not found. Sorry for that.");
              setHasQuizResult(false);
            } else {
              console.error("Error fetching quiz response:", error);
            }
          }
        }
        console.log("totalScores:", totalScores);
        console.log("hasQuizResult:", hasQuizResult);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleQuizComplete = (scores) => {
    setTotalScores(scores);
    setShowQuiz(false);
    setHasQuizResult(true);
    setShowLatestResult(true);
  };

  const startQuiz = async () => {
    try {
      console.log("🔰 ==== Starting Quiz ====");
      console.log("User ID:", mongoUserId);

      if (!mongoUserId) {
        console.error("❌ No mongoUserId available");
        return;
      }

      console.log("📞 Attempting to fetch latest quiz response...");
      const url = `${config.API_URL}/quiz-responses/${mongoUserId}/quiz_101_learningstyle/latest`;
      console.log("🔗 API URL:", url);

      try {
        const response = await axios.get(url);
        console.log("📊 Latest quiz response:", response.data);

        if (response.data && response.data.status !== "finished") {
          console.log("🔄 Resuming existing quiz to index =", response.data.last_question_index);
          setCurrentQuestionIndex(response.data.last_question_index);
          setTotalScores(response.data.total_scores);
          setShowQuiz(true);
          setShowLatestResult(false);
        } else {
          console.log("🆕 Starting new quiz");
          setCurrentQuestionIndex(0);
          setTotalScores({});
          setShowQuiz(true);
          setShowLatestResult(false);
        }
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
                            <button onClick={startQuiz} className="btn btn-primary mr-2">
                              Start Quiz
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
                        quizId="quiz_101_learningstyle"
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

export default LearningStyleAssessment;