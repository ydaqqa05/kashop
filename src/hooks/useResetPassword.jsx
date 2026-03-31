import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'
import axiosInstance from '../api/axiosInstance';

export default function useResetPassword() {
    const queryClient=useQueryClient();
  return useMutation({
    mutationFn:async({code,newPassword,email})=>{
        const response=await axiosInstance.patch(`Account/ResetPassword`,{code,newPassword,email})
        console.log(response);
    }
  })
}
