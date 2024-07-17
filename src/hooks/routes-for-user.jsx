// src/hooks/routes-for-user.jsx

import React from "react";
import { Route, Switch } from "react-router-dom";
import Terms from "../client/components/pages/terms";
import Policy from "../client/components/pages/policy";
import Aboutus from "../client/components/pages/aboutus/aboutus";
import Contactus from "../client/components/pages/contactus/contactus";
import Patientregisterstepone from "../client/components/register/patientregisterstepone";
import Patientregistersteptwo from "../client/components/register/patientregistersteptwo";
import Patientregisterstepthree from "../client/components/register/patientregisterstepthree";
import Patientregisterstepfour from "../client/components/register/patientregisterstepfour";
import Patientregisterstepfive from "../client/components/register/patientregisterstepfive";
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
import BlankPage from "../client/components/pages/starter page/index.jsx";
import NewPage from '../client/components/pages/newpage/NewPage.jsx';

const RoutesForUser = () => {
  return (
    <Switch>
      <Route path="/pages/terms" exact component={Terms} />
      <Route path="/pages/privacy-policy" exact component={Policy} />
      <Route path="/pages/video-call" exact component={VideoCall} />
      <Route path="/pages/voice-call" exact component={VoiceCall} />
      <Route path="/pages/aboutus" exact component={Aboutus} />
      <Route path="/pages/contactus" exact component={Contactus} />
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
      <Route path="/user/search-doctor1" exact component={SearchDoctor} />
      <Route path="/pages/component" exact component={Components} />
      <Route path="/pages/blank-page" exact component={BlankPage} />
      <Route path="/pages/new-page" exact component={NewPage} />
      <Route path="/pages/calendar" exact component={Calendar} />
      <Route path="/pages/invoice" exact component={Invoice} />
      <Route path="/pages/invoice-view" exact component={InvoiceView} />
      <Route path="/user/doctor-grid" exact component={DoctorGrid} />
      <Route path="/user/doctor-list" exact component={DoctorList} />

      {/* Add other user routes here */}
    </Switch>
  );
};

export default RoutesForUser;
