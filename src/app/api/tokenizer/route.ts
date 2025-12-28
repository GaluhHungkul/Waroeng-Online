import ConnectToDatabase from "@/lib/ConnectToDatabase";
import User from "@/models/User";
import { ProductInCart } from "@/types/cart";
import Midtrans from "midtrans-client"
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const snap = new Midtrans.Snap({
    isProduction : false,
    clientKey : process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
    serverKey : process.env.MIDTRANS_SERVER_KEY!,
})

const secret = process.env.NEXTAUTH_SECRET

export async function POST(req:NextRequest) {
    try {
        await ConnectToDatabase()

        const token = await getToken({ req, secret })
        if(!token) return NextResponse.json({ message : "Unauthorized" }, { status: 401 })

        const id = token.id
        const user = await User.findById(id)
        if(!user) return NextResponse.json({ message : "User not found" }, { status: 404 })

        const { products, totalPrice } = await req.json()

        const orderId = `ORDER-${Date.now()}-${id.toString()}`
        const parameter = {
            transaction_details: {
                order_id: orderId, 
                gross_amount : totalPrice
            },
            customer_details: {
                first_name : user.username, 
                email : user.email,
            },
            item_details: products.map(({ id, price, qty, title }:ProductInCart) => ({
                id, price, 
                quantity: qty,
                name: title
            }))
        }
        
        const snapToken = await snap.createTransaction(parameter)
        return NextResponse.json({
            snapToken, orderId
        })
    } catch (error) {
        console.log("Error : " , error)
    }
}   