import React, { useState } from 'react';
import blogImg from '../../assets/image/blogImg.webp';
import { Box, Breadcrumbs, Container, Link, Typography, Grid, Button } from '@mui/material';
import blog1 from '../../assets/image/blog1.webp';
import blog2 from '../../assets/image/blog2.webp';
import blog3 from '../../assets/image/blog3.webp';
import blog4 from '../../assets/image/blog4.webp';
import blog5 from '../../assets/image/blog5.webp';
import blog6 from '../../assets/image/blog6.webp';
import blog7 from '../../assets/image/blog7.webp';
import blog8 from '../../assets/image/blog8.webp';
import blog9 from '../../assets/image/blog9.webp';
import Footer1 from '../../components/footer/Footer1';
import Footer2 from '../../components/footer/Footer2';

const blogPosts = [
  { img: blog1, title: "7 ways to decor your home like a professional", date: "October 16, 2023" },
  { img: blog2, title: "Inside a beautiful kitchen organization", date: "October 15, 2023" },
  { img: blog3, title: "Decor your bedroom for your children", date: "October 16, 2023" },
  { img: blog4, title: "Modern texas home is beautiful and completely kid-friendly", date: "October 15, 2023" },
  { img: blog5, title: "Modern texas home is beautiful and completely kid-friendly", date: "October 15, 2023" },
  { img: blog6, title: "Modern texas home is beautiful and completely kid-friendly", date: "October 15, 2023" },
  { img: blog7, title: "Modern texas home is beautiful and completely kid-friendly", date: "October 16, 2023" },
  { img: blog8, title: "Modern texas home is beautiful and completely kid-friendly", date: "October 16, 2023" },
  { img: blog9, title: "Modern texas home is beautiful and completely kid-friendly", date: "October 16, 2023" },
];

export default function Blog() {
  const [showCount, setShowCount] = useState(6); 

  return (
    <>
    <Container maxWidth="md" sx={{mb:4}} >
      <Box 
        sx={{backgroundImage: `url(${blogImg})`,backgroundSize: "cover", backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",height: "300px",display: "flex",flexDirection: "column",alignItems: "center", justifyContent: "center",textAlign: "center", px: 2, mb: "60px",}}>
        <Breadcrumbs separator=">">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Blog</Typography>
        </Breadcrumbs>
        <Typography fontSize="54px" fontWeight="medium">
          Our Blog
        </Typography>
        <Typography fontSize="20px">Home ideas and design inspiration</Typography>
      </Box>
      <Grid container spacing={4}>
  {blogPosts.slice(0, showCount).map((post, index) => (
    <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
      <Box sx={{ width: "100%" }}>
        <Box component="img" src={post.img} alt={post.title} sx={{ width: "100%", height: 240, objectFit: "cover",borderRadius: "6px", }}/>

        <Typography sx={{mt: 2,fontSize: 16, fontWeight: 500, lineHeight: 1.5, whiteSpace: "normal", wordBreak: "break-word",}}>
          {post.title}
        </Typography>

        <Typography sx={{ fontSize: 13, color: "#777", mt: 1 }}>
          {post.date}
        </Typography>
      </Box>
    </Grid>
  ))}
</Grid>
      {showCount < blogPosts.length && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            onClick={() => setShowCount(prev => prev + 3)}
            variant="outlined"
            sx={{ borderRadius: "20px", px: 4, textTransform: "none" }}
          >
            Show more
          </Button>
        </Box>
      )}
    </Container>
    <Footer1 />
    <Footer2/>
    </>
  );
}