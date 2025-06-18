import ConnectToDatabase from "@/lib/ConnectToDatabase";
import User from "@/models/User";
import { jwtVerify } from "jose";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function PUT(req: NextRequest) {
  try {

    await ConnectToDatabase();
    
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const { payload } = await jwtVerify(token, SECRET_KEY) 
    const { id } = payload;
    
    const currUser = await User.findById(id);
    if (!currUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const { oldPassword, newUsername, newPassword } = await req.json()
    if (!(oldPassword && newUsername && newPassword)) return NextResponse.json({ message: "Unauthorized, data is incomplete" }, { status: 422 });

    const isCompared = await bcrypt.compare(oldPassword, currUser.password);
    if (!isCompared) return NextResponse.json({ message: "Wrong password" },{ status: 401 });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username: newUsername, password: hashedPassword },
      { new: true }
    );

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
