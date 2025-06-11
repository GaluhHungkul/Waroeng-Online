import ConnectToDatabase from "@/lib/ConnectToDatabase"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await ConnectToDatabase()
        const users = await User.find()
        return NextResponse.json({ users })

    } catch (error) {
        console.log("Error : " , error)
    }
}