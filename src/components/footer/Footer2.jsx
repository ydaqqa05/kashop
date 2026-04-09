import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import facebook from "../../assets/image/facebook.svg";
import youtube from "../../assets/image/youtube.svg";

export default function Footer2() {
  const links = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Product", path: "/product" },
    { label: "Blog", path: "/blog" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", px: { xs: 3, md: 10 }, py: 6 }}>
      <Box sx={{display: "flex",flexDirection: { xs: "column", md: "row" },
          alignItems: "center", justifyContent: "space-between",textAlign: { xs: "center", md: "left" },gap: 4, }} >
        <Box display={'flex'} flexDirection={{xs:"column",md:"row"}} gap={4} alignItems={'center'} justifyContent={'center'}>
        <Typography fontSize="22px" fontWeight="600"> 3legant <span style={{color:"#444"}}>.</span> </Typography>
          <Typography sx={{  borderLeft:"1px solid #444",pl: 3,color: "#aaa",fontFamily:'Inter',fontSize: "14px",mb:{xs:"5px"}}}> Gift & Decoration Store </Typography>
        </Box>
        <Box  sx={{ display: "flex", flexDirection: { xs: "column", md: "row" },gap: { xs: 2, md: 4 }, alignItems: "center",
          }}>
          {links.map((item) => (
            <Link key={item.label} to={item.path} style={{color: "#fff",fontSize: "14px",textDecoration: "none", }} >
              {item.label}
            </Link>
          ))}
        </Box>
      </Box>
      <Box sx={{ borderBottom: "1px solid #222", my: 4 }} />

      <Box sx={{display: "flex",flexDirection: { xs: "column", md: "row" },alignItems: "center", justifyContent: "space-between", gap: 3, textAlign: "center", }}>
         <Typography fontSize="13px" color="#777">
          Copyright © 2023 3legant. All rights reserved
        </Typography>
       

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center"}}>
          <Link to="#" style={{ color: "#fff", fontSize: "13px", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <Link to="#" style={{ color: "#fff", fontSize: "13px", textDecoration: "none" }}>
            Terms of Use
          </Link>
        </Box>
 <Box sx={{ display: "flex", gap: 3 }}>
          <InstagramIcon sx={{ color: "#ccc", cursor: "pointer" }} />
          <Box component="img" src={facebook} sx={{ width: 20, cursor: "pointer" }} />
          <Box component="img" src={youtube} sx={{ width: 20, cursor: "pointer" }} />
        </Box>
       
      </Box>
    </Box>
  );
}