import { NextRequest, NextResponse } from "next/server";
import Product from "../../../models/Product";
import ConnectToDatabase from "@/lib/ConnectToDatabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("search");
    const limit = 8;
    const page = Number(searchParams.get("page")) || 1;
    const categoriesQuery = searchParams.get("category")?.split(",").map(cat => new RegExp(`^${cat}$`, "i"));
    const random = searchParams.get("random") === "true";

    await ConnectToDatabase();

    //? random product untuk dashboard

    if(random) {
      const products = await Product.aggregate([
        { $sample : { size : 12 } }
      ])
      return NextResponse.json({products})
    }

    //? atur query 

    const filters = [];
    if (searchQuery) {
      filters.push({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      });
    }

    if (categoriesQuery?.length) {
      filters.push({ category: { $in: categoriesQuery } });
    }
    
    const query = filters.length ? { $and: filters } : {};

    const products = await Product.find(query).limit(limit).skip((page - 1) * limit);
    const categories = await Product.distinct("category");
    const totalProducts = await Product.countDocuments(query)

    return NextResponse.json({ products, categories, maxPage : Math.ceil(totalProducts / limit) });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: "error",
      message: "An error occured",
    });
  }
}
