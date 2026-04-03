import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import article1 from '../../assets/image/article1.webp'
import article2 from '../../assets/image/article2.webp'
import article3 from '../../assets/image/article3.webp'
export default function Article() {
     const { t } = useTranslation();
  return (
   <Container maxWidth="lg">
    <Box sx={{ display: "flex", flexDirection: "column", my: "48px",gap:'-2px' }}>

        <Box sx={{ display: "flex", justifyContent: "space-between",alignItems:'end' }}>
          <Typography fontSize={"40px"} fontWeight={"bold"} fontFamily={'Poppins'}  lineHeight={1.1} letterSpacing={'-0.4px'}>
            {t("Articles")}
          </Typography>

          <Link to={"/"} style={{ color: "#000" }}>
          More Articles →
          </Link>
        </Box>
      </Box>
      <Box mb={"48px"}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
             
             
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              textAlign: 'start',
              minHeight: 220,
            }}
          >
            <Box component="img" src={article1} mb={3}  sx={{ width: '100%', height: 'auto' }}  />
            <Typography fontSize="20px" mb="8px" fontFamily="Poppins">
            7 ways to decor your home
            </Typography>
            <Link to={"/"} style={{ color: "#000" }} fontSize="16px" fontFamily='Inter'>
            Read More →
          </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
           
             
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              textAlign: 'start',
              minHeight: 220,
            }}
          >
            <Box component="img" src={article2}  mb={3}  sx={{ width: '100%', height: 'auto' }} />
            <Typography fontSize="20px" mb="8px" fontFamily="Poppins">
            Kitchen organization
            </Typography>
            <Link to={"/"} style={{ color: "#000" }} fontSize="16px" fontFamily='Inter'>
            Read More →
          </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              
           
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              textAlign: 'start',
              minHeight: 220,
            }}
          >
            <Box component="img" src={article3} mb={3}  sx={{ width: '100%', height: 'auto' }} />
            <Typography fontSize="20px" mb="8px" fontFamily="Poppins">
            Decor your bedroom
            </Typography>
            <Link to={"/"} style={{ color: "#000",fontSize:"16px", fontFamily:'Inter' }} >
            Read More →
          </Link>
          </Box>
        </Grid>
       
      </Grid>
    </Box>
   </Container>
  )
}
