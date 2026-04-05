import React from 'react'
import axiosInstance from '../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export default function useProductByCategory(id) {
  const getProductByCategory= async()=>{
      const response=await axiosInstance.get(`Products/category/${id}`,{

      })
      
     return response.data
  }
  const query =useQuery({
      queryKey:['product',id,'en'],
      queryFn:getProductByCategory,
      staleTime:1000*60*5
       });
       
       return query
}
