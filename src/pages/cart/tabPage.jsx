import * as React from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import Cart from "../../components/pageForTabs/Cart";
import Checkout from "../../components/pageForTabs/Checkout";
import { useLocation } from "react-router-dom";
import OrderConfirmation from "../../components/pageForTabs/Complete";
import Complete from "../../components/pageForTabs/Complete";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default function tabPage() {
  const [value, setValue] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState({label: "Free shipping",price: 0});
  const [paymentMethod, setPaymentMethod] = useState('card');
const location=useLocation();
  const handleChange = (event, newValue) => {
    if((value-setValue)>0)
    setValue(newValue);
  };

  const steps = [
    { label: "Shopping cart" },
    { label: "Checkout details" },
    { label: "Order complete" },
  ];
  const titles = ["Cart", "Check Out", "Complete!"];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        alignItems: "center",
        pt: "40px",
      }}
    >
      <Typography fontSize="54px" fontWeight={500}>
      {titles[value]}
      </Typography>
      <Tabs
  value={value}
  onChange={handleChange}
  variant="scrollable"
  scrollButtons={false}
  allowScrollButtonsMobile
  sx={{
    width: "100%",
    "& .MuiTabs-indicator": {
      backgroundColor: "black",
      height: 2,
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: { xs: "flex-start", md: "center" },
      gap: 2,
    },
  }}
>
  {steps.map((step, index) => (
    <Tab
      key={index}
      disableRipple
      label={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              backgroundColor:
                index < value
                  ? "#22c55e"
                  : index === value
                  ? "black"
                  : "#ccc",
              color: "white",
            }}
          >
            {index + 1}
          </Box>

          <Typography
            sx={{
              fontSize: 14,
              whiteSpace: "nowrap",
              color:
                index < value
                  ? "#22c55e"
                  : index === value
                  ? "black"
                  : "#B1B5C3",
            }}
          >
            {step.label}
          </Typography>
        </Box>
      }
      sx={{
        textTransform: "none",
        minHeight: 60,
        flexShrink: 0,
      }}
    />
  ))}
</Tabs>
      <Box sx={{ width: "100%",  maxWidth: "1200px", mx: "auto"}}>
        
        <CustomTabPanel value={value} index={0}>
        <Cart  Checkout={() => setValue(1)} 
  setSelectedShipping={setSelectedShipping}/>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
         <Checkout paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
          complete={()=>setValue(2)} selectedShip={selectedShipping}/>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
        <Complete paymentMethod={paymentMethod}/>
        </CustomTabPanel>

      </Box>
    </Box>
  );
}