import React from 'react'
import i18n from '../i18next'
import { useQuery } from '@tanstack/react-query'
import authaxiosInstance from '../api/authAxiosInstance'

export default function useProfile() {
  
    
    
         return useQuery({
        queryKey:['profile','en'],
        queryFn: async()=>{
             const response=await authaxiosInstance.get(`/Profile`)
             console.log(response)
       return response.data
        } ,
        staleTime:1000*60*5
         })

}
