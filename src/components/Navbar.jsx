"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Navbar() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        window.location.href = "/"; // Redirect to login page after logout
      } else {
        const data = await res.json();
        console.error(data.message);
        // Handle error in UI
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle error in UI
    }
  };

  return (
    <div className="navbar bg-green-500">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          MagicHouse
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="https://www.shutterstock.com/image-vector/deadpool-icon-art-design-danger-600nw-2291818891.jpg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">{totalItems}</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow z-20"
          >
            <div className="card-body">
              <span className="font-bold text-lg">{totalItems} Items</span>
              <span className="text-info">Subtotal: Rs.{totalAmount}</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">
                  <Link href="/Cart">View cart</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://www.shutterstock.com/image-vector/deadpool-icon-art-design-danger-600nw-2291818891.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/profile" className="justify-between">
                Profile
              </a>
            </li>
            <li>
              <a href="/orders"> View Orders</a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
