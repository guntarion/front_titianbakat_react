import React from "react";
import {
  clinic_011,
  clinic_012,
  clinic_013,
  clinic_015,
  eye_icon,
  eye_icon_01,
} from "../../imagepath";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";

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
                      <Link to="/asesmen/occupational-themes">
                        <img src={clinic_012} alt="" className="img-fluid" />
                      </Link>
                    </div>
                    <div className="special-icon">
                      <Link to="/asesmen/occupational-themes">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </Link>
                    </div>
                    <h6>
                      <Link to="/asesmen/occupational-themes">Occupational Themes </Link>
                    </h6>
                  </div>
                </div>

                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <Link to="/asesmen/multiple-intelligences">
                        <img
                          // src="assets/img/clinic/clinic-03.png"
                          src={clinic_013}
                          alt=""
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                    <div className="special-icon">
                      <Link to="/asesmen/multiple-intelligences">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </Link>
                    </div>
                    <h6>
                      <Link to="/asesmen/multiple-intelligences">Multiple Intelligences</Link>
                    </h6>
                  </div>
                </div>
                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <Link to="/index-6">
                        <img
                          // src="assets/img/clinic/clinic-01.png"
                          src={clinic_011}
                          alt=""
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                    <div className="special-icon">
                      <Link to="/index-6">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </Link>
                    </div>
                    <h6>
                      <Link to="/index-6">Learning Styles</Link>
                    </h6>
                  </div>
                </div>
                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <Link to="/index-6">
                        <img
                          // src="assets/img/clinic/clinic-05.png"
                          src={clinic_015}
                          alt=""
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                    <div className="special-icon">
                      <Link to="/index-6">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </Link>
                    </div>
                    <h6>
                      <Link to="/index-6">Personality Elements</Link>
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
