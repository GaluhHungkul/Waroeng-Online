import ConnectToDatabase from "@/lib/ConnectToDatabase";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params : Promise<{
    id : string
  }>
}

export async function GET(req: NextRequest, context: RouteContext ) {
  
  const { id } = await context.params
  if (!id) return NextResponse.json({ message: "Id not found", id }, { status: 404 });

  try {
    await ConnectToDatabase();
    const product = await Product.findById(id);

    if (!product)
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    
    const similarProducts = await Product.find({ category : product.category }).limit(10)
    return NextResponse.json({ product, similarProducts }, { status: 200 });
  } catch (error) {
    console.log("error : ", error);
    return NextResponse.json({ message : "Internal server error" }, { status : 500 })
  }
}
