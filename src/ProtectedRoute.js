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
      render={props =>
        user ? (
          role === requiredRole ? (
            <Component {...props} />
          ) : (
            <Redirect to="/index-6" />
          )
        ) : (
          <Redirect to="/login-titian-bakat" />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  role: PropTypes.string.isRequired,
};

export default ProtectedRoute;
