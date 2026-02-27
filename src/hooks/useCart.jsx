import React from 'react'
import authaxiosInstance from '../api/authAxiosInstance';
import { useQuery } from '@tanstack/react-query';

export default function useCart() {
    const getItems= async()=>{
     
        const response=await authaxiosInstance.get(`/Carts`,{
           
        })
       return response.data
        
      
    } 
   const query =useQuery({
  queryKey:['carts','en'],
  queryFn:getItems,
  staleTime:1000*60*5
   });
   return query
}
