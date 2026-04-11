import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Paper,
  Radio,
  InputBase,
  Grid,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

import useCart from "../../hooks/useCart";
import { useNavigate, useParams } from "react-router-dom";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useUpdateCartItem from "../../hooks/useUpdateCartItem";
import useProducts from "../../hooks/useProducts";

export default function CartPage({ Checkout, setSelectedShipping }) {
  const { data } = useCart();
  const navigate = useNavigate();
  const [localSelected, setLocalSelected] = useState(0);

  const { mutate: removeItem, isPending } = useRemoveFromCart();
  const { mutate: updateItem, isPending: updateItemPending } =
    useUpdateCartItem();

  const { id } = useParams();
  const { data: products } = useProducts(id);

  const cartItems =
    data?.items?.map((item) => {
      const product = products?.response?.data?.find(
        (pro) => pro.id === item.productId
      );
      return {
        ...item,
        name: product?.name,
        image: product?.image,
        price: product?.price,
      };
    }) || [];

  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  const handleUpdateQty = (productId, action) => {
    const item = data.items.find((i) => i.productId == productId);

    if (action === "-") {
      updateItem({ productId, count: item.count - 1 });
    } else {
      updateItem({ productId, count: item.count + 1 });
    }
  };

  const shippingOptions = [
    { label: "Free shipping", price: 0 },
    { label: "Express shipping", price: 15 },
    { label: "Pick Up", price: 21 },
  ];

  const selectedPrice = shippingOptions[localSelected].price;

  return (
    <Box px={{ xs: 2, md: 8 }} py={6}>
      <Grid container spacing={4}>
        <Grid item  size={{xs:12,md:8}} >
          <Box display={{ xs: "none", md: "block" }}>

            <Grid container sx={{ mb: 2, fontWeight: 600 }}>
              <Grid item size={{xs:6}}>
                <Typography>Product</Typography>
              </Grid>
              <Grid item size={{xs:2}}>
                <Typography>Quantity</Typography>
              </Grid>
              <Grid item size={{xs:2}}>
                <Typography>Price</Typography>
              </Grid>
              <Grid item size={{xs:2}}>
                <Typography>Subtotal</Typography>
              </Grid>
            </Grid>

            <Divider />

            {cartItems.map((item) => (
              <Grid
                container
                key={item.productId}
                alignItems="center"
                spacing={2}
                sx={{ py: 3, borderBottom: "1px solid #eee" }}
              >
                <Grid item size={{xs:6}} sx={{ display: "flex", gap: 2 }}>
                  <Box
                    component="img"
                    src={item.image}
                    sx={{ width: 70, borderRadius: 2 }}
                  />

                  <Box>
                    <Typography fontWeight={600}>{item.name}</Typography>

                    <Typography fontSize="13px" color="#6C7275">
                      Color: black
                    </Typography>

                    <Box
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      <CloseIcon sx={{ fontSize: 16 }} />
                      <Typography fontSize="13px">Remove</Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item size={{xs:2}} >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #E8ECEF",
                      borderRadius: "6px",
                      width: "fit-content",
                    }}
                  >
                    <IconButton
                      size="small"
                      disabled={updateItemPending}
                      onClick={() => handleUpdateQty(item.productId, "-")}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Typography>{item.count}</Typography>

                    <IconButton
                      size="small"
                      disabled={updateItemPending}
                      onClick={() => handleUpdateQty(item.productId, "+")}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Grid>

                <Grid item size={{xs:2}}>
                  <Typography>${item.price?.toFixed(2)}</Typography>
                </Grid>

                <Grid item size={{xs:2}}>
                  <Typography fontWeight={600}>
                    ${item.totalPrice?.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>

          <Box display={{ xs: "block", md: "none" }}>

            <Typography fontWeight="bold" fontSize="22px" mb={2}>
            Product
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {cartItems.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "70px 1fr",
                  gap: 2,
                  mb: 3,
                  borderBottom: "1px solid #eee",
                  pb: 2,
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  sx={{ width: 60, height: 60, borderRadius: 2 }}
                />

                <Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                    }}
                  >
                    <Typography fontSize="14px" fontWeight={600}>
                      {item.name}
                    </Typography>

                    <Typography fontWeight={600}>
                      ${item.price}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      mb: 1,
                    }}
                  >
                    <Typography fontSize="12px" color="#6C7275">
                      Color: Black
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      ✕
                    </IconButton>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ddd",
                      width: "fit-content",
                      borderRadius: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateQty(item.productId, "-")}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Typography px={1}>{item.count}</Typography>

                    <IconButton
                      size="small"
                      onClick={() => handleUpdateQty(item.productId, "+")}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* COUPON */}
          <Box mt={6}>
            <Typography fontWeight={600}>Have a coupon?</Typography>

            <Typography color="#6C7275" fontSize="14px" mb={2}>
              Add your code for an instant cart discount
            </Typography>

            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: 320,
                border: "1px solid #E0E0E0",
                borderRadius: "8px",
              }}
            >
              <InputBase placeholder="Coupon Code" sx={{ ml: 1, flex: 1 }} />
              <Button sx={{ color: "#000" }}>Apply</Button>
            </Paper>
          </Box>
        </Grid>
        <Grid item size={{xs:12,md:4}} >
          <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid #E8ECEF" }}>
            <Typography fontWeight={600} mb={2}>
              Cart summary
            </Typography>

            {shippingOptions.map((opt, i) => (
              <Box
                key={i}
                onClick={() => {
                  setSelectedShipping(opt);
                  setLocalSelected(i);
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid #E8ECEF",
                  borderRadius: 2,
                  p: 1.5,
                  mb: 1,
                  cursor: "pointer",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Radio checked={localSelected === i} />
                  <Typography>{opt.label}</Typography>
                </Box>

                <Typography>
                  {opt.price === 0 ? "$0.00" : `+$${opt.price}.00`}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography>Subtotal</Typography>
              <Typography>${data?.cartTotal?.toFixed(2)}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography fontWeight={600}>Total</Typography>
              <Typography fontWeight={600}>
                ${((data?.cartTotal || 0)/2 + selectedPrice).toFixed(2)}
              </Typography>
            </Box>

            <Button
              onClick={Checkout}
              fullWidth
              sx={{
                mt: 3,
                background: "#000",
                color: "#fff",
                borderRadius: 2,
                py: 1.5,
                "&:hover": { background: "#333" },
              }}
            >
              Checkout
            </Button>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
}