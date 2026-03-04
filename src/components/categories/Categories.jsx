import { Box, Card, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery} from  '@tanstack/react-query'
import useCategories from '../../hooks/useCategories';
import Loader from '../../ui/loader/Loader';
export default function Categories() {
  const {data,isLoading,isError,error}=useCategories();
     if(isLoading)
        return <Loader/>
     if(isError)
        return <Box color={'red'}>{error.message}</Box>

 console.log(data);
  return (<>
  <hr/>
   

    <Box className="categories" py={3}> 
      <Typography component={'h2'} variant='h4' mb={2}>Categories</Typography>



      <Grid container spacing={3}>
       
          {data.response.data.map(category=>
            <Grid item size={{xs:12,sm:6,md:4,lg:3}}> <Card sx={{py:3,textAlign:'center'}}>{category.name}</Card> </Grid>
            )}
       
        
      </Grid>
      </Box>
  </>)
}
