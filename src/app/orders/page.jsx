"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/user-orders");
        const data = await response.json();
        if (response.ok) {
          setOrders(data.data);
        } else {
          setError(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        setError("An error occurred while fetching orders.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Your Orders</h1>
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 ? (
        <p className="text-center">You have no orders.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map(order => (
            <div key={order._id} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">Order #{order._id}</h2>
              <p>Status: {order.status}</p>
              <p>Address: {order.address}</p>
              <p>Total Price: Rs.{order.orderPrice.toFixed(2)}</p>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Order Items:</h3>
                <ul className="list-disc ml-4">
                  {order.orderItems.map((item, index) => (
                    <li key={index}>
                      Product: {item.productId.name} - {item.volume} ml x {item.quantity}
                   
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
