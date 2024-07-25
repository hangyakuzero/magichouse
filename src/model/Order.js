import mongoose, { Schema } from "mongoose";
const OrderItemSchema = new mongoose.Schema(

{
  productId:{
 type: mongoose.Schema.Types.ObjectId,
 ref:"Product",
 required: true,
  },
  quantity:{
 type: Number,
 required: true,
  },
  volume:{
type: Number,
required: true,
  },

price:{
  type: Number,
  required:true,

  }

},{timestamps:true}


);


const orderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems :{
    type:[OrderItemSchema ],
    required: true,

    },

    address: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "CANCELLED", "DELIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);
export const Order =mongoose.models.Order|| mongoose.model("Order", orderSchema);
