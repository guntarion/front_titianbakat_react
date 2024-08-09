import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { googleicon, shape01, shape02 } from "./img";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { auth } from "../../../../firebase.js"; 
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../../../AuthContext";

const LoginTitianBakat = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { setUser, setRole } = useAuth();
  const history = useHistory();
  const inputRef = useRef();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    if (savedUser && window.location.pathname !== "/login-titian-bakat") {
      setUser(savedUser);
      history.push("/index-6");
    }
  }, [setUser, history]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (inputRef.current) {
      inputRef.current.type = showPassword ? "password" : "text";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Store user info in context
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userCredential.user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userCredential.user));
      }
      toast.success("Login successful!");
      history.push("/index-6"); // Redirect to home or another page after successful login
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      setUser(userCredential.user); // Store user info in context
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userCredential.user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userCredential.user));
      }
      toast.success("Login successful!");
      history.push("/index-6"); // Redirect to home or another page after successful login
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
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
                    <Link to="/index-6">
                      <i className="fas fa-arrow-left-long" /> Kembali
                    </Link>
                  </div>
                  <div className="login-title">
                    <h3>Sign in</h3>
                    <p>Silahkan gunakan email dan password Anda, atau gunakan akun Google.</p>
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label>E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="email_anda@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <div className="form-group-flex">
                        <label>Password</label>
                        <Link to="/pages/forgot-password" className="forgot-link">
                          Lupa password?
                        </Link>
                      </div>
                      <div className="pass-group">
                        <input
                          ref={inputRef}
                          className="form-control pass-input"
                          type="password"
                          placeholder="*************"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          onClick={togglePasswordVisibility}
                          type="button"
                          className="password-toggle-btn"
                        >
                          {showPassword ? (
                            <FeatherIcon icon="eye-off" style={{ width: "16px" }} />
                          ) : (
                            <FeatherIcon icon="eye" style={{ width: "16px" }} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="form-group form-check-box">
                      <div className="form-group-flex">
                        <label className="custom_check d-inline-flex">
                          Ingat saya
                          <input 
                            type="checkbox" 
                            name="login" 
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <button className="btn btn-block" type="submit">
                        Sign in
                      </button>
                    </div>
                    <div className="login-or">
                      <span className="or-line" />
                      <span className="span-or">or</span>
                    </div>
                    <div className="social-login -btn">
                      <button type="button" className="btn btn-block" onClick={handleGoogleLogin}>
                        <img src={googleicon} alt="" /> Log in dengan Google
                      </button>
                    </div>
                    <div className="account-signup">
                      <p>
                        Belum punya akun? <Link to="/signup">Sign up</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Toast container to display notifications */}
    </>
  );
};

export default LoginTitianBakat;
