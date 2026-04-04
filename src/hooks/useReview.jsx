import { useMutation } from '@tanstack/react-query'
import React from 'react'
import authaxiosInstance from '../api/authAxiosInstance'

export default function useReview(productId) {
  return useMutation({
    mutationFn:async({rating,comment})=>{
        const response=await authaxiosInstance.post(`Products/${productId}/reviews`,{Rating:rating,Comment:comment})
        return response.data
    }
  })
}
