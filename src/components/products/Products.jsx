import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import useProducts from '../../hooks/useProducts';
import React from 'react';
import Loader from '../../ui/loader/Loader';
import { Link } from 'react-router-dom';
import Product from '../../ui/product/Product';
import { useTranslation } from 'react-i18next';

export default function Products() {
       const {data,isError,isLoading,error}=useProducts();
       const {t}=useTranslation()
       console.log(data)
       if(isLoading)
        return <Loader/>
     if(isError)
        return <Box color={'red'}>{error.message}</Box>
       
  return (
      <Box className="products" py={3}>
        <Typography component={'h2'} variant='h4' mb={2}>{t('Products')}</Typography>
        <Grid container spacing={4}>  
            
            {data.response.data.map(product=>
                <Grid item size={{xs:12,sm:6,md:4}}>
<Product product={product}/>
                    </Grid>
                )}</Grid>
       </Box>
  )
}
