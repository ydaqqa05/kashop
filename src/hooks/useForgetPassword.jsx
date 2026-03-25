import { useMutation } from '@tanstack/react-query'
import React from 'react'
import axiosInstance from '../api/axiosInstance'

export default function useForgetPassword() {
    
  return useMutation({
    mutationFn:async(email)=>{
        const response=await axiosInstance.post('/auth/Account/SendCode',{email})
        console.log(response)
        return response.data
    }
  })
}
