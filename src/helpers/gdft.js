import { NextRequest
 } from "next/server";

 import dbConnect from "@/lib/dbConnect";
 import jwt from "jsonwebtoken";
 export const getdatafromtoken = (request) => {
    const token = request.cookies.get("token").value || "";
   const decodedToken =  jwt.verify(token, process.env.SECRET);
   return decodedToken.id ;
 } 