// app/products/[id]/page.js
"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
              console.log(id);
                const response = await fetch(`/api/products/${id}`);
                if (response.ok) {
                    const productData = await response.json();
                    setProduct(productData);
                } else {
                    console.error('Failed to fetch product');
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div>
            <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Add more product details as needed */}
        </div>
    );
};

export default ProductPage;
