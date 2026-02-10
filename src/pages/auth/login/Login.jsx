import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../../../validation/LoginSchema'


export default function Login() {
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
  <Box component={'section'} className='login-form' py={5}>
 <Typography component={'h1'} variant='h1'>Log in</Typography>
 <Box component={'form'} display={'flex'} flexDirection={'column'} gap={2} mt={3} alignItems={'center'}
                onSubmit={handleSubmit(loginForm)}>
                <TextField {...register('email')} id="outlined-basic" fullWidth label="Email" variant="outlined" 
                error={errors.email} helperText={errors.email?.message}/>
                <TextField {...register('password')} type='password' id="outlined-basic" fullWidth label="Password" variant="outlined"
                error={errors.password} helperText={errors.password?.message} />
                <Button variant="contained" type='submit'>Log in</Button>
            </Box>
  </Box>
  
  )
}
