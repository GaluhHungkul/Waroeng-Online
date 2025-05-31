import ConnectToDatabase from "@/lib/ConnectToDatabase";
import User from "@/models/User";
import { MyJwtPayload } from "@/types/jwtpayload";
import { jwtVerify } from "jose";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function PUT(req: NextRequest) {
  try {
    await ConnectToDatabase();

    const token = req.cookies.get("token")?.value;

    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { passwordLama, newUsername, newPassword } = await req.json();

    const { payload } = (await jwtVerify(token, SECRET_KEY)) as {
      payload: MyJwtPayload;
    };

    const { id } = payload;

    const currUser = await User.findById(id);

    if (!currUser)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const isCompared = await bcrypt.compare(passwordLama, currUser.password);

    if (!isCompared)
      return NextResponse.json(
        { message: "Unauthorized, password wrong" },
        { status: 401 }
      );

    if (!newUsername || !newPassword)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
