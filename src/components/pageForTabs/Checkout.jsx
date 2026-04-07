import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  Radio,
  FormControlLabel,
  Divider,
  FormGroup,
  Checkbox,
  IconButton,
} from "@mui/material";

import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import { useParams } from "react-router-dom";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useUpdateCartItem from "../../hooks/useUpdateCartItem";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import useCheckout from "../../hooks/useCheckout";
export default function Checkout({complete,selectedShip, paymentMethod, setPaymentMethod }) {
    const {id}=useParams();
    const { mutate, isPending } = useCheckout();
   const {data,isError,isLoading,error}=useCart();
   const { data: products } = useProducts(id); 
  
  const cartItems=data?.items?.map((item)=>{
    const product=products?.response?.data?.find(pro=>(pro.id===item.productId));
    return {
      ...item,
      
      name: product?.name,
      image: product?.image,
      price: product?.price
    };
  }) || [];
  
 
 
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(paymentMethod==="card"?"Visa":"Cash");
    complete();
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto", p: 2 }}>
      <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
        
        <Box sx={{ flex: 2 }}>
          <form onSubmit={handleSubmit}>
            
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography fontWeight={600} mb={2} fontSize={"20px"} fontFamily={"Poppins"}>
                Contact Information
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700} >FIRST NAME</Typography>
                  <TextField fullWidth size="small" placeholder="First name" fontFamily="Inter" />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>LAST NAME</Typography>
                  <TextField fullWidth size="small" placeholder="Last name" fontFamily="Inter" />
                </Box>
              </Box>

              <Box mt={2}>
                <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>PHONE NUMBER</Typography>
                <TextField fullWidth size="small" placeholder="Phone number" />
              </Box>

              <Box mt={2}>
                <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>EMAIL ADDRESS</Typography>
                <TextField fullWidth size="small" placeholder="Your Email" />
              </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography fontWeight={600} mb={2} fontSize={"20px"} fontFamily={"Poppins"}>
                Shipping Address
              </Typography>

              <Box mb={2}>
                <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>STREET ADDRESS *</Typography>
                <TextField fullWidth size="small" placeholder="Stress Address" required />
              </Box>

              <Box mb={2}>
                <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>COUNTRY *</Typography>
                <TextField fullWidth size="small" placeholder="Country" required/>
              </Box>

              <Box mb={2}>
                <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>TOWN / CITY *</Typography>
                <TextField fullWidth size="small" placeholder="Town / City" required/>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>STATE</Typography>
                  <TextField fullWidth size="small" placeholder="State" />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>ZIP CODE</Typography>
                  <TextField fullWidth size="small" placeholder="Zip Code" />
                </Box>
                
              </Box>
              <FormGroup sx={{flex:1,pt:2}}>
  <FormControlLabel  required control={<Checkbox color="default" />} label="Use a different billing address (optional)" sx={{color:"#6C7275"}} />
</FormGroup>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography fontWeight={600} mb={2} fontSize={"20px"} fontFamily={"Poppins"}>
                Payment method
              </Typography>

              <Box sx={{ border: "1px solid #ddd", p: 1, mb: 1,backgroundColor:paymentMethod=="card"?"#F3F5F7":"#fff"}}>

                <FormControlLabel
                
                
                  control={
                    <Radio
                      checked={paymentMethod === "card"}
                    
                      onChange={() => setPaymentMethod("card")}
                    />
                  }
                  label="Pay by Card Credit"
                 
                />
              </Box>

              <Box sx={{ border: "1px solid #ddd", p: 1, mb: 2,backgroundColor:paymentMethod=="Cash"?"#F3F5F7":"#fff" }}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={paymentMethod === "Cash"}
                     
                      onChange={() => setPaymentMethod("Cash")}
                    />
                  }
                  label="Cash"
                />
              </Box>

              {paymentMethod === "card" && (
                <>
                  <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>CARD NUMBER</Typography>
                  <TextField fullWidth size="small" sx={{ mb: 2 }} placeholder="1234 1234 1234"/>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>
                        EXPIRATION DATE
                      </Typography>
                      <TextField fullWidth size="small" placeholder="MM/YY" />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>CVC</Typography>
                      <TextField fullWidth size="small" placeholder="CVC code " />
                    </Box>
                  </Box>
                </>
              )}
            </Paper>

            <Button
              fullWidth
              
              type="submit"
              disabled={isPending}
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                py: 1.5,
                textTransform: "none",
               
              }}
            >
               {isPending ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3 }}>
            <Typography fontWeight={600} mb={2}>
              Order summary
            </Typography>

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
               <IconButton size="small" >
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
             
             <IconButton size="small" ><RemoveIcon/></IconButton>
                <Typography px={1}>{item.count}</Typography>
                <IconButton size="small" ><AddIcon/></IconButton>
              </Box>
            </Box>

           
          </Box>
        ))
      ) : (
        <Typography>Cart is empty</Typography>
      )}
    </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField size="small" fullWidth placeholder="Input" />
              <Button
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  textTransform: "none",
                }}
              >
                Apply
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography>Shipping</Typography>
              <Typography>{selectedShip?.label}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography>Subtotal</Typography>
              <Typography>{data?.cartTotal.toFixed(2)}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography fontWeight={600}>Total</Typography>
              <Typography fontWeight={600}>{((data?.cartTotal/2)+selectedShip?.price).toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}