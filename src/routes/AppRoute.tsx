import React from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import {  useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import { Container } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar';
import { Home } from '../pages/Home';
import { Article } from '../pages/Article';
import { Profile } from '../pages/Profile';

const AppRoute: React.FC = () => {

    const { isLoggedIn } = useAuth();
    const shouldShowBottomNavBar = !['/home'].includes(location.pathname);


  return (
    <Container maxWidth="sm" style={{ paddingBottom: shouldShowBottomNavBar ? '56px' : '0' }}>
        <Routes>
        <Route path="/login" element={
            <h1>Nisam ulogovan</h1>
        } />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/article"
        element={
          <ProtectedRoute>
            <Article />
          </ProtectedRoute>
        }
      />
       <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <BottomNavBar />
    </Container>
  );
};

export default AppRoute;
