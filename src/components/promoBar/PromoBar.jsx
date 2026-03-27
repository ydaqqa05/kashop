import { Box, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { TicketPercent } from 'lucide-react';
import ticket from '../../assets/image/ticket-percent.svg'
export default function PromoBar() {
    const [open,setOpen]=useState(true);
    if (!open) return null;
  return (
    <Box 
    sx={{
      width: "100%",
      backgroundColor: "#F3F5F7", 
      py: 0.8,
      px: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      fontSize: "14px"
    }}
  >
    
    <Typography sx={{ fontSize: "14px",justifyContent:'center',alignItems:'center',display:'flex',gap:"12px" }}>
    <Box component={'img'} src={ticket}/> <b>30% off storewide — Limited time!</b>{" "}
      <span style={{ color: "#377DFF", cursor: "pointer" }}>
        Shop Now →
      </span>
    </Typography>

  
    <IconButton
      onClick={() => setOpen(false)}
      sx={{
        position: "absolute",
        right: 10,
        color: "#6b7280",
        
      }}
    >

      <CloseIcon fontSize="small" />
    </IconButton>
  </Box>
  )
}
