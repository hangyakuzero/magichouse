import dbConnect from "@/lib/dbConnect";
import { Order } from "@/model/Order";
import { getdatafromtoken } from "@/helpers/gdft";
import { NextResponse } from 'next/server';

export async function GET(request) {
  await dbConnect();

  try {
    const userId = await getdatafromtoken(request);

    // Fetch orders for the user
    const orders = await Order.find({ customer: userId }).populate("orderItems.productId");

    return NextResponse.json({
      message: "Orders fetched successfully",
      data: orders
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred",
      error: error.message
    }, { status: 500 });
  }
}
