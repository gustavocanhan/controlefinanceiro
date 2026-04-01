import { NextRequest, NextResponse } from "next/server";

// Rotas que qualquer um pode acessar sem estar logado
const publicRoutes = ["/", "/register"];

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  if (token && publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && !publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/register", "/dashboard/:path*"],
};
