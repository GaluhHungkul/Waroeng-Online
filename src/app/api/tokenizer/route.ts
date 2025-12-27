import Midtrans from "midtrans-client"
import { NextRequest } from "next/server";

let snap = new Midtrans.Snap({
    isProduction : false,
    clientKey : process.env.MIDTRANS_CLIENT_KEY!,
    serverKey : process.env.MIDTRANS_SERVER_KEY!,
})

export async function POST(req:NextRequest) {
    
}   