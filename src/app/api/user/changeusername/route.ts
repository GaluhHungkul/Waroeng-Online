import ConnectToDatabase from "@/lib/ConnectToDatabase";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET

export async function PUT(req: NextRequest) {
  try {

    await ConnectToDatabase();
    
    const token = await getToken({ req, secret })
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const { id } = token;

    const newUsername = await req.json()
    
    const currUser = await User.findById(id);
    if (!currUser) return NextResponse.json({ message: "User not found" }, { status: 404 });


    await User.findByIdAndUpdate(
      id,
      { username: newUsername },
      { new: true }
    );

    return NextResponse.json({ message : "User berhasil diupdate" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
