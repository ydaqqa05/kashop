import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import axios from 'axios'

import React, { useState } from 'react'
import { useForm, Watch } from 'react-hook-form'
import { loginSchema } from '../../../validation/LoginSchema'
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuthStore } from '../../../store/useAuthStore';
import axiosInstance from '../../../api/axiosInstance';
import LeftSide from '../../../components/authSide/LeftSide';


export default function Login() {
  const setToken=useAuthStore((state)=>state.setToken)


  const navigate=useNavigate()
     const [showPassword, setShowPassword] = useState(false);
    const {register,handleSubmit,watch,formState: { errors }} =useForm({
        resolver: yupResolver(loginSchema),mode:'onBlur'
    })
     const email = watch("email");
    const loginForm=async (values)=>{
        try{
const response=await axiosInstance.post(`auth/Account/Login`,values)
if(response.status ==200){
 
  console.log(response)
  setToken(response.data.accessToken)
  navigate('/')
}
console.log(response);
        }catch(error){
            console.log(error.response?.data);
        }
    }
    return (
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} minHeight="100vh">
          <LeftSide/>
          <Box flex={1} display="flex" justifyContent="center" alignItems="center"p={4}>
            <Box width="100%" maxWidth={400}>
       
              <Typography variant="h4" fontWeight="bold">Sign In</Typography>
              
              <Typography variant="body2" mt={1} mb={3}>
                Already have an account?{" "}
                <Link to="/register" style={{ color: "#4caf50", textDecoration: "none" }}> Sign Up </Link>
              </Typography>
    
              <Box component="form" display="flex" flexDirection="column" gap={3}
                onSubmit={handleSubmit(loginForm)}>
               
              
    
                <TextField {...register("email")} label="Email address" variant="standard" fullWidth
                  error={errors.email} helperText={errors.email?.message} />
                
                <TextField {...register("password")} label="Password" type={showPassword ? "text" : "password"}
                  variant="standard" fullWidth error={errors.password}
                  helperText={errors.password?.message}
                  InputProps={{endAdornment: (<InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <Visibility /> : <VisibilityOff /> }</IconButton> </InputAdornment>
                    ),
                  }}
                />
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <FormControlLabel control={<Checkbox />} 
                label={ <Typography variant="body2" style={{color:"#6C7275"}}> Remember me
                    </Typography>}/>
                    <Link
    to="/forgetpassword"
    state={{email}}
    onClick={() => localStorage.setItem("email", email)}
    style={{
      textDecoration: "none",
      fontSize: "14px",
      color: "#000",
      fontWeight: "bold",
    }}
  >
    Forgot password?
  </Link>
                    </Box>
                <Button type="submit" variant="contained" fullWidth sx={{py: 1.6,
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '1rem',
  color: '#fff',
  background: 'linear-gradient(90deg, #111827, #1f2937)',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(90deg, #000000, #111827)',
  },}}> Sign In</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      );
}
