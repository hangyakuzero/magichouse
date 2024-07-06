import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Product } from "@/model/product";

export async function POST(req, res) {
 await dbConnect();    
    const data = await req.json()
    const product = new Product(data)
    const savedproduct = await product.save()
    return NextResponse.json({ "data": savedproduct })
}