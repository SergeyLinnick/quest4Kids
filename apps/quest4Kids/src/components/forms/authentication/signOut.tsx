"use client";
import { signOut } from "next-auth/react";
import type { FC } from "react";

export const SignOut: FC = () => {
  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/signin",
        redirect: true,
      });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 cursor-pointer"
    >
      Sign out
    </button>
  );
};
