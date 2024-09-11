import dbConnect from "@/lib/mongodb";
import { User } from "@/model/user-model";
import { saltAndHashPassword } from "@/utils/saltAndHashPassword";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "ইমেইল এবং পাসওয়ার্ড প্রয়োজন" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "ব্যবহারকারী ইতিমধ্যেই বিদ্যমান" },
        { status: 400 }
      );
    }

    const hashedPassword = await saltAndHashPassword(password);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    return NextResponse.json(
      { message: "ব্যবহারকারী তৈরি হয়েছে" },
      { status: 201 }
    );
  } catch (error) {
    console.error("ব্যবহারকারী তৈরি করার সময় ত্রুটি:", error);
    return NextResponse.json(
      { message: "ব্যবহারকারী তৈরি করার সময় ত্রুটি" },
      { status: 500 }
    );
  }
}
