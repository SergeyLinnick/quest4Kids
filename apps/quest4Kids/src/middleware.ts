import { auth, Session } from "@repo/auth";
import { NextResponse, type NextRequest } from "next/server";
import { PAGE_PATH, PUBLIC_ROUTES } from "./consts";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const session: Session | null = await auth();

  const accessToken = session?.user?.accessToken;
  const isAuthenticated = !!accessToken;
  const isSignInPage = nextUrl.pathname === PAGE_PATH.SIGNIN;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isAuthenticated && isSignInPage) {
    return NextResponse.redirect(new URL(PAGE_PATH.DASHBOARD, request.url));
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(PAGE_PATH.SIGNIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match specific routes
     */
    "/",
    "/dashboard",
    "/tasks/:path*",
    "/kids/:path*",

    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public image assets (webp, ico, png, jpg, svg)
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:webp|ico|png|jpg|svg)).*)",
  ],
};
