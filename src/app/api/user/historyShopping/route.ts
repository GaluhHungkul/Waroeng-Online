import ConnectToDatabase from "@/lib/ConnectToDatabase";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {

    try {
        
        await ConnectToDatabase()
        const token = await getToken({ req })
        if(!token) return NextResponse.json({ message : "Unauthorized" }, { status : 401 })
        console.log({token})
        const user = await User.findById(token.id)
        if(!user) return NextResponse.json({message : "User not found"}, {status : 404})
            
        return NextResponse.json(user)

    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({message : "Internal server error"}, { status : 500 })
    }

}