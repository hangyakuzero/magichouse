import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { Product } from "@/model/product";
export  async function GET(){
await dbConnect();

try{
const products = await Product.find({});
return NextResponse.json(products);
}

catch(err){
   return  NextResponse.json({error:err.message});
}


}