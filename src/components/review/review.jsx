import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Rating, Typography } from '@mui/material';
import ReviewInput from './EnterReview';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({product}) {
  const [value, setValue] = React.useState(0);
console.log(product)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Additional Info" {...a11yProps(0)} />
          <Tab label="Questions" {...a11yProps(1)} />
          <Tab label="Reviews" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={2}>
        <Box  sx={{display:'flex',flexDirection:'column',gap:1}}>
            <Typography fontSize={"28px"} fontFamily={"Poppins"} fontWeight={600} mb={2}>Customer Reviews</Typography>
       <Box sx={{display:'flex',justifyContent:"start",alignItems:"center",gap:1}}>
<Rating value={product.rate} readOnly  sx={{color:'#141718',fontSize: "16px"}}/>
<Typography fontSize={"12px"} fontFamily={"Inter"}>{product.reviews.length} Reviews</Typography>
       </Box>
       <Typography fontFamily={"Inter"} fontWeight={600} pl={"166px"}>{product.name}</Typography>
        </Box>
        <ReviewInput product={product}/>
      </CustomTabPanel>
    </Box>
  );
}