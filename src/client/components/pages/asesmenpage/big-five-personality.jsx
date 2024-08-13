import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";
import QuizTypeOne from "../../Quiz/quiz-type-one";
import QuizResult_BigFivePersonality from "../../Quiz/Quiz-Result/result-bigfivepersonality";
import axios from "axios";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../../../AuthContext"; 

import {
  img_bigfive_opening,
} from "../../imagepath";

const BigFivePersonalityAssessment = (props) => {
  const { user } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const [totalscores, setTotalscores] = useState({});
  const [hasQuizResult, setHasQuizResult] = useState(false);
  const [mongoUserId, setMongoUserId] = useState("");

  const scoreTypes = [
    "Extroversion_EXT",
    "Agreeableness_AGR",
    "Stability_EST",
    "Conscientiousness_CSN",
    "Experience_OPN"
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
            const response = await axios.get(`http://localhost:8000/api/quizresponse/${data.mongoUserId}/quiz_04_bigFivePersonality`);
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
                <h2 className="breadcrumb-title">Big Five Personality</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/index-6">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Big Five Personality
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
                <QuizResult_BigFivePersonality totalscores={totalscores} />
              ) : (
                <div>
                  {!showQuiz && (
                    <>
                      <img src={img_bigfive_opening} alt="" className="img-fluidme" />
                      <h3>Assessment Big Five Personality</h3>
                      
                      <p>The Big Five Personality Test, also known as the Five-Factor Model (FFM), is a widely recognized and scientifically validated model of personality. It measures five key dimensions of personality: Extraversion, Agreeableness, Conscientiousness, Emotional Stability (or Neuroticism), and Openness to Experience.</p>
                      
                      <h4>Benefits of Taking the Big Five Personality Test</h4>
                      <ul>
                        <li><strong>Self-Awareness:</strong> Gain deeper insights into your personality traits and tendencies.</li>
                        <li><strong>Career Guidance:</strong> Understand which career paths might align best with your personality.</li>
                        <li><strong>Relationship Insights:</strong> Improve your understanding of how you interact with others.</li>
                        <li><strong>Personal Growth:</strong> Identify areas for personal development and improvement.</li>
                        <li><strong>Academic Performance:</strong> Understand how your personality might influence your learning style and academic success.</li>
                      </ul>

                      <h4>How the Test Works</h4>
                      <p>The test consists of 50 statements. For each statement, you will be asked to rate how accurately it describes you on a scale from 1 (Disagree) to 5 (Agree). Some statements are phrased positively, while others are phrased negatively. Your honest responses will help provide the most accurate results.</p>

                      <h4>Time Required</h4>
                      <p>The test typically takes about 10-15 minutes to complete. You can save your progress and return to complete it later if needed.</p>

                      <h4>Confidentiality</h4>
                      <p>Your responses and results are kept strictly confidential and will only be used to provide you with your personality profile.</p>

                      <button onClick={startQuiz} className="btn btn-primary">
                        Start Quiz
                      </button>
                    </>
                  )}
                </div>
              )}
              {showQuiz && (
                <QuizTypeOne
                  quizId="quiz_04_bigFivePersonality"
                  onQuizComplete={handleQuizComplete}
                  scoreTypes={scoreTypes}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default BigFivePersonalityAssessment;