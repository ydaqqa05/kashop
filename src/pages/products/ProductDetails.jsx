import React from 'react'
import { useParams } from 'react-router-dom'
import useProduct from '../../hooks/useProduct';
import Loader from '../../ui/loader/Loader';
import { Box, Button, Card, CardMedia, Rating, Typography } from '@mui/material';
import useAddToCart from '../../hooks/useAddToCart';

export default function ProductDetails() {
    const {id}=useParams();
   
    const {data,isLoading,isError,error}=useProduct(id)
   console.log(data)

 const {mutate,isPending}=useAddToCart()
    if(isLoading)
        return <Loader/>
     if(isError)
        return <Box color={'red'}>{error.message}</Box>
        
  const product=data.response
  return (
  <Box component={'div'} className='product-details' py={4} >
<Card sx={{display:'flex'}}>

  <CardMedia component={'img'} image={product.image} sx={{
  width:350,
  height:350,
  objectFit:'contain',
  borderRadius:2
}} ></CardMedia>
  <Box sx={{flex:1}}>

    <Typography component={'h1'} variant='h3' gutterBottom>{product.name}</Typography>
    <Typography component={'span'} variant='body1' sx={{display:'block'}}>{product.price}$</Typography>
    <Rating readOnly value={product.rate}></Rating>
    <Typography >{product.description}</Typography>

    <Button variant='contained' disabled={isPending} onClick={()=>mutate({productId:product.id,count:1})} >Add To Cart</Button>
  </Box>

</Card>
  </Box>
  )
}
