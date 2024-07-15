import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

// Ensure you have the correct import for the middleware function
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.cookies.get("token"); // Assuming authentication is managed with cookies

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next(); // Proceed with the request
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
