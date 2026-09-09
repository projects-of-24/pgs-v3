import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Pass pathname to root layout so preview labs can skip Hostinger main.js. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy Hostinger casing — App Router route is `/login`
  if (pathname === "/Login" || pathname.startsWith("/Login/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/Login/i, "/login");
    return NextResponse.redirect(url);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  return NextResponse.next({
    request: { headers: requestHeaders }
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/|.*\\..*).*)"]
};
