import { Box, Typography, TextField, Button, InputBase } from '@mui/material'
import React from 'react'
import footerEmail from '../../assets/image/footerEmail.webp'
import { EmailOutlined } from '@mui/icons-material'
import email from '../../assets/image/email.svg'
import { Link, useNavigate } from 'react-router-dom'
import InstagramIcon from "@mui/icons-material/Instagram";
import facebook from '../../assets/image/facebook.svg'
import youtube from '../../assets/image/youtube.svg'
export default function Footer2() {
  const navigate=useNavigate()
  return (
    <>
   
    <Box sx={{ backgroundColor: "#111", color: "#fff", px: 10, py: 6, }}>
     
      <Box sx={{display: "flex",justifyContent: "space-between",alignItems: "center",flexWrap: "wrap", mb: 4,}}>
       
        <Box sx={{ display: "flex",flexDirection:{xs:'column',md:'row'}, alignItems: "center", gap:{sx:1,md:3}}}>
          <Typography fontSize="22px" fontWeight="600">
            3legant.
          </Typography>

          <Typography
            sx={{ borderLeft: "1px solid #444",pl: 3,color: "#aaa",fontFamily:'Inter',fontSize: "14px",mb:{xs:"5px"}}}>
            Gift & Decoration Store
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4,flexWrap:'wrap' }}>
          {[ { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
 
  { label: "Blog", path: "/blog" },
  { label: "Contact Us", path: "/contact" },].map((item) => (
            <Link
              key={item.label}
             
             to={item.path}
              underline="none"
              style={{ color: "#FEFEFE", fontSize: "14px",textDecoration:"none"}}
            >
              {item.label}
            </Link>
          ))}
        </Box>
      </Box>

      <Box sx={{ borderBottom: "1px solid #222", mb: 3 }} />
      <Box sx={{display: "flex",justifyContent: "space-between", alignItems: "center", flexWrap: "wrap",}}>
       
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Typography fontSize="13px" color="#777">
            Copyright © 2023 3legant. All rights reserved
          </Typography>

          <Link href="#"  style={{ color: "#fff", fontSize: "13px", textDecoration:"none"}}>
            Privacy Policy
          </Link>

          <Link href="#"  style={{ color: "#fff", fontSize: "13px",textDecoration:"none" }}>
            Terms of Use
          </Link>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <InstagramIcon sx={{ color: "#ccc", cursor: "pointer" }} />
          <Box component="img" src={facebook} sx={{ color: "#ccc", cursor: "pointer" }}/>
          <Box component="img" src={youtube} sx={{ color: "#ccc", cursor: "pointer" }}/>
         
        </Box>
      </Box>
    </Box>
    </>
  )
}