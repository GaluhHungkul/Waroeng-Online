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

    const { product, quantity } = await req.json();

    if (!product || quantity < 1 || isNaN(quantity)) return NextResponse.json(
      { message: "Invalid cart data" },
      { status: 400 }
    );
    

    const currUser = await User.findById(token.id);

    if (!currUser) return NextResponse.json({ message: `There is no account with username ${token.username}` },{ status: 404 });
    
    currUser.historyShopping.push({
      product : {
        productId : product._id,
        productName : product.name,
        productPrice : product.price,
        productCategory : product.category,
        quantity : quantity
      },
      purchasedAt : new Date(),
      totalPrice : product.price * quantity
    })

    await currUser.save()

    //? New Order handle

    const newOrder = new Order({
      user : currUser._id,
      product : product._id, 
      totalPrice : product.price * quantity,
      quantity
    })

    await newOrder.save()

    return NextResponse.json(
      {
        product, currUser, newOrder
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
