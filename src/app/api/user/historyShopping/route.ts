import ConnectToDatabase from "@/lib/ConnectToDatabase";
import Order from "@/models/Order";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {

    try {
        
        await ConnectToDatabase()
        const token = await getToken({ req })
        if(!token) return NextResponse.json({ message : "Unauthorized" }, { status : 401 })
        console.log({token})
        const order = await Order.find({ user : token.id })
        if(!order.length) return NextResponse.json({message : "No Orders found"}, {status : 404})
            
        return NextResponse.json(order)

    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({message : "Internal server error"}, { status : 500 })
    }

}