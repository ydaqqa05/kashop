import { Box, CircularProgress } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Categories() {
    const [categories,setCategories] = useState([])
    const [isLoader,setIsLoader] = useState(true)
    const [error,setError] = useState('')
    const getCategories= async()=>{
       try{
        const response=await axios.get(`https://knowledgeshop.runasp.net/api/Categories`)
        setCategories(response.data.response)
        console.log(response)
        } catch(err){
            setError('something went wrong')
console.log(err)
        } finally{
            setIsLoader(false)
        }
      
    } 
   
     useEffect(()=>{
            getCategories();
        },[]);
         if(isLoader){
        return <CircularProgress/>
    }
    if(error){
        return <Box color={'red'}>{error}</Box>
    }
  return (
    <Box> {categories.map(category=><Box>{category.name}</Box>)}</Box>
  )
}
