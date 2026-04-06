import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Cart() {
  const [cart, setCart] = useState([
    { id: 1, name: "Tray Table", color: "Black", price: 19, qty: 2 },
    { id: 2, name: "Tray Table", color: "Red", price: 19, qty: 2 },
    { id: 3, name: "Table Lamp", color: "Gold", price: 39, qty: 1 },
  ]);

  const [shipping, setShipping] = useState("0");

  // ✅ تغيير الكمية
  const handleQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                type === "inc"
                  ? item.qty + 1
                  : Math.max(1, item.qty - 1),
            }
          : item
      )
    );
  };

  // ✅ حساب السعر
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const total = subtotal + Number(shipping);

  return (
    <Box sx={{ display: "flex", gap: 4, p: 4 }}>
      
      {/* LEFT */}
      <Box sx={{ flex: 2 }}>
        {cart.map((item) => (
          <Box
            key={item.id}
            sx={{ display: "flex", alignItems: "center", mb: 3 }}
          >
            <img
              src="https://via.placeholder.com/60"
              alt=""
              width={60}
            />

            <Box sx={{ ml: 2, flex: 1 }}>
              <Typography fontWeight={600}>{item.name}</Typography>
              <Typography color="gray">
                Color: {item.color}
              </Typography>
              <Button size="small">Remove</Button>
            </Box>

            {/* QTY */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => handleQty(item.id, "dec")}>
                <RemoveIcon />
              </IconButton>

              <Typography>{item.qty}</Typography>

              <IconButton onClick={() => handleQty(item.id, "inc")}>
                <AddIcon />
              </IconButton>
            </Box>

            <Typography sx={{ width: 80, textAlign: "center" }}>
              ${item.price}
            </Typography>

            <Typography sx={{ width: 100, textAlign: "right" }}>
              ${item.price * item.qty}
            </Typography>
          </Box>
        ))}

        {/* COUPON */}
        <Box mt={4}>
          <Typography>Have a coupon?</Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <TextField placeholder="Coupon Code" size="small" />
            <Button variant="outlined">Apply</Button>
          </Box>
        </Box>
      </Box>

      {/* RIGHT */}
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography fontWeight={600} mb={2}>
            Cart summary
          </Typography>

          <RadioGroup
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
          >
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="Free shipping ($0)"
            />
            <FormControlLabel
              value="15"
              control={<Radio />}
              label="Express shipping (+$15)"
            />
            <FormControlLabel
              value="21"
              control={<Radio />}
              label="Pick Up ($21)"
            />
          </RadioGroup>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Subtotal</Typography>
            <Typography>${subtotal}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography>Total</Typography>
            <Typography fontWeight={600}>${total}</Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, borderRadius: "10px" }}
          >
            Checkout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}