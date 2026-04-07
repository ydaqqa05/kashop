import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import useCart from '../../hooks/useCart';
import { useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';

export default function Complete({paymentMethod}) {
  const { data, isError, isLoading, error } = useCart();
  console.log(data)
  const { id } = useParams();
  const now = new Date();
  const { data: products } = useProducts(id);
  const cartItems = data?.items?.map((item) => {
      const product = products?.response?.data?.find(pro => (pro.id === item.productId));
      return {
          ...item,

          name: product?.name,
          image: product?.image,
          price: product?.price
      };
  }) || [];
  console.log(cartItems)
  return (
    <Box
    sx={{
      maxWidth: 600,
      mx: "auto",
      mt: 5,
      p: 4,
      boxShadow: 3,
      borderRadius: 2,
      textAlign: "center",
      bgcolor: "background.paper",
    }}
  >
    <Typography variant="body1" color="text.secondary">
      Thank you! 🎉
    </Typography>
    <Typography variant="h5" fontWeight="bold" mt={1} mb={3}>
      Your order has been received
    </Typography>

    <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
      {cartItems?.map((item) => (
        <Box key={item.id} sx={{ position: "relative" }}>
          <Avatar
            src={item.image}
            alt={item.productName}
            sx={{ width: 50, height: 50 }}
          />
          <Box
            sx={{
              position: "absolute",
              top: -5,
              right: -5,
              bgcolor: "black",
              color: "white",
              borderRadius: "50%",
              width: 20,
              height: 20,
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.count}
          </Box>
        </Box>
      ))}
    </Stack>

<Box sx={{display:'flex',gap:"72px",justifyContent:"center"}}>
    <Box textAlign="left" mb={3}>
      <Typography variant="body2" mb={"20px"}>Order code:</Typography>
      <Typography variant="body2" mb={"20px"}>Date:</Typography>
      <Typography variant="body2" mb={"20px"}>Total:</Typography>
      <Typography variant="body2" mb={"20px"}>Payment method:</Typography>
    </Box>
    <Box textAlign="left" mb={3}>
      <Typography variant="body2" mb={"20px"}> <strong>#0123_45678</strong></Typography>
      <Typography variant="body2" mb={"20px"}> <strong>{now.toLocaleDateString()}</strong></Typography>
      <Typography variant="body2" mb={"20px"}> <strong>${data?.cartTotal.toFixed(2)}</strong></Typography>
      <Typography variant="body2" mb={"20px"}> <strong> {paymentMethod === "card" ? "Visa" : "Cash"}</strong></Typography>
    </Box>
    </Box>
  </Box>
  )
}
