import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {  Assignment, NotificationAddOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { useGetAllAuditQuery } from '../api/queries/audit/useGetAllAuditQuery';
import { getTitleFromPathname } from '../utils/locationBuilder';
import {useGetParfumNotification} from "../api/queries/refill/useGetParfumNotification.ts";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const {data} = useGetAllAuditQuery();
  const {data:dataOfNotification} = useGetParfumNotification({days:99999, page:1, limit:999})




  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="fixed" sx={{ top: 0, zIndex: 1100 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {getTitleFromPathname(location.pathname)}
          </Typography>
          <div>
          <IconButton onClick={()=>{
            navigate('/')
          }}>
            <Badge badgeContent={dataOfNotification?.data?.length} color="error">
          <NotificationAddOutlined color={dataOfNotification?.data?.length ? 'warning' :'inherit'} />
            </Badge>
          </IconButton>
          </div>
          <div>
          <IconButton onClick={()=>{
            navigate('/logs')
          }}>
            <Badge badgeContent={data?.totalNotSeenCount} color="error">
           {data && <Assignment color={data?.totalNotSeenCount > 0 ? 'warning' :'inherit'} />}
            </Badge>
          </IconButton>
          </div>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
             <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/*<MenuItem onClick={handleClose}>Tim</MenuItem>*/}
              {/*<MenuItem onClick={handleClose}>Moj Profil</MenuItem>*/}
              <MenuItem onClick={logout}>Odjavi se</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar /> 
    </Box>
  );
}
