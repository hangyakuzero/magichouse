import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { getdatafromtoken } from "@/helpers/gdft";

export async function POST(request) {
  await dbConnect();  // Ensure database connection

  try {
    // Extract user ID from token
    const userId = await getdatafromtoken(request);
    
    // Find user by ID and exclude sensitive fields
    const user = await User.findOne({ _id: userId }).select("-password -username");

    // Check if user exists
    if (!user) {
      return NextResponse.json({
        message: "User not found",
      }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({
      message: "User found",
      data: user._id,
    });

  } catch (error) {
    // Handle errors
    return NextResponse.json({
      message: "An error occurred",
      error: error.message,
    }, { status: 500 });
  }
}
