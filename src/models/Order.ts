import mongoose from "mongoose";

const orderedProductSchema = new mongoose.Schema(
  {
    productId: {
      type: Number, 
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderedProducts: {
      type: [orderedProductSchema],
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "midtrans"],
      default: "midtrans",
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed"],
      default: "unpaid",
    },

    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    midtrans: {
      transactionStatus: {
        type: String,
        enum : ["capture", "settlement", "pending", "deny", "cancel", "expire"],
        default : "pending"
      },
      paymentType: {
        type: String,
      },
      fraudStatus: {
        type: String,
      },
      paymentLink : {
        type: String
      }
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);
