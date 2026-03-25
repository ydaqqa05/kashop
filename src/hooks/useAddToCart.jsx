import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import authaxiosInstance from '../api/authAxiosInstance'

export default function useAddToCart() {
const queryClient=useQueryClient()
    const mutation=useMutation({
mutationFn:async({productId,count})=>{
    return await authaxiosInstance.post('/carts',{
    productId:productId,
    count:count
})},onSuccess:()=>{
    queryClient.invalidateQueries({queryKey:['carts']})
}
    })
  return mutation
}
