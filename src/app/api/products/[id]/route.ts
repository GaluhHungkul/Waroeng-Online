import ConnectToDatabase from "@/lib/mongoose";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, { params } : { params : { id : string } }) {

    const { id } = params 

    if(!id) return NextResponse.json({ message : 'Id not found' }, { status : 404 })

    try {

        await ConnectToDatabase()

        const product = await Product.findById(id)

        if(!product) return NextResponse.json({ message : 'Product not found' }, { status : 404 })

        return NextResponse.json({product}, { status : 200 })
        
    } catch (error) {
        console.log('error : ' , error )
    }

}