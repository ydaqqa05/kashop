import { Card, Grid } from '@mui/material'
import React from 'react'

export default function Category({category}) {
  return (
      <Card sx={{py:3,textAlign:'center'}}>{category.name}</Card>
  )
}
