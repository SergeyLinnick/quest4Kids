import { auth, Session } from "@repo/auth";
import { NextResponse, type NextRequest } from "next/server";
import { PAGE_PATH, PUBLIC_ROUTES } from "./consts";

// const sessionCookie =
//   process.env.NODE_ENV === "production"
//     ? "__Secure-authjs.session-token"
//     : "authjs.session-token";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const session: Session | null = await auth();

  const accessToken = session?.user?.accessToken;

  // if (expiresAt && expiresAt < Date.now()) {
  //   console.log("🔴 token expired", refreshToken);
  //   const res = await fetch(
  //     `http://quest4kids-api.us-east-1.elasticbeanstalk.com/auth/refresh`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ token: refreshToken }),
  //     },
  //   );

  //   const refreshed = await res.json();
  //   console.log("🔄 refreshed:", refreshed.refreshToken);

  //   const response = NextResponse.next();

  //   const newSessionToken = await encode({
  //     secret:
  //       process.env.NEXTAUTH_SECRET ||
  //       "sPjmRIDhHcasTMyjGkqyv3ZtPCtY/BJwZEDczHnJfYQ=",
  //     token: {
  //       ...session,
  //       refreshToken: refreshed.refreshToken,
  //       expiresAt: Date.now() + 60 * 1000, // 1 min
  //       accessToken: refreshed.accessToken,
  //     },
  //     salt: sessionCookie,
  //   });

  //   console.log("🔄 newSessionToken:", newSessionToken);

  //   response.cookies.set(sessionCookie, newSessionToken);

  //   return response;
  // }

  const isAuthenticated = !!accessToken;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isAuthenticated && isPublicRoute) {
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
    "/signin",
    "/signup",

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
