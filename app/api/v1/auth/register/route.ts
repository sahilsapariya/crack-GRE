import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/db/db";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { firstName, lastName, email, password } = reqBody;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists", success: false },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
