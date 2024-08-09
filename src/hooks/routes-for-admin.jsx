// src/hooks/routes-for-admin.jsx

import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginContainer from "../client/components/login/login.jsx";
import Register from "../client/components/register/register.jsx";
import ForgotPassword from "../client/components/forgot-password";
import Home from "../client/components/home/index";
import Home9 from "../client/components/home/home9";
import Home2 from "../client/components/home/home2";
import Home3 from "../client/components/home/home3";
import Home11 from "../client/components/home/home11";
import Home12 from "../client/components/home/home12";
import Home13 from "../client/components/home/home13";
import Home14 from "../client/components/home/home14";
import HomeSlider1 from "../client/components/home/homeslider1";
import HomeSlider2 from "../client/components/home/homeslider2";
import Home10 from "../client/components/home/home10";
import Home7 from "../client/components/home/home7";


//blog
import BlogList from "../client/components/blog/bloglist";
import BlogGrid from "../client/components/blog/bloggrid";
import BlogDetails from "../client/components/blog/blogdetails";
//pages
import VideoCall from "../client/components/pages/videocall";
import VoiceCall from "../client/components/pages/voicecall";
import SearchDoctor from "../client/components/pages/searchdoctor/search-doctor1";
import Components from "../client/components/pages/component";
import Calendar from "../client/components/pages/calender";
import Invoice from "../client/components/pages/invoices/invoices";
import InvoiceView from "../client/components/pages/invoices/view";
import DoctorGrid from "../client/components/patients/doctorgrid";
import DoctorList from "../client/components/patients/doctorlist";
import DoctorProfile from "../client/components/patients/doctorprofile";
import PatientChat from "../client/components/patients/chat";
import Booking from "../client/components/patients/booking/booking1";
import Booking2 from "../client/components/patients/booking/booking2";

import Checkout from "../client/components/patients/checkout";
import BookingSuccess from "../client/components/patients/booking-success";
import Dashboard from "../client/components/patients/dashboard";
import PatientDependent from "../client/components/patients/dependent";
import PatientAccounts from "../client/components/patients/accounts";
import Orders from "../client/components/patients/orders";
import MedicalRecords from "../client/components/patients/medicalrecords";
import MedicalDetails from "../client/components/patients/medicaldetails";
import Favourties from "../client/components/patients/dashboard/favourties";
import Profile from "../client/components/patients/dashboard/profile";
import Password from "../client/components/patients/dashboard/password";

import DoctorChat from "../client/components/doctors/chat";
import MyPatient from "../client/components/doctors/mypatient";
import DoctorDashboard from "../client/components/doctors/dashboard";
import SocialMedia from "../client/components/doctors/socialmedia";
import ScheduleTiming from "../client/components/doctors/scheduletimings";
import DoctorPassword from "../client/components/doctors/password";
import Appointments from "../client/components/doctors/appointments";
import PatientProfile from "../client/components/doctors/patientprofile";
import AddPescription from "../client/components/doctors/addpescription";
import AddBilling from "../client/components/doctors/addbilling";
import ProfileSetting from "../client/components/doctors/profilesetting";
import Review from "../client/components/doctors/reviews";
import DoctorRegister from "../client/components/doctors/register";
import Registerstepone from "../client/components/doctors/register/registerstepone";
import Registersteptwo from "../client/components/doctors/register/registersteptwo";
import Registerstepthree from "../client/components/doctors/register/registerstepthree";
import EditPrescription from "../client/components/doctors/patientprofile/edit-prescription";
import EditBilling from "../client/components/doctors/editbilling/index";

