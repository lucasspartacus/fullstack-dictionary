import React from 'react';
import { Navigate } from 'react-router-dom';

// A wrapper component for protected routes
const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
