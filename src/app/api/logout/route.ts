import {  NextResponse } from "next/server";

export async function POST() {


    try {        
        const response = NextResponse.json({ message : 'Logout success' }, {  status: 200 } )
    
        response.cookies.set('token', '', { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge : -1,
            path: '/'
        })

        return response

    } catch (error) {
        console.log(error)
    }
   
}