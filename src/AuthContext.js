// src/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create the context
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState("user");
  const [role, setRole] = useState("user");
  const [user, setUser] = useState(null); // Add user state

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, role, setRole, user, setUser }}>
        {children}
      </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };
