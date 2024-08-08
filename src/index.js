// src/index.js

import React from "react";
import ReactDOM from "react-dom";  // Changed from react-dom/client to react-dom
import AppRouter from "./approuter";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider
import "./client/assets/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-image-lightbox/style.css";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

if (window.location.pathname.includes("pharmacyadmin")) {
  require("./pharmacyadmin/assets/plugins/fontawesome/css/fontawesome.min.css");
  require("./pharmacyadmin/assets/plugins/fontawesome/css/all.min.css");
  require("./pharmacyadmin/assets/css/font-awesome.min.css");
  require("./pharmacyadmin/assets/css/custom.css");
  require("./pharmacyadmin/assets/css/feathericon.min.css");
  require("./pharmacyadmin/assets/js/feather.min.js");
  require("./pharmacyadmin/assets/css/bootstrap.min.css");
} else if (window.location.pathname.includes("admin")) {
  require("./admin/assets/css/feathericon.min.css");
  require("./admin/assets/js/feather.min.js");
  require("./admin/assets/plugins/fontawesome/css/all.min.css");
  require("./admin/assets/css/font-awesome.min.css");
  require("./admin/assets/css/custom.css");
} else {
  require("./client/assets/css/all.css");
  require("./client/assets/css/all.min.css");
  require("./client/assets/css/fontawesome.min.css");
  require("./client/assets/css/custom.css")
  require("../src/client/components/customstyleclient.css");
}

const rootElement = document.getElementById("root");
// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <AuthProvider>
    <AppRouter />
  </AuthProvider>,
  rootElement  // Directly pass rootElement to ReactDOM.render
);