import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

import User from "@/models/User";
import ConnectToDatabase from "@/lib/mongoose";
import Product from "@/models/Product";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    try {
        await ConnectToDatabase();

        const { cart, totalPrice } = await req.json();

        if (!cart || !Array.isArray(cart) || cart.length === 0 || 
            !cart.every(item => item._id && typeof item.qty === 'number' && item.qty > 0)) {
            return NextResponse.json(
                { message: 'Invalid cart data' },
                { status: 400 }
            );
        }

        const { payload } = await jwtVerify(token, SECRET_KEY);

        if (!payload || !payload.id) {
            return NextResponse.json(
                { message: 'Invalid token payload' },
                { status: 401 }
            );
        }

        const currUser = await User.findById(payload.id);
       


        if (!currUser) {
            return NextResponse.json(
                { message: `There is no account with username ${payload.username}` },
                { status: 404 }
            );
        }

        const productIds = cart.map(item => item._id);
        const productses = await Product.find({ _id: { $in: productIds } });

        if (productses.length !== productIds.length) {
            return NextResponse.json(
                { message: 'Some products in the cart were not found' },
                { status: 404 }
            );
        }

        if (!Array.isArray(currUser.historyShopping)) {
            currUser.historyShopping = [];
        }

        const products = cart.map((item) => ({
            productId: item._id,
            productName: productses.find((product) => product._id.toString() === item._id.toString())?.name,
            productPrice: productses.find((product) => product._id.toString() === item._id.toString())?.price,
            productCategory: productses.find((product) => product._id.toString() === item._id.toString())?.category,
            quantity: item.qty,
        }))


        const newHistory = {
            products,
            purchasedAt: new Date(),
            totalPrice,
        }
        
        currUser.historyShopping.push(newHistory);

        console.log('before saving' , currUser.historyShopping)
        
        await currUser.save();
        console.log('after saving' , currUser.historyShopping)
        
       
        return NextResponse.json(
            { message: 'History added successfully', history: currUser.historyShopping },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error'},
            { status: 500 }
        );
    }
}
