// export { auth as middleware } from "@/auth";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./auth";
import { PUBLIC_ROUTES } from "./consts/pagePath";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  const isAuthenticated = !!accessToken;
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // if (!isAuthenticated && isPublicRoute) {
  //   return NextResponse.redirect(new URL(PAGE_PATH.SIGNUP, request.url));
  // }

  if (isAuthenticated) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Authorization", `Bearer ${accessToken}`);
    requestHeaders.set("X-With-Credentials", "true"); // custom header to indicate withCredentials but need check maybe Axios or Fetch should do this

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    console.log("middleware response.headers::", response.headers);

    return response;
  }

  return NextResponse.next();
}

// Apply middleware to all routes
// export const config = {
//   matcher: "/:path*",
// };
