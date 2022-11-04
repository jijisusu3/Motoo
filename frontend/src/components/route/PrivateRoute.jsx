import React from 'react';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const isLogin = localStorage.getItem('login-token')
  return !isLogin ? <Navigate to='/login' /> : children;
};

export default PrivateRoute;