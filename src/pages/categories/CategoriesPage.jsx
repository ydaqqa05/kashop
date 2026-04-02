import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import useCategories from '../../hooks/useCategories';
import Loader from '../../ui/loader/Loader';
import Category from '../../ui/category/Category';
import { useTranslation } from 'react-i18next';
export default function CategoriesPage() {
    const {data,isLoading,isError,error}=useCategories(10);
      const {t}=useTranslation()
    if(isLoading)
       return <Loader/>
    if(isError)
       return <Box color={'red'}>{error.message}</Box>
  return (
   <>
   <Box className="categories" py={3}> 
     


     <Grid container spacing={3}>
      
         {data.response.data.map(category=>
           <Grid item size={{xs:12,sm:6,md:4,lg:3}} key={category.id}>
             <Category category={category}/> </Grid>
           )}
      
       
     </Grid>
     </Box></>
  )
}
