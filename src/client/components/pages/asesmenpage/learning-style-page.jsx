import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [showQuiz, setShowQuiz] = useState(false);
  const [totalScores, setTotalScores] = useState({});
  const [hasQuizResult, setHasQuizResult] = useState(false);
  const [mongoUserId, setMongoUserId] = useState("");

  const scoreTypes = ["visual", "auditory", "kinesthetic"];

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
            const response = await axios.get(`${config.API_URL}/quizresponse/${data.mongoUserId}/quiz_101_learningstyle`);
            if (response.data && response.data.status === "finished") {
              setTotalScores(response.data.total_scores);
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
    setTotalScores(scores);
    setShowQuiz(false);
    setHasQuizResult(true);
  };

  const startQuiz = () => {
    setShowQuiz(true);
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
              {hasQuizResult && !showQuiz ? (
                <QuizResult totalScores={totalScores} />
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
                      <button onClick={startQuiz} className="btn btn-primary">
                        Start Quiz
                      </button>
                    </>
                  )}
                </div>
              )}
              {showQuiz && (
                <QuizTypeA
                  quizId="quizStatement_101_learningstyle"
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

export default LearningStyleAssessment;