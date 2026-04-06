import React, { useState } from "react";
import {Box,Typography,IconButton,Button,Divider,Paper,Radio,TextField,InputBase,} from "@mui/material";
import money from '../../assets/image/money.svg'
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import useCart from "../../hooks/useCart";
import { useNavigate, useParams } from "react-router-dom";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useUpdateCartItem from "../../hooks/useUpdateCartItem";
import useProducts from "../../hooks/useProducts";

export default function CartPage({ Checkout }) {
    const { data, isError, isLoading, error } = useCart();
    const navigate = useNavigate()
    const [selectedShipping, setSelectedShipping] = useState(0);
    const { mutate: removeItem, isPending } = useRemoveFromCart()
    const { mutate: updateItem, isPending: updateItemPending } = useUpdateCartItem()
    const { id } = useParams();
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
    const handleRemoveItem = (productId) => {
        const item = data.items.find((i) => {
            return i.productId == productId;
        });
        removeItem(productId);
    }
    const handleUpdateQty = (productId, action) => {
        { console.log(data) }
        const item = data.items.find((i) => {
            return i.productId == productId;
        });

        if (action == '-') {
            updateItem({ productId, count: item.count - 1 })
        }
        else {
            updateItem({ productId, count: item.count + 1 })
        }
    }
    const shippingOptions = [
        { label: "Free shipping", price: 0 },
        { label: "Express shipping", price: 15 },
        { label: "Pick Up", price: 21 },
    ];

    const selectedPrice = shippingOptions[selectedShipping].price;
    return (
        <Box px={8} py={6}>
            <Box display="flex" gap={6} alignItems="flex-start">
                <Box flex={1.5}>
                    <Box
                        display="grid"
                        gridTemplateColumns="2fr 1fr 1fr 1fr"
                        mb={2}
                        color="#121212"
                        fontWeight={600}
                    >
                        <Typography fontWeight={600}>Product</Typography>
                        <Typography fontWeight={600}>Quantity</Typography>
                        <Typography fontWeight={600}>Price</Typography>
                        <Typography fontWeight={600}>Subtotal</Typography>
                    </Box>

                    <Divider />
                    {cartItems?.map((item) => (
                        <Box key={item.productId} py={3} borderBottom="1px solid #eee">

                            <Box
                                display="grid"
                                gridTemplateColumns="2fr 1fr 1fr 1fr"
                                alignItems="center"
                            >
                                <Box display="flex" gap={2}>
                                    <Box
                                        component="img"
                                        src={item.image}
                                        sx={{ width: 70, borderRadius: 2 }}
                                    />

                                    <Box>
                                        <Typography fontWeight={600}>
                                            {item.productName}
                                        </Typography>

                                        <Typography fontSize="13px" color="#6C7275">
                                            Color: black
                                        </Typography>

                                        <Box display="flex" alignItems="center" mt={1} disabled={isPending} onClick={() => handleRemoveItem(item.productId)} sx={{ cursor: "pointer" }}>
                                            <CloseIcon sx={{ fontSize: 16 }} />
                                            <Typography fontSize="13px" ml={0.5}>
                                                Remove
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box>
                                    <Box display="flex"
                                        alignItems="center"
                                        border="1px solid #E8ECEF"
                                        borderRadius="6px"
                                        width="fit-content"><IconButton size="small" disabled={updateItemPending} onClick={() => handleUpdateQty(item.productId, '-')}><RemoveIcon /></IconButton>
                                        <Typography>{item.count}</Typography>
                                        <IconButton size="small" disabled={updateItemPending} onClick={() => handleUpdateQty(item.productId, '+')}><AddIcon /></IconButton>
                                    </Box>

                                </Box>
                                <Typography>
                                    ${item.price.toFixed(2)}
                                </Typography>
                                <Typography fontWeight={600}>
                                    ${item.totalPrice.toFixed(2)}
                                </Typography>

                            </Box>
                        </Box>
                    ))}
                    <Box mt={6}>
                        <Typography fontWeight={600}>
                            Have a coupon?
                        </Typography>

                        <Typography color="#6C7275" fontSize="14px" mb={2}>
                            Add your code for an instant cart discount
                        </Typography>
                        <Paper
                            component="form"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: 300,
                                border: '1px solid #E0E0E0',
                                borderRadius: '8px',
                                p: '2px 4px'
                            }}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Coupon Code"
                                inputProps={{ 'aria-label': 'coupon code' }}
                            />
                            <Button
                                type="submit"
                                sx={{ borderLeft: '1px solid #E0E0E0', textTransform: 'none', color: "#000" }}
                            >
                                Apply
                            </Button>
                        </Paper>


                    </Box>

                </Box>
                <Box flex={1}>
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            border: "1px solid #E8ECEF",
                        }}
                    >
                        <Typography fontWeight={600} mb={2}>
                            Cart summary
                        </Typography>

                        {shippingOptions.map((opt, i) => (
                            <Box
                                key={i}
                                onClick={() => setSelectedShipping(i)}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    border: "1px solid #E8ECEF",
                                    borderRadius: "8px",
                                    p: 1,
                                    mb: 1,
                                    cursor: "pointer",
                                }}
                            >
                                <Box display="flex" alignItems="center">
                                    <Radio checked={selectedShipping === i} />
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
                            <Typography>${data?.cartTotal.toFixed(2)}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mt={1}>
                            <Typography fontWeight={600}>Total</Typography>
                            <Typography fontWeight={600}>
                                ${((data?.cartTotal / 2) + selectedPrice).toFixed(2)}
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
                </Box>

            </Box>
        </Box>
    );
}