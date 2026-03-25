
import React, { useState } from 'react'
import useCart from '../../hooks/useCart';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import Loader from '../../ui/loader/Loader';
import useCheckout from '../../hooks/useCheckout';

export default function Checkout() {
      const {data,isError,isLoading,error}=useCart();
      const [paymentMethod,setPaymentMethod]=useState('Cash')
      const {mutate:checkout,isPending}=useCheckout()
      if(isLoading)
        return <Loader/>
     if(isError)
        return <Box color={'red'}>{error.message}</Box>
  return (
    <Box className='cart' sx={{py:5}}>
    <Typography component={'h1'} > Checkout</Typography>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
    <TableCell>Product Name</TableCell>
    <TableCell> Price</TableCell>
    <TableCell>Quantity</TableCell>
    <TableCell>Total</TableCell>
    
          </TableRow>
        </TableHead>
        <TableBody>
         
          {data?.items?.map(item=>{
            return(
            <TableRow><TableCell>
              {item.productName}</TableCell>
              <TableCell>
              {item.price}$</TableCell>
              <TableCell>
                <Box sx={{display:'flex',alignItems:'center'}}>
                <Typography>{item.count}</Typography>
                </Box>
              </TableCell>
              <TableCell>
              {item.count*item.price}$</TableCell>

              </TableRow>
          )})}
        </TableBody>
        <TableFooter>
          <TableCell colSpan={5}>
            Total : ${data.cartTotal}$
          </TableCell>
        </TableFooter>
      </Table>
    </TableContainer>
  <Box sx={{display:'flex',flexDirection:'column',gap:3,alignItems:'center'}}>
      
  <FormControl fullWidth>
  <InputLabel id="paymentMethod">Payment Method</InputLabel>
  <Select
    labelId="paymentMethod"
    id="demo-simple-select"
    value={paymentMethod}
    label="paymentMethod"
    onChange={(e)=>setPaymentMethod(e.target.value)}
  >
    <MenuItem value={'Cash'}>Cash</MenuItem>
    <MenuItem value={'Visa'}>Visa</MenuItem>
    
  </Select>
</FormControl>
   <Button variant='contained' onClick={()=>checkout(paymentMethod)}>
    Pay Now
   </Button>
  </Box>
        </Box>
  )
}
