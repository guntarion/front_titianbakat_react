// src/ProtectedRoute.jsx

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component, role: requiredRole, ...rest }) => {
  const { user, role } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          // User is not authenticated
          return <Redirect to="/login-titian-bakat" />;
        }

        if (requiredRole && role !== requiredRole) {
          // User doesn't have the required role
          return <Redirect to="/index-6" />;
        }

        // User is authenticated and has the required role (if specified)
        return <Component {...props} />;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  role: PropTypes.string, // Changed to optional
};

export default ProtectedRoute;