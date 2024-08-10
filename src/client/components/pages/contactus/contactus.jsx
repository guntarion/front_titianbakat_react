// src/client/components/pages/contactus/contactus.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../header";
import FooterHome6 from "../../home/EyeCareHome/FooterHome6";
import config from '../../../../config';
import {
  email_kami,
} from "../../imagepath";

const Contactus = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.API_URL}/send-email`, formData);
      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  return (
    <>
      <Header {...props} />

      <>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Hubungi Kami</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/index-6">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Hubungi Kami
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Contact Us */}
        <section className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-12">
                <div className="section-inner-header contact-inner-header">
                  <h6>Hubungi Kami</h6>
                  <h2>Ada Pertanyaan atau Masukan?</h2>
                </div>

                <div className="card contact-card">
                  <div className="card-body">
                    <img src={email_kami} alt="Email Us" className="img-fluid" />
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 d-flex">
                <div className="card contact-form-card w-100">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Nama</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Infokan Nama Anda"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Alamat Email</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Alamat Email Anda"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Pesan</label>
                            <textarea
                              className="form-control"
                              placeholder="Silahkan sampaikan Pesan Anda"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group form-group-btn mb-0">
                            <button
                              type="submit"
                              className="btn btn-primary prime-btn"
                            >
                              Kirim Pesan
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    {submitStatus === "success" && (
                      <div className="alert alert-success mt-3">
                        Pesan Anda telah terkirim. Terima kasih telah menghubungi kami!
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="alert alert-danger mt-3">
                        Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Contact Us */}
      </>
      <FooterHome6 {...props} />
    </>
  );
};

export default Contactus;