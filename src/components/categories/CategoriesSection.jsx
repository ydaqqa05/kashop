import { Box, Card, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery} from  '@tanstack/react-query'
import useCategories from '../../hooks/useCategories';
import Loader from '../../ui/loader/Loader';
import { Link } from 'react-router-dom';
import Category from '../../ui/category/Category';
import { useTranslation } from 'react-i18next';
import cat9 from '../../assets/image/cat9.webp'
import mobile from '../../assets/image/mobile (1).webp'
import clothes from '../../assets/image/clothes (1).webp'
export default function Categories() {
  const {data,isLoading,isError,error}=useCategories();
const imgs=[cat9,mobile,clothes]
  const {t}=useTranslation()
     if(isLoading)
        return <Loader/>
     if(isError)
        return <Box color={'red'}>{error.message}</Box>

 const categories=data.response.data
 console.log(categories)
  return (<>
  
   

    <Box className="categories" pt={4} maxWidth="1200px" mx="auto" > 
      <Grid container spacing={2}>
       <Grid item size={{xs:12,md:6}}>
        <Box sx={{position:'relative',height:"100%",minHeight:400,overflow:"hidden",borderRadius:2}}>
        <Box component={'img'} src={categories[0]?.image||imgs[0]} alt={categories[0]?.name} 
        sx={{ width: "100%", height: "100%",objectFit: "cover",}}/>
        <Box sx={{position:'absolute',top:30,left:30}} >
          <Typography variant='h5' fontWeight={500}>{categories[0]?.name}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
                  Shop Now →
                </Typography>
        </Box>
        
        </Box>
        </Grid>
         <Grid item size={{xs:12,md:6}}>
          <Grid container spacing={2}>
            <Grid item size={{xs:12}}>
              <Box   
              sx={{
                    position: "relative",
                    height: 190,
                    overflow: "hidden",
                    borderRadius: 2,
                     backgroundColor:"#f7f6f9"
                  }}>
                     <Box
                    component="img"
                    src={categories[1]?.image||imgs[1]}
                    alt={categories[1]?.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                     
                     
                    }}
                  />
                  <Box sx={{ position: "absolute", bottom: 20, left: 20 }}>
                    <Typography variant="h6">
                      {categories[1]?.name}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      Shop Now →
                    </Typography>
                  </Box>
                  </Box>
            </Grid>
            <Grid item size={{xs:12}}>
              <Box  sx={{
                    position: "relative",
                    height: 190,
                    overflow: "hidden",
                    borderRadius: 2,
                  }}>
                     <Box
                    component="img"
                    src={categories[2]?.image||imgs[2]}
                    alt={categories[2]?.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ position: "absolute", bottom: 20, left: 20 }}>
                    <Typography variant="h6">
                      {categories[2]?.name}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      Shop Now →
                    </Typography>
                  </Box>
                  </Box>
            </Grid>
          </Grid>
         </Grid>
       
        
      </Grid>
      </Box>
  </>)
}
