import React from 'react'
import { useLocation } from 'react-router-dom';

export default function ResetPassword() {
    const location = useLocation();
console.log(location)
    const codeFromState = location.state?.code;
    const codeFromStorage = localStorage.getItem("otp");
    
    const code = codeFromState || codeFromStorage;
    console.log(codeFromState)
    console.log(code);
  return (
    <div>ResetPassword</div>
  )
}