import Terms from "../client/components/pages/terms";
import Policy from "../client/components/pages/policy";
import Aboutus from "../client/components/pages/aboutus/aboutus";
import Contactus from "../client/components/pages/contactus/contactus";
import Patientregisterstepone from "../client/components/register/patientregisterstepone";
import Patientregistersteptwo from "../client/components/register/patientregistersteptwo";
import Patientregisterstepthree from "../client/components/register/patientregisterstepthree";
import Patientregisterstepfour from "../client/components/register/patientregisterstepfour";
import Patientregisterstepfive from "../client/components/register/patientregisterstepfive";
//pharmacy
import BlankPage from "../client/components/pages/starter page/index.jsx";
import NewPage from "../client/components/pages/newpage/NewPage.jsx";
import PageAsesmenOne from "../client/components/page-anda/page-asesmen-one";
import Pharmacy from "../client/components/Pharmacy/pharmacy";
import pharmacydetail from "../client/components/Pharmacy/pharmactdetail";
import PharmacySearch from "../client/components/Pharmacy/pharmacysearch";
import Cart from "../client/components/Pharmacy/cart";
import Product from "../client/components/Pharmacy/product";
import ProductDescription from "../client/components/Pharmacy/productdescription";
import ProductCheckout from "../client/components/Pharmacy/productcheckout";
import PayoutSuccess from "../client/components/Pharmacy/payoutsuccess";
import AppUniversal from "../admin/app-universal";
import PharmacyadminApp from "../pharmacyadmin/app-universal";
import Pharmacyregister from "../client/components/Pharmacy/pharmacyregister";
import Pharmacyregisterstepone from "../client/components/Pharmacy/pharmacyregisterstepone";
import Pharmacyregistersteptwo from "../client/components/Pharmacy/pharmacyregistersteptwo";
import Pharmacyregisterstepthree from "../client/components/Pharmacy/pharmacyregisterstepthree";
import Doctorblog from "../client/components/blog/doctorblog/doctorblog";
import Doctoraddblog from "../client/components/blog/doctorblog/doctoraddblog";
import Doctorpendingblog from "../client/components/blog/doctorblog/doctorpendingblog";
import Doctoreditblog from "../client/components/blog/doctorblog/doctoreditblog";

import MapList from "../client/components/patients/map-list/index";
import OnboardingEmail from "../client/components/pages/doctoronboarding/onboardingemail";
import OnboardingPersonalize from "../client/components/pages/doctoronboarding/onboardingpersonalize";
import OnboardingIdentity from "../client/components/pages/doctoronboarding/onboardingidentity";
import OnboardingPayments from "../client/components/pages/doctoronboarding/onboardingpayments";
// import onboardingpersonalize from "../client/components/pages/doctoronboarding/onboardingpayments";
import OnboardingPreferences from "../client/components/pages/doctoronboarding/onboardingpreferences";
import Onboardingverification from "../client/components/pages/doctoronboarding/onboardingverification";
import PatientOnboardingEmail from "../client/components/pages/patientonboarding/Email";
import PatientOnboardingPersonalize from "../client/components/pages/patientonboarding/Personalize";
import PatientOnboardingDetails from "../client/components/pages/patientonboarding/Details";
import PatientFamilyDetails from "../client/components/pages/patientonboarding/FamilyDetails";
import DependantDetails from "../client/components/pages/patientonboarding/DependantDetails";
import OtherDetails from "../client/components/pages/patientonboarding/OtherDetails";
import OnboardingEmailOtp from "../client/components/pages/doctoronboarding/onboardingemail-otp";
import Onboardingphone from "../client/components/pages/doctoronboarding/onboardingphone";
import Onboardingphoneotp from "../client/components/pages/doctoronboarding/onboardingphoneotp";
import Onboardingpassword from "../client/components/pages/doctoronboarding/onboardingpassword";
import PatientEmailOtp from "../client/components/pages/patientonboarding/PatientEmailOtp";
import PatientPhone from "../client/components/pages/patientonboarding/Patientphone";
import patientphoneotp from "../client/components/pages/patientonboarding/patientphoneotp";
import patientpassword from "../client/components/pages/patientonboarding/patientpassword";
import PhoneOtp from "../client/components/pages/patientonboarding/phoneotp";
import Producthealthcare from "../client/components/pages/producthealthcare/index";
import Generalhome from "../client/components/home/general/generalhome.jsx";
import Comingsoon from "../client/components/pages/coming soon/index.jsx";
import Maintenance from "../client/components/pages/maintanence/index.jsx";
import PricingPlan from "../client/components/pages/pricing plan/index.jsx";
import Error404 from "../client/components/pages/error/Error404.jsx";
import Error500 from "../client/components/pages/error/Error500.jsx";
import LoginTitianBakat from "../client/components/pages/authentication/login-titianbakat.jsx";
import LoginEmail from "../client/components/pages/authentication/login-email.jsx";
import LoginPhone from "../client/components/pages/authentication/login-phone.jsx";
import LoginEmailOtp from "../client/components/pages/authentication/login-email-otp.jsx";
import LoginPhoneOtp from "../client/components/pages/authentication/login-phone-otp.jsx";
import Loginemail from "../client/components/home/loginemail.jsx";
import ForgotPassword2 from "../client/components/pages/authentication/forgot-password-send-email.jsx";
import UserSignup from "../client/components/pages/authentication/user-signup.jsx";
import KonselorSignup from "../client/components/pages/authentication/konselor-signup.jsx";
import Signup from "../client/components/pages/authentication/signup.jsx";
import SuccessSignup from "../client/components/pages/authentication/success-signup.jsx";
import Home4 from "../client/components/home/home4.jsx";
import Faq from "../client/components/pages/faq/index.jsx";
import EmailOtp from "../client/components/pages/authentication/email-otp.jsx";
import MobileOtp from "../client/components/pages/authentication/phone-otp.jsx";
import AvailableTiming from "../client/components/doctors/availabletiming/index.jsx";


