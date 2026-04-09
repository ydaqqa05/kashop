import React from 'react'
import { Box, Typography, TextField, Button, InputBase } from '@mui/material'

import footerEmail from '../../assets/image/footerEmail.webp'
import { EmailOutlined } from '@mui/icons-material'
import email from '../../assets/image/email.svg'
import { Link, useNavigate } from 'react-router-dom'
export default function Footer1() {
    const navigate=useNavigate()
  return (
    <Box sx={{  backgroundImage: { xs: 'none', sm: `url(${footerEmail})` },backgroundSize: 'cover',backgroundPosition: 'right center', backgroundRepeat: 'no-repeat',
        height: '300px',display: 'flex',alignItems: 'center', justifyContent: 'center',textAlign: 'center',px: 2  }}>
      <Box>
  <Typography fontSize="40px" fontWeight={500} fontFamily="Poppins">
    Join Our Newsletter
  </Typography>

  <Typography sx={{ mb: 3 }} fontFamily="Inter" fontSize="18px">
    Sign up for deals, new products and promotions
  </Typography>
  <Box  sx={{display: 'flex', alignItems: 'center',borderBottom: '1px solid #999',maxWidth: '500px',
      mx: 'auto',pb: 1}}
  >
    <Box component="img" src={email}sx={{ width: 20, mr: 1, opacity: 0.6 }}/>
    <InputBase placeholder="Email address"sx={{flex: 1,fontSize: '14px'}}/>

    <Button
      sx={{textTransform: 'none',fontWeight: 500,color:'#6C7275'}}
      onClick={()=>navigate('/register')}
    >
      Signup
    </Button>
  </Box>
  </Box>
    </Box>
  )
}
