// src/client/components/Quiz/Quiz-Result/result_102_riasec.jsx
import React, { useState } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import ChartRiasecHC from "../Quiz-Chart/chart_102_riasec"
import config from "../../../../config"

import {
    img_riasec_realistic,
    img_riasec_artistic,
    img_riasec_conventional,
    img_riasec_enterprising,
    img_riasec_investigative,
    img_riasec_social,
    img_riasec_result,
} from "../../imagepath"

const karakteristik = {
    Realistic: {
        img: img_riasec_realistic,
        text: `<p>Orang dengan tipe kepribadian Realistik cenderung lebih suka bekerja dengan objek, mesin, atau aktivitas fisik. Mereka menikmati tugas-tugas praktis yang melibatkan keterampilan tangan atau pekerjaan yang bersifat teknis. Mereka cenderung kurang tertarik pada pekerjaan yang melibatkan banyak interaksi sosial atau aktivitas yang sifatnya abstrak.</p><p>Tipe kepribadian Realistik cocok untuk mereka yang menyukai pekerjaan praktis dan teknis, serta ingin terlibat dalam proyek-proyek yang konkret dan nyata. Karir dan jurusan yang berkaitan dengan keterampilan teknis dan fisik biasanya paling sesuai dengan kepribadian ini.</p>`,
    },
    Investigative: {
        img: img_riasec_investigative,
        text: `<p>Orang dengan tipe kepribadian Investigatif cenderung menikmati pekerjaan yang melibatkan pemikiran analitis, penelitian, dan pemecahan masalah. Mereka biasanya tertarik pada ilmu pengetahuan, teknologi, dan matematika. Mereka memiliki rasa ingin tahu yang tinggi dan cenderung berpikir logis serta suka mendalami teori atau konsep yang kompleks.</p> <p>Tipe kepribadian Investigatif cocok untuk mereka yang memiliki rasa ingin tahu yang tinggi dan menikmati kegiatan yang melibatkan analisis, penelitian, serta eksplorasi konsep-konsep ilmiah. Karir dan jurusan yang berfokus pada riset, ilmu pengetahuan, dan teknologi biasanya paling sesuai dengan kepribadian ini.</p>`,
    },
    Artistic: {
        img: img_riasec_artistic,
        text: `<p>Orang dengan tipe kepribadian Artistik cenderung kreatif, ekspresif, dan memiliki imajinasi yang kuat. Mereka menikmati bekerja dalam lingkungan yang memungkinkan kebebasan berkreasi dan berinovasi. Tipe ini sering tertarik pada seni, musik, tulisan, dan aktivitas yang melibatkan ekspresi diri. Mereka lebih suka pekerjaan yang memungkinkan mereka mengekspresikan perasaan, ide, atau pandangan unik mereka tentang dunia.</p> <p>Tipe kepribadian Artistik cocok untuk mereka yang memiliki dorongan kuat untuk mengekspresikan diri melalui seni dan kreativitas. Karir dan jurusan yang berfokus pada seni visual, pertunjukan, atau kreasi digital biasanya paling sesuai dengan kepribadian ini. Dunia kerja yang fleksibel dan memungkinkan eksplorasi ide-ide baru sangat menarik bagi individu dengan kecerdasan artistik.</p>`,
    },
    Social: {
        img: img_riasec_social,
        text: `<p>Orang dengan tipe kepribadian Sosial cenderung peduli pada orang lain, empatik, dan senang berinteraksi serta membantu orang lain. Mereka menikmati pekerjaan yang melibatkan komunikasi dan interaksi sosial, serta cenderung memiliki kemampuan untuk mengajarkan, membimbing, dan memberikan dukungan kepada orang lain. Tipe ini biasanya mencari kepuasan dari pekerjaan yang memiliki dampak positif pada kehidupan orang lain.</p> <p>Tipe kepribadian Sosial sangat cocok untuk mereka yang memiliki dorongan kuat untuk membantu dan melayani orang lain. Karir dan jurusan yang berfokus pada pendidikan, kesehatan, dan pelayanan sosial biasanya paling sesuai dengan kepribadian ini. Lingkungan kerja yang melibatkan banyak interaksi dengan orang lain dan memberikan kesempatan untuk mempengaruhi kehidupan orang lain secara positif adalah yang paling ideal untuk individu dengan kecerdasan sosial.</p>`,
    },
    Enterprising: {
        img: img_riasec_enterprising,
        text: `<p>Orang dengan tipe kepribadian Enterprising cenderung ambisius, percaya diri, dan berorientasi pada tujuan. Mereka menikmati memimpin, mengambil keputusan, dan memotivasi orang lain. Tipe ini biasanya tertarik pada dunia bisnis, manajemen, dan kewirausahaan, di mana mereka dapat menggunakan keterampilan persuasif mereka untuk mencapai kesuksesan. Mereka sering kali mengambil risiko dan berani menghadapi tantangan baru.</p> <p>Individu dengan tipe kepribadian Enterprising cocok untuk peran yang melibatkan kepemimpinan, pengambilan keputusan, dan mempengaruhi orang lain. Mereka unggul dalam situasi yang dinamis dan kompetitif, dan sering kali merasa paling hidup ketika mereka berada di posisi yang memungkinkan mereka untuk mengarahkan dan memotivasi tim mereka menuju kesuksesan. Karir dan jurusan yang berfokus pada bisnis, manajemen, dan hukum biasanya paling sesuai dengan kepribadian ini.</p>`,
    },
    Conventional: {
        img: img_riasec_conventional,
        text: `<p>Orang dengan tipe kepribadian Conventional cenderung teratur, detail-oriented, dan nyaman dengan pekerjaan yang melibatkan rutinitas dan struktur. Mereka menikmati tugas-tugas yang memerlukan ketelitian, organisasi, dan akurasi. Mereka sering kali merasa paling nyaman dalam lingkungan kerja yang stabil dan terstruktur, di mana mereka bisa mengandalkan prosedur dan aturan yang sudah ada.</p> <p>Individu dengan tipe kepribadian Conventional cocok untuk peran yang memerlukan keteraturan, kepatuhan terhadap prosedur, dan pengelolaan informasi yang tepat. Mereka cenderung unggul dalam pekerjaan yang melibatkan rutinitas, analisis data, dan pemeliharaan sistem yang terstruktur. Karir dan jurusan yang berfokus pada administrasi, akuntansi, dan manajemen operasional biasanya paling sesuai dengan kepribadian ini.</p>`,
    },
}

