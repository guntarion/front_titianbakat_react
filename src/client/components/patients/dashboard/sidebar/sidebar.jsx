// src/client/components/patients/dashboard/sidebar/sidebar.jsx
import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import IMG01 from "../../../../assets/images/patient.jpg"
import { auth } from "../../../../../firebase.js"
import { signOut } from "firebase/auth"
import { useAuth } from "../../../../../AuthContext"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import axios from "axios"
import config from "../../../../../config"

const DashboardSidebar = () => {
    const pathname = window.location.pathname
    const history = useHistory()
    const { user, setUser, setRole } = useAuth()
    const [userInfo, setUserInfo] = useState({
        namaLengkap: "",
        tanggalLahir: "",
        alamatKota: "",
        alamatProvinsi: "",
        userPhoto: "",
    })

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const db = getFirestore()
                const docRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    const data = docSnap.data()
                    if (data.mongoUserId) {
                        try {
                            const response = await axios.get(`${config.API_URL}/users/${data.mongoUserId}`)
                            const mongoData = response.data
                            setUserInfo({
                                namaLengkap: mongoData.namaLengkap || "",
                                tanggalLahir: mongoData.tanggalLahir ? new Date(mongoData.tanggalLahir) : null,
                                alamatKota: mongoData.alamatKota || "",
                                alamatProvinsi: mongoData.alamatProvinsi || "",
                                userPhoto: mongoData.userPhoto || "",
                            })
                        } catch (error) {
                            console.error("Error fetching user data from MongoDB:", error)
                        }
                    }
                }
            }
        }

        fetchUserData()
    }, [user])

    const handleLogout = async () => {
        try {
            await signOut(auth)
            setUser(null)
            setRole(null)
            history.push("/login") // Redirect to login page after logout
        } catch (error) {
            console.error("Error logging out:", error)
        }
    }

    const calculateAge = birthDate => {
        if (!birthDate) return ""
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    const formatBirthDate = date => {
        if (!date) return ""
        const options = { year: "numeric", month: "short", day: "numeric" }
        return date.toLocaleDateString("en-US", options)
    }

    return (
        <div className="profile-sidebar">
            <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                    <Link to="#0" className="booking-doc-img">
                        <img src={userInfo.userPhoto || IMG01} alt="User" />
                    </Link>

                    <div className="profile-det-info">
                        <h3>{userInfo.namaLengkap}</h3>
                        <div className="patient-details">
                            {userInfo.tanggalLahir && (
                                <h5>
                                    <i className="fas fa-birthday-cake"></i> {formatBirthDate(userInfo.tanggalLahir)}, {calculateAge(userInfo.tanggalLahir)} years
                                </h5>
                            )}
                            {(userInfo.alamatKota || userInfo.alamatProvinsi) && (
                                <h5 className="mb-0">
                                    <i className="fas fa-map-marker-alt"></i> {userInfo.alamatKota}, {userInfo.alamatProvinsi}
                                </h5>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-widget">
                <nav className="dashboard-menu">
                    <ul>
                        <li className={pathname.includes("/dashboard") ? "active" : ""}>
                            <Link to="/user/dashboard">
                                <i className="fas fa-columns"></i>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className={pathname.includes("/profile") ? "active" : ""}>
                            <Link to="/user/profile">
                                <i className="fas fa-user-cog"></i>
                                <span>Set Profil</span>
                            </Link>
                        </li>

                        {/* <li className={pathname.includes("/accounts") ? "active" : ""}>
              <Link to="/user/accounts">
                <i className="fas fa-file-invoice-dollar"></i>
                <span>Accounts</span>
              </Link>
            </li> */}

                        {/* <li className={pathname.includes("/orders") ? "active" : ""}>
              <Link to="/user/orders">
                <i className="fas fa-list-alt"></i>
                <span>Riwayat</span>
                <small className="unread-msg">7</small>
              </Link>
            </li> */}

                        {/* <li
              className={pathname.includes("/medicalrecords") ? "active" : ""}
            >
              <Link to="/user/medicalrecords">
                <i className="fas fa-clipboard"></i>
                <span>Add Medical Records</span>
              </Link>
            </li>
            <li
              className={pathname.includes("/medicaldetails") ? "active" : ""}
            >
              <Link to="/user/medicaldetails">
                <i className="fas fa-file-medical-alt"></i>
                <span>Medical Details</span>
              </Link>
            </li> 
            <li
              className={pathname.includes('/change-password') ? 'active' : ''}
            >
              <Link to='/user/change-password'>
                <i className='fas fa-lock'></i>
                <span>Ubah Password</span>
              </Link>
            </li>
            
            */}

                        <li>
                            <a href="#0" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default DashboardSidebar
