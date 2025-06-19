import ConnectToDatabase from "@/lib/ConnectToDatabase";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET

export async function PUT(req: NextRequest) {
  try {

    await ConnectToDatabase();
    
    const token = await getToken({ req, secret })
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const { id } = token;
    
    const currUser = await User.findById(id);
    if (!currUser) return NextResponse.json({ message: "User not found" }, { status: 404 });
    
    const { oldPassword, newUsername, newPassword } = await req.json()
    if (!(oldPassword && newUsername && newPassword)) return NextResponse.json({ message: "Unauthorized, data is incomplete" }, { status: 422 });

    const isCompared = await bcrypt.compare(oldPassword, currUser.password);
    if (!isCompared) return NextResponse.json({ message: "Wrong password" },{ status: 401 });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(
      id,
      { username: newUsername, password: hashedPassword },
      { new: true }
    );

    return NextResponse.json({message : "User berhasil diupdate"}, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
