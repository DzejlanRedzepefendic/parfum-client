import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate, useLocation } from 'react-router-dom';
import { Store } from '@mui/icons-material';

const BottomNavBar: React.FC = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/home':
        setValue(0);
        break;
      case '/article':
        setValue(1);
        break;
      case '/team':
        setValue(2);
        break;
      case '/company':
        setValue(3);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/home');
        break;
      case 1:
        navigate('/article');
        break;
      case 2:
        navigate('/team');
        break;
      case 3:
        navigate('/company');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <BottomNavigationAction label="Pocetna" icon={<HomeIcon />} />
      <BottomNavigationAction label="Parfemi" icon={<ArticleIcon />} />
      <BottomNavigationAction label="Tim" icon={<AccountCircleIcon />} />
      <BottomNavigationAction label="Musterije" icon={<Store />} />
    </BottomNavigation>
  );
};

export default BottomNavBar;
