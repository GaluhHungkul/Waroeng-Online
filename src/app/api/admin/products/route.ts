import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

const limit = 5

export async function GET(req:NextRequest) {

    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get("page")) || 1

    const products = await Product.find().limit(limit).skip((page - 1) * limit)
    const totalProducts = await Product.countDocuments()

    return NextResponse.json({products, maxPage : Math.ceil(totalProducts / limit)}, { status : 200 })

}