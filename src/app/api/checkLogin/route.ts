import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest) {
    const token = req.cookies.get('token')
    if(token) return NextResponse.json({isLoggedIn : true}, {status : 200})
    return NextResponse.json({isLoggedIn : false}, {status : 401})  
}