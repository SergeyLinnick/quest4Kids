import { auth, Session } from "@repo/auth";
import { NextResponse, type NextRequest } from "next/server";
import { PAGE_PATH, PUBLIC_ROUTES } from "./consts/pagePath";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const session: Session | null = await auth();

  const accessToken = session?.user?.accessToken;
  const isAuthenticated = !!accessToken;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isAuthenticated && nextUrl.pathname === PAGE_PATH.HOME) {
    return NextResponse.redirect(new URL(PAGE_PATH.DASHBOARD, request.url));
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(PAGE_PATH.SIGNIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/tasks/:path*", "/kids/:path*"],
};
