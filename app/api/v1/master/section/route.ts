import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/db";
import { getUserFromToken } from "@/auth";

connect();

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);

    const reqBody = await request.json();
    const { section } = reqBody;

    if (!section) {
      return NextResponse.json(
        { error: "Section is required" },
        { status: 400 }
      );
    }

    user.sections.push(section);
    await user.save();

    return NextResponse.json({
      message: "Section added successfully",
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

    const sections = user.sections;

    return NextResponse.json({
      message: "Sections list",
      data: sections,
      success: true,
    });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
