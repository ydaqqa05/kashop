import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import deliver from '../../assets/image/fast delivery.svg';
import money from '../../assets/image/money.svg';
import lock from '../../assets/image/lock 01.svg';
import call from '../../assets/image/call.svg';

export default function Features() {
  return (
    <Container maxWidth="lg">
    <Box mb={"48px"}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item size={{xs:12,sm:6,md:3}}>
          <Box
            sx={{
              backgroundColor: '#F3F5F7',
              py: '48px',
              px: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              textAlign: 'start',
              minHeight: 220,
            }}
          >
            <Box component="img" src={deliver} mb="16px" />
            <Typography fontSize="20px" mb="8px" fontFamily="Poppins">
              Free Shipping
            </Typography>
            <Typography color="#6C7275" fontSize="14px">
              Order above $200
            </Typography>
          </Box>
        </Grid>

        <Grid item size={{xs:12,sm:6,md:3}}>
          <Box
            sx={{
              backgroundColor: '#F3F5F7',
              py: '48px',
              px: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              textAlign: 'start',
              minHeight: 220,
            }}
          >
            <Box component="img" src={money} mb="16px" />
            <Typography fontSize="20px" mb="8px" fontFamily="Poppins">
              Money Back
            </Typography>
            <Typography color="#6C7275" fontSize="14px">
            30 days guarantee
            </Typography>
          </Box>
        </Grid>
        <Grid item size={{xs:12,sm:6,md:3}}>
          <Box
            sx={{
              backgroundColor: '#F3F5F7',
              py: '48px',
              px: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              textAlign: 'start',
              minHeight: 220,
            }}
          >
            <Box component="img" src={lock} mb="16px" />
            <Typography fontSize="20px" mb="8px" fontFamily="Poppins">
              Secure Payment
            </Typography>
            <Typography color="#6C7275" fontSize="14px">
             Secured by Stripe
            </Typography>
          </Box>
        </Grid>
        <Grid item size={{xs:12,sm:6,md:3}}>
          <Box
            sx={{
              backgroundColor: '#F3F5F7',
              py: '48px',
              px: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              textAlign: 'start',
              minHeight: 220,
            }}
          >
            <Box component="img" src={call} mb="16px" />
            <Typography fontSize="20px" mb="8px" fontFamily="Poppins">
              24/7 Support
            </Typography>
            <Typography color="#6C7275" fontSize="14px">
            Phone and Email support
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </Container>
  );
}