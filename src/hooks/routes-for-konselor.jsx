// src/hooks/routes-for-konselor.jsx

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DoctorChat from '../client/components/doctors/chat';
import Policy from '../client/components/pages/policy';
import MyPatient from '../client/components/doctors/mypatient';
import DoctorDashboard from '../client/components/doctors/dashboard';
import SocialMedia from '../client/components/doctors/socialmedia';
import ScheduleTiming from '../client/components/doctors/scheduletimings';
import DoctorPassword from '../client/components/doctors/password';
import Appointments from '../client/components/doctors/appointments';
import PatientProfile from '../client/components/doctors/patientprofile';
import AddPescription from '../client/components/doctors/addpescription';
import AddBilling from '../client/components/doctors/addbilling';
import ProfileSetting from '../client/components/doctors/profilesetting';
import Review from '../client/components/doctors/reviews';
import DoctorRegister from '../client/components/doctors/register';
import Registerstepone from '../client/components/doctors/register/registerstepone';
import Registersteptwo from '../client/components/doctors/register/registersteptwo';
import Registerstepthree from '../client/components/doctors/register/registerstepthree';
import EditPrescription from '../client/components/doctors/patientprofile/edit-prescription';
import EditBilling from '../client/components/doctors/editbilling/index';
import Accounts from '../client/components/doctors/account/index.jsx';
import Invoice from '../client/components/pages/invoices/invoices';
import AvailableTiming from '../client/components/doctors/availabletiming/index.jsx';

// import MultipleIntelligencesAssessment from "../client/components/pages/asesmenpage/multiple-intelligences";
// import OccupationalThemeAssessment from "../client/components/pages/asesmenpage/occupational-themes";

const RoutesForKonselor = () => {
  return (
    <Switch>
      <Route
        path='/konselor/doctor-dashboard'
        exact
        component={DoctorDashboard}
      />
      <Route path='/konselor/my-patients' exact component={MyPatient} />
      <Route path='/konselor/invoice' exact component={Invoice} />
      <Route path='/konselor/social-media' exact component={SocialMedia} />
      <Route
        path='/konselor/schedule-timing'
        exact
        component={ScheduleTiming}
      />
      <Route
        path='/konselor/available-timing'
        exact
        component={AvailableTiming}
      />
      <Route path='/konselor/account' exact component={Accounts} />
      <Route
        path='/konselor/doctor-change-password'
        exact
        component={DoctorPassword}
      />
      <Route path='/konselor/appointments' exact component={Appointments} />
      <Route
        path='/konselor/patient-profile'
        exact
        component={PatientProfile}
      />
      <Route
        path='/konselor/profile-setting'
        exact
        component={ProfileSetting}
      />
      <Route path='/konselor/review' exact component={Review} />
      <Route
        path='/konselor/doctor-register'
        exact
        component={DoctorRegister}
      />
      <Route path='/konselor/chat-doctor' exact component={DoctorChat} />
      <Route path='/konselor/add-billing' exact component={AddBilling} />
      <Route
        path='/konselor/add-prescription'
        exact
        component={AddPescription}
      />
      <Route
        path='/konselor/registerstepone'
        exact
        component={Registerstepone}
      />
      <Route
        path='/konselor/register-step-2'
        exact
        component={Registersteptwo}
      />
      <Route
        path='/konselor/register-step- 3'
        exact
        component={Registerstepthree}
      />
      <Route
        path='/konselor/editprescription'
        exact
        component={EditPrescription}
      />
      <Route path='/konselor/editbilling' exact component={EditBilling} />
      {/* <Route path="/asesmen/occupational-themes" exact component={OccupationalThemeAssessment} />
      <Route path="/asesmen/multiple-intelligences" exact component={MultipleIntelligencesAssessment} /> */}
      <Route path='/pages/privacy-policy' exact component={Policy} />
      {/* Add other konselor routes here */}
    </Switch>
  );
};

export default RoutesForKonselor;
