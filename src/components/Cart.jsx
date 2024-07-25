"use client";
import React from "react";
import { useCart } from "@/context/CartContext"; 
import Link from "next/link";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleRemove = (productId, size) => {
    removeFromCart(productId, size);
  };

  const handleQuantityChange = (productId, size, quantity) => {
    updateQuantity(productId, size, quantity);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ).toFixed(2);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={`${item._id}-${item.size}`} className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border rounded-lg shadow-md">
              <img
                src={item.productImage}
                alt={item.name}
                className="w-full md:w-1/4 rounded-lg"
              />
              <div className="w-full md:w-3/4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p>Size: {item.size} ml</p>
                <p>Price: Rs.{item.price}</p>
                <p>Stock: {item.stock}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    className="px-2 py-1 border rounded-l-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, item.size, parseInt(e.target.value))
                    }
                    className="w-12 text-center border-t border-b"
                  />
                  <button
                    onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                    className="px-2 py-1 border rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item._id, item.size)}
                  className="btn btn-danger mt-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex w-full md:w-1/3 p-4 md:ml-4">
          <div className="flex flex-col gap-4 w-full"> 
            <p className="text-xl font-bold">Total: Rs.{totalAmount}</p>
            <button className="btn btn-accent">
            <Link href="/checkout">
          Proceed to Checkout
            </Link>
            </button>
            
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
