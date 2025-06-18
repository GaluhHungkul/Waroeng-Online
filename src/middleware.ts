import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET

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
    
    const token = await getToken({ req, secret })
    console.log(token)
    if(!token) return NextResponse.redirect(new URL('/login', req.url))
        
    return NextResponse.next()

    
}
export const config = {
    matcher: ["/" ,'/products', '/about', '/profile/:path*', "/api/admin/:path*" ]
}