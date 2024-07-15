import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/db";
import { getUserFromToken } from "@/auth";

connect();

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);

    // Read the JSON data from the request body
    const reqBody = await request.json();
    const { section, words } = reqBody;

    if (!section) {
      return NextResponse.json(
        { error: "Section is required" },
        { status: 400 }
      );
    }

    if (!words || !Array.isArray(words)) {
      return NextResponse.json(
        { error: "Invalid words data" },
        { status: 400 }
      );
    }

    // Construct the new words object
    const newWords = {
      section,
      words,
    };

    user.words.push(newWords);
    await user.save();

    return NextResponse.json({
      message: "Words added successfully",
      success: true,
    });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);

    const words = user.words;

    return NextResponse.json({
      message: "Words list",
      data: words,
      success: true,
    });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
