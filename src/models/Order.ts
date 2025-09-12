import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "Product",
          required : true
        },
        price : { type : Number, required : true },
        name : { type : String, required : true },
        quantity : { type : Number, required : true, min : 1 }
      }
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "Transfer", "Credit Card", "PayPal"],
      default: "Transfer",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
