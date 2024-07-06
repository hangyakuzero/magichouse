import mongoose,{Schema} from "mongoose";

const sizeSchema = new mongoose.Schema({
    volume: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
  }, { _id: false });

  const productSchema = new mongoose.Schema({
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    categories: [{
      type:String,
      required: true,
    }],
    productImage: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    fragranceNotes: {
      type: [String],
      required: true,
    },
    sizes: [sizeSchema],
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Unisex'],
      required: true,
    },
  }, { timestamps: true });
  
  export const Product = 
  mongoose.models.Product  || mongoose.model("Product", productSchema);