import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import authaxiosInstance from '../api/authAxiosInstance'

export default function useRemoveFromCart() {
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:(cartItemId)=>authaxiosInstance.delete(`/carts/${cartItemId}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
          },
    })
}
