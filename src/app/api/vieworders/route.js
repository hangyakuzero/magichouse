import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { Order } from "@/model/Order";
export  async function GET(){
await dbConnect();

try{
const orders= await Order.find({});
return NextResponse.json(orders);
}

catch(err){
   return  NextResponse.json({error:err.message});
}


}