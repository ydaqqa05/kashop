import { Box, Typography } from '@mui/material'
import React from 'react'
import sofa from "../../assets/image/sofa.webp";
export default function LeftSide() {
  return (
    <Box flex={1} display="flex" position={'relative'}>
          <Typography variant="h6" fontWeight="bold" mb={4} position={'absolute'} left={'50%'}  sx={{ transform: "translateX(-50%)" }}  >  3legant.  </Typography>
            <Box component="img" src={sofa} alt="sofa"
              sx={{ width: "100%",height: "100vh",objectFit: "cover",}}/>
          </Box>
  )
}
