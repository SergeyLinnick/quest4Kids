import { authOptions } from "@repo/auth"; // Import from the auth package
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
