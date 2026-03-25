import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import authaxiosInstance from '../api/authAxiosInstance'

export default function useCheckout() {
    const queryClient=useQueryClient();
  return useMutation({
    mutationFn:async(paymentMethod)=>{ 
         console.log(paymentMethod)
         return await authaxiosInstance.post('/Checkouts',{PaymentMethod:paymentMethod})
    },onSuccess:(response)=>{
        console.log(response.data)
        if(response.data.url){
            location.href=response.data.url
        }
        queryClient.invalidateQueries(
            {
                queryKey:['carts']
            }
        )
    }
  })
}
