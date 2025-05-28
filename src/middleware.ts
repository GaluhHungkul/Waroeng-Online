import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

async function verfiyToken(token : string) {
    try {
        if (!SECRET_KEY) throw new Error('JWT_SECRET is not defined in .env file');
        const { payload } = await jwtVerify(token, SECRET_KEY)
        return payload

    } catch (error) {
        console.log(error)
        return 
    }
}

export async function middleware(req:NextRequest) {

    const token = req.cookies.get('token')?.value

    if(!token) return NextResponse.redirect(new URL('/login', req.url))

    try {
             
        const decoded = await verfiyToken(token)

        if (!decoded) {
            console.log("Invalid token, redirecting to /login");
            return NextResponse.redirect(new URL('/login', req.url));
          }
        
        

        return NextResponse.next()

    } catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: ["/" ,'/products', '/about', '/profile/:path*']
}