import { Typography } from '@mui/material'
import React from 'react'
import Categories from '../../components/categories/CategoriesSection'
import Products from '../../components/products/Products'


export default function Home() {

  return (
  <div>
    <Categories/>
    <Products/>
  </div>
  )
}

