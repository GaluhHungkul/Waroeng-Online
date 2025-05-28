import ConnectToDatabase from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { MyJwtPayload } from "@/types/jwtpayload";
import { jwtVerify } from "jose";
import User from "@/models/User";

const  SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(req:NextRequest) {

    try {
        
        await ConnectToDatabase()
        const token = req.cookies.get('token')?.value

        if(!token) return NextResponse.json({ message : 'Unauthorized' }, {  status: 401 } )
        
        if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined in .env file')           

        const { payload } = await jwtVerify(token, SECRET_KEY ) as { payload: MyJwtPayload };

        const userId = new mongoose.Types.ObjectId(payload.id);
        
        const currUser = await User.findById(userId);

        if(!currUser) return NextResponse.json({ message : "User not found" },{ status : 404 })

        return NextResponse.json({
            currUser                
        }, {  status: 200 });   


    } catch (err) {
        const error = err as TypeError;  
        console.log('Error : ', error)
            // Tangani error JWT
        if (error.name === 'TokenExpiredError') {
            return NextResponse.json(
                { message: 'Unauthorized: Token has expired' },
                { status: 401 }
            );
        } else if (error.name === 'JsonWebTokenError') {
            return NextResponse.json(
                { message: 'Unauthorized: Invalid token' },
                { status: 401 }
            );
        } else {
            // Tangani error lain (misalnya error database)
            console.error('Error:', error);
            return NextResponse.json(
                { message: 'Internal server error' },
                { status: 500 }
            );
        }
        }

}