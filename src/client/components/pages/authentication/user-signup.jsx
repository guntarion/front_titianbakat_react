// src/client/components/pages/authentication/user-signup.jsx
import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { shape01, shape02 } from "./img"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import axios from "axios"
import { auth } from "../../../../firebase.js"
import config from "../../../../config"
// src/client/components/pages/authentication/user-signup.jsx

const UserSignup = () => {
    const [tab] = useState(true)
    const [fullName, setFullName] = useState("")
    const [nickName, setNickName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [error, setError] = useState("")
    const history = useHistory()

    const validateEmail = email => {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }

    const handleUserSignup = async event => {
        event.preventDefault()
        setError("")

        if (!fullName.trim()) {
            setError("Nama Panjang Julukan tidak boleh kosong.")
            return
        }

        if (!nickName.trim()) {
            setError("Nama Panggilan tidak boleh kosong.")
            return
        }

        if (!email.trim()) {
            setError("Email tidak boleh kosong.")
            return
        }

        if (!validateEmail(email)) {
            setError("Format email tidak valid.")
            return
        }

        if (!password.trim()) {
            setError("Password tidak boleh kosong.")
            return
        }

        if (password.length < 6) {
            setError("Password harus terdiri dari minimal 6 karakter.")
            return
        }

        if (!termsAccepted) {
            setError("Silakan centang pada penerimaan atas Terms Layanan dan Kebijakan Privasi.")
            return
        }

        try {
            // Check MongoDB for existing user
            const response = await axios.post(`${config.API_URL}/users/`, {
                namaLengkap: fullName,
                namaPanggilan: nickName,
                alamatEmail: email,
                nomerWhatsapp: phone,
                role: "user",
            })

            const mongoUserId = response.data.id

            // If user is successfully created in MongoDB, proceed to Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            const db = getFirestore()
            await setDoc(doc(db, "users", user.uid), {
                email,
                mongoUserId,
                role: "user",
            })

            console.log("User information saved to Firestore")
            history.push("/index-6")
        } catch (error) {
            console.error("Error creating user:", error)
            if (error.code === "auth/email-already-in-use") {
                setError("Email ini sudah terdaftar. Silakan gunakan email lain.")
            } else {
                setError("Terjadi kesalahan saat pendaftaran. Silakan coba lagi.")
            }
        }
    }

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
                                                    <h3>Registrasi User</h3>
                                                    {/* <p className="mb-0">
                            Untuk bisa menggunakan layanan TitianBakat, silahkan mendaftar dengan melengkapi form berikut.
                            Anda tidak perlu menggunakan nama sesuai KTP.
                          </p> */}
                                                </div>

                                                <form onSubmit={handleUserSignup}>
                                                    <div className="form-group">
                                                        <label>Nama Lengkap atau Julukan</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="misal: Bambang Sang Pujangga"
                                                            value={fullName}
                                                            onChange={e => setFullName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Nama Panggilan</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="misal: Beng-Beng"
                                                            value={nickName}
                                                            onChange={e => setNickName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Masukkan Email"
                                                            value={email}
                                                            onChange={e => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group d-flex" style={{ flexDirection: "column" }}>
                                                        <label>Nomer HP WhatsApp</label>
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
                                                                onChange={e => setPassword(e.target.value)}
                                                            />
                                                            <span className="feather-eye toggle-password-sub" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group form-check-box terms-check-box">
                                                        <div className="form-group-flex">
                                                            <label className="custom_check">
                                                                Saya menerima <Link to="/terms-privacy-policy">Terms Layanan dan Kebijakan Privasi</Link> yang ada.
                                                                <input type="checkbox" name="Terms" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} />
                                                                <span className="checkmark" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {error && <div className="alert alert-danger">{error}</div>}
                                                    <div className="form-group">
                                                        <button className="btn btn-block" type="submit">
                                                            Register Sekarang
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
    )
}

export default UserSignup
