import React from "react";
import { Link } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import QuizTypeTwo from "../Quiz/quiz-type-two";

const PageAsesmenTwo = (props) => {
  return (
    <div>
      <Header {...props} />
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Asesmen</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/index-6">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Asesmen Type Two
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
              <QuizTypeTwo quizId="quiz_1" /> {/* Pass quizId as prop */}
            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default PageAsesmenTwo;
