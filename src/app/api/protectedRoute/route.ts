// pages/api/protectedRoute.ts

import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export default function handler(req:NextRequest) {
    const token = req.cookies.get('token')?.value; // Ambil token dari cookies

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        // Verifikasi token menggunakan `jsonwebtoken`
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.json({ message: 'Authorized', data: decoded }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }
}
