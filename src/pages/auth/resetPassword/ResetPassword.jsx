
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LeftSide from '../../../components/authSide/LeftSide';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ResetPasswordSchema } from '../../../validation/ResetPasswordSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axiosInstance from '../../../api/axiosInstance';

export default function ResetPassword() {
    const location = useLocation();
    const email =location.state?.email || localStorage.getItem("email");
    const codeFromState = location.state?.code;
    const codeFromStorage = localStorage.getItem("otp");
    
    const code = codeFromState || codeFromStorage;
   
    const navigate=useNavigate()
    const [apiError, setApiError] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {register,handleSubmit,formState: { errors }} =useForm({
        resolver: yupResolver(ResetPasswordSchema),mode:'onBlur'
    })
     const resetPasswordForm=async (values)=>{
        setApiError("");
            try{
                const payload = {
                    code,
                    newPassword: values.newPassword,
                   email
                  };
    const response=await axiosInstance.patch(`auth/Account/ResetPassword`,payload)
    console.log(response)
    if(response.status ==200){
      console.log(response)
      navigate('/login')
    }
    console.log(response);
            }catch(error){
                if (error.response) {
                    setApiError(error.response.data.message );
                    navigate('/verify')
                  } else {
                    setApiError("Something went wrong ❌");
                  }
            }
        }
  return (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} minHeight="100vh">
          <LeftSide/>
          <Box flex={1} display="flex" justifyContent="center" alignItems="center"p={4}>
            <Box width="100%" maxWidth={400}>
       
              <Typography variant="h4" fontWeight="bold" sx={{mb:1}}>Reset Password</Typography>
              
              
               <Typography
                          variant="body2"
                          sx={{ mb: 4, color: '#6b7280', lineHeight: 1.6,fontSize:"16px"}}
                        >
                          Enter your new password below
                        </Typography>
              {apiError && (
  <Typography
    sx={{
      
      color: "#b91c1c",
      padding: "10px",
      borderRadius: "8px",
      mb: 2,
      textAlign: "center",
      fontWeight: 500
    }}
  >
    {apiError}
  </Typography>
)}
              <Box component="form" display="flex" flexDirection="column" gap={3}
                onSubmit={handleSubmit(resetPasswordForm)}>
               
               <input type="hidden" {...register("code")} value={code} />
                
              
    
                <TextField {...register("newPassword")} label="New Password" variant="outlined" fullWidth
                  error={errors.newPassword} helperText={errors.newPassword?.message} type={showNewPassword ? "text" : "password"} InputProps={{endAdornment: (<InputAdornment position="end">
                    <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? <Visibility /> : <VisibilityOff /> }</IconButton> </InputAdornment>
                  ),
                }} sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      background: '#fff',
                      '& fieldset': {
                        borderColor: '#e5e7eb',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#111827',
                      },
                    },
                  }} />
                
                <TextField {...register("confirmPassword")}   label="Confirm New Password" type={showConfirmPassword ? "text" : "password"}
                  variant="outlined" fullWidth error={errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{endAdornment: (<InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff /> }</IconButton> </InputAdornment>
                    ),
                  }} sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      background: '#fff',
                      '& fieldset': {
                        borderColor: '#e5e7eb',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#111827',
                      },
                    },
                  }}
                />
               <input type="hidden" {...register("email")} value={email} />
                
              
                <Button type="submit" variant="contained" fullWidth sx={{
  py: 1.6,
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '1rem',
  color: '#fff',
  background: 'linear-gradient(90deg, #111827, #1f2937)',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(90deg, #000000, #111827)',
  },
}}> Save Password</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      );
  
}
