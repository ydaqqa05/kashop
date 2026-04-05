import React, { useState } from "react";
import shopImage from "../../assets/image/shopImage.webp";
import {Box,Container,Tab, Tabs,Typography,Breadcrumbs,Link,Button,Drawer,IconButton,useMediaQuery,} from "@mui/material";
import PropTypes from "prop-types";
import useCategories from "../../hooks/useCategories";
import useProductByCategory from "../../hooks/useProductByCategory";
import Product from "../../ui/product/Product";
import Footer1 from "../../components/footer/Footer1";
import Footer2 from "../../components/footer/Footer2";
import filter from "../../assets/image/filter.svg";

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

export default function Shop() {
  const [categoryValue, setCategoryValue] = useState(0);
  const [sortValue, setSortValue] = useState(0);
  const [showCount, setShowCount] = useState(3);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const category = useCategories();
  const selectedCategory = category?.data?.response?.data?.[categoryValue];
  const { data, isLoading } = useProductByCategory(selectedCategory?.id);

  const sortOptions = [
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Name: A → Z", value: "name-asc" },
    { label: "Name: Z → A", value: "name-desc" },
  ];

  const handleCategoryChange = (event, newValue) => setCategoryValue(newValue);
  const handleSortChange = (event, newValue) => setSortValue(newValue);

  const selectedSort = sortOptions[sortValue].value;
  const sortedProducts = [...(data?.response || [])].sort((a, b) => {
    switch (selectedSort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
  const isMobile = useMediaQuery("(max-width:900px)");
  const FilterContent = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{ display: "flex", gap: "4px", mb: 2 }}>
        <Box component="img" src={filter} />
        <Typography fontWeight="bold">Filter</Typography>
      </Box>

      <Typography fontWeight="bold">CATEGORIES</Typography>
      <Tabs
        orientation="vertical"
        value={categoryValue}
        onChange={handleCategoryChange}
        sx={{
          mt: 1,
          "& .MuiTab-root": { alignItems: "flex-start", textAlign: "left", color: "gray", minHeight: 35 },
          "& .Mui-selected": { color: "black !important", fontWeight: "bold" },
          "& .MuiTabs-indicator": { backgroundColor: "black" },
        }}
      >
        {category?.data?.response?.data?.map((cat) => (
          <Tab key={cat.id} label={cat.name} />
        ))}
      </Tabs>

      <Box mt={3}>
        <Typography fontWeight="bold">SORT BY</Typography>
        <Tabs
          orientation="vertical"
          value={sortValue}
          onChange={handleSortChange}
          sx={{
            mt: 1,
            "& .MuiTab-root": { alignItems: "flex-start", textAlign: "left", color: "gray", minHeight: 35 },
            "& .Mui-selected": { color: "#000 !important", fontWeight: "bold" },
            "& .MuiTabs-indicator": { backgroundColor: "black" },
          }}
        >
          {sortOptions.map((option, index) => (
            <Tab key={index} label={option.label} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );

  return (
    <>
      <Container maxWidth="md">
        <Box
          sx={{ backgroundImage: `url(${shopImage})`,backgroundSize: "cover", backgroundPosition: "right center", backgroundRepeat: "no-repeat",
            height: "300px",display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",textAlign: "center",px: 2,mb: "60px", }}>
          <Breadcrumbs separator=">">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">Shop</Typography>
          </Breadcrumbs>
          <Typography fontSize="54px" fontWeight="medium">
            Shop Page
          </Typography>
          <Typography fontSize="20px">Let’s design the place you always imagined.</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 4 }}>
         
        {!isMobile && (
    <Box sx={{ width: 250 }}>
      {FilterContent}
    </Box>
  )}
          <Box sx={{ flex: 1 }} pb={"80px"}>
  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "16px" }}>
    <Typography fontFamily={"Inter"} fontSize={"20px"} fontWeight={600}>
      {selectedCategory?.name}
    </Typography>
    {isMobile && (
      <IconButton onClick={() => setDrawerOpen(true)}>
        <Box component="img" src={filter} sx={{ width: 24, height: 24 }} />
      </IconButton>
    )}
  </Box>
  <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
    {FilterContent}
  </Drawer>

  {isLoading ? (
    <Typography>Loading...</Typography>
  ) : (
    <Box
      sx={{display: "grid",gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 3,justifyContent:"center",alignItems:"center"}}>
      {sortedProducts.slice(0, showCount).map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </Box>
  )}

  {showCount < sortedProducts.length && (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <Button
        onClick={() => setShowCount((prev) => prev + 3)}
        variant="outlined"
        sx={{ borderRadius: "20px", px: 4, textTransform: "none", mb: "100px" }}
      >
        Show more
      </Button>
    </Box>
  )}
</Box>
        </Box>
      </Container>
      <Footer1 />
      <Footer2 />
    </>
  );
}