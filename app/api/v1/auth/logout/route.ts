import { NextResponse } from "next/server";
export async function GET() {
  try {
    const request = NextResponse.json(
      {
        message: "Logout succsefully",
        success: true,
      },
      { status: 200 }
    );
    request.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return request;
  } catch (error) {
    return NextResponse.json({ error: "your request is not complete" });
  }
}
