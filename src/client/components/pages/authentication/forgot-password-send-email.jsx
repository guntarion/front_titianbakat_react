// src/client/components/pages/authentication/forgot-password-send-email.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { shape01, shape02 } from "./img";
import { auth } from "../../../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordSendEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Email untuk reset password telah dikirim. Silakan periksa kotak masuk Anda.");
      toast.success("Email reset password terkirim!");
    } catch (err) {
      setError("Gagal mengirim email reset password. Silakan coba lagi.");
      toast.error("Gagal mengirim email reset password.");
    }
  };

  return (
    <>
      <div className="login-content-info">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="account-content">
                <div className="login-shapes">
                  <div className="shape-img-left">
                    <img src={shape01} alt="" />
                  </div>
                  <div className="shape-img-right">
                    <img src={shape02} alt="" />
                  </div>
                </div>
                <div className="account-info">
                  <div className="login-back">
                    <Link to="/login-titian-bakat">
                      <i className="fa-solid fa-arrow-left-long" /> Kembali Login
                    </Link>
                  </div>
                  <div className="login-title">
                    <h3>Pemulihan Password</h3>
                    <p className="mb-0">
                      Infokan email Anda, kami akan kirimkan link untuk reset password Anda.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="email_anda@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    {message && <p className="text-success">{message}</p>}
                    {error && <p className="text-danger">{error}</p>}
                    <div className="form-group">
                      <button className="btn btn-block" type="submit">
                        Proses Permintaan
                      </button>
                    </div>
                    <div className="form-group back-btn-light mb-0">
                      <Link to="/login-titian-bakat" className="btn btn-light btn-block">
                        <i className="fa-solid fa-arrow-left" /> Kembali
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPasswordSendEmail;