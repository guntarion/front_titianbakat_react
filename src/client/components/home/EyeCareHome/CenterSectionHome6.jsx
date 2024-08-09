/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  center_bg,
  doc_01,
  doc_02,
  doc_03,
  eye_icon,
  hospital,
} from "../../imagepath";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

function CenterSectionHome6() {
  return (
    <>
      <section className="center-section">
        <div className="ban-bg">
          <img src={center_bg} alt="" className="img-fluid bg-05" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-5 aos" data-aos="fade-up">
              <div className="center-img">
                <img src={hospital} alt="" className="img-fluid" />
                <div className="center-service">
                  <span>
                    <i className="fa-solid fa-headphones" />
                  </span>
                  <div>
                    <h6>Explore Your Talents!</h6>
                    <p>Become the Best Version of Yourself</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 aos" data-aos="fade-up">
              <div className="center-info">
                <div className="section-heading sec-heading-eye">
                  <img src={eye_icon} alt="" className="img-fluid" />
                  <h2>
                    Discover Your <span>TRUE</span> Potential
                  </h2>
                  <p>Welcome to the Ultimate Talent Management Platform</p>
                </div>
                <p>
                Unlock the secrets of your personality, latent talents, and potential career paths with our state-of-the-art assessment tools. Our platform offers a holistic approach to understanding both the nurture (result of upbringing) and nature (inherent traits) aspects of your abilities.
                </p>
                <p>
                Understand how your upbringing has shaped you and uncover your inherent talents with our dual approach. We combine traditional assessments with cutting-edge fingerprint analysis to provide a comprehensive view of your abilities.
                </p>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="care-box">
                    <span>
                      <img src={doc_01} alt="" className="img-fluid" />
                    </span>
                    <h6>Comprehensive Personality Assessments</h6>
                    {/* <Link to="/patient/search-doctor2">
                      Find Doctors
                      <i className="fa-solid fa-chevron-right" />
                    </Link> */}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="care-box">
                    <span>
                      <img src={doc_02} alt="" className="img-fluid" />
                    </span>
                    <h6>Nurture vs. Nature Analysis</h6>
                    {/* <Link to="/patient/booking1">
                      Book Now
                      <i className="fa-solid fa-chevron-right" />
                    </Link> */}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="care-box">
                    <span>
                      <img src={doc_03} alt="" className="img-fluid" />
                    </span>
                    <h6>Supported with Actionable Follow Ups</h6>
                    {/* <Link to="/patient/booking2">
                      Make an Appointment
                      <i className="fa-solid fa-chevron-right" />
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CenterSectionHome6;
