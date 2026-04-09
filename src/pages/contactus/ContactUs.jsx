import {Box,Breadcrumbs,Container,Grid,Link,Typography,TextField,Button,} from "@mui/material";
  import React from "react";
  import room from "../../assets/image/room.webp";
  import Features from "../../components/features/Features";
import Footer2 from "../../components/footer/Footer2";
  import mail1 from '../../assets/image/mail1.svg'
  import call from '../../assets/image/call.svg'
  import store from '../../assets/image/store.svg'
  export default function ContactUs() {
    return (
      <>
        <Container maxWidth="lg">
          <Breadcrumbs separator=">" sx={{ my: 3 }}>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">Contact Us</Typography>
          </Breadcrumbs>
  
          {/* HERO */}
          <Box maxWidth="800px" mb={8}>
            <Typography
              sx={{
                fontSize: { xs: "32px", md: "56px" },
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-1px",
                mb: 3,
              }}
            >
              We believe in sustainable decor. We’re passionate about life at home.
            </Typography>
  
            <Typography sx={{ color: "#6C7275", fontSize: "16px" }}>
              Our features timeless furniture, with natural fabrics, curved lines,
              plenty of mirrors and classic design, which can be incorporated into
              any decor project. The pieces enchant for their sobriety, to last for
              generations.
            </Typography>
          </Box>
          <Grid container sx={{ mb: 10 }}>
            <Grid item size={{sm:12,md:6}}>
              <Box
                component="img"
                src={room}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Grid>
  
            <Grid
              item
              size={{sm:12,md:6}}
              sx={{
                bgcolor: "#F3F5F7",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: { xs: 3, md: 8 },
                py: { xs: 4, md: 0 },
              }}
            >
              <Typography fontSize="28px" fontWeight={600} mb={2}>
                About Us
              </Typography>
  
              <Typography fontSize="16px" color="#000" fontFamily={"Inter"} mb={3}>
                3legant is a gift & decorations store based in HCMC, Vietnam.
                Est since 2019. Our customer service is always prepared to support
                you 24/7.
              </Typography>
  
              <Link  color="#000" to="/shop">Shop Now →</Link>
            </Grid>
          </Grid>
          <Typography
            textAlign="center"
            fontSize="32px"
            fontWeight={600}
            mb={5}
          >
            Contact Us
          </Typography>
          <Grid container spacing={3} mb={8}>
            {[
              {
                img:store,
                title: "ADDRESS",
                value: "234 Hai Trieu, Ho Chi Minh City, Viet Nam",
              },
              {
                img:call,
                title: "CONTACT US",
                value: "+84 234 567 890",
              },
              {
                img:mail1,
                title: "EMAIL",
                value: "hello@3legant.com",
              },
            ].map((item, i) => (
              <Grid item size={{xs:12,md:4}} key={i}>
                <Box
                  sx={{
                    bgcolor: "#F3F5F7",
                    py: 4,
                    px: 2,
                    textAlign: "center",
                  }}
                >
                   <Box component="img" src={item.img} mb="16px" />
                  <Typography fontSize="12px" color="#6C7275" mb={1} fontWeight={700}>
                    {item.title}
                  </Typography>
                  <Typography fontSize="14px" fontWeight={500}>
                    {item.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={4} mb={10}>
            <Grid item size={{xs:12,md:6}}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField label="Full Name" size="small" fullWidth />
                <TextField label="Email Address" size="small" fullWidth />
                <TextField
                  label="Message"
                  multiline
                  rows={5}
                  fullWidth
                />
  
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#141718",
                    width: "160px",
                    borderRadius: "6px",
                    mt: 1,
                    "&:hover": { bgcolor: "#2c2f31" },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Grid>
            <Grid item size={{xs:12,md:6}}>
              <Box
                component="iframe"
                src="https://www.google.com/maps?q=Ho%20Chi%20Minh&output=embed"
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: "320px",
                  border: 0,
                }}
              />
            </Grid>
          </Grid>
        </Container>
  <Box bgcolor={"#F3F5F7"} mb={0} pb={"1px"}><Features /></Box>
        
        <Footer2/>
      </>
    );
  }