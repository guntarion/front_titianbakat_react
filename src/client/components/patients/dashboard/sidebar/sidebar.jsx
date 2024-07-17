// src/client/components/patients/dashboard/sidebar/sidebar.jsx
import React from "react";
import { Link, useHistory } from "react-router-dom";
import IMG01 from "../../../../assets/images/patient.jpg";
import { auth } from "../../../../../firebase.js";
import { signOut } from "firebase/auth";
import { useAuth } from "../../../../../AuthContext";

const DashboardSidebar = () => {
  const pathname = window.location.pathname;
  const history = useHistory();
  const { setUser, setRole } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole(null);
      history.push("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="profile-sidebar">
      <div className="widget-profile pro-widget-content">
        <div className="profile-info-widget">
          <Link to="#0" className="booking-doc-img">
            <img src={IMG01} alt="User" />
          </Link>
          <div className="profile-det-info">
            <h3>Richard Wilson</h3>
            <div className="patient-details">
              <h5>
                <i className="fas fa-birthday-cake"></i> 24 Jul 1983, 38 years
              </h5>
              <h5 className="mb-0">
                <i className="fas fa-map-marker-alt"></i> Newyork, USA
              </h5>
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
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={pathname.includes("/accounts") ? "active" : ""}>
              <Link to="/user/accounts">
                <i className="fas fa-file-invoice-dollar"></i>
                <span>Accounts</span>
              </Link>
            </li>
            <li className={pathname.includes("/orders") ? "active" : ""}>
              <Link to="/user/orders">
                <i className="fas fa-list-alt"></i>
                <span>Orders</span>
                <small className="unread-msg">7</small>
              </Link>
            </li>
            <li
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
            <li className={pathname.includes("/profile") ? "active" : ""}>
              <Link to="/user/profile">
                <i className="fas fa-user-cog"></i>
                <span>Profile Settings</span>
              </Link>
            </li>
            <li
              className={pathname.includes("/change-password") ? "active" : ""}
            >
              <Link to="/user/change-password">
                <i className="fas fa-lock"></i>
                <span>Change Password</span>
              </Link>
            </li>
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
  );
};

export default DashboardSidebar;
