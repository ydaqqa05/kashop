import { Box, Typography } from '@mui/material'
import React from 'react'
import Categories from '../../components/categories/CategoriesSection'
import Products from '../../components/products/Products'
import Swipper from '../../components/swipperSection/Swipper'

export default function Home() {
  return (
    <div>
      <Swipper />
      <Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems:   'center' ,
    justifyContent: 'space-between',
    gap: 4,
    mt: "32px",
   mb:"40px",
   
  }}
>
  <Typography
    variant="h1"
    sx={{
      fontSize: { xs: '36px', md: '64px' },
      fontWeight: 700,
      lineHeight: 1.1,
      color: '#141718',
      '& .slash': {
        color: '#6C7275',
        fontWeight: 300,
      },
    }}
  >
    Simply Unique<span className="slash">/</span>
    <br />
    Simply Better.
  </Typography>
  <Typography
    sx={{
      color: '#6C7275',
      fontSize: '14px',
      lineHeight: 1.6,
      maxWidth: '280px', 
    }}
  >
    <Box component="span" sx={{ color: '#141718', fontWeight: 700 }}>
      3legant
    </Box>{' '}
    is a gift & decorations store based in HCMC, Vietnam. Est since 2019.
  </Typography>
</Box>

      <Categories />
      <Products />
    </div>
  )
}