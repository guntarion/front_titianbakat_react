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
                          <Link to="/konselor/doctor-dashboard" onClick={() => onhandleCloseMenu()}>
                            Doctor Dashboard
                          </Link>
                        </li>
                        
                        <li className={pathnames.includes("my-patients") ? "active" : ""}>
                          <Link to="/konselor/my-patients" onClick={() => onhandleCloseMenu()}>
                            User List
                          </Link>
                        </li>
                        <li className={pathnames.includes("patient-profile") ? "active" : ""}>
                          <Link to="/konselor/patient-profile" onClick={() => onhandleCloseMenu()}>
                            User Profile
                          </Link>
                        </li>
                        <li className={pathnames.includes("profile-setting") ? "active" : ""}>
                          <Link to="/konselor/profile-setting" onClick={() => onhandleCloseMenu()}>
                            Profile Settings
                          </Link>
                        </li>
                        
                      </ul>
                    )}
                  </li>
                  <li className={`has-submenu ${pathnames.includes("/patient") ? "active" : ""}`}>
                    <Link to="#" className={isSideMenu === "patients" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu === "patients" ? "" : "patients")}>
                      Anda <i className="fas fa-chevron-down" />
                    </Link>
                    {isSideMenu === "patients" && (
                      <ul className="submenu">
                        <li className={pathnames.includes("dashboard") ? "active" : ""}>
                          <Link to="/user/dashboard" onClick={() => onhandleCloseMenu()}>
                            Patient Dashboard
                          </Link>
                        </li>
                        <li className={pathnames.includes("profile") ? "active" : ""}>
                          <Link to="/user/profile" onClick={() => onhandleCloseMenu()}>
                            Profile Settings
                          </Link>
                        </li>
                        <li className={pathnames.includes("change-password") ? "active" : ""}>
                          <Link to="/user/change-password" onClick={() => onhandleCloseMenu()}>
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
                        <li className={pathnames.includes("login") ? "active" : ""}>
                          <Link to="/signup">Signup TitianBakat</Link>
                        </li>
                        <li className={pathnames.includes("login") ? "active" : ""}>
                          <Link to="/login-titian-bakat">Login TitianBakat</Link>
                        </li>
                        <li className={pathnames.includes("product-asesmen") ? "active" : ""}>
                          <Link to="/page-anda/page-asesmen-one">Product Asesmen 1</Link>
                        </li>
                        <li className={pathnames.includes("product-all") ? "active" : ""}>
                          <Link to="/asesmen/product-all">Product</Link>
                        </li>
                        
                        <li className={pathnames.includes("product-description") ? "active" : ""}>
                          <Link to="/asesmen/product-description">Product Description</Link>
                        </li>
                        <li className={pathnames.includes("cart") ? "active" : ""}>
                          <Link to="/asesmen/cart">Cart</Link>
                        </li>
                        <li className={pathnames.includes("product-checkout") ? "active" : ""}>
                          <Link to="/asesmen/product-checkout">Product Checkout</Link>
                        </li>
                        <li className={pathnames.includes("payment-success") ? "active" : ""}>
                          <Link to="/asesmen/payment-success">Payment Success</Link>
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
                    <Link className="nav-link header-login" to="/signup">
                      <i className="me-2">
                        <FeatherIcon icon="lock" />
                      </i>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link header-login btn-light-blue" to="/login-titian-bakat">
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
