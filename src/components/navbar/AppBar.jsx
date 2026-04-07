import * as React from "react";
import {AppBar,Box,Toolbar,IconButton,Typography,Container,Button,Badge,Drawer,List,ListItem,ListItemText,Divider, InputBase, Paper, ClickAwayListener} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from "@mui/icons-material/Close";
import search from '../../assets/image/search 02.svg'
import profile from '../../assets/image/user-circle.svg'
import cart from '../../assets/image/shopping bag.svg'
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useUpdateCartItem from "../../hooks/useUpdateCartItem";
import Loader from "../../ui/loader/Loader";
const pages = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Product", path: "/product" },
    { name: "Contact Us", path: "/contact" }
  ];

export default function ResponsiveAppBar() {
    const navigate=useNavigate()
    const {id}=useParams();
    const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const {data,isError,isLoading,error}=useCart();
  const{mutate:removeItem,isPending}=useRemoveFromCart()
console.log("cart data",data)
const { data: products } = useProducts(id); 
const{mutate:updateItem,isPending:updateItemPending}=useUpdateCartItem()
console.log("product data",products)
const cartItems=data?.items?.map((item)=>{
  const product=products?.response?.data?.find(pro=>(pro.id===item.productId));
  return {
    ...item,
    
    name: product?.name,
    image: product?.image,
    price: product?.price
  };
}) || [];

console.log(cartItems)

  const handleRemoveItem=(productId)=>{
    const item=data.items.find((i)=>{
      return i.productId==productId;
    }); 
    removeItem(productId);
  }
  const handleUpdateQty=(productId,action)=>{ {console.log(data)}
  
const item=data.items.find((i)=>{
  return i.productId==productId;
});
if(action=='-'){
  updateItem({productId,count:item.count-1})
}
else{
  updateItem({productId,count:item.count+1})
}
  }
  if(isLoading)
     return <Loader/>
  if(isError)
     return <Box color={'red'}>{error.message}</Box>
  
   
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
                  key={page.name}
                  onClick={()=>navigate(page.path)}
                  sx={{color: "#6b7280",fontWeight: 500,textTransform: "none",
                    position: "relative",whiteSpace: 'nowrap',"&:hover": { color: "#000"},
                    "&::after": {content: '""',position: "absolute",width: "0%",
                      height: "2px",bottom: 0,left: 0,backgroundColor: "#000",transition: "0.3s"
                    },
                    "&:hover::after": {
                      width: "100%"
                    }
                  }}
                >
                  {page.name}
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
               <Box sx={{ position: 'relative' }}>
  <ClickAwayListener onClickAway={() => setOpen(false)}>
    <div>
      <IconButton onClick={() => setOpen(!open)}>
        <Box component="img" src={search} />
      </IconButton>
      {open && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            zIndex: 9,
            top: '110%',
            right: 0,
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 1,
            borderRadius: '8px',
            width: '200px',
          }}
        >
          <InputBase placeholder="Search..." sx={{ flex: 1 }} autoFocus />
        </Paper>
      )}
    </div>
  </ClickAwayListener>
</Box>

              <IconButton onClick={()=>navigate('/profile')}>
              <Box component={'img'} src={profile}  />
              </IconButton>

              <IconButton sx={{ display: 'flex', gap: 2 }} onClick={() => setOpenCart(true)}>
  <Box component={'img'} src={cart} />
  <Badge
    badgeContent={data?.items?.length}
    sx={{
      "& .MuiBadge-badge": {
        backgroundColor: "black",
        color: "white",
      }
    }}
  />
</IconButton>        
            </Box>
          </Toolbar>
        </Container>
        <Drawer
  anchor="right"
  open={openCart}
  onClose={() => setOpenCart(false)}
>
  <Box sx={{ width: 350, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography fontWeight="bold" fontSize="24px">Cart</Typography>
      <IconButton onClick={() => setOpenCart(false)}>
        <CloseIcon />
      </IconButton>
    </Box>

    <Divider sx={{ mb: 2 }} />
    <Box sx={{ flex: 1, overflowY: 'auto' }}>
      {data?.items?.length > 0 ? (
        cartItems.map((item, index) => (
          <Box onClick={() => navigate(`/product/${item.productId
            }`)}
         
            key={index}
            sx={{
              display: 'flex',
              gap: 2,
              mb: 3,
              alignItems: 'center',
              borderBottom: '1px solid #eee', 
              pb: 2 ,
              cursor:"pointer"
            }}
          >
            <Box
              component="img"
              src={item.image }
              sx={{ width: 60, height: 60, borderRadius: 2 }}
            />

      
            <Box sx={{ flex: 1 }}>
              <Box sx={{display:'flex', justifyContent:'space-between',mb:"8px"}}><Typography fontSize="14px" fontFamily={'Inter'} fontWeight="600">
                {item.name}
              </Typography>
              <Typography fontSize="14px" fontFamily={'Inter'} fontWeight={600} >
                ${item.price}
              </Typography>
              </Box>
              <Box sx={{display:'flex', justifyContent:'space-between',mb:"8px"}}>
                <Typography color="#6C7275" fontFamily={'Inter'} fontSize={"12px"}>Color: Black</Typography>
               <IconButton size="small" onClick={()=>handleRemoveItem(item.productId)}>
              ✕
            </IconButton>
            </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #ddd',
                  borderRadius: 1,
                  width: 'fit-content',
                  mt: 1
                }}
              > 
             
             <IconButton size="small" disabled={updateItemPending} onClick={()=>handleUpdateQty(item.productId,'-')}><RemoveIcon/></IconButton>
                <Typography px={1}>{item.count}</Typography>
                <IconButton size="small" disabled={updateItemPending} onClick={()=>handleUpdateQty(item.productId,'+')}><AddIcon/></IconButton>
              </Box>
            </Box>

           
          </Box>
        ))
      ) : (
        <Typography>Cart is empty</Typography>
      )}
    </Box>
    <Divider sx={{ my: 2 }} />

    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Subtotal</Typography>
        <Typography fontWeight="bold">
          ${data.cartTotal}
          
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={()=>navigate('/checkout')}
        sx={{
          background: 'black',
          color: 'white',
          borderRadius: 2,
          py: 1.5,
          "&:hover": { background: "#333" }
        }}
      >
        Checkout
      </Button>
    </Box>

  </Box>
</Drawer>
      </AppBar>

      
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ width: 260, p: 2 }}>

          
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

          
          <List>
            <ListItem sx={{ cursor: "pointer" }}>
              <ListItemText primary="Login"  />
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