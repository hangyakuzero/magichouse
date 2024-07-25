"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user ID from API
    const fetchUserId = async () => {
      try {
        const response = await fetch("/api/id", { method: 'POST' });
        const data = await response.json();
        if (response.ok) {
          setUserId(data.data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError("An error occurred while fetching user data.");
      }
    };

    fetchUserId();
  }, []);

  const orderPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("User not authenticated");
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderPrice,
          customer: userId,
          orderItems: cartItems.map(item => ({
            productId: item._id,
            quantity: item.quantity,
            volume: item.size,
            price: item.price,
          })),
          address,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Order placed successfully!");
        router.push("/thank-you"); // Redirect to a thank you page
      } else {
        setError(data.message || "Failed to place order");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="checkout-container container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="address" className="block text-lg font-semibold mb-2">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Order Summary:</h2>
          <ul className="list-disc ml-4">
            {cartItems.map(item => (
              <li key={`${item._id}-${item.size}`}>
                {item.name} - {item.size} ml x {item.quantity} @ Rs.{item.price} each
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <p className="text-xl font-bold">Total: Rs.{orderPrice}</p>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="btn btn-accent w-full py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
