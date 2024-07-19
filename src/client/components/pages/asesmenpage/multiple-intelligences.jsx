// src/client/components/pages/asesmenpage/multiple-intelligences.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";
import QuizTypeOne from "../../Quiz/quiz-type-one";
import QuizResult_MultipleIntelligences from "../../Quiz/quiz-result-multipleintelligences";

const MultipleIntelligencesAssessment = (props) => {
  const [showResults, setShowResults] = useState(false);
  const [totalscores, setTotalscores] = useState({});

  const handleQuizComplete = (scores) => {
    setTotalscores(scores);
    setShowResults(true);
  };

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
              {showResults ? (
                <QuizResult_MultipleIntelligences totalscores={totalscores} />
              ) : (
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
      <Footer {...props} />
    </div>
  );
};

export default MultipleIntelligencesAssessment;
