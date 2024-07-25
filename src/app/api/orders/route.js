import dbConnect from "@/lib/dbConnect";
import { Order } from "@/model/Order";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();  // Ensure database connection

  try {
    const { orderPrice, customer, orderItems, address } = await request.json();

    // Create a new order
    const newOrder = new Order({
      orderPrice,
      customer,
      orderItems,
      address,
    });

    await newOrder.save();

    return NextResponse.json({
      message: "Order created successfully",
      order: newOrder,
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      message: "An error occurred",
      error: error.message,
    }, { status: 500 });
  }
}
