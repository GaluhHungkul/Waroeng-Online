import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token : string) {
    try {
        if (!SECRET_KEY) throw new Error('JWT_SECRET is not defined in .env file');
        const { payload } = await jwtVerify(token, SECRET_KEY)
        return payload
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function middleware(req:NextRequest) {

    const origin = req.headers.get("origin")

    if(origin === process.env.ADMIN_DOMAIN) {
        console.log({origin})
        if (req.method === 'OPTIONS') {
        console.log("TERDAPAT REQUEST DARI DOMAIN BERBEDA")
        return new NextResponse(null, {
            headers: {
                'Access-Control-Allow-Origin': process.env.ADMIN_DOMAIN!,
                'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } 

        const response = NextResponse.next();
        response.headers.set('Access-Control-Allow-Origin', process.env.ADMIN_DOMAIN!)
        response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return response;
    }
    
    const token = req.cookies.get('token')?.value
    if(!token) return NextResponse.redirect(new URL('/login', req.url))
        
    try {
        const decoded = await verifyToken(token)
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
    matcher: ["/" ,'/products', '/about', '/profile/:path*', "/api/admin/:path*" ]
}