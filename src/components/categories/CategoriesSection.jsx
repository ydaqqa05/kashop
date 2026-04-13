import { Box, Card, CircularProgress, Container, Grid, Typography } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery} from  '@tanstack/react-query'
import useCategories from '../../hooks/useCategories';
import Loader from '../../ui/loader/Loader';
import { Link } from 'react-router-dom';
import Category from '../../ui/category/Category';
import { useTranslation } from 'react-i18next';
import cat9 from '../../assets/image/cat9.webp'
import elec1 from '../../assets/image/elec1.webp'
import mobile from '../../assets/image/mobile (1).webp'
import clothes from '../../assets/image/clothes (1).webp'
export default function Categories() {
  const {data,isLoading,isError,error}=useCategories();
const imgs=[elec1,mobile,clothes]
  const {t}=useTranslation()
     if(isLoading)
        return <Loader/>
     if(isError)
        return <Box color={'red'}>{error.message}</Box>

 const categories=data.response.data
 console.log(categories)
  return (<>
  
  <Container maxWidth="lg">

    <Box className="categories" pt={4} maxWidth="1200px" mx="auto" > 
      <Grid container spacing={2}>
       <Grid item size={{xs:12,md:6}}>
        <Box sx={{position:'relative',height:"100%",minHeight:400,overflow:"hidden",borderRadius:2 , backgroundColor:"#fff"}}>
        <Box component={'img'} src={imgs[0]} alt={categories[0]?.name}  
        sx={{ width: "100%", height: "100%",objectFit: "cover"}}/>
        <Box sx={{position:'absolute',top:30,left:30}} >
          <Typography variant='h5' fontWeight={500}>{categories[0]?.name}</Typography>
          <Link  mt={1} style={{color:"#000"}}>
                  Shop Now →
                </Link>
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
                    <Link  mt={1} style={{color:"#000"}}>
                      Shop Now →
                    </Link>
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
                    <Link mt={1} style={{color:"#000"}}>
                      Shop Now →
                    </Link>
                  </Box>
                  </Box>
            </Grid>
          </Grid>
         </Grid>
       
        
      </Grid>
      </Box>
      </Container>
  </>)
}
