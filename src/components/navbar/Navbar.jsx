import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import useCart from '../../hooks/useCart';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18next';
import useThemeStore from '../../store/useThemeStore';

export default function Navbar() {
  const token =useAuthStore((state)=>state.token)
  const logout=useAuthStore((state)=>state.logout)
  const {t}=useTranslation()
  const changeLanguage = () => {
    const newLng=i18n.language==="ar"?"en":"ar"
    i18n.changeLanguage(newLng);
  }
  const {data}=useCart()
  const cartCount=data?.items?.length||0
  const navigate=useNavigate();
  const handleLogout=()=>{
logout();
navigate('/login')
  }
  const mode=useThemeStore((state)=>state.mode)
  const toggleTheme=useThemeStore((state)=>state.toggleTheme)
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color='#FFFFFF'>
            <Toolbar>
             
              <Typography variant="h5" component="div" sx={{ flexGrow: 1,fontWeight:'bold' }}>
              3legant.
              </Typography>
             <Button onClick={changeLanguage} color='inherit'>
              {i18n.language === "ar"?"EN":"AR"}
             </Button>
             <Button onClick={toggleTheme} color='inherit'>
              {mode === "light"?"Dark":"light"}
             </Button>
             <Box sx={{display:{xs:'none',sm:'flex'},gap:3,alignItems:'center'}}>
                <Link component={RouterLink} to={'/'} color="inherit" underline='none'>{t('Home')}</Link>
                {token?
                (<>
                <Badge badgeContent={cartCount} color='secondary'> <Link component={RouterLink} to={'/cart'} color="inherit" underline='none'>{t('Cart')}</Link></Badge>
                <Link component={RouterLink} to={'/profile'} color="inherit" underline='none'>{t('Profile')}</Link>

                 <Link component={'button'} onClick={handleLogout} color="inherit" underline='none'>{t('Logout')}</Link>
                </>):
                (<>
                 <Link component={RouterLink} to={'/login'} color="inherit" underline='none'>{t('Login')}</Link>
                <Link component={RouterLink} to={'/register'} color="inherit" underline='none'>{t('Register')}</Link>
                </>)
                }
               
               
              </Box>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2,display:{xs:'flex',sm:'none'} }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      );
}
