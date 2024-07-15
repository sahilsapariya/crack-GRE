import jwt from "jsonwebtoken";
import { parse } from "cookie";
import User from "@/models/userSchema";
import { NextRequest } from "next/server";

export async function getUserFromToken(request: NextRequest) {
  const cookies = parse(request.headers.get("cookie") || "");
  const token = cookies.token;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  const userId = decoded.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
