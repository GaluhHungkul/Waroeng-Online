import ConnectToDatabase from "@/lib/ConnectToDatabase";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await ConnectToDatabase();
    const { username, password } = await req.json();

    const alreadyExistUser = await User.findOne({ username });

    if (alreadyExistUser)
      return NextResponse.json(
        { message: "Username already used" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    return NextResponse.json({ ok: true, username, password });
  } catch (error) {
    console.log("error : ", error);
  }
}
