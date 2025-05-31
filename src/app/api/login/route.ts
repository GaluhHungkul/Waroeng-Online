import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "@/models/User";
import ConnectToDatabase from "@/lib/ConnectToDatabase";
import { MyJwtPayload } from "@/types/jwtpayload";

export async function POST(req: NextRequest) {
  try {
    await ConnectToDatabase();

    const { username, password } = await req.json();

    const user = await User.findOne({ username });

    if (!user)
      return NextResponse.json(
        { message: "Tidak ada akun dengan username " + username },
        { status: 404 }
      );

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword)
      return NextResponse.json({ message: "Password salah" }, { status: 401 });

    const payLoad: MyJwtPayload = {
      id: user._id,
      username: user.username,
    };

    if (!process.env.JWT_SECRET)
      throw new Error("JWT_SECRET is not defined in .env file");

    const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Login success" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.log("Error : ", error);
  }
}
