import ConnectToDatabase from "@/lib/ConnectToDatabase";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User"

export async function POST(req: NextRequest) {
  try {
    await ConnectToDatabase();
    const { username, password, email } = await req.json();
    console.log({username, password, email})
    const alreadyExistUser = await User.findOne({ email });
    if (alreadyExistUser) return NextResponse.json({ message: "Email already used" }, { status: 400 } );

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    return NextResponse.json({ ok: true });

  } catch (error) {
    console.log("error : ", error);
  }
}
