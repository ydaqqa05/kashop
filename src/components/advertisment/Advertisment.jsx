import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import room from '../../assets/image/room.webp'
import { Link } from 'react-router-dom'

export default function Advertisment() {
  return (
    <Box sx={{width: '100%'}}
    >
      <Grid container>

        <Grid item size={{sm:12,md:6}}>
          <Box
            component="img"
            src={room}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </Grid>

        <Grid item size={{sm:12,md:6}} sx={{backgroundColor:'#F3F5F7',
            display:'flex',flexDirection:'column', gap:"16px",justifyContent:'center',
            px: "72px",py: { xs: 4, md: 0 }
          }}
        >
          <Typography color='blue' fontWeight={700}>
            SALE UP TO 35% OFF
          </Typography>

          <Typography fontSize="40px" fontWeight={500} letterSpacing={'-0.4px'} lineHeight={1.1}> 
            HUNDREDS of <br/>
            New lower prices!
          </Typography>

          <Typography fontSize="20px" color="#141718">
            It’s more affordable than ever to give every room in your home a stylish makeover
          </Typography>

          <Link style={{color:'#000'}} to="/shop">Shop Now →</Link>
        </Grid>

      </Grid>
    </Box>
  )
}