import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Product({product}) {
  return (
    <Link to={`/product/${product.id}`}><Card sx={{py:3,textAlign:'center'}}>
    <CardMedia component={'img'} image={product.image}></CardMedia>
    <CardContent>
        <Typography component={'h3'}>{product.name}</Typography>
        <Typography component={'span'} variant='body1'>{product.price}$</Typography>
       </CardContent>

   </Card></Link>
  )
}
