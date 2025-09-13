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

    const { cart } = await req.json();

    if (!cart || !cart.length || !Array.isArray(cart)) return NextResponse.json(
      { message: "Invalid cart data" },
      { status: 400 }
    );
    

    const currUser = await User.findById(token.id);

    if (!currUser) return NextResponse.json({ message: `There is no account with username ${token.username}` },{ status: 404 });

    //? New Order handle

    const products = cart.map(({ product :item, quantity }) => ({
      product : item._id,
      price : item.price,
      name : item.name, 
      quantity
    }))

    const totalPrice = cart.reduce((a,{ product, quantity }) => a + (product.price * quantity),0)

    const newOrder = new Order({
      user : currUser._id,
      products, totalPrice, 
    })

    await newOrder.save()

    return NextResponse.json(
      { products, newOrder },
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
