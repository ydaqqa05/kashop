import { Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <>
    <Outlet/>
  </>
  )
}
