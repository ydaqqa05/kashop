import { Box, Container, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import swipper1 from "../../assets/image/sofa-swipper.webp";
import swipper2 from "../../assets/image/sofa-swipper2.webp";
import swipper3 from "../../assets/image/sofa-swipper3.webp";

const slides = [ 
  { img: swipper1,eyebrow: "New Collection",title: "Live, the life\nyou love",cta: "Shop Now",
  },
  {img: swipper2,eyebrow: "Featured Pieces", title: "Timeless\nComfort",cta: "Explore",
  },
  {img: swipper3,eyebrow: "Handcrafted",title: "Designed\nfor you",cta: "Discover",
  },
];

export default function MyCarousel() {
  return (
    <Container maxWidth="md">
    <Box sx={{position: "relative",maxWidth: "1200px",mx: "auto",height: { xs: 400, md: 500 }
      }}
    >
      <Swiper modules={[Navigation, Pagination, Autoplay]} loop={true}  
      autoplay={{delay: 4500,disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
    
        style={{  "--swiper-pagination-color": "#fff", height: "100%" }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <Box sx={{ position: "relative", height: "100%" }}>
              <Box component="img" src={slide.img} alt={slide.eyebrow}
                sx={{ width: "100%", height: "100%",objectFit: "cover",
                }}
              />
              <Box sx={{position: "absolute", inset: 0,
                  background:
                    "linear-gradient(to right, rgba(44,42,40,0.35) 0%, transparent 60%)",
                }}
              />
              <Box sx={{position: "absolute",left: { xs: 24, md: 60 },bottom: { xs: 40, md: 64 },
                  color: "#fff",
                }}
              >
                <Box sx={{fontSize: 11,letterSpacing: "0.18em", textTransform: "uppercase",
                    opacity: 0.85, mb: "-30px",
                  }}
                >
                  {slide.eyebrow}
                </Box>

                <Box component="h2" sx={{fontFamily: "'Cormorant Garamond', serif",fontSize: { xs: 28, md: 42 },
                    fontWeight: 300, whiteSpace: "pre-line",mb: 2,lineHeight:"50px"
                  }}
                >
                  {slide.title}
                </Box>

                <Box component="button" sx={{px: 3.5,py: 1.25,border: "1px solid rgba(255,255,255,0.7)",
                    color: "#fff",background: "transparent",cursor: "pointer",
                    "&:hover": {
                      background: "#fff",
                      color: "#2c2a28",
                    },
                  }}
                >
                  {slide.cta}
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <IconButton className="custom-prev"
        sx={{ position: "absolute",left: 16,top: "50%",
          transform: "translateY(-50%)",bgcolor: "rgba(255,255,255,0.9)",zIndex: 10,
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      <IconButton className="custom-next" sx={{position: "absolute", right: 16,
          top: "50%",transform: "translateY(-50%)",bgcolor: "rgba(255,255,255,0.9)",zIndex: 10,
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Box>
    </Container>
  );
}