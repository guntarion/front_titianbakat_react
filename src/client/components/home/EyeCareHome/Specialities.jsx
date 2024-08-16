import React from 'react';
import {
  eye_icon,
  eye_icon_01,
  asesmen_01_learning,
  asesmen_02_holland,
  asesmen_03_multipleintelligence,
  asesmen_20_bigfive,
  asesmen_21_16pf,
  asesmen_22_personalityelement,
  asesmen_23_eneagram,
  asesmen_24_hogwarts,
  asesmen_50_emotionalquotient,
  asesmen_51_assertive,
  asesmen_52_anxious,
  asesmen_53_rational,
} from '../../imagepath';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import { Link } from "react-router-dom";
import ProtectedLink from '../../ProtectedLink';

function SpecialtiesHome6() {
  const doctersettings = {
    items: 4,
    loop: true,
    margin: 15,
    dots: true,

    autoplay: false,
    infinite: 'true',

    slidestoscroll: 1,
    rtl: 'true',
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
    <section className='special-section'>
      <div className='ban-bg'>
        <img src={eye_icon_01} alt='eye-icon' className='img-fluid bg-04 ' />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 aos' data-aos='fade-up'>
            <div className='section-heading sec-heading-eye text-center'>
              <img src={eye_icon} alt='' className='img-fluid' />
              <h2>
                Eksplorasi Bakat dan Tendensi Anda secara <span>GRATIS!</span>
              </h2>
              <p>Kumpulkan Poin untuk meng-unlock asesmen</p>
            </div>
          </div>
        </div>

        <div className='special owl-them aos' data-aos='fade-up'>
          <div className='item'>
            <div className='special-item'>
              <OwlCarousel {...doctersettings}>
                <div className='item'>
                  <div className='special-item'>
                    <div className='special-img'>
                      <ProtectedLink to='/asesmen/learningstyle'>
                        <img
                          src={asesmen_01_learning}
                          alt=''
                          className='img-fluid'
                        />
                      </ProtectedLink>
                    </div>
                    <div className='special-icon'>
                      <ProtectedLink to='/asesmen/learningstyle'>
                        <i className='fa-solid fa-circle-chevron-right' />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to='/asesmen/learningstyle'>
                        Learning Styles
                      </ProtectedLink>
                    </h6>
                  </div>
                </div>

                <div className='item'>
                  <div className='special-item'>
                    <div className='special-img'>
                      <ProtectedLink to='/asesmen/multipleintelligence'>
                        <img
                          // src="assets/img/clinic/clinic-03.png"
                          src={asesmen_03_multipleintelligence}
                          alt=''
                          className='img-fluid'
                        />
                      </ProtectedLink>
                    </div>
                    <div className='special-icon'>
                      <ProtectedLink to='/asesmen/multipleintelligence'>
                        <i className='fa-solid fa-circle-chevron-right' />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to='/asesmen/multipleintelligence'>
                        Multiple Intelligences
                      </ProtectedLink>
                    </h6>
                  </div>
                </div>

                <div className='item'>
                  <div className='special-item'>
                    <div className='special-img'>
                      <ProtectedLink to='/asesmen/bigfive'>
                        <img
                          src={asesmen_20_bigfive}
                          alt=''
                          className='img-fluid'
                        />
                      </ProtectedLink>
                    </div>
                    <div className='special-icon'>
                      <ProtectedLink to='/asesmen/bigfive'>
                        <i className='fa-solid fa-circle-chevron-right' />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to='/asesmen/bigfive'>
                        Big Five Personality
                      </ProtectedLink>
                    </h6>
                  </div>
                </div>

                <div className='item'>
                  <div className='special-item'>
                    <div className='special-img'>
                      {/* <ProtectedLink to='/asesmen/16pf'> */}
                      <ProtectedLink to='/index-6'>
                        <img
                          src={asesmen_21_16pf}
                          alt=''
                          className='img-fluid'
                        />
                      </ProtectedLink>
                    </div>
                    <div className='special-icon'>
                      <ProtectedLink to='/index-6'>
                        <i className='fa-solid fa-circle-chevron-right' />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to='/index-6'>
                        16 Personality Factors <br /> <span>[LOCKED]</span>
                      </ProtectedLink>
                    </h6>
                  </div>
                </div>

                <div className='item'>
                  <div className='special-item'>
                    <div className='special-img'>
                      {/* <ProtectedLink to='/asesmen/eneagram'> */}
                      <ProtectedLink to='/index-6'>
                        <img
                          src={asesmen_23_eneagram}
                          alt=''
                          className='img-fluid'
                        />
                      </ProtectedLink>
                    </div>
                    <div className='special-icon'>
                      <ProtectedLink to='/index-6'>
                        <i className='fa-solid fa-circle-chevron-right' />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to='/index-6'>
                        Eneagram <br /> <span>[LOCKED]</span>
                      </ProtectedLink>
                    </h6>
                  </div>
                </div>

                <div className='item'>
                  <div className='special-item'>
                    <div className='special-img'>
                      {/* <ProtectedLink to='/asesmen/hogwarts'> */}
                      <ProtectedLink to='/index-6'>
                        <img
                          src={asesmen_24_hogwarts}
                          alt=''
                          className='img-fluid'
                        />
                      </ProtectedLink>
                    </div>
                    <div className='special-icon'>
                      <ProtectedLink to='/index-6'>
                        <i className='fa-solid fa-circle-chevron-right' />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to='/index-6'>
                        Hogwarts House Affiliation <br /> <span>[LOCKED]</span>
                      </ProtectedLink>
                    </h6>
                  </div>
                </div>

                <div className='item'>
                  <div className='special-item'>
                    <div className='special-img'>
                      {/* <ProtectedLink to='/asesmen/emotionalquotient'> */}
                      <ProtectedLink to='/index-6'>
                        <img
                          src={asesmen_50_emotionalquotient}
                          alt=''
                          className='img-fluid'
                        />
                      </ProtectedLink>
                    </div>
                    <div className='special-icon'>
                      <ProtectedLink to='/index-6'>
                        <i className='fa-solid fa-circle-chevron-right' />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to='/index-6'>
                        Emotional Quotient <br /> <span>[LOCKED]</span>
                      </ProtectedLink>
                    </h6>
                  </div>
                </div>

                <div className='item'>
                  <div className='special-item'>
                    <div className='special-img'>
                      {/* <ProtectedLink to='/asesmen/rational'> */}
                      <ProtectedLink to='/index-6'>
                        <img
                          src={asesmen_53_rational}
                          alt=''
                          className='img-fluid'
                        />
                      </ProtectedLink>
                    </div>
                    <div className='special-icon'>
                      <ProtectedLink to='/index-6'>
                        <i className='fa-solid fa-circle-chevron-right' />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to='/index-6'>
                        Tingkat Rasionalitas <br /> <span>[LOCKED]</span>
                      </ProtectedLink>
                    </h6>
                  </div>
                </div>

                {/* 

                <div className='item'>
                  <div className='special-item'>
                    <div className='special-img'>
                      <ProtectedLink to='/index-6'>
                        <img
                          // src="assets/img/clinic/clinic-05.png"
                          src={asesmen_22_personalityelement}
                          alt=''
                          className='img-fluid'
                        />
                      </ProtectedLink>
                    </div>
                    <div className='special-icon'>
                      <ProtectedLink to='/index-6'>
                        <i className='fa-solid fa-circle-chevron-right' />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to='/index-6'>
                        Personality Elements
                      </ProtectedLink>
                    </h6>
                  </div>
                </div>
                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <ProtectedLink to="/asesmen/occupational-themes">
                        <img src={asesmen_02_holland} alt="" className="img-fluid" />
                      </ProtectedLink>
                    </div>
                    <div className="special-icon">
                      <ProtectedLink to="/asesmen/occupational-themes">
                        <i className="fa-solid fa-circle-chevron-right" />
                      </ProtectedLink>
                    </div>
                    <h6>
                      <ProtectedLink to="/asesmen/occupational-themes">Occupational Themes </ProtectedLink>
                      <ProtectedLink to="/index-6">Occupational Themes</ProtectedLink>
                    </h6>
                  </div>
                </div>
                
                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <ProtectedLink to="/index-6">
                        <img
                          src={asesmen_52_anxious}
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
                      <ProtectedLink to="/index-6">Tingkat Kecemasan</ProtectedLink>
                    </h6>
                  </div>
                </div>
                
                <div className="item">
                  <div className="special-item">
                    <div className="special-img">
                      <ProtectedLink to="/index-6">
                        <img
                          src={asesmen_51_assertive}
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
                      <ProtectedLink to="/index-6">Tingkat Asertivitas</ProtectedLink>
                    </h6>
                  </div>
                </div> */}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialtiesHome6;
