import React from "react";
import {
  clinic_011,
  clinic_012,
  clinic_013,
  clinic_015,
  eye_icon,
  eye_icon_01,
  asesmen_01_learning,
  asesmen_02_holland,
  asesmen_03_multipleintelligence,
  asesmen_04_emotionalquotient,
  asesmen_05_personalityelement,
  asesmen_06_hogwarts,
  asesmen_07_rational,
  asesmen_08_anxious,
  asesmen_09_assertive
} from "../../imagepath";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import { Link } from "react-router-dom";
import ProtectedLink from '../../ProtectedLink';

function SpecialtiesHome6() {
  const doctersettings = {
    items: 4,
    loop: true,
    margin: 15,
    dots: true,

    autoplay: false,
    infinite: "true",

    slidestoscroll: 1,
    rtl: "true",
    rows: 1,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 1,
      },
      575: {
        items: 2,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 4,
      },
      1300: {
        items: 5,
      },
    },
  };
  return (
    <section className="special-section">
      <div className="ban-bg">
        <img src={eye_icon_01} alt="eye-icon" className="img-fluid bg-04 " />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 aos" data-aos="fade-up">
            <div className="section-heading sec-heading-eye text-center">
              <img src={eye_icon} alt="" className="img-fluid" />
              <h2>
                Eksplorasi Bakat dan Tendensi Anda secara <span>GRATIS!</span>
              </h2>
              <p>Kumpulkan Poin untuk meng-unlock asesmen</p>
            </div>
          </div>
        </div>

        <div className="special owl-them aos" data-aos="fade-up">
          <div className="item">
            <div className="special-item">
              <OwlCarousel {...doctersettings}>
                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      {/* <ProtectedLink to="/asesmen/occupational-themes"> */}
                      <ProtectedLink to="/index-6">
                        <img src={asesmen_02_holland} alt="" className="img-fluid" />
                      </ProtectedLink>
                    </div>
                    <div className="special-icon">
                      {/* <ProtectedLink to="/asesmen/occupational-themes"> */}
                      <ProtectedLink to="/index-6">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </ProtectedLink>
                    </div>
                    <h6>
                      {/* <ProtectedLink to="/asesmen/occupational-themes">Occupational Themes </ProtectedLink> */}
                      <ProtectedLink to="/index-6">Occupational Themes <br /> <span>[LOCKED]</span></ProtectedLink>
                    </h6>
                  </div>
                </div>

                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <ProtectedLink to="/asesmen/multiple-intelligences">
                        <img
                          // src="assets/img/clinic/clinic-03.png"
                          src={asesmen_03_multipleintelligence}
                          alt=""
                          className="img-fluid"
                        />
                      </ProtectedLink>
                    </div>
                    <div className="special-icon">
                      <ProtectedLink to="/asesmen/multiple-intelligences">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to="/asesmen/multiple-intelligences">Multiple Intelligences  <br /> <span>[OPEN]</span></ProtectedLink>
                    </h6>
                  </div>
                </div>
                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <ProtectedLink to="/index-6">
                        <img
                          // src="assets/img/clinic/clinic-01.png"
                          src={asesmen_01_learning}
                          alt=""
                          className="img-fluid"
                        />
                      </ProtectedLink>
                    </div>
                    <div className="special-icon">
                      <ProtectedLink to="/index-6">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to="/index-6">Learning Styles <br /> <span>[LOCKED]</span></ProtectedLink>
                    </h6>
                  </div>
                </div>
                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <ProtectedLink to="/index-6">
                        <img
                          // src="assets/img/clinic/clinic-05.png"
                          src={asesmen_05_personalityelement}
                          alt=""
                          className="img-fluid"
                        />
                      </ProtectedLink>
                    </div>
                    <div className="special-icon">
                      <ProtectedLink to="/index-6">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to="/index-6">Personality Elements <br /> <span>[LOCKED]</span></ProtectedLink>
                    </h6>
                  </div>
                </div>
                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <ProtectedLink to="/index-6">
                        <img
                          src={asesmen_04_emotionalquotient}
                          alt=""
                          className="img-fluid"
                        />
                      </ProtectedLink>
                    </div>
                    <div className="special-icon">
                      <ProtectedLink to="/index-6">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to="/index-6">Emotional Quotient <br /> <span>[LOCKED]</span></ProtectedLink>
                    </h6>
                  </div>
                </div>
                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <ProtectedLink to="/index-6">
                        <img
                          src={asesmen_06_hogwarts}
                          alt=""
                          className="img-fluid"
                        />
                      </ProtectedLink>
                    </div>
                    <div className="special-icon">
                      <ProtectedLink to="/index-6">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to="/index-6">Hogwarts House Affiliation <br /> <span>[LOCKED]</span></ProtectedLink>
                    </h6>
                  </div>
                </div>
                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <ProtectedLink to="/index-6">
                        <img
                          src={asesmen_07_rational}
                          alt=""
                          className="img-fluid"
                        />
                      </ProtectedLink>
                    </div>
                    <div className="special-icon">
                      <ProtectedLink to="/index-6">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to="/index-6">Tingkat Rasionalitas <br /> <span>[LOCKED]</span></ProtectedLink>
                    </h6>
                  </div>
                </div>
                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <ProtectedLink to="/index-6">
                        <img
                          src={asesmen_08_anxious}
                          alt=""
                          className="img-fluid"
                        />
                      </ProtectedLink>
                    </div>
                    <div className="special-icon">
                      <ProtectedLink to="/index-6">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to="/index-6">Tingkat Kecemasan <br /> <span>[LOCKED]</span></ProtectedLink>
                    </h6>
                  </div>
                </div>
                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <ProtectedLink to="/index-6">
                        <img
                          src={asesmen_09_assertive}
                          alt=""
                          className="img-fluid"
                        />
                      </ProtectedLink>
                    </div>
                    <div className="special-icon">
                      <ProtectedLink to="/index-6">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to="/index-6">Tingkat Asertivitas <br /> <span>[LOCKED]</span></ProtectedLink>
                    </h6>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialtiesHome6;
