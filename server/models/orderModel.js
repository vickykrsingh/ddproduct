import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: {
      type: [],
      required: true,
    },
    payment_id: {
      type: String,
      required: true,
    },
    order_id: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
    buyer: {
      type: mongoose.ObjectId,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
    address: {
      country: String,
      postcode: String,
      road: String,
      state: String,
      village: String,
      state_district: String,
    },
    shippedAddress:{
      type:String,
      default:"Not processed"
    }
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
