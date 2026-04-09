import React, { useState } from 'react';
import { Paper, InputBase, Box, Typography } from '@mui/material';
import useProducts from '../../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

export default function Search() { 
  const [input, setInput] = useState("");
  const { data: products } = useProducts(); 
const navigate=useNavigate();
  const filteredProducts = products?.response?.data?.filter(product =>
    product.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <Box sx={{ position: 'relative', width: 200 }}>
      <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, borderRadius: '8px' }}>
        <InputBase 
          placeholder="Search..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          sx={{ flex: 1 }} 
          autoFocus 
        />
      </Paper>

      {input && (
        <Box sx={{ mt: 1, position: 'absolute', width: '100%', bgcolor: '#fff', boxShadow: 3, borderRadius: 1, zIndex: 10 }}>
          {filteredProducts?.length > 0 ? filteredProducts.map((product) => (
            <Typography key={product.id} onClick={()=>navigate(`/product/${product.id}`)} sx={{ p: 1, cursor: 'pointer', "&:hover": { bgcolor: '#eee' } }}>
              {product.name}
            </Typography>
          )) : <Typography sx={{ p: 1 }}>No results</Typography>}
        </Box>
      )}
    </Box>
  );
}