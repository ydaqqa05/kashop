import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import axios from 'axios'
import sofa from "../../../assets/image/sofa.webp";
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../../../validation/LoginSchema'
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function Login() {
     const [showPassword, setShowPassword] = useState(false);
    const {register,handleSubmit,formState: { errors }} =useForm({
        resolver: yupResolver(loginSchema),
    })
    const loginForm=async (values)=>{
        try{
const response=await axios.post(`https://knowledgeshop.runasp.net/api/auth/Account/Login`,values)
console.log(response);
        }catch(error){
            console.log(error.response?.data);
        }
    }
    return (
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} minHeight="100vh">
          <Box flex={1} display="flex" position={'relative'}>
          <Typography variant="h6" fontWeight="bold" mb={4} position={'absolute'} left={'50%'} >  3legant.  </Typography>
            <Box component="img" src={sofa} alt="sofa"
              sx={{ width: "100%",height: "100vh",objectFit: "cover",}}/>
          </Box>
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
    to=""
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
                <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#111", py: 1.5,
                borderRadius: 2,"&:hover": { backgroundColor: "#000",},}}> Sign In</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      );
}
