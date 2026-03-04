import React from 'react'
import useCart from '../../hooks/useCart'
import Categories from '../../components/categories/CategoriesSection';

export default function Cart() {
  const {data,isError,isLoading}=useCart();

  console.log(data);
  return (
    <div>
     
     
    
      <Categories/>
    </div>
  )
}
