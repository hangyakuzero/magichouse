"use client";
import React, { useEffect, useState } from 'react';
export default function page({params}) {

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
    <div><div className="container mx-auto px-4 mt-16 mb-16">
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={product.productImage}
        alt={product.name}
        className="w-full h-auto object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="mb-4">{product.description}</p>
        <p className="mb-4">Brand: {product.brand}</p>
        <p className="mb-4">Fragrance Notes: {product.fragranceNotes.join(', ')}</p>
        <div className="flex items-center space-x-4">
          {product.sizes.map((size, index) => (
            <div key={index}>
              <p>{size.volume} ml - Rs {size.price}</p>
              <p>Stock: {size.stock}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div></div>
  )
}
