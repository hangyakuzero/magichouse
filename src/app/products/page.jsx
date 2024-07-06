"use client";
 import React, { useEffect, useState } from 'react';
 import { BackgroundGradient } from '@/components/ui/background-gradient';
 
import Card from '@/components/card';
export default function page() {
  
    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const productsData = await response.json();
          setProducts(productsData);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);
  
  
    return (
    <div>
        
      
        <h1 className='text-3xl font-bold mb-4'>All Products</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
           
        {products.map(product => (  <Card key={product._id} product={product} /> 
        ))}
      
        </div>
     
    </div>
  )
}
