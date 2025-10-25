import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const role = req.cookies.get("mafalia_role")?.value;

  const needsLender = pathname.startsWith("/lenders") || pathname.startsWith("/api/lenders");
  if (needsLender) {
    if (role === "lender" || role === "admin") {
      return NextResponse.next();
    }
    const loginUrl = new URL("/auth", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/lenders/:path*", "/api/lenders/:path*"],
};
