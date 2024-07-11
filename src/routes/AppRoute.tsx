import React, {  } from 'react';
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
import { Logs } from '../pages/Logs';
import { Company } from '../pages/Company';
import CompanyDetails from '../pages/CompanyDetails';
import Profile from "../pages/Profile.tsx";
import CompanyRefillDetail from "../pages/CompanyRefillDetail.tsx";

const AppRoute: React.FC = () => {

  const { isLoggedIn } = useAuth();
  const location = useLocation();

  console.log('isLoggedIn',isLoggedIn);

  if(isLoggedIn === null){
    return <div>Loading...</div>
  }


  const notShow = ['/login'].includes(location.pathname);

  return (
    <Container
      sx={{ minHeight: '100vh',width:'100%' }}
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
        <Route
        path='/logs'
        element={
          <ProtectedRoute>
            <Logs/>
          </ProtectedRoute>
        }
        />
        <Route path='/company' element={
          <ProtectedRoute>
             <Company/>
          </ProtectedRoute>
        } />
        <Route path='/company/:id' element={
          <ProtectedRoute>
            <CompanyDetails/>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
        } />

        <Route path='/company/:companyId/refills' element={
          <ProtectedRoute>
            <CompanyRefillDetail />
          </ProtectedRoute>
        } />
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!notShow && <BottomNavBar />}
    </Container>
  );
};

export default AppRoute;
