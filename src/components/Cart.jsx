"use client";
import React from 'react';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    updateQuantity(productId, quantity);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="border border-gray-200 rounded p-4 mb-4">
              <p className="text-lg font-bold">{item.name}</p>
              <p>Price: ${item.price}</p>
              <div className="flex items-center">
                <label htmlFor={`quantity-${item._id}`} className="mr-2">Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${item._id}`}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                  className="border border-gray-300 rounded p-1 w-16"
                />
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <h2 className="text-xl font-bold">Total: ${calculateTotal()}</h2>
            <button
              onClick={() => console.log('Proceed to checkout')}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
