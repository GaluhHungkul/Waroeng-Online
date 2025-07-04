import ConnectToDatabase from "@/lib/ConnectToDatabase";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

const limit = 5

export async function GET(req:NextRequest) {

    try {
        await ConnectToDatabase()
        const { searchParams } = new URL(req.url)
        const page = Number(searchParams.get("page")) || 1
        
        const products = await Product.find().limit(limit).skip((page - 1) * limit)
        const totalProducts = await Product.countDocuments()
        
        return NextResponse.json({products, maxPage : Math.ceil(totalProducts / limit)}, { status : 200 })

    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({ message : "Internal server error" }, {status : 500})
    }

}

export async function PUT(req:NextRequest) {
    try {
        const { searchParams } = new URL(req.url)

        const productId = searchParams.get("productId")
        const { name, price, img, stock } = await req.json()
 
        if(!(name && price && img && stock)) return NextResponse.json({ message : "Data invalid" }, { status : 400 })

        const editedProduct = await Product.findByIdAndUpdate(productId, { name, price, img, stock }, {
            new : true,
            runValidators : true
        })
        if(!editedProduct) return NextResponse.json({ message : "Product not found" }, { status : 404 })
        
        return NextResponse.json(editedProduct, { status : 200 })

    } catch (error) {
        console.log("Error " , error)
        return NextResponse.json({ message : "Internal server error" }, { status : 500 })
    }
}