// src/client/components/patients/dashboard/index.jsx
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DashboardSidebar from "./sidebar/sidebar.jsx"
import StickyBox from "react-sticky-box"
import FooterHome6 from "../../home/EyeCareHome/FooterHome6"
import Header from "../../header.jsx"
import { useAuth } from "../../../../AuthContext"
import axios from "axios"
import config from "../../../../config"
import { getFirestore, doc, getDoc } from "firebase/firestore"

const Dashboard = props => {
    const { user } = useAuth()
    const [quizHistory, setQuizHistory] = useState([])
    const [mongoUserId, setMongoUserId] = useState("")

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return

            const db = getFirestore()
            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const data = docSnap.data()
                setMongoUserId(data.mongoUserId || "")

                if (data.mongoUserId) {
                    fetchQuizHistory(data.mongoUserId)
                }
            }
        }

        fetchUserData()
    }, [user])

    const fetchQuizHistory = async userId => {
        try {
            const response = await axios.get(`${config.API_URL}/quiz-taken/${userId}`)
            setQuizHistory(response.data)
        } catch (error) {
            console.error("Error fetching quiz history:", error)
        }
    }

    const formatDate = dateString => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        return new Date(dateString).toLocaleDateString("id-ID", options)
    }

    return (
        <>
            <Header {...props} />
            <div className="breadcrumb-bar-two">
                <div className="container">
                    <div className="row align-items-center inner-banner">
                        <div className="col-md-12 col-12 text-center">
                            <h2 className="breadcrumb-title">Dashboard</h2>
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/index-2">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Dashboard
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
                                    <h4 className="card-title">Riwayat Kuis</h4>
                                    {quizHistory.length > 0 ? (
                                        <div className="table-responsive">
                                            <table className="table table-hover table-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>Judul Kuis</th>
                                                        <th>Waktu Pengambilan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {quizHistory.map((quiz, index) => (
                                                        <tr key={index}>
                                                            <td>{quiz.quiz_title}</td>
                                                            <td>{formatDate(quiz.taken_at)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p>Anda belum mengambil kuis apapun.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterHome6 {...props} />
        </>
    )
}

export default Dashboard
