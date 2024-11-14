import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ element }) => {
  // const { user } = useContext(UserContext);
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
