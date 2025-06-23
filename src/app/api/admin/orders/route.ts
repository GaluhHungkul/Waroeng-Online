import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
    const orders = await Order.find().populate("user").populate("items.product")
    return NextResponse.json(orders, { status : 200 })
}