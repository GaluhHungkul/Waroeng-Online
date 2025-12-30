import ConnectToDatabase from "@/lib/ConnectToDatabase";
import Order from "@/models/Order";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type OrderedProduct = {
    productId: number,
    name: string, 
    price: number, 
    img: string,
    quantity: number,
}

export async function POST(req:NextRequest) {
    try {
        await ConnectToDatabase()

        const token = await getToken({ req, secret : process.env.NEXTAUTH_SECRET })
        if(!token) return NextResponse.json({ message : "Unauthorized" }, { status: 401 })

        const id = token.id
        const user = await User.findById(id)
        if(!user) return NextResponse.json({ message : "User not found" }, { status: 404 })

        const { orderedProducts, totalPrice } = await req.json()

        if(!orderedProducts || !Array.isArray(orderedProducts) || orderedProducts.length === 0 || !totalPrice) return NextResponse.json(
            { message: "Missing parameter orderedProducts and/or totalPrice" },
            { status: 404 }
        )
        
        const order = await Order.create({
            userId : user._id, 
            orderedProducts, 
            totalPrice,
            paymentMethod : "midtrans",
            paymentStatus: "unpaid",
            orderStatus: "pending",
        })

        const secret = process.env.MIDTRANS_SERVER_KEY!
        const encodedSecret = Buffer.from(secret + ":").toString("base64")
        const basicAuth = `Basic ${encodedSecret}`

        const parameter = {
            transaction_details: {
                order_id: order._id, 
                gross_amount : totalPrice
            },
            customer_details: {
                first_name : user.username, 
                email : user.email,
            },
            item_details: orderedProducts.map((p:OrderedProduct) => ({
                id: p.productId, 
                name: p.name, 
                price: p.price, 
                quantity: p.quantity,
            }))
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_MIDTRANS_API}/v1/payment-links`, {
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": basicAuth
            },
            body : JSON.stringify(parameter)
        })

        if(!res.ok) {
            throw new Error((await res.json()).error_messages)
        }
        const midtransRes = await res.json()
        
        return NextResponse.json({ midtransRes })

    } catch (error) {
        console.log("Error :" , error)
        return NextResponse.json({
            error, 
            message : "Internal server error"
        }, { status : 500 })
    }
}