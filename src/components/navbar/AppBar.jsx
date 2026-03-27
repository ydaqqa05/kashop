import * as React from "react";
import {AppBar,Box,Toolbar,IconButton,Typography,Container,Button,Badge,Drawer,List,ListItem,ListItemText,Divider} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseIcon from "@mui/icons-material/Close";
import search from '../../assets/image/search 02.svg'
import profile from '../../assets/image/user-circle.svg'
import cart from '../../assets/image/shopping bag.svg'
import { useState } from "react";
const pages = ["Home", "Shop", "Product", "Contact Us"];

export default function ResponsiveAppBar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (state) => {
    setOpenDrawer(state);
  };

  return (
    <>
    
      <AppBar
        position="static"
        sx={{
          background: "#fff",
          color: "#000",
          boxShadow: "none",
          borderBottom: "1px solid #eee"
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex" }}>

           
            <Box sx={{ flex: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={() => toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>

           
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" }
              }}
            >
              <Typography
                fontWeight="bold"
                fontSize="24px"
               fontFamily={'Poppins'}
              >
                3legant.
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                gap: 4
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{
                    color: "#6b7280",
                    fontWeight: 500,
                    textTransform: "none",
                    position: "relative",
                     whiteSpace: 'nowrap',
                    "&:hover": {
                      color: "#000"
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "0%",
                      height: "2px",
                      bottom: 0,
                      left: 0,
                      backgroundColor: "#000",
                      transition: "0.3s"
                    },
                    "&:hover::after": {
                      width: "100%"
                    }
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

           
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
                gap: 1
              }}
            >
              <IconButton>
                <Box component={'img'} src={search}/>
              </IconButton>

              <IconButton>
              <Box component={'img'} src={profile}/>
              </IconButton>

              <IconButton sx={{display:'flex',gap:2}}>
              <Box component={'img'} src={cart}/> 
              <Badge badgeContent={2}  sx={{
    "& .MuiBadge-badge": {
      backgroundColor: "black",
      color: "white",
    }}}/>
              </IconButton>

              
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* 🔥 DRAWER */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ width: 260, p: 2 }}>

          {/* 🔹 Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2
            }}
          >
            <Typography fontWeight="bold">Menu</Typography>
            <IconButton onClick={() => toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* 🔹 Pages */}
          <List>
            {pages.map((page) => (
              <ListItem
                key={page}
                onClick={() => toggleDrawer(false)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#f3f4f6"
                  }
                }}
              >
                <ListItemText
                  primary={page}
                  primaryTypographyProps={{
                    fontWeight: 500
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* 🔹 Extra (optional) */}
          <List>
            <ListItem sx={{ cursor: "pointer" }}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem sx={{ cursor: "pointer" }}>
              <ListItemText primary="Register" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}