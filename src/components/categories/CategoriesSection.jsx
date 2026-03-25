import { Box, Card, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery} from  '@tanstack/react-query'
import useCategories from '../../hooks/useCategories';
import Loader from '../../ui/loader/Loader';
import { Link } from 'react-router-dom';
import Category from '../../ui/category/Category';
import { useTranslation } from 'react-i18next';
export default function Categories() {
  const {data,isLoading,isError,error}=useCategories();
  const {t}=useTranslation()
     if(isLoading)
        return <Loader/>
     if(isError)
        return <Box color={'red'}>{error.message}</Box>

 console.log(data);
  return (<>
  <hr/>
   

    <Box className="categories" py={3}> 
      <Typography component={'h2'} variant='h4' mb={2}>{t('Categories')}</Typography>
<Link to='/categories'>Show More</Link>


      <Grid container spacing={3}>
       
          {data.response.data.map(category=>
            <Grid item size={{xs:12,sm:6,md:4,lg:3}} key={category.id}> 
          <Category category={category}/> </Grid>
            )}
       
        
      </Grid>
      </Box>
  </>)
}
