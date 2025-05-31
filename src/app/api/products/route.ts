import { NextRequest, NextResponse } from "next/server";
import Product from "../../../models/Product";
import ConnectToDatabase from "@/lib/ConnectToDatabase";

export async function GET(req: NextRequest) {
  try {

    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("search");
    const limit = Number(searchParams.get("limit")) || 12;
    const page = Number(searchParams.get("page")) || 1;
    const categoriesQuery = searchParams.get("category")?.split(",");
    const random = searchParams.get("random") === "true"

    await ConnectToDatabase();
    if(random) {
      const products = await Product.aggregate([
        { $sample : { size : 12 } }
      ])
      return NextResponse.json({products})
    }

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
    const products = await Product.find(query)
      .limit(limit)
      .skip((page - 1) * 8);

    const category = await Product.distinct("category");
    return NextResponse.json({ products, category });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: "error",
      message: "An error occured",
    });
  }
}
