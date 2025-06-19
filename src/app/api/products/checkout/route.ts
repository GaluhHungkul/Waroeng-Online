import { NextRequest, NextResponse } from "next/server";

import User from "@/models/User";
import ConnectToDatabase from "@/lib/ConnectToDatabase";
import Product from "@/models/Product";
import { getToken } from "next-auth/jwt";
import Order from "@/models/Order";

const secret = process.env.NEXTAUTH_SECRET

export async function POST(req: NextRequest) {

  const token = await getToken({req, secret})
  
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await ConnectToDatabase();

    const { cart, totalPrice } = await req.json();

    if (
      !cart ||
      !Array.isArray(cart) ||
      cart.length === 0 ||
      !cart.every(
        (item) => item._id && typeof item.qty === "number" && item.qty > 0
      )
    ) {
      return NextResponse.json(
        { message: "Invalid cart data" },
        { status: 400 }
      );
    }

    const currUser = await User.findById(token.id);

    if (!currUser) return NextResponse.json({ message: `There is no account with username ${token.username}` },{ status: 404 });
    

    const productIds = cart.map((item) => item._id);
    const productses = await Product.find({ _id: { $in: productIds } });

    if (productses.length !== productIds.length) {
      return NextResponse.json(
        { message: "Some products in the cart were not found" },
        { status: 404 }
      );
    }

    if (!Array.isArray(currUser.historyShopping)) currUser.historyShopping = [];

    const products = cart.map((item) => ({
      productId: item._id,
      productName: productses.find(
        (product) => product._id.toString() === item._id.toString()
      )?.name,
      productPrice: productses.find(
        (product) => product._id.toString() === item._id.toString()
      )?.price,
      productCategory: productses.find(
        (product) => product._id.toString() === item._id.toString()
      )?.category,
      quantity: item.qty,
    }));

    const bulkOps = cart.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { stock: -item.qty } },
      },
    }));

    await Product.bulkWrite(bulkOps);

    const newHistory = {
      products,
      purchasedAt: new Date(),
      totalPrice,
    };

    currUser.historyShopping.push(newHistory);

    await currUser.save();

    //? New Order handler

    const items = cart.map((item) => ({ product : item._id, quantity : item.qty, price : item.price }))

    const newOrder = new Order({
      user : currUser._id,
      items, 
      paymentMethod : "Transfer",
      totalPrice
    })

    await newOrder.save()

    return NextResponse.json(
      {
        message: "History added successfully",
        history: currUser.historyShopping,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
