import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import PropTypes from "prop-types"; // Import PropTypes

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { user, role } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user && allowedRoles.includes(role) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login-titian-bakat" />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired, // Add prop types validation for the component prop
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired // Add prop types validation for the allowedRoles prop
};

export default ProtectedRoute;