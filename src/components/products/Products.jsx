import { Box, Container, Typography } from '@mui/material';
import useProducts from '../../hooks/useProducts';
import React from 'react';
import Loader from '../../ui/loader/Loader';
import { Link } from 'react-router-dom';
import Product from '../../ui/product/Product';
import { useTranslation } from 'react-i18next';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";
export default function Products() {
  const { data, isError, isLoading, error } = useProducts();
  const { t } = useTranslation();

  if (isLoading) return <Loader />;
  if (isError) return <Box color="red">{error.message}</Box>;

  return (
    <Container maxWidth="md">
    <Box className="products" >
      <Box sx={{ display: "flex", flexDirection: "column", my: "48px",gap:'-2px' }}>
        <Typography fontSize={"40px"} fontWeight={"bold"} fontFamily={'Poppins'}  lineHeight={1.1} letterSpacing={'-0.4px'}>
          {t("New")}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between",alignItems:'end' }}>
          <Typography fontSize={"40px"} fontWeight={"bold"} fontFamily={'Poppins'}  lineHeight={1.1} letterSpacing={'-0.4px'}>
            {t("Arrivals")}
          </Typography>

          <Link to={"/"} style={{ color: "#000" }}>
            More Products →
          </Link>
        </Box>
      </Box>

      <Swiper
       modules={[Scrollbar]}
       spaceBetween={20}
       slidesPerView={4}
       grabCursor={true}        
       scrollbar={{ draggable: true }} 
        breakpoints={{
          0: { slidesPerView: 1.2 },
          600: { slidesPerView: 2.2 },
          900: { slidesPerView: 3.2 },
          1200: { slidesPerView: 4 },
        }}
        style={{ padding: "48px 0" }}
      >
        {data.response.data.map((product) => (
          <SwiperSlide key={product.id}>
            <Product product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

    </Box>
    </Container>
  );
}