import ConnectToDatabase from "@/lib/ConnectToDatabase"
import Product from "@/models/Product"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        
        await ConnectToDatabase()

        const products = await Product.find()
        const cs = products.map(({category, stock})=> ({name : category, value : stock})) 
        const categoryNStock : { name : string, value : number }[]  = []
        for(let i = 0 ; i < cs.length ; i++) {
            const index = categoryNStock.findIndex(a => a.name === cs[i].name)
            if(index !== -1) {
                categoryNStock[index].value += cs[i].value
            } else {
                categoryNStock.push(cs[i])
            }
        }

        return NextResponse.json({categoryNStock})

    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({message : "Internal server error"}, {status : 500})
    }
}