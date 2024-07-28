import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/api/auth";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  if (request.nextUrl.pathname.startsWith("/seller")) {
    if (session === null) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (session !== null) {
      return NextResponse.redirect(new URL("/seller", request.url));
    }
  }

  return NextResponse.next();
}
