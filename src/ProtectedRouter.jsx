import React from 'react'
import { useAuthStore } from './store/useAuthStore'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectedRouter({children}) {
    console.log("ProtectedRouter")
    const token=useAuthStore((state)=>state.token)
    if(!token)
     {   return <Navigate to='/login'/>}
  return children
}
