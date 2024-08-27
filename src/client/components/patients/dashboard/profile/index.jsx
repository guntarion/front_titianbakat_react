// src/client/components/patients/dashboard/profile/index.jsx
import React, { useState, useEffect } from "react"
import DashboardSidebar from "../sidebar/sidebar.jsx"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import IMG01 from "../../../../assets/images/patient.jpg"
import StickyBox from "react-sticky-box"
import { Link } from "react-router-dom"
import Footer from "../../../home/EyeCareHome/FooterHome6"
// src/client/components/home/EyeCareHome/FooterHome6.jsx
import Header from "../../../header.jsx"
import { provincesAndCities } from "./provincesAndCities" // Import the provincesAndCities object
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { useAuth } from "../../../../../AuthContext" // Assuming you have a useAuth hook
import axios from "axios"
import config from "../../../../../config"

const UserProfile = props => {
    const { user } = useAuth() // Get the current user
    const [selectedProvince, setSelectedProvince] = useState("")
    const [cities, setCities] = useState([])
    const [userPhoto, setUserPhoto] = useState("")
    const [namaLengkap, setNamaLengkap] = useState("")
    const [namaPanggilan, setNamaPanggilan] = useState("")
    const [tanggalLahir, setTanggalLahir] = useState(new Date(2000, 0, 1))
    const [gender, setGender] = useState("")
    const [alamatEmail, setAlamatEmail] = useState("")
    const [nomerWhatsapp, setNomerWhatsapp] = useState("")
    const [pendidikanTerakhir, setPendidikanTerakhir] = useState("")
    const [alamatProvinsi, setAlamatProvinsi] = useState("")
    const [alamatKota, setAlamatKota] = useState("")
    const [role, setRole] = useState("")
    const [mongoUserId, setMongoUserId] = useState("") // Add state for mongoUserId

    useEffect(() => {
        const fetchUserData = async () => {
            const db = getFirestore()
            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const data = docSnap.data()
                setAlamatEmail(data.email || "")
                setRole(data.role || "")
                setMongoUserId(data.mongoUserId || "") // Set MongoDB ID

                if (data.mongoUserId) {
                    // Fetch additional data from MongoDB
                    try {
                        const response = await axios.get(`${config.API_URL}/users/${data.mongoUserId}`)
                        const mongoData = response.data
                        setNamaLengkap(mongoData.namaLengkap || "")
                        setNamaPanggilan(mongoData.namaPanggilan || "")
                        setTanggalLahir(mongoData.tanggalLahir || "")
                        setGender(mongoData.gender || "")
                        setNomerWhatsapp(mongoData.nomerWhatsapp || "")
                        setPendidikanTerakhir(mongoData.pendidikanTerakhir || "")
                        setAlamatProvinsi(mongoData.alamatProvinsi || "")
                        setAlamatKota(mongoData.alamatKota || "")
                        setUserPhoto(mongoData.userPhoto || "") // Set the userPhoto state

                        if (mongoData.alamatProvinsi) {
                            setSelectedProvince(mongoData.alamatProvinsi)
                            setCities(provincesAndCities[mongoData.alamatProvinsi])
                        }
                    } catch (error) {
                        console.error("Error fetching user data from MongoDB:", error)
                    }
                }
            }
        }

        if (user) {
            fetchUserData()
        }
    }, [user])

    const handleProvinceChange = e => {
        setSelectedProvince(e.target.value)
        setAlamatProvinsi(e.target.value)
    }

    useEffect(() => {
        if (selectedProvince) {
            setCities(provincesAndCities[selectedProvince])
        } else {
            setCities([])
        }
    }, [selectedProvince])

    const handlePhotoUpload = async e => {
        const file = e.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await axios.put(`${config.API_URL}/users/${mongoUserId}/upload-photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            setUserPhoto(response.data.photo_url)
            // Trigger a re-fetch of user data to update the sidebar
            const userDataResponse = await axios.get(`${config.API_URL}/users/${mongoUserId}`)
            const updatedUserData = userDataResponse.data
            // Update other user data states here if needed
        } catch (error) {
            console.error("Error uploading photo:", error)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const userData = {
            userPhoto,
            namaLengkap,
            namaPanggilan,
            tanggalLahir,
            gender,
            nomerWhatsapp,
            pendidikanTerakhir,
            alamatProvinsi,
            alamatKota,
        }
        try {
            if (mongoUserId) {
                const response = await axios.put(`${config.API_URL}/users/${mongoUserId}`, userData)
                console.log("User data updated:", response.data)
            } else {
                console.error("MongoDB ID is not set.")
            }
        } catch (error) {
            console.error("Error saving user data:", error)
        }
    }

    return (
        <div>
            <Header {...props} />
            <div className="breadcrumb-bar-two">
                <div className="container">
                    <div className="row align-items-center inner-banner">
                        <div className="col-md-12 col-12 text-center">
                            <h2 className="breadcrumb-title">Profile Settings</h2>
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/index-2">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Profile Settings
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                            <StickyBox offsetTop={20} offsetBottom={20}>
                                <DashboardSidebar />
                            </StickyBox>
                        </div>

                        <div className="col-md-7 col-lg-8 col-xl-9">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row form-row">
                                            <div className="col-12 col-md-12">
                                                <div className="form-group">
                                                    <div className="change-avatar">
                                                        <div className="profile-img">
                                                            <img src={userPhoto || IMG01} alt="User" />
                                                        </div>
                                                        <div className="upload-img">
                                                            <div className="change-photo-btn">
                                                                <span>
                                                                    <i className="fa fa-upload"></i> Upload Photo
                                                                </span>
                                                                <input type="file" className="upload" onChange={handlePhotoUpload} />
                                                            </div>
                                                            <small className="form-text text-muted">File JPG, GIF atau PNG. Ukuran maksimum 2MB.</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>Alamat Email</label>
                                                    <input type="text" className="form-control" value={alamatEmail} onChange={e => setAlamatEmail(e.target.value)} disabled />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>Role</label>
                                                    <input type="text" className="form-control" value={role} onChange={e => setRole(e.target.value)} disabled />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>Nama Lengkap</label>
                                                    <input type="text" className="form-control" value={namaLengkap} onChange={e => setNamaLengkap(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>Nama Panggilan</label>
                                                    <input type="text" className="form-control" value={namaPanggilan} onChange={e => setNamaPanggilan(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>Tanggal Lahir</label>
                                                    <div className="cal-icon">
                                                        <DatePicker
                                                            className="form-control"
                                                            selected={tanggalLahir ? new Date(tanggalLahir) : null}
                                                            onChange={date => setTanggalLahir(date)}
                                                            defaultValue={new Date(2000, 0, 1)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>Nomer WhatsApp</label>
                                                    <input type="text" className="form-control" value={nomerWhatsapp} onChange={e => setNomerWhatsapp(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>Gender</label>
                                                    <select className="form-select form-control" value={gender} onChange={e => setGender(e.target.value)}>
                                                        <option value="">Select Gender</option>
                                                        <option value="Lelaki">Lelaki</option>
                                                        <option value="Perempuan">Perempuan</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>Pendidikan Terakhir/Saat Ini</label>
                                                    <select className="form-select form-control" value={pendidikanTerakhir} onChange={e => setPendidikanTerakhir(e.target.value)}>
                                                        <option value="">Select Education</option>
                                                        <option value="Tidak Bersekolah">Tidak Bersekolah</option>
                                                        <option value="Sekolah Dasar">Sekolah Dasar</option>
                                                        <option value="SMP atau Sederajat">SMP atau Sederajat</option>
                                                        <option value="SMA/SMK atau Sederajat">SMA/SMK atau Sederajat</option>
                                                        <option value="Sarjana S1">Sarjana S1</option>
                                                        <option value="Master S2">Master S2</option>
                                                        <option value="Doktoral S3">Doktoral S3</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>Provinsi</label>
                                                    <select className="form-control" value={selectedProvince} onChange={handleProvinceChange}>
                                                        <option value="">Select Province</option>
                                                        {Object.keys(provincesAndCities).map(province => (
                                                            <option key={province} value={province}>
                                                                {province}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>Kota</label>
                                                    <select className="form-control" value={alamatKota} onChange={e => setAlamatKota(e.target.value)}>
                                                        <option value="">Select City</option>
                                                        {cities.map(city => (
                                                            <option key={city} value={city}>
                                                                {city}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="submit-section">
                                            <button type="submit" className="btn btn-primary submit-btn">
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer {...props} />
        </div>
    )
}

export default UserProfile
