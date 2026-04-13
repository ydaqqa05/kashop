import React from 'react'
import Footer from '../components/footer/Footer2'
import { Outlet, useLocation } from 'react-router-dom'
import { Container } from '@mui/material'
import PromoBar from '../components/promoBar/PromoBar'
import MenuAppBar from '../components/navbar/AppBar'

export default function MainLayout() {
  return (
    <>
      <PromoBar />
      <MenuAppBar />
      
        <Outlet />
      

      
    </>
  );
}
