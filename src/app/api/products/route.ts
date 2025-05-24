import { NextRequest, NextResponse } from "next/server";
import Product from "../../../models/Product";
import ConnectToDatabase from "@/lib/mongoose";


export async function GET(req:NextRequest) {

    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get('search');
    const categoriesQuery = searchParams.get('category')?.split(",");
    
    
    try {
        await ConnectToDatabase()

        const filters = []

        if(searchQuery) {
            filters.push({
                $or : [
                    { name : { $regex : searchQuery, $options : "i" } },
                    { description : { $regex : searchQuery, $options : "i" } },
                ]
            })
        }

        if(categoriesQuery?.length) {
            filters.push({ category : { $in : categoriesQuery } })
        }

        const query = filters.length ? { $and : filters } : {}
        const products = await Product.find(query)
        console.log({filters, query})
        return NextResponse.json(products)

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 'error',
            message: 'An error occured'
        })
    }

    
}