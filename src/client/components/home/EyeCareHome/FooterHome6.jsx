/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { logo } from "../../imagepath";
// import { FiClock, FiMail, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
// import FeatherIcon from "feather-icons-react/build/FeatherIcon";
// import Select from "react-select";
function FooterHome6() {

  return (
    <>
      <footer className="footer footer-eleven">
        <div className="footer-top aos aos-init aos-animate" data-aos="fade-up">
          <div className="container">
    
            <div className="row">
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              {/* <div className="col-md-6">
                <div className="footer-widget footer-menu">
                  <ul>
                    <li>
                      <Link to="#">About</Link>
                    </li>
                    <li>
                      <Link to="#">Our services</Link>
                    </li>
                    <li>
                      <Link to="#">Patients</Link>
                    </li>
                    <li>
                      <Link to="#">Camp</Link>
                    </li>
                    <li>
                      <Link to="#">Doctors</Link>
                    </li>
                  </ul>
                </div>
              </div> */}
              {/* <div className="col-md-6">
                <div className="social-icon">
                  <ul>
                    <li>
                      <Link to="#" target="_blank">
                        <i className="fab fa-facebook" />{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="#" target="_blank">
                        <i className="fab fa-instagram" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#" target="_blank">
                        <i className="fab fa-twitter" />{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="#" target="_blank">
                        <i className="fab fa-linkedin-in" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
            {/* Copyright */}
            <div className="copyright">
              <div className="row align-items-center">
                <div className="col-md-5">
                  <div className="copyright-text">
                    <p>© 2024 Titian Bakat. All Rights Reserved.</p>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="footer-bottom-logo">
                    <Link to="/index-6">
                      <img src={logo} className="img-fluid" alt="Logo" />
                    </Link>
                  </div>
                </div>
                <div className="col-md-5">
                  {/* Copyright Menu */}
                  <div className="copyright-menu">
                    <ul className="policy-menu">
                      <li>
                        <Link to="/contactus">Hubungi Kami</Link>
                      </li>
                      <li>
                        <Link to="/terms-privacy-policy">Terms & Privacy Policy</Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Copyright Menu */}
                </div>
              </div>
            </div>
            {/* /Copyright */}
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterHome6;
