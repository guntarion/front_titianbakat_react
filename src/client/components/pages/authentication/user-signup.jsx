// src/client/components/pages/authentication/user-signup.jsx
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { shape01, shape02 } from "./img";
import AuthenticationHeader from "../../authiticationHeader";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import axios from "axios"; // Import axios
import { auth } from "../../../../firebase.js";

const UserSignup = () => {
  const [tab] = useState(true);
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // State for the checkbox
  const [error, setError] = useState(""); // State for error messages
  const history = useHistory();

  const handleUserSignup = async (event) => {
    event.preventDefault();

    if (!termsAccepted) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      // Check MongoDB for existing user
      const response = await axios.post("http://localhost:8000/api/users/", {
        namaLengkap: fullName,
        namaPanggilan: nickName,
        alamatEmail: email,
        nomerWhatsapp: phone,
        role: "user"
      });

      const mongoUserId = response.data.id;

      // If user is successfully created in MongoDB, proceed to Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), {
        email,
        mongoUserId, // Store MongoDB ID in Firestore
        role: "user"
      });

      console.log("User information saved to Firestore");
      history.push("/index-6"); // Redirect to the home page or any other page after successful signup
    } catch (error) {
      console.error("Error creating user:", error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <>
      <AuthenticationHeader />
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
                <div className="widget-set">
                  <div className="account-info">
                    <div className="widget-content multistep-form">
                      <fieldset id="first" className={`${tab === true ? "d-block" : "d-none"}`}>
                        <div className="login-back">
                          <Link to="/index-6">
                            <i className="fa-solid fa-arrow-left-long" /> Kembali
                          </Link>
                        </div>
                        <div className="login-title">
                          <h3>User Signup</h3>
                          <p className="mb-0">
                            Selamat Datang! Silahkan inputkan informasi Anda.
                          </p>
                        </div>
                        
                        <form onSubmit={handleUserSignup}>
                          <div className="form-group">
                            <label>Nama Lengkap</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Nama Lengkap Anda"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label>Nama Panggilan</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Nama Panggilan"
                              value={nickName}
                              onChange={(e) => setNickName(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Masukkan Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="form-group d-flex" style={{ flexDirection: "column" }}>
                            <label>Nomer WhatsApp</label>
                            <PhoneInput
                              containerClassName="intl-tel-input"
                              inputClassName="form-control form-control-lg group_formcontrol form-control-phone"
                              id="phone"
                              name="phone"
                              type="text"
                              value={phone}
                              onChange={setPhone}
                            />
                          </div>
                          <div className="form-group">
                            <label>Password</label>
                            <div className="pass-group">
                              <input
                                type="password"
                                className="form-control pass-input-sub"
                                placeholder="*************"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <span className="feather-eye toggle-password-sub" />
                            </div>
                          </div>
                          <div className="form-group form-check-box terms-check-box">
                            <div className="form-group-flex">
                              <label className="custom_check">
                                Saya telah membaca dan bersepakat dengan {" "}
                                <Link to="#">Terms of Service</Link> dan{" "}
                                <Link to="#">Privacy Policy.</Link>
                                <input 
                                  type="checkbox" 
                                  name="Terms" 
                                  checked={termsAccepted}
                                  onChange={(e) => setTermsAccepted(e.target.checked)}
                                />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          {error && <div className="alert alert-danger">{error}</div>}
                          <div className="form-group">
                            <button className="btn btn-block" type="submit">
                              Register Now
                            </button>
                          </div>
                        </form>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignup;

