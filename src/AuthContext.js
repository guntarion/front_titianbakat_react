import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

// Create the context
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState("user"); // default value for isAuth, it could be "admin" or "user"
  const [role, setRole] = useState(""); // add role state

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node // Add prop types validation for the children prop
};