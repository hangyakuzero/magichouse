import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();
  
  try {
    // Parse request body
    const reqbody = await req.json();
    const { email, password } = reqbody;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 401 }  // Use 401 for authentication errors
      );
    }

    // Check password
    const validpass = await bcrypt.compare(password, user.password);
    if (!validpass) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }  // Use 401 for invalid credentials
      );
    }

    // Generate JWT token
    const tokenData = {
      id: user._id.toString(),  // Ensure _id is a string
    };
    const token = jwt.sign(tokenData, process.env.SECRET, { expiresIn: '1d' });

    // Create response and set cookie
    const response = NextResponse.json({
      message: "Logged in successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  // Set secure flag in production
      sameSite: "strict",  // Adjust based on your needs
    });

    return response;
    
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
