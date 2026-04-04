import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import useAddToCart from "../../hooks/useAddToCart";
import Loader from "../../ui/loader/Loader";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box,Typography,Rating,Button,IconButton,Divider, Chip} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useUpdateCartItem from "../../hooks/useUpdateCartItem";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import useCategories from "../../hooks/useCategories";
import ReviewsSection from "../../components/review/review";
import BasicTabs from "../../components/review/review";
import { HeartIcon } from "lucide-react";
export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useProduct(id);
  const { mutate, isPending } = useAddToCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(100000); 
  const [love,setLove]=useState(false)
   const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return { days, hours, minutes, secs };
  };
  const { days, hours, minutes, secs } = formatTime(timeLeft); 
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
 
  if (isLoading) return <Loader />;
  if (isError) return <Box color="red">{error.message}</Box>;
 

 

  const product = data?.response;
  const images = [
    product?.image,
    ...(product?.subImages || []),
  ].filter(Boolean);
console.log("product data ",product)
console.log("images data ",images)
  return (
    <Box px={{ xs: 2, md: 10 }} py={6}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 6,
        }}
      >
        <Box flex={1}>
          <Box position="relative">
            <Box
              component="img"
              src={selectedImage || images[0]}
              sx={{
                width: "100%",
                height: 450,
                objectFit: "contain",
                borderRadius: 2,
                background: "#f7f7f7",
              }}
            />

            <Chip
              label="NEW"
              size="small"
              sx={{ position: "absolute", top: 16, left: 16 ,borderRadius:1,backgroundColor:"#fff",py:"10px",
                px:"8px"}}
            />

            <Chip
              label="-50%"
              size="small"
              sx={{
                position: "absolute",
                top: 50,
                left: 16,
                background: "#38CB89",
                color: "#fff",
                py:"10px",
                px:"8px",
                borderRadius:1
              }}
            />
          </Box>
          <Box mt={2} display="flex" gap={2}>
            {images.map((img, i) => (
              <Box
                key={i}
                component="img"
                src={img}
                onClick={() => setSelectedImage(img)}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 2,
                  cursor: "pointer",
                  border:
                    selectedImage === img
                      ? "2px solid black"
                      : "1px solid #ddd",
                }}
              />
            ))}
          </Box>
        </Box>
        <Box flex={1}  borderBottom= '1px solid #eee' pb= {4}>
          <Box sx={{display:"flex",gap:"10px",alignItems:"center"}}>  
            <Rating value={product.rate } readOnly sx={{ my: 1,color:"#343839" }}/>
          <Typography sx={{fontFamily:"Inter",fontSize:"12px"}}>{product.reviews?.length} Reviews</Typography>
          </Box>
      
          <Typography variant="h4" fontWeight={500} fontSize={"40px"} fontFamily={"Poppins"}>
            {product.name}
          </Typography>

         

          <Typography color="text.secondary" mb={2} fontFamily={"Inter"}>
            {product.description}
          </Typography>
          <Box display="flex" alignItems="center" gap={2} borderBottom= '1px solid #eee' pb= {2} >
            <Typography fontSize="24px" fontWeight="bold">
              ${product.price}
            </Typography>

            <Typography
              sx={{ textDecoration: "line-through", color: "gray" }}
            >
              ${product.price * 2}
            </Typography>
          </Box>
          <Box mt={3}>
            <Typography fontWeight="600" mb={1}>
              Offer expires in:
            </Typography>

            <Box display="flex" gap={2}>
  {[
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: secs, label: "Seconds" },
  ].map((item, i) => (
    <Box
      key={i}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      
    >
      <Box sx={{background: "#f3f4f6",px: 3,py: 1.5,borderRadius: 1, textAlign: "center",minWidth: 60,}}
      >
        <Typography fontWeight="bold" fontSize="18px">
          {item.value.toString().padStart(2, "0")}
        </Typography>
      </Box>

      <Typography mt={1} fontSize="12px" color="text.secondary">
        {item.label}
      </Typography>
    </Box>
  ))}
</Box>
          </Box>

          <Divider sx={{ my: 3 }} />
          <Box sx={{display:'flex',justifyContent:'space-between',gap:3,mb:'16px'}}>
          
         <Button
              variant="outlined"
              onClick={()=>setLove(!love)}
              startIcon={love?<FavoriteIcon color="error"/>:<FavoriteBorderIcon />}
              sx={{ borderColor: "black", color: "black",flex:1 }}
            >
              Wishlist
            </Button>
            </Box>
          
            <Button
              variant="contained"
              disabled={isPending}
              onClick={() =>
                mutate({ productId: product.id, count: quantity })
              }
              sx={{
                background: "black",
                px: 5,
                "&:hover": { background: "#333" },
                width:"100%",
               
              }}
            >
              Add To Cart
            </Button>
         
        </Box>
      </Box>
      <BasicTabs product={product}/>
    </Box>
  );
}