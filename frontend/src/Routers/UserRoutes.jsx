import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home/Home';
import Profile from '../components/user/Profile/Profile';
import Login from '../components/user/authenticationPages/LoginPage';
import Signup from '../components/user/authenticationPages/SignupPage';

const UserRoutes = () => {
  const isAuthenticated = useSelector(state => state.auth.userInfo);
console.log(isAuthenticated);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> :<Signup />} />
      <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
    </Routes>
  );
};

export default UserRoutes;
