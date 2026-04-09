import React, { useState } from "react";
import { Box,Typography,Card,CardMedia,IconButton,Button,Rating,Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import useAddToCart from "../../hooks/useAddToCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function Product({ product }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const { mutate: addToCart, isPending } = useAddToCart();
  const handleAddToCart = () => {
    addToCart(
      { productId: product.id, count: 1 },
      {
        
      }
    );
  };
const navigate=useNavigate()
  const oldPrice = product.price;
  const newPrice = (product.price / 2).toFixed(2);
  const discount = 50;

  return (
    <Box>
      <Card elevation={0}   sx={{borderRadius: 4,overflow: "hidden",cursor: "pointer",transition: "all 0.3s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Box sx={{ position: "relative", backgroundColor: "#f7f7f7", height: 340,display: "flex",
            alignItems: "center",justifyContent: "center",p:'20px'
          }}
        >
          <CardMedia component="img" image={product.image}alt={product.title} onClick={() => navigate(`/product/${product.id}`)}
            sx={{height: 240, objectFit: "contain",transition: "transform 0.3s ease",transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <Chip label="NEW" size="small"
            sx={{borderRadius:2, position: "absolute",top: 16,left: 16,backgroundColor: "#eaeaea",
              fontWeight: 600,fontSize: 16,fontFamily:'Inter',py:'4px',px:"5px"
            }}
          />
          <Chip label={`-${discount}%`} size="small" sx={{borderRadius:2, position: "absolute", top: 48,
              left: 16, backgroundColor: "#27ae60",color: "#fff",fontWeight: 600,fontSize: 16,
              fontFamily:'Inter',py:'4px',px:"5px"
            }}
          />
          <IconButton onClick={() => setLiked(!liked)} sx={{position: "absolute",top: 16,
    right: 16,backgroundColor: "#fff",boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#f3f3f3",
    },
  }}
>
  {liked ? (
    <FavoriteIcon sx={{ color: "red" }} fontSize="small" />
  ) : (
    <FavoriteBorderIcon fontSize="small" />
  )}
</IconButton>
<Box sx={{position: "absolute",bottom: 20,width: "85%",opacity: hovered ? 1 : 0,transform: hovered ? "translateY(0)" : "translateY(20px)",
     transition: "all 0.3s ease",
            }}
          >
            <Button fullWidth variant="contained" onClick={handleAddToCart}disabled={isPending}
              sx={{backgroundColor: "#111",borderRadius: 3,textTransform: "none",fontWeight: 600,
                py: 1.2,
                "&:hover": {
                  backgroundColor: "#000",
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Card>
      <Box mt={2}>
        <Rating value={product.rate} readOnly size="small"  sx={{color: "#343839",}} />

        <Typography
          mt={1}
          fontWeight={600}
          fontSize={18}
          fontFamily="Poppins"
        >
          {product.name}
        </Typography>

        <Box display="flex" alignItems="center" gap={2} mt={1}>
          <Typography fontWeight={700} fontSize={18} sx={{color:'#141718'}}>
            ${newPrice}
          </Typography>

          <Typography  sx={{textDecoration: "line-through",color: "#888",fontSize: 15,}}
          >
            ${oldPrice}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}