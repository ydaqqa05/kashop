import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import LeftSide from '../../../components/authSide/LeftSide';
import useForgetPassword from '../../../hooks/useForgetPassword'
import { forgetPasswordSchema } from '../../../validation/ForgetPasswordSchema'

export default function ForgetPassword() {

  const navigate = useNavigate()

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

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} minHeight="100vh">
      
      <LeftSide />

      
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ background: '#f9fafb' }}
      >
        <Box width="100%" maxWidth={420} px={3}>

         
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 1, color: '#111827' }}
          >
            Forgot Password?
          </Typography>

        
          <Typography
            variant="body2"
            sx={{ mb: 4, color: '#6b7280', lineHeight: 1.6,fontSize:"16px"}}
          >
            Enter your email address and we'll send you a verification code
          </Typography>

       
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            onSubmit={handleSubmit(ForgotPasswordForm)}
          >
            <TextField
              {...register("email")}
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