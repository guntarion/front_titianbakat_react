// src/client/components/ProtectedLink.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const ProtectedLink = ({ to, children }) => {
  const { user } = useAuth();
  const history = useHistory();

  const handleClick = (e) => {
    if (!user) {
      e.preventDefault();
      history.push('/login-titian-bakat');
    }
  };

  return (
    <Link to={to} onClick={handleClick}>
      {children}
    </Link>
  );
};

ProtectedLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedLink;