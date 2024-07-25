"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext"; // Adjust path as per your project structure

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
          setSelectedSize(productData.sizes[0]); // Set initial selected size
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-10 text-lg">Product not found</p>;
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const productToAdd = {
        _id: product._id,
        name: product.name,
        size: selectedSize.volume,
        price: selectedSize.price,
        stock: selectedSize.stock,
        productImage: product.productImage,
      };
      addToCart(productToAdd);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">{product.name}</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={product.productImage}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />
        <div className="w-full md:w-1/2">
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-2">
            Brand: <span className="font-normal">{product.brand}</span>
          </p>
          <p className="text-lg font-semibold mb-2">
            Gender: <span className="font-normal">{product.gender}</span>
          </p>
          <p className="text-lg font-semibold mb-2">
            Categories:{" "}
            <span className="font-normal">{product.categories.join(", ")}</span>
          </p>
          <p className="text-lg font-semibold mb-2">
            Fragrance Notes:{" "}
            <span className="font-normal">
              {product.fragranceNotes.join(", ")}
            </span>
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Sizes</h2>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => handleSizeChange(size)}
                className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${
                  selectedSize === size
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-green-300"
                }`}
              >
                {size.volume} ml
              </button>
            ))}
          </div>
          {selectedSize && (
            <div className="mt-6">
              <p className="text-lg font-semibold">
                Selected Volume:{" "}
                <span className="font-normal">{selectedSize.volume} ml</span>
              </p>
              <p className="text-lg font-semibold">
                Price:{" "}
                <span className="font-normal">Rs.{selectedSize.price}</span>
              </p>
              <p className="text-lg font-semibold">
                Stock: <span className="font-normal">{selectedSize.stock}</span>
              </p>
              <button onClick={handleAddToCart} className="btn btn-accent my-6">
                Add to cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
