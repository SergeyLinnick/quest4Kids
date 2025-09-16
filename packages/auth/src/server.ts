import NextAuth, { type NextAuthResult } from "next-auth";
import { makeAuthConfig } from "./nextauth-config";

const result = NextAuth(makeAuthConfig());
export const handlers: NextAuthResult["handlers"] = result.handlers;
export const { GET, POST } = handlers;

export const auth: NextAuthResult["auth"] = result.auth;
export const signIn: NextAuthResult["signIn"] = result.signIn;
export const signOut: NextAuthResult["signOut"] = result.signOut;


