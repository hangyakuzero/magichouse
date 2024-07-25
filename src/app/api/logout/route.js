import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    // Establish database connection
    await dbConnect();

    // Create a response
    const response = NextResponse.json({
      message: "Logged out successfully",
      success: true,
    });

    // Clear the token cookie by setting an expired date
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",  // Adjust based on your needs
      secure: process.env.NODE_ENV === "production",  // Set secure flag in production
    });

    return response;

  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
