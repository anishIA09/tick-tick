import { NextResponse } from "next/server";

const PRIVATE_ROUTES = ["/campaigns", "/dashboard", "/locations"];
const AUTH_ROUTES = ["/signup", "/signin"];

export function proxy(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (token && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && PRIVATE_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/campaigns",
    "/dashboard",
    "/locations",
    "/plans",
  ],
};
