import React from "react";
import { Box, TextField,Typography,Paper, Button,Radio, FormControlLabel,Divider, FormGroup,Checkbox, Grid, IconButton,} from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import { useParams, useNavigate } from "react-router-dom";
import useCheckout from "../../hooks/useCheckout";

export default function Checkout({
  complete,
  selectedShip,
  paymentMethod,
  setPaymentMethod,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate, isPending } = useCheckout();

  const { data } = useCart();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(paymentMethod === "card" ? "Visa" : "Cash");
    complete();
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto", p: 2 }}>

      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, md: 7 }}>
          <form onSubmit={handleSubmit}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography fontWeight={600} mb={2} fontSize={20}>
                Contact Information
              </Typography>

              <Grid container spacing={2}>

                <Grid item size={{ xs: 12, md: 6 }}>
                   <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>first Name</Typography>
                  <TextField fullWidth size="small"   name="firstName" placeholder="First Name" />
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>last Name</Typography>
                  <TextField fullWidth size="small"   name="lastNmae"  placeholder="Last Name" />
                </Grid>

                <Grid item size={{ xs: 12 }}>
                <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>Phone Number</Typography>
                  <TextField fullWidth size="small"  name="phoneNumber" placeholder="Phone" />
                </Grid>

                <Grid item size={{ xs: 12 }}>
                <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>Email address</Typography>
                  <TextField fullWidth size="small"  name="email" placeholder="Email" />
                </Grid>

              </Grid>
            </Paper>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography fontWeight={600} mb={2} fontSize={20}>
                Shipping Address
              </Typography>

              <Grid container spacing={2}>

                <Grid item size={{ xs: 12 }}>
                <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>Street Address *</Typography>
                  <TextField fullWidth size="small" required   placeholder="Street Address" />
                </Grid>

                <Grid item size={{ xs: 12 }}>
                <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>Country *</Typography>

                  <TextField fullWidth size="small" required   placeholder="Country" />
                </Grid>

                <Grid item size={{ xs: 12 }}>
                <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>Town / City *</Typography>

                  <TextField fullWidth size="small" required  placeholder="City" />
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>State</Typography>
                  <TextField fullWidth size="small"   placeholder="State" />
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>Zip Code</Typography>
                  <TextField fullWidth size="small"    placeholder="Zip" />
                </Grid>

                <Grid item size={{ xs: 12 }}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox color="default" />}
                      label="Use a different billing address (optional)"
                    />
                  </FormGroup>
                </Grid>

              </Grid>
            </Paper>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography fontWeight={600} mb={2} fontSize={20}>
                Payment Method
              </Typography>

              <Grid container spacing={1}>

                <Grid item size={{ xs: 12 }}>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      p: 1,
                      background:
                        paymentMethod === "card" ? "#F3F5F7" : "#fff",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                        />
                      }
                      label="Card Payment"
                    />
                  </Box>
                </Grid>

                <Grid item size={{ xs: 12 }}>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      p: 1,
                      background:
                        paymentMethod === "Cash" ? "#F3F5F7" : "#fff",
                    }}
                  >
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
                </Grid>

                {paymentMethod === "card" && (
                  <>
                    <Grid item size={{ xs: 12 }}>
                    <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>Card Number</Typography>
                      <TextField fullWidth size="small"  placeholder="Card Number" />
                    </Grid>

                    <Grid item size={{ xs: 12, md: 6 }}>
                    <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>Expiration date</Typography>
                      <TextField fullWidth size="small" placeholder="MM/YY" />
                    </Grid>

                    <Grid item size={{ xs: 12, md: 6 }}>
                    <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>CVC</Typography>
                      <TextField fullWidth size="small" placeholder="CVC" />
                    </Grid>
                  </>
                )}

              </Grid>
            </Paper>

            <Button
              fullWidth
              type="submit"
              disabled={isPending}
              sx={{ background: "#000", color: "#fff", py: 1.5 }}
            >
              {isPending ? "Processing..." : "Place Order"}
            </Button>

          </form>
        </Grid>
        <Grid item size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3 }}>

            <Typography fontWeight={600} mb={2}>
              Order Summary
            </Typography>

            {cartItems.map((item, index) => (
              <Box  key={index} 
                sx={{ display: "flex",gap: 4,mb: 3, pb: 2,
                  borderBottom: "1px solid #eee", cursor: "pointer", }}>
                <Box
                  component="img"
                  src={item.image}
                  sx={{ width: 60, height: 60, borderRadius: 2 }}
                />

                <Box sx={{display:'flex', flex: 1,flexDirection:"column",gap:1}}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }} onClick={() => navigate(`/product/${item.productId}`)}>
                    <Typography fontWeight={600}>{item.name}</Typography>
                    <Typography fontWeight={600}>
                      ${item.price}
                    </Typography>
                  </Box>

                  <Typography fontSize={12} color="#6C7275">
                    Color: Black
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #E8ECEF",  borderRadius: "6px",  width: "fit-content",}}>
                    <IconButton size="small" disabled>
                      <RemoveIcon />
                    </IconButton>

                    <Typography px={1}>{item.count}</Typography>

                    <IconButton size="small" disabled>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Grid container>
              <Grid item size={{ xs: 6 }}>
                <Typography>Shipping</Typography>
              </Grid>
              <Grid item size={{ xs: 6 }} textAlign="right">
                <Typography>{selectedShip?.label}</Typography>
              </Grid>

              <Grid item size={{ xs: 6 }}>
                <Typography>Subtotal</Typography>
              </Grid>
              <Grid item size={{ xs: 6 }} textAlign="right">
                <Typography>{data?.cartTotal?.toFixed(2)}</Typography>
              </Grid>

              <Grid item size={{ xs: 6 }}>
                <Typography fontWeight={600}>Total</Typography>
              </Grid>
              <Grid item size={{ xs: 6 }} textAlign="right">
                <Typography fontWeight={600}>
                  {((data?.cartTotal || 0)/2 + selectedShip?.price).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>

          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
}