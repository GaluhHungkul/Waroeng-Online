import { NextRequest, NextResponse } from "next/server";
import Product from "../../../models/Product";
import ConnectToDatabase from "@/lib/mongoose";


export async function GET(req:NextRequest) {

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');

    const page = searchParams.get('page')
    console.log('yang ini query' , page)

    try {
        await ConnectToDatabase()
        const products = await Product.find()
        if(search) {
            const filteredData = products.filter(el => el.name
            .toLowerCase().includes(search.toLowerCase()))
            return NextResponse.json(filteredData)
        }
        return NextResponse.json(products)

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 'error',
            message: 'An error occured'
        })
    }

    
}