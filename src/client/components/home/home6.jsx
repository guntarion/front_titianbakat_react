/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../../AuthContext"
import { ban_bg_01, ban_bg_02, banner_11, doctor_13, doctor_14, doctor_15, doctor_16, doctor_17, doctor_18, eye, star } from "../imagepath"
import SpecialtiesHome6 from "./EyeCareHome/Specialities"
import CenterSectionHome6 from "./EyeCareHome/CenterSectionHome6"
import CounterSectionHome6 from "./EyeCareHome/CounterSectionHome6"
import FacilitiesSectionHome6 from "./EyeCareHome/FacilitiesSectionHome6"
import BlogSectionHome6 from "./EyeCareHome/BlogSectionHome6"
import FooterHome6 from "./EyeCareHome/FooterHome6"
import RobotAhliRegister from "./EyeCareHome/RobotAhliRegister"

import AOS from "aos"
import "aos/dist/aos.css"
import Header from "../header"
import ProgressCircle from "./paediatric/scrolltotop"
import FaqHome6 from "./EyeCareHome/FaqHome6"

const Home6 = props => {
    const { user } = useAuth()
    const [isVerified, setIsVerified] = useState(false)

    useEffect(() => {
        AOS.init({ duration: 1200, once: true })
    }, [])

    const toggleVerificationStatus = () => {
        setIsVerified(prevState => !prevState)
    }

    let pathnames = window.location.pathname
    return (
        <>
            <Header {...props} />
            <section className="doctor-search-section doctor-search-eleven">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 aos" data-aos="fade-up">
                            <div className="banner-header">
                                <p>For a Brighter Today and Tomorrow</p>
                                <h1>Orchestrating Natural and Nurtured Talents</h1>
                                <Link to="/http://localhost:3000/asesmen/occupationalthemes" className="btn btn-light-blue">
                                    Temukan Potensi Karirmu
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 aos" data-aos="fade-up">
                            <img src={banner_11} className="img-fluid dr-img" alt="" />
                        </div>
                    </div>
                </div>
                <div className="ban-bg">
                    <img src={ban_bg_01} className="img-fluid bg-01" alt="" />
                    <img src={ban_bg_02} className="img-fluid bg-02" alt="" />
                    <img src={eye} className="img-fluid bg-03" alt="" />
                </div>
            </section>
            <SpecialtiesHome6 />
            <CenterSectionHome6 />
            <BlogSectionHome6 />

            {/* Toggle button for verification status */}
            <div className="container mb-4">
                <button onClick={toggleVerificationStatus} className="btn btn-primary">
                    Toggle Verification Status (Current: {isVerified ? "Verified" : "Unverified"})
                </button>
            </div>

            <RobotAhliRegister isVerified={isVerified} />
            <FooterHome6 />
            <ProgressCircle />
        </>
    )
}

export default Home6
