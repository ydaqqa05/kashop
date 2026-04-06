import * as React from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import Cart from "../../components/pageForTabs/Cart";
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const steps = [
    { label: "Shopping cart" },
    { label: "Checkout details" },
    { label: "Order complete" },
  ];

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
        Cart
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "black",
            height: 2,
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
              alignItems: "flex-start",
              mr: 4,
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ width: "100%",  maxWidth: "1200px", mx: "auto"}}>
        
        <CustomTabPanel value={value} index={0}>
        <Cart Checkout={() => setValue(1)}/>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Typography>💳 Checkout Content هنا</Typography>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <Typography>✅ Order Complete هنا</Typography>
        </CustomTabPanel>

      </Box>
    </Box>
  );
}