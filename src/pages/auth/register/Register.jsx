import { Box, Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Email, Password } from '@mui/icons-material';
import { registerSchema } from '../../../validation/RegisterSchema';
export default function Register() {

   

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema),
    });
    const registerForm = async (values) => {
        try {
            const response = await axios.post(`https://knowledgeshop.runasp.net/api/auth/Account/Register`, values);
            console.log(response)
        } catch (error) {
            console.log(error.response?.data);
        }
    }
    return (
        <Box component={'section'} className='register-form' py={5}>
            <Typography component={'h1'} variant='h1'>Register</Typography>

            <Box component={'form'} display={'flex'} flexDirection={'column'} gap={2} mt={3} alignItems={'center'}
                onSubmit={handleSubmit(registerForm)}>
                <TextField {...register('userName', { required: true })} id="outlined-basic" fullWidth label="User Name" variant="outlined" 
                error={errors.userName} helperText={errors.userName?.message} />
                <TextField {...register('fullName')} id="outlined-basic" fullWidth label="Full Name" variant="outlined"
                error={errors.fullName} helperText={errors.fullName?.message} />
                <TextField {...register('email')} id="outlined-basic" fullWidth label="Email" variant="outlined" 
                error={errors.email} helperText={errors.email?.message}/>
                <TextField {...register('password')} id="outlined-basic" fullWidth label="Password" variant="outlined"
                error={errors.password} helperText={errors.password?.message} />
                <TextField {...register('phoneNumber')} id="outlined-basic" fullWidth label="Phone Number" variant="outlined" 
                error={errors.phoneNumber} helperText={errors.phoneNumber?.message}/>
                <Button variant="contained" type='submit'>Register</Button>
            </Box>
        </Box>
    )
}
