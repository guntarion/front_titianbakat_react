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
        // Allow access to the home page for all users
        if (props.location.pathname === '/index-6' || props.location.pathname === '/') {
          return <Component {...props} />;
        }

        // For other routes, check authentication
        if (!user) {
          // User is not authenticated, redirect to login
          return <Redirect to={{
            pathname: "/login-titian-bakat",
            state: { from: props.location }
          }} />;
        }

        // User is authenticated, check for required role if specified
        if (requiredRole && role !== requiredRole) {
          // User doesn't have the required role, redirect to home
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
  role: PropTypes.string, // Optional
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.object
  })
};

export default ProtectedRoute;