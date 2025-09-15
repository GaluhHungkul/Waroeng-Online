import { NextRequest, NextResponse } from "next/server";

import User from "@/models/User";
import ConnectToDatabase from "@/lib/ConnectToDatabase";
import { getToken } from "next-auth/jwt";
import Order from "@/models/Order";

const secret = process.env.NEXTAUTH_SECRET

export async function POST(req: NextRequest) {

  const token = await getToken({req, secret})
  
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await ConnectToDatabase();

    const { detailProduct, paymentMethod, paymentStatus, orderStatus } = await req.json();

    if (!(detailProduct && paymentMethod && paymentStatus && orderStatus)) return NextResponse.json(
      { message: "Invalid checkout data" },
      { status: 400 }
    );
    

    const currUser = await User.findById(token.id);

    if (!currUser) return NextResponse.json({ message: `There is no account with username ${token.username}` },{ status: 404 });

    //? New Order handle

    const orderedProduct = {
      product : detailProduct.product,
      price : detailProduct.product.price,
      name : detailProduct.product.name, 
      quantity : detailProduct.quantity
    }

    const totalPrice = detailProduct.product.price * detailProduct.quantity

    const newOrder = new Order({
      user : currUser._id,
      orderedProduct, totalPrice, 
      paymentStatus, paymentMethod, orderStatus
    })

    await newOrder.save()

    return NextResponse.json(
      { orderedProduct, totalPrice },
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