import Accounts from "../client/components/doctors/account/index.jsx";

import Cardiohome from "../client/components/home/cardiology/cardiohome.jsx";
import Paediatrichome from "../client/components/home/paediatric/paediatrichome.jsx";
import Home6 from "../client/components/home/home6.jsx";
import CosmeticsHome from "../client/components/home/home11";
import SearchDoctor2 from "../client/components/pages/searchdoctor/search-doctor2.jsx";
import Consultation from "../client/components/home/consultation.jsx";
import Payment from "../client/components/home/payment.jsx";
import Bookingsuccess from "../client/components/home/bookingsuccess.jsx";
import Patientdetails from "../client/components/home/patientdetails.jsx";
import HomecareHome from "../client/components/home/HomecareHome/index.jsx";
import HomeTwelve from "../client/components/home/home12/hometwelve.jsx";


const RoutesForAdmin = () => {
  return (
    <Switch>
        <Route path="/pharmacyadmin" component={PharmacyadminApp} />
        <Route path="/admin" component={AppUniversal} />


        <Route path="/user/doctor-grid" exact component={DoctorGrid} />
        <Route path="/user/doctor-list" exact component={DoctorList} />
        <Route path="/pages/video-call" exact component={VideoCall} />
        <Route path="/pages/voice-call" exact component={VoiceCall} />


        <Route path="/login" exact component={LoginContainer} />
        <Route path="/register" exact component={Register} />
        <Route path="/pages/forgot-password" exact component={ForgotPassword} />
        <Route path="/forgot-password-send-email" exact component={ForgotPassword2} />
        <Route path="/pages/login-email" exact component={LoginEmail} />
        <Route path="/pages/login-phone" exact component={LoginPhone} />
        <Route path="/pages/email-otp" exact component={LoginEmailOtp} />
        <Route path="/pages/phone-otp" exact component={LoginPhoneOtp} />
        <Route path="/pages/eotp" exact component={EmailOtp} />
        <Route path="/pages/motp" exact component={MobileOtp} />

        <Route path="/user-signup" exact component={UserSignup} />
        <Route path="/konselor-signup" exact component={KonselorSignup} />
        <Route path="/success-signup" exact component={SuccessSignup} />
        <Route path="/signup" exact component={Signup} />

        {/* home */}
        <Route path="/index-2" exact component={Home} />
        <Route path="/index-20" exact component={Generalhome} />
        <Route path="/homeslider1" exact component={HomeSlider1} />
        <Route path="/index-2" exact component={Home2} />
        <Route path="/index-3" exact component={Home3} />
        <Route path="/homeslider2" exact component={HomeSlider2} />
        <Route path="/index-5" exact component={Cardiohome} />
        <Route path="/index-8" exact component={Paediatrichome} />

        <Route path="/index-6" exact component={Home6} />
        <Route path="/index-7" exact component={Home7} />
        <Route path="/index-4" exact component={Home4} />
        <Route path="/index-9" exact component={Home9} />
        <Route path="/index-10" exact component={Home10} />
        <Route path="/home11" exact component={Home11} />
        <Route path="/index-11" exact component={CosmeticsHome} />
        <Route path="/index-12" exact component={HomeTwelve} />
        <Route path="/home12" exact component={Home12} />
        <Route path="/home13" exact component={Home13} />
        <Route path="/home14" exact component={Home14} />

        {/* blog */}
        <Route path="/blog/blog-list" exact component={BlogList} />
        <Route path="/blog/blog-grid" exact component={BlogGrid} />
        <Route path="/blog/blog-details" exact component={BlogDetails} />
        <Route path="/doctor-blog" exact component={Doctorblog} />
        <Route path="/blog/doctor-add-blog" exact component={Doctoraddblog} />
        <Route path="/blog/doctor-pending-blog" exact component={Doctorpendingblog} />
        <Route path="/blog/doctor-edit-blog" exact component={Doctoreditblog} />
        {/* pages */}

        <Route path="/user/search-doctor1" exact component={SearchDoctor} />
        <Route path="/user/search-doctor2" exact component={SearchDoctor2} />
        <Route path="/pages/component" exact component={Components} />
        <Route path="/pages/blank-page" exact component={BlankPage} />
        <Route path="/pages/new-page" exact component={NewPage} />
        <Route path="/pages/calendar" exact component={Calendar} />
        <Route path="/pages/invoice" exact component={Invoice} />

        <Route path="/pages/invoice-view" exact component={InvoiceView} />
        <Route path="/pages/aboutus" exact component={Aboutus} />
        <Route path="/pages/contactus" exact component={Contactus} />
        <Route path="/pages/comingsoon" exact component={Comingsoon} />
        <Route path="/pages/maintenance" exact component={Maintenance} />
        <Route path="/pages/pricing-plan" exact component={PricingPlan} />
        <Route path="/pages/error-404" exact component={Error404} />
        <Route path="/pages/error-500" exact component={Error500} />
        <Route path="/pages/faq" exact component={Faq} />
        <Route path="/user/patientregisterstep-1" exact component={Patientregisterstepone} />
        <Route path="/user/patientregisterstep-2" exact component={Patientregistersteptwo} />
        <Route path="/user/patientregisterstep-3" exact component={Patientregisterstepthree} />
        <Route path="/user/patientregisterstep-4" exact component={Patientregisterstepfour} />
        <Route path="/user/patientregisterstep-5" exact component={Patientregisterstepfive} />
        <Route path="/user/doctor-profile" exact component={DoctorProfile} />

        <Route path="/user/booking1" exact component={Booking} />
        <Route path="/user/booking2" exact component={Booking2} />
        <Route path="/user/patient-chat" exact component={PatientChat} />
        <Route path="/user/checkout" exact component={Checkout} />
        <Route path="/user/booking-success" exact component={BookingSuccess} />
        <Route path="/user/dashboard" exact component={Dashboard} />
        <Route path="/user/dependent" exact component={PatientDependent} />
        <Route path="/user/accounts" exact component={PatientAccounts} />
        <Route path="/user/orders" exact component={Orders} />
        <Route path="/user/medicalrecords" exact component={MedicalRecords} />
        <Route path="/user/medicaldetails" exact component={MedicalDetails} />
        <Route path="/user/favourites" exact component={Favourties} />
        <Route path="/user/profile" exact component={Profile} />
        <Route path="/user/change-password" exact component={Password} />

        <Route path="/konselor/doctor-dashboard" exact component={DoctorDashboard} />
        <Route path="/konselor/my-patients" exact component={MyPatient} />
        <Route path="/konselor/invoice" exact component={Invoice} />
        <Route path="/konselor/social-media" exact component={SocialMedia} />
        <Route path="/konselor/schedule-timing" exact component={ScheduleTiming} />
        <Route path="/konselor/available-timing" exact component={AvailableTiming} />
        <Route path="/konselor/account" exact component={Accounts} />
        <Route path="/konselor/doctor-change-password" exact component={DoctorPassword} />
        <Route path="/konselor/appointments" exact component={Appointments} />
        <Route path="/konselor/patient-profile" exact component={PatientProfile} />
        <Route path="/konselor/profile-setting" exact component={ProfileSetting} />
        <Route path="/konselor/review" exact component={Review} />
        <Route path="/konselor/doctor-register" exact component={DoctorRegister} />

        <Route path="/konselor/chat-doctor" exact component={DoctorChat} />
        <Route path="/konselor/add-billing" exact component={AddBilling} />
        <Route path="/konselor/add-prescription" exact component={AddPescription} />
        <Route path="/konselor/registerstepone" exact component={Registerstepone} />
        <Route path="/konselor/register-step-2" exact component={Registersteptwo} />
        <Route path="/konselor/register-step- 3" exact component={Registerstepthree} />
        <Route path="/konselor/editprescription" exact component={EditPrescription} />
        <Route path="/konselor/editbilling" exact component={EditBilling} />

        <Route path="/pages/terms" exact component={Terms} />
        <Route path="/pages/privacy-policy" exact component={Policy} />

        {/* Pharmacy */}

        <Route path="/user/map-list" exact component={MapList} />
        <Route path="/page-anda/page-asesmen-one" exact component={PageAsesmenOne} />
        <Route path="/asesmen/Pharmacy-index" exact component={Pharmacy} />
        <Route path="/asesmen/Pharmacy-details" exact component={pharmacydetail} />
        <Route path="/asesmen/pharmacy-search" exact component={PharmacySearch} />
        <Route path="/asesmen/product-all" exact component={Product} />
        <Route path="/asesmen/product-description" exact component={ProductDescription} />
        <Route path="/asesmen/cart" exact component={Cart} />
        <Route path="/asesmen/product-checkout" exact component={ProductCheckout} />
        <Route path="/asesmen/payment-success" exact component={PayoutSuccess} />
        <Route path="/asesmen/pharmacy-register" exact component={Pharmacyregister} />
        <Route path="/asesmen/pharmacy-registerstep-1" exact component={Pharmacyregisterstepone} />
        <Route path="/asesmen/pharmacy-registerstep-2" exact component={Pharmacyregistersteptwo} />
        <Route path="/asesmen/pharmacy-registerstep-3" exact component={Pharmacyregisterstepthree} />

        <Route path="/pages/onboarding-email" exact component={OnboardingEmail} />
        <Route path="/pages/onboarding-identity" exact component={OnboardingIdentity} />
        <Route path="/pages/onboarding-payments" exact component={OnboardingPayments} />
        <Route path="/pages/onboarding-personalize" exact component={OnboardingPersonalize} />
        <Route path="/pages/onboarding-preferences" exact component={OnboardingPreferences} />
        <Route path="/pages/onboarding-verification" exact component={Onboardingverification} />
        <Route path="/pages/patient-email" exact component={PatientOnboardingEmail} />
        <Route path="/pages/patient-personalize" exact component={PatientOnboardingPersonalize} />
        <Route path="/pages/patient-details" exact component={PatientOnboardingDetails} />
        <Route path="/pages/patient-family-details" exact component={PatientFamilyDetails} />
        <Route path="/pages/patient-dependant-details" exact component={DependantDetails} />
        <Route path="/pages/patient-other-details" exact component={OtherDetails} />
        <Route path="/pages/onboarding-email-otp" exact component={OnboardingEmailOtp} />
        <Route path="/pages/onboarding-phone" exact component={Onboardingphone} />
        <Route path="/pages/onboarding-phone-otp" exact component={Onboardingphoneotp} />
        <Route path="/pages/onboarding-password" exact component={Onboardingpassword} />
        <Route path="/pages/patient-email-otp" exact component={PatientEmailOtp} />
        <Route path="/pages/patient-phone" exact component={PatientPhone} />
        <Route path="/pages/patient-phone-otp" exact component={patientphoneotp} />
        <Route path="/pages/patient-password" exact component={patientpassword} />
        <Route path="/pages/product-healthcare" exact component={Producthealthcare} />
        <Route path="/pages/patient-phone-otp" exact component={PhoneOtp} />

        <Route path="/consultation" exact component={Consultation} />
        <Route path="/payment" exact component={Payment} />
        <Route path="/bookingsuccess" exact component={Bookingsuccess} />
        <Route path="/patientdetails" exact component={Patientdetails} />
        <Route path="/loginemail" exact component={Loginemail} />
        <Route path="/login-titian-bakat" exact component={LoginTitianBakat} />
        <Route path="/index-13" exact component={HomecareHome} />
      {/* Add other admin routes here */}
    </Switch>
  );
};

export default RoutesForAdmin;
