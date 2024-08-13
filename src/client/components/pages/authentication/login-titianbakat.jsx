import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { googleicon, shape01, shape02 } from "./img";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { auth } from "../../../../firebase.js"; 
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../../../AuthContext";
import axios from 'axios';
import config from '../../../../config';
import { getFirestore, doc, setDoc } from "firebase/firestore";

const translateFirebaseError = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-credential':
      return 'Email atau kata sandi salah. Silakan coba lagi.';
    case 'auth/user-not-found':
      return 'Akun tidak ditemukan. Silakan periksa email Anda atau daftar untuk membuat akun baru.';
    case 'auth/wrong-password':
      return 'Kata sandi salah. Silakan coba lagi.';
    case 'auth/too-many-requests':
      return 'Terlalu banyak percobaan gagal. Silakan coba lagi nanti.';
    default:
      return 'Terjadi kesalahan. Silakan coba lagi nanti.';
  }
};

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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await handleSuccessfulAuth(user);
        console.log("🔰 User authenticated:", user);
        toast.success("Login successful!");
        history.push("/index-6");
      }
    });

    return () => unsubscribe();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (inputRef.current) {
      inputRef.current.type = showPassword ? "password" : "text";
    }
  };

  const checkCreateUser = async (user) => {
    try {
      const response = await axios.post(`${config.API_URL}/users/check-create`, {
        alamatEmail: user.email,
        role: "user",
        namaLengkap: user.displayName || "",
        userPhoto: user.photoURL || "",
      });
      return response.data.id;
    } catch (error) {
      console.error("Error checking/creating user:", error);
      throw error;
    }
  };

  const handleSuccessfulAuth = async (user) => {
    try {
      console.log("handleSuccessfulAuth called with user:", user);
      const mongoUserId = await checkCreateUser(user);
      console.log("mongoUserId received:", mongoUserId);

      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        mongoUserId,
        role: "user"
      }, { merge: true });
      console.log("Firestore document set successfully");

      setUser(user);
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
      }
      console.log("User set in state and storage");

      toast.success("Login berhasil!");
      history.push("/index-6");
    } catch (error) {
      console.error("Error in handleSuccessfulAuth:", error);
      toast.error("Terjadi kesalahan saat memproses login. Silakan coba lagi.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await handleSuccessfulAuth(userCredential.user);
      setUser(userCredential.user); // Store user info in context
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userCredential.user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userCredential.user));
      }
      toast.success("Login berhasil!");
      history.push("/index-6"); // Redirect to home or another page after successful login
    } catch (err) {
      const errorMessage = translateFirebaseError(err.code);
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in successful:", result.user);
      // The signed-in user info.
      const user = result.user;
      await handleSuccessfulAuth(user);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError(error.message);
      toast.error(error.message);
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
                        <Link to="/forgot-password-send-email" className="forgot-link">
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
                        Belum punya akun? <Link to="/user-signup">Sign up</Link>
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
