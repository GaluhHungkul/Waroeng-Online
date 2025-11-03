import ConnectToDatabase from "@/lib/ConnectToDatabase";
import Order from "@/models/Order";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {

    try {
        
        await ConnectToDatabase()
        const token = await getToken({ req })
        if(!token) return NextResponse.json({ message : "Unauthorized" }, { status : 401 })
        const order = await Order.find({ userId : token.id })
            
        return NextResponse.json(order)

    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({message : "Internal server error"}, { status : 500 })
    }

}