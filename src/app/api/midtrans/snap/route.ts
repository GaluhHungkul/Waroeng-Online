import ConnectToDatabase from "@/lib/ConnectToDatabase";
import Order from "@/models/Order";
import User from "@/models/User";
import Midtrans from "midtrans-client"
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const snap = new Midtrans.Snap({
    isProduction : false,
    clientKey : process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
    serverKey : process.env.MIDTRANS_SERVER_KEY!,
})

type ProductFromRequest = {
    id: number 
    title: string 
    price: number 
    qty: number 
    img: string
}

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

        
        const orderedProducts = products.map((p:ProductFromRequest) => ({
            productId: p.id,
            name: p.title, 
            price: p.price, 
            img: p.img,
            quantity: p.qty
        }))

        const order = await Order.create({
            userId: user._id,
            orderedProducts, 
            totalPrice, 
            paymentMethod : "midtrans",
            paymentStatus: "unpaid",
            orderStatus: "pending",
        })

        const parameter = {
            transaction_details: {
                order_id: order._id, 
                gross_amount : totalPrice
            },
            customer_details: {
                first_name : user.username, 
                email : user.email,
            },
            item_details: products.map(({ id, price, qty, title }:ProductFromRequest) => ({
                id, price, 
                quantity: qty,
                name: title
            }))
        }
        
        const snapResponse = await snap.createTransaction(parameter)
        return NextResponse.json({
            orderId : order._id, 
            midtransOrderId: order._id,
            snapToken: snapResponse.token, 
            redirectUrl: snapResponse.redirect_url
        })
    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json(
            {message : "Internal server error"},
            { status: 500 }
        )
    }
}   