import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import {  Container } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar';
import { Home } from '../pages/Home';
import { Article } from '../pages/Article';
import Login from '../pages/Login';
import MenuAppBar from '../components/MenuAppBar';
import { Team } from '../pages/Team';

const AppRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const notShow = ['/login'].includes(location.pathname);

  return (
    <Container
      sx={{ minHeight: '100vh',width:'100%',backgroundColor:'#f5f5f5' }}
      maxWidth="sm"
      style={{ paddingBottom: notShow ? '0' : '56px',paddingLeft:0,paddingRight:0 }}
    >
      {isLoggedIn && <MenuAppBar/>}
      <Routes>
        <Route path="/login" element={<Login />} />
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
          path="/team"
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!notShow && <BottomNavBar />}
    </Container>
  );
};

export default AppRoute;
