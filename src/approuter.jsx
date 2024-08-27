// src/approuter.jsx
import React, { useContext, useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import config from "config"
import AuthContext from "./AuthContext"
// import AppContainer from "./appcontainer.jsx";

import PharmacyadminApp from "./pharmacyadmin/app-universal"

import RoutesForAdmin from "./hooks/routes-for-admin.jsx"
import RoutesForKonselor from "./hooks/routes-for-konselor.jsx"
import RoutesForUser from "./hooks/routes-for-user.jsx"
import ProtectedRoute from "./ProtectedRoute"
import Home6 from "./client/components/home/home6.jsx"
import LoginEmail from "./client/components/pages/authentication/login-titianbakat"
import TBUserSignup from "./client/components/pages/authentication/user-signup.jsx"
import TermsPrivasiPolicy from "./client/components/pages/termsprivacypolicy"
import Dashboard from "./client/components/patients/dashboard"
import BlogDetails from "./client/components/blog/blogdetails"
// import MultipleIntelligencesAssessment from "./client/components/pages/asesmenpage/multiple-intelligences";
// import BigFivePersonalityAssessment from "./client/components/pages/asesmenpage/big-five-personality";

// import OccupationalThemeAssessment from "./client/components/pages/asesmenpage/occupational-themes";
import Asesment101LearningStyle from "./client/components/pages/asesmenpage/page_101_learningstyle"
import Asesment102Riasec from "./client/components/pages/asesmenpage/page_102_riasec"
import Asesment103MultipleIntelligence from "./client/components/pages/asesmenpage/page_103_multipleintelligence"
import Asesment200BigFive from "./client/components/pages/asesmenpage/page_200_bigfive"
import Asesment20116PF from "./client/components/pages/asesmenpage/page_201_16pf"
import Asesment202PersonalityElement from "./client/components/pages/asesmenpage/page_202_personalityelement"
import Asesment203Eneagram from "./client/components/pages/asesmenpage/page_203_eneagram"
import Asesment204Hogwarts from "./client/components/pages/asesmenpage/page_204_hogwarts"
import Asesment205IntroEkstraversion from "./client/components/pages/asesmenpage/page_205_introekstraversion"
import Asesment301EmotionalQuotient from "./client/components/pages/asesmenpage/page_301_emotionalquotient"
import Asesment302Assertive from "./client/components/pages/asesmenpage/page_302_assertive"
import Asesment303Anxious from "./client/components/pages/asesmenpage/page_303_anxious"
import Asesment304Rational from "./client/components/pages/asesmenpage/page_304_rational"
import Asesment305PenundaNunda from "./client/components/pages/asesmenpage/page_305_penundanunda"
import Asesment306SikapAtasUang from "./client/components/pages/asesmenpage/page_306_sikapatasuang"
import Asesment307Ketangguhan from "./client/components/pages/asesmenpage/page_307_ketangguhan"
import Asesment308DismorfikTubuh from "./client/components/pages/asesmenpage/page_308_dismorfiktubuh"

import ForgotPasswordSendEmail from "./client/components/pages/authentication/forgot-password-send-email.jsx"
import Contactus from "./client/components/pages/contactus/contactus"

const AppRouter = () => {
    const { user, role } = useContext(AuthContext)
    // const history = useHistory();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [user, role])

    if (isLoading) {
        return <div>Loading...</div> // Show a loading indicator while checking authentication
    }

    return (
        <Switch>
            <Route exact path="/" component={Home6} />
            <Route exact path="/index-6" component={Home6} />
            {/* <Route exact path="/index-6" render={(props) => <AppContainer {...props} />} /> */}
            <Route exact path="/login-titian-bakat" component={LoginEmail} />
            <Route exact path="/user-signup" component={TBUserSignup} />
            <Route exact path="/user/dashboard" component={Dashboard} />
            <Route path="/terms-privacy-policy" exact component={TermsPrivasiPolicy} />
            <Route path="/forgot-password-send-email" exact component={ForgotPasswordSendEmail} />
            <Route path="/contactus" exact component={Contactus} />
            <ProtectedRoute path="/admin" component={RoutesForAdmin} role="admin" />
            <ProtectedRoute path="/konselor" component={RoutesForKonselor} role="konselor" />
            <ProtectedRoute path="/user" component={RoutesForUser} role="user" />
            <Route path="/pharmacyadmin" component={PharmacyadminApp} />
            {/* <Route path="/blog/blog-details" exact component={BlogDetails} /> */}
            <Route path="/blog/:id" component={BlogDetails} />
            {/* 
      <ProtectedRoute path="/asesmen/multiple-intelligences" component={MultipleIntelligencesAssessment} />
      <ProtectedRoute path="/asesmen/big-five-personality" component={BigFivePersonalityAssessment} /> */}

            <ProtectedRoute path="/asesmen/occupationalthemes" component={Asesment102Riasec} />
            <ProtectedRoute path="/asesmen/learningstyle" component={Asesment101LearningStyle} />
            <ProtectedRoute path="/asesmen/riasec" component={Asesment102Riasec} />
            <ProtectedRoute path="/asesmen/multipleintelligence" component={Asesment103MultipleIntelligence} />
            <ProtectedRoute path="/asesmen/bigfive" component={Asesment200BigFive} />
            <ProtectedRoute path="/asesmen/16pf" component={Asesment20116PF} />
            <ProtectedRoute path="/asesmen/personalityelement" component={Asesment202PersonalityElement} />
            <ProtectedRoute path="/asesmen/eneagram" component={Asesment203Eneagram} />
            <ProtectedRoute path="/asesmen/hogwarts" component={Asesment204Hogwarts} />
            <ProtectedRoute path="/asesmen/introekstraversion" component={Asesment205IntroEkstraversion} />
            <ProtectedRoute path="/asesmen/emotionalquotient" component={Asesment301EmotionalQuotient} />
            <ProtectedRoute path="/asesmen/assertive" component={Asesment302Assertive} />
            <ProtectedRoute path="/asesmen/anxious" component={Asesment303Anxious} />
            <ProtectedRoute path="/asesmen/rational" component={Asesment304Rational} />
            <ProtectedRoute path="/asesmen/penundanunda" component={Asesment305PenundaNunda} />
            <ProtectedRoute path="/asesmen/sikapatasuang" component={Asesment306SikapAtasUang} />
            <ProtectedRoute path="/asesmen/ketangguhan" component={Asesment307Ketangguhan} />
            <ProtectedRoute path="/asesmen/dismorfiktubuh" component={Asesment308DismorfikTubuh} />

            <Route component={Home6} />
        </Switch>
    )
}

const AppRouterWrapper = () => (
    <Router basename={`${config.publicPath}`}>
        <AppRouter />
    </Router>
)

export default AppRouterWrapper
