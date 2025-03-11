import { auth, Session } from "@repo/auth";
import { NextResponse, type NextRequest } from "next/server";
import { PUBLIC_ROUTES } from "./consts/pagePath";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  console.log("===>", request.nextUrl.pathname);
  const session: Session | null = await auth();

  const accessToken = session?.user?.accessToken;
  const isAuthenticated = !!accessToken;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isAuthenticated && nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
