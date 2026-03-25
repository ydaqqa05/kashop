import React from 'react'
import useCart from '../../hooks/useCart'
import Loader from '../../ui/loader/Loader';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import useRemoveFromCart from '../../hooks/useRemoveFromCart';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
export default function Cart() {
  const {data,isError,isLoading,error}=useCart();
  const navigate=useNavigate()
  const{mutate:removeItem,isPending}=useRemoveFromCart()
  const{mutate:updateItem,isPending:updateItemPending}=useUpdateCartItem()
  const handleUpdateQty=(productId,action)=>{ {console.log(data)}
const item=data.items.find((i)=>{
  return i.productId==productId;
});
if(action=='-'){
  updateItem({productId,count:item.count-1})
}
else{
  updateItem({productId,count:item.count+1})
}
  }
  if(isLoading)
     return <Loader/>
  if(isError)
     return <Box color={'red'}>{error.message}</Box>
  return (
    <Box className='cart' sx={{py:5}}>
<Typography component={'h1'} > My Cart</Typography>
<TableContainer>
  <Table>
    <TableHead>
      <TableRow>
<TableCell>Product Name</TableCell>
<TableCell> Price</TableCell>
<TableCell>Quantity</TableCell>
<TableCell>Total</TableCell>
<TableCell>Action</TableCell>
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
            <Box sx={{display:'flex',alignItems:'center'}}><IconButton size="small" disabled={updateItemPending} onClick={()=>handleUpdateQty(item.productId,'-')}><RemoveIcon/></IconButton>
            <Typography>{item.count}</Typography>
            <IconButton size="small" disabled={updateItemPending} onClick={()=>handleUpdateQty(item.productId,'+')}><AddIcon/></IconButton>
            </Box>
          </TableCell>
          <TableCell>
          {item.count*item.price}$</TableCell>
       <TableCell>  
         <Button color='error' disabled={isPending} variant='contained' onClick={()=>removeItem(item.productId)} >remove</Button></TableCell>
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

<Box sx={{display:'flex',gap:3}}>
  <Button variant='contained' color='success' sx={{flex:1}} onClick={()=>navigate('/checkout')}>Process To Checkout</Button>
  <Button variant='contained' sx={{flex:1}} onClick={()=>navigate('/')}>Continue Shopping</Button>
</Box>
    </Box>
  )
}
