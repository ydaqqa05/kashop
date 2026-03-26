import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import LeftSide from '../../../components/authSide/LeftSide';
import useForgetPassword from '../../../hooks/useForgetPassword'
import { forgetPasswordSchema } from '../../../validation/ForgetPasswordSchema'

export default function ForgetPassword() {

  const navigate = useNavigate()
const [time,setTime]=useState(90)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
    mode: 'onBlur'
  })

  const { mutate: sendCode, isPending } = useForgetPassword()

  const ForgotPasswordForm = (values) => {
    sendCode(values.email, {
      onSuccess: () => navigate('/verify'),
      onError: (error) => console.log(error.response?.data)
    })
  }
  const minutes = Math.floor(time / 60);
const seconds = time % 60;
const resendOTP=()=>{
  setTime(90)
};
useEffect(() => {
  if (time <= 0) return;

  const interval = setInterval(() => {
    setTime((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [time]);
  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} minHeight="100vh">
      
      <LeftSide />

      
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ background: '#f9fafb',textAlign:'center' }}
      >
        <Box width="100%" maxWidth={420} px={3}>

         
          <Typography
            variant="h4"
            fontWeight="bold"

            sx={{ mb: 1, color: '#111827' }}
          >
            Verfy Code
          </Typography>

        
          <Typography
            variant="body2"
            sx={{ mb: 4, color: '#6b7280', lineHeight: 1.6,fontSize:"16px"}}
          >
            Enter the 6-digit code sent to your email
          </Typography>

       
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            onSubmit={handleSubmit(ForgotPasswordForm)}
          >
            <TextField
              {...register("code")}
              fullWidth
              placeholder="Email address"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
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

<Typography
            variant="body2"
            sx={{ mb: 4, color: '#6b7280', lineHeight: 1.6,fontSize:"16px"}}
          >
            Didn't receive the code?
            <Button
  onClick={resendOTP}
  disabled={time > 0}
  sx={{
    fontWeight: 600,
    color: time > 0 ? '#9ca3af' : '#FF5630',
    textTransform: 'none'
  }}
>
  
  <Box component="span" sx={{ fontWeight: 'bold',color:time>0 ?'#000':'red'}}>
   Resend{" "} {minutes < 10 ? `0${minutes}` : minutes}:
    {seconds < 10 ? `0${seconds}` : seconds}
  </Box>
</Button>
          </Typography>
            <Button
              type="submit"
              fullWidth
              disabled={isPending}
              sx={{
                py: 1.6,
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '1rem',
                color: '#fff',
                background: 'linear-gradient(90deg, #111827, #1f2937)',
                textTransform: 'none',
                transition: '0.3s',
                '&:hover': {
                  background: 'linear-gradient(90deg, #000000, #111827)',
                },
              }}
            >
              {isPending ? "Sending..." : "Send Code"}
            </Button>

          </Box>
        </Box>
      </Box>
    </Box>
  )
}