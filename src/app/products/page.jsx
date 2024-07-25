"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import Card from "@/components/card";

export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const productsData = await response.json();
          setProducts(productsData);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
