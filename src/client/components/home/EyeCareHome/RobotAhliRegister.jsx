import React, { useState } from "react"
import { Link } from "react-router-dom"
import FeatherIcon from "feather-icons-react/build/FeatherIcon"
import PropTypes from "prop-types"

function RobotAhliRegister({ isVerified }) {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [passcode, setPasscode] = useState("")

    const handleVerification = e => {
        e.preventDefault()
        // Here you would typically make an API call to verify the user
        // For now, we'll just log the values
        console.log("Phone Number:", phoneNumber)
        console.log("Passcode:", passcode)
    }

    const UnverifiedView = () => (
        <form onSubmit={handleVerification} className="doctor-search-form">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="form-custom">
                            <input type="text" className="form-control" placeholder="Nomer Handphone" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                            <i>
                                <FeatherIcon icon={"phone"} />
                            </i>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="form-custom">
                            <input type="text" className="form-control" placeholder="Passcode" value={passcode} onChange={e => setPasscode(e.target.value)} />
                            <i>
                                <FeatherIcon icon={"lock"} />
                            </i>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-light-blue app-btn">
                        Lakukan Verifikasi
                    </button>
                </div>
            </div>
        </form>
    )

    const VerifiedView = () => (
        <div className="verified-content">
            <p className="verified-message text-white mb-4">Anda dapat mengikuti tiga assesment dan mendapat laporan antasnya.</p>

            <div className="assessment-rows container-fluid" style={{ maxWidth: "900px" }}>
                <div className="row align-items-center mb-3">
                    <div className="col-1 text-center">
                        <span className="assessment-status">🟧</span>
                    </div>
                    <div className="col-5">
                        <h5 className="text-white mb-0 fw-bold">Big Five Personality</h5>
                    </div>
                    <div className="col-3 text-end">
                        <Link to="/asesmen/big-five-personality" className="btn btn-light-blue">
                            Jalani Asesmen
                        </Link>
                    </div>
                </div>

                <div className="row align-items-center mb-3">
                    <div className="col-1 text-center">
                        <span className="assessment-status">🟩</span>
                    </div>
                    <div className="col-5">
                        <h5 className="text-white mb-0 fw-bold">Modalitas Belajar</h5>
                    </div>
                    <div className="col-3 text-end">
                        <Link to="/asesmen/modalitas-belajar" className="btn btn-light-blue">
                            Jalani Asesmen
                        </Link>
                    </div>
                </div>

                <div className="row align-items-center mb-4">
                    <div className="col-1 text-center">
                        <span className="assessment-status">🟧</span>
                    </div>
                    <div className="col-5">
                        <h5 className="text-white mb-0 fw-bold">Multiple Intelligences</h5>
                    </div>
                    <div className="col-3 text-end">
                        <Link to="/asesmen/multiple-intelligences" className="btn btn-light-blue">
                            Jalani Asesmen
                        </Link>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12 text-center">
                        <button className="btn btn-light-blue btn-lg">Kirimkan Hasil Analisis</button>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <section className="appointment-section">
            <div className="appointment-form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 aos" data-aos="fade-up">
                            <div className="section-heading text-center sec-heading-eye">
                                <h2 className="text-white">{isVerified ? "Akun RobotAhli Terverifikasi" : "Verifikasi Akun RobotAhli"}</h2>
                            </div>
                        </div>
                    </div>
                    {isVerified ? <VerifiedView /> : <UnverifiedView />}
                </div>
            </div>
        </section>
    )
}

RobotAhliRegister.propTypes = {
    isVerified: PropTypes.bool.isRequired,
}

export default RobotAhliRegister
