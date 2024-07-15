import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import FeatherIcon from "feather-icons-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  const config = "/react/template";

  // State variables for menu and navbar
  const [navbar, setNavbar] = useState(false);
  const [isSideMenu, setSideMenu] = useState("");
  // const [menu, setMenu] = useState(false);

  let pathnames = window.location.pathname;

  const onHandleMobileMenu = () => {
    document.getElementsByTagName("html")[0].classList.add("menu-opened");
  };

  const onhandleCloseMenu = () => {
    document.getElementsByTagName("html")[0].classList.remove("menu-opened");
  };

  // Handle navbar background change on scroll
  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  // Toggle side menu
  const toggleSidebar = (value) => {
    setSideMenu(value);
  };

  return (
    <>
      {!pathnames.includes("home1") && (
        <header
          className={`header ${
            pathnames.includes("/index-6")
              ? "header-trans header-eleven"
              : "header-fixed header-one"
          }`}
          style={
            pathnames.includes("/index-6") && navbar
              ? { background: "rgb(30, 93, 146)" }
              : {}
          }
        >
          <div className="container">
            <nav
              className={`navbar navbar-expand-lg header-nav ${
                pathnames.includes("home1") ? "nav-transparent" : ""
              }`}
            >
              <div className="navbar-header">
                <Link to="#0" id="mobile_btn" onClick={() => onHandleMobileMenu()}>
                  <span className="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </Link>
                <Link to="/index-6" className="navbar-brand logo">
                  <img src={logo} className="img-fluid" alt="Logo" />
                </Link>
              </div>
              <div className="main-menu-wrapper">
                <div className="menu-header">
                  <Link to="/index-6" className="menu-logo">
                    <img src={logo} className="img-fluid" alt="Logo" />
                  </Link>
                  <Link to="#0" id="menu_close" className="menu-close" onClick={() => onhandleCloseMenu()}>
                    <i className="fas fa-times"></i>
                  </Link>
                </div>
                <ul className={`main-nav ${pathnames.includes("home4") ? "white-font" : ""}`}>
                  <li>
                    <Link to="/index-6">
                      Home
                    </Link>
                  </li>
                  <li className={`has-submenu ${pathnames.includes("/doctor") ? "active" : ""}`}>
                    <Link to="#" className={isSideMenu === "doctors" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu === "doctors" ? "" : "doctors")}>
                      Konselor <i className="fas fa-chevron-down" />
                    </Link>
                    {isSideMenu === "doctors" && (
                      <ul className="submenu">
                        <li className={pathnames.includes("doctor-dashboard") ? "active" : ""}>
                          <Link to="/doctor/doctor-dashboard" onClick={() => onhandleCloseMenu()}>
                            Doctor Dashboard
                          </Link>
                        </li>
                        {/* <li className={pathnames.includes("appointments") ? "active" : ""}>
                          <Link to="/doctor/appointments" onClick={() => onhandleCloseMenu()}>
                            Appointments
                          </Link>
                        </li>
                        <li className={pathnames.includes("schedule-timing") ? "active" : ""}>
                          <Link to="/doctor/schedule-timing" onClick={() => onhandleCloseMenu()}>
                            Schedule Timing
                          </Link>
                        </li> */}
                        <li className={pathnames.includes("my-patients") ? "active" : ""}>
                          <Link to="/doctor/my-patients" onClick={() => onhandleCloseMenu()}>
                            Patients List
                          </Link>
                        </li>
                        <li className={pathnames.includes("patient-profile") ? "active" : ""}>
                          <Link to="/doctor/patient-profile" onClick={() => onhandleCloseMenu()}>
                            Patients Profile
                          </Link>
                        </li>
                        {/* <li className={pathnames.includes("chat-doctor") ? "active" : ""}>
                          <Link to="/doctor/chat-doctor" onClick={() => onhandleCloseMenu()}>
                            Chat
                          </Link>
                        </li>
                        <li className={pathnames.includes("invoice") ? "active" : ""}>
                          <Link to="/doctor/invoice" onClick={() => onhandleCloseMenu()}>
                            Invoices
                          </Link>
                        </li> */}
                        <li className={pathnames.includes("profile-setting") ? "active" : ""}>
                          <Link to="/doctor/profile-setting" onClick={() => onhandleCloseMenu()}>
                            Profile Settings
                          </Link>
                        </li>
                        <li className={pathnames.includes("review") ? "active" : ""}>
                          <Link to="/doctor/review" onClick={() => onhandleCloseMenu()}>
                            Reviews
                          </Link>
                        </li>
                        <li className={pathnames.includes("doctor-register") ? "active" : ""}>
                          <Link to="/doctor/doctor-register" onClick={() => onhandleCloseMenu()}>
                            Doctor Register
                          </Link>
                        </li>
                        {/* <li className={`has-submenu ${pathnames.includes("doctor-blog") ? "active" : ""}`}>
                          <Link to="/doctor-blog" onClick={() => onhandleCloseMenu()}>
                            Blog
                          </Link>
                          <ul className="submenu">
                            <li><Link to="/doctor-blog" onClick={() => onhandleCloseMenu()}>Blog</Link></li>
                            <li><Link to="/blog/blog-details" onClick={() => onhandleCloseMenu()}>Blog view</Link></li>
                            <li><Link to="/blog/doctor-add-blog" onClick={() => onhandleCloseMenu()}>Add Blog</Link></li>
                          </ul>
                        </li> */}
                      </ul>
                    )}
                  </li>
                  <li className={`has-submenu ${pathnames.includes("/patient") ? "active" : ""}`}>
                    <Link to="#" className={isSideMenu === "patients" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu === "patients" ? "" : "patients")}>
                      Anda <i className="fas fa-chevron-down" />
                    </Link>
                    {isSideMenu === "patients" && (
                      <ul className="submenu">
                        {/* <li className={pathnames.includes("doctor-list") ? "active" : ""}>
                          <Link to="/patient/doctor-list" onClick={() => onhandleCloseMenu()}>
                            Map List
                          </Link>
                        </li>
                        <li className={pathnames.includes("doctor-profile") ? "active" : ""}>
                          <Link to="/patient/doctor-profile" onClick={() => onhandleCloseMenu()}>
                            Doctor Profile
                          </Link>
                        </li>
                        <li className={pathnames.includes("booking1") ? "active" : ""}>
                          <Link to="/patient/booking1" onClick={() => onhandleCloseMenu()}>
                            Booking
                          </Link>
                        </li>
                        <li className={pathnames.includes("checkout") ? "active" : ""}>
                          <Link to="/patient/checkout" onClick={() => onhandleCloseMenu()}>
                            Checkout
                          </Link>
                        </li>
                        <li className={pathnames.includes("booking-success") ? "active" : ""}>
                          <Link to="/patient/booking-success" onClick={() => onhandleCloseMenu()}>
                            Booking Success
                          </Link>
                        </li> */}
                        <li className={pathnames.includes("dashboard") ? "active" : ""}>
                          <Link to="/patient/dashboard" onClick={() => onhandleCloseMenu()}>
                            Patient Dashboard
                          </Link>
                        </li>
                        <li className={pathnames.includes("profile") ? "active" : ""}>
                          <Link to="/patient/profile" onClick={() => onhandleCloseMenu()}>
                            Profile Settings
                          </Link>
                        </li>
                        <li className={pathnames.includes("change-password") ? "active" : ""}>
                          <Link to="/patient/change-password" onClick={() => onhandleCloseMenu()}>
                            Change Password
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className={`has-submenu ${pathnames.includes("/Pharmacy") ? "active" : ""}`}>
                    <Link to="#" className={isSideMenu === "pharmacy" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu === "pharmacy" ? "" : "pharmacy")}>
                      Asesmen <i className="fas fa-chevron-down" />
                    </Link>
                    {isSideMenu === "pharmacy" && (
                      <ul className="submenu">
                        {/* <li className={pathnames.includes("Pharmacy-index") ? "active" : ""}>
                          <Link to="/Pharmacy/Pharmacy-index">Pharmacy</Link>
                        </li>
                        <li className={pathnames.includes("Pharmacy-details") ? "active" : ""}>
                          <Link to="/Pharmacy/Pharmacy-details">Pharmacy Details</Link>
                        </li>
                        <li className={pathnames.includes("pharmacy-search") ? "active" : ""}>
                          <Link to="/Pharmacy/pharmacy-search">Pharmacy Search</Link>
                        </li> */}
                        <li className={pathnames.includes("product-asesmen") ? "active" : ""}>
                          <Link to="/page-anda/page-asesmen-one">Product Asesmen 1</Link>
                        </li>
                        <li className={pathnames.includes("product-all") ? "active" : ""}>
                          <Link to="/Pharmacy/product-all">Product</Link>
                        </li>
                        
                        <li className={pathnames.includes("product-description") ? "active" : ""}>
                          <Link to="/Pharmacy/product-description">Product Description</Link>
                        </li>
                        <li className={pathnames.includes("cart") ? "active" : ""}>
                          <Link to="/Pharmacy/cart">Cart</Link>
                        </li>
                        <li className={pathnames.includes("product-checkout") ? "active" : ""}>
                          <Link to="/Pharmacy/product-checkout">Product Checkout</Link>
                        </li>
                        <li className={pathnames.includes("payment-success") ? "active" : ""}>
                          <Link to="/Pharmacy/payment-success">Payment Success</Link>
                        </li>
                        <li className={pathnames.includes("pharmacy-register") ? "active" : ""}>
                          <Link to="/Pharmacy/pharmacy-register">Pharmacy Register</Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className={`has-submenu ${pathnames.includes("/pages") ? "active" : ""}`}>
                    <Link to="#" className={isSideMenu === "pages" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu === "pages" ? "" : "pages")}>
                      Pages <i className="fas fa-chevron-down" />
                    </Link>
                    {isSideMenu === "pages" && (
                      <ul className="submenu">
                        {/* <li className={pathnames.includes("/voice-call") ? "active" : ""}>
                          <Link to="/pages/voice-call" onClick={() => onhandleCloseMenu()}>Voice Call</Link>
                        </li>
                        <li className={pathnames.includes("/video-call") ? "active" : ""}>
                          <Link to="/pages/video-call" onClick={() => onhandleCloseMenu()}>Video Call</Link>
                        </li>
                        <li className={pathnames.includes("/calendar") ? "active" : ""}>
                          <Link to="/pages/calendar" onClick={() => onhandleCloseMenu()}>Calendar</Link>
                        </li> */}
                        <li className={pathnames.includes("/onboarding-email") ? "active" : ""}>
                          <Link to="/pages/onboarding-email" onClick={() => onhandleCloseMenu()}>Doctor Onboarding</Link>
                        </li>
                        <li className={pathnames.includes("/patient-email") ? "active" : ""}>
                          <Link to="/pages/patient-email" onClick={() => onhandleCloseMenu()}>Patient Onboarding</Link>
                        </li>
                        <li className={pathnames.includes("/component") ? "active" : ""}>
                          <Link to="/pages/component" onClick={() => onhandleCloseMenu()}>Components</Link>
                        </li>
                        <li className={`has-submenu ${pathnames.includes("/invoice-view") ? "active" : ""}`}>
                          <Link to="#0" className={isSideMenu === "invoices" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu === "invoices" ? "" : "invoices")}>
                            Invoices
                          </Link>
                          {isSideMenu === "invoices" && (
                            <ul className="submenu">
                              <li className={pathnames.includes("invoice") ? "active" : ""}>
                                <Link to="/pages/invoice" onClick={() => onhandleCloseMenu()}>Invoices</Link>
                              </li>
                              <li className={pathnames.includes("-view") ? "active" : ""}>
                                <Link to="/pages/invoice-view" onClick={() => onhandleCloseMenu()}>Invoice View</Link>
                              </li>
                            </ul>
                          )}
                        </li>
                        <li className={pathnames.includes("/blank-page") ? "active" : ""}>
                          <Link to="/pages/blank-page" onClick={() => onhandleCloseMenu()}>Starter Page</Link>
                        </li>
                        <li className={pathnames.includes("/aboutus") ? "active" : ""}>
                          <Link to="/aboutus" onClick={() => onhandleCloseMenu()}>About Us</Link>
                        </li>
                        <li className={pathnames.includes("/contactus") ? "active" : ""}>
                          <Link to="/contactus" onClick={() => onhandleCloseMenu()}>Contact Us</Link>
                        </li>
                        <li className={pathnames.includes("login") ? "active" : ""}>
                          <Link to="/login" onClick={() => onhandleCloseMenu()}>Login</Link>
                        </li>
                        <li className={pathnames.includes("/register") ? "active" : ""}>
                          <Link to="/register" onClick={() => onhandleCloseMenu()}>Register</Link>
                        </li>
                        <li className={pathnames === "/forgot-password" ? "active" : ""}>
                          <Link to="/forgot-password" onClick={() => onhandleCloseMenu()}>Forgot Password</Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className={`has-submenu ${pathnames.includes("/blog") ? "active" : ""}`}>
                    <Link to="#" className={isSideMenu === "blog" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu === "blog" ? "" : "blog")}>
                      Blog <i className="fas fa-chevron-down" />
                    </Link>
                    {isSideMenu === "blog" && (
                      <ul className="submenu">
                        <li className={pathnames.includes("blog-list") ? "active" : ""}>
                          <Link to="/blog/blog-list" onClick={() => onhandleCloseMenu()}>Blog List</Link>
                        </li>
                        <li className={pathnames.includes("blog-grid") ? "active" : ""}>
                          <Link to="/blog/blog-grid" onClick={() => onhandleCloseMenu()}>Blog Grid</Link>
                        </li>
                        <li className={pathnames.includes("blog-details") ? "active" : ""}>
                          <Link to="/blog/blog-details" onClick={() => onhandleCloseMenu()}>Blog Details</Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="has-submenu">
                    <Link to="#" className={isSideMenu === "admin" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu === "admin" ? "" : "admin")}>
                      Admin <i className="fas fa-chevron-down" />
                    </Link>
                    {isSideMenu === "admin" && (
                      <ul className="submenu">
                        <li>
                          <Link to={`${config}admin/login`} target="_blank">
                            Admin
                          </Link>
                        </li>
                        <li>
                          <Link to={`${config}pharmacyadmin`} target="_blank">
                            Pharmacy Admin
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
              {pathnames.includes("/index-6") ? (
                <ul className="nav header-navbar-rht">
                  <li className="nav-item">
                    <Link className="nav-link header-login" to="/login">
                      <i className="me-2">
                        <FeatherIcon icon="lock" />
                      </i>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link header-login btn-light-blue" to="/login">
                      <i className="me-2">
                        <FeatherIcon icon="user" />
                      </i>
                      Login
                    </Link>
                  </li>
                </ul>
              ) : null}
            </nav>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
