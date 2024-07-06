// pages/api/products/[id].js

import dbConnect from "@/lib/dbConnect";
import { Product } from "@/model/product";
import { NextResponse } from "next/server";
export  async function GET(request, {params}) {
    const  id = params.id;

    await dbConnect();

    try {
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ error: 'Product not found' });
        }
        // Serialize product to plain JSON
        
        return NextResponse.json(product);
    } catch (err) {
        console.error('Error fetching product:', err.message);
        return  NextResponse.json({error:err.message});
    }
}