const interpolateScore = score => ((score / 60) * 100).toFixed(2)

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const QuizResult102Riasec = ({ totalScores, onBackToIntro, userId, userEmail }) => {
    const [isGeneratingReport, setIsGeneratingReport] = useState(false)
    const [reportStatus, setReportStatus] = useState(null)
    console.log("Result totalScores = ", totalScores)

    const handleGenerateReport = async () => {
        setIsGeneratingReport(true)
        try {
            const response = await axios.get(`${config.API_URL}/generate-riasec-report/${userId}`)
            if (response.data.report_url) {
                await sendReportEmail(response.data.report_url)
                setReportStatus({ type: "success", message: "Laporan berhasil dikirim ke email Anda." })
            } else {
                setReportStatus({ type: "error", message: "Gagal menghasilkan laporan." })
            }
        } catch (error) {
            console.error("Error generating report:", error)
            setReportStatus({ type: "error", message: "Terjadi kesalahan saat menghasilkan laporan." })
        } finally {
            setIsGeneratingReport(false)
        }
    }

    const sendReportEmail = async reportUrl => {
        try {
            await axios.post(`${config.API_URL}/send-riasec-report-email`, {
                email: userEmail,
                reportUrl: reportUrl,
            })
        } catch (error) {
            console.error("Error sending report email:", error)
            setReportStatus({ type: "error", message: "Gagal mengirim email laporan." })
        }
    }

    // Ensure totalScores is an object and has entries
    if (!totalScores || typeof totalScores !== "object" || Object.keys(totalScores).length === 0) {
        return <div>No scores available</div>
    }

    const sortedScores = Object.entries(totalScores)
        .sort(([, a], [, b]) => interpolateScore(b) - interpolateScore(a))
        .slice(0, 3)

    return (
        <div className="quiz-result-container">
            <h2>Hasil Identifikasi Nurtured Talents - RIASEC Occupational Types</h2>

            <div className="row">
                <div className="col-md-6">
                    <img src={img_riasec_result} className="img-fluid" alt="RIASEC Occupational Types Result" />
                </div>
                <div className="col-md-6">
                    <ChartRiasecHC totalScores={totalScores} />
                </div>
            </div>

            {sortedScores.map(([type, score], index) => {
                const cleanType = type.replace("type_", "")
                if (!karakteristik[cleanType]) {
                    console.error(`No karakteristik found for type: ${cleanType}`)
                    return null // Skip this iteration if no matching karakteristik is found
                }
                return (
                    <div key={type} className="result-item mt-4">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={karakteristik[cleanType].img} className="img-fluid" alt={cleanType} />
                            </div>
                            <div className="col-md-9">
                                <h3>
                                    {index + 1}. {capitalizeFirstLetter(cleanType)}
                                </h3>
                                <p>
                                    <strong>Skor:</strong> {interpolateScore(score)}
                                </p>
                                <div dangerouslySetInnerHTML={{ __html: karakteristik[type].text }} />
                            </div>
                        </div>
                    </div>
                )
            })}
            {reportStatus && (
                <div className={`alert alert-${reportStatus.type}`} role="alert">
                    {reportStatus.message}
                </div>
            )}

            <div className="mt-4">
                <button onClick={onBackToIntro} className="btn btn-primary me-2">
                    Back to Quiz Intro
                </button>
                <button onClick={handleGenerateReport} className="btn btn-secondary" disabled={isGeneratingReport}>
                    {isGeneratingReport ? "Mengirim..." : "Kirim link Laporan PDF ke email"}
                </button>
            </div>
        </div>
    )
}

QuizResult102Riasec.propTypes = {
    onBackToIntro: PropTypes.func.isRequired,
    totalScores: PropTypes.shape({
        Realistic: PropTypes.number,
        Investigative: PropTypes.number,
        Artistic: PropTypes.number,
        Social: PropTypes.number,
        Enterprising: PropTypes.number,
        Conventional: PropTypes.number,
    }),
    userId: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
}

export default QuizResult102Riasec
