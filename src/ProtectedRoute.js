// src/ProtectedRoute.jsx

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component, role,  ...rest }) => {
  const { user} = useAuth();

  return (
      <Route
        {...rest}
        render={(props) =>
          user && user.role === role ? (
            <Component {...props} />
          ) : (
            <Redirect to="/index-6" /> // Redirect to home page instead of login
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
