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

    const { id, price, name, img, quantity } = await req.json();
    if (!(id && price && name && img && quantity)) return NextResponse.json(
      { message: "Invalid checkout data" },
      { status: 400 }
    );    
      
    const currUser = await User.findById(token.id);
    if (!currUser) return NextResponse.json({ message: `There is no account with username ${token.username}` },{ status: 404 });

    //? New Order handle

    const orderedProduct = {
      id : id,
      price :price,
      name : name, 
      img : img,
      quantity
    }

    const totalPrice = price * quantity

    const newOrder = new Order({
      userId : currUser._id,
      orderedProduct, totalPrice, 
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
