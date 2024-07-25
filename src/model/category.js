import mongoose, { Schema } from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps }
);

export const Category = mongoose.model("Category", categorySchema);
