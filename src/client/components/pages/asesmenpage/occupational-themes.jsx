// src/client/components/pages/asesmenpage/occupational-themes.jsx
// src/client/components/Quiz/quiz-type-one.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";
import QuizTypeOne from "../../Quiz/quiz-type-one";


const OccupationalThemeAssessment = (props) => {
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
              <h5>Blank Page</h5>
              <QuizTypeOne />
            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default OccupationalThemeAssessment;