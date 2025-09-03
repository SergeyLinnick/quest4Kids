"use client";

import { Box, Card, Heading } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import styles from "../page.module.css";

export default function SignInPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageBackground}>
        <Box width="450px" pb="9">
          <Card variant="classic" size="5" mb="9">
            <Heading size="6" align="center" mb="4" color="violet">
              Sign In
            </Heading>
            {/* <SignIn /> */}
            <button
              onClick={() => signIn("zitadel")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2 mb-6 cursor-pointer"
            >
              <svg
                className="w-5 h-5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Login</span>
            </button>
          </Card>
        </Box>
      </div>
    </div>
  );
}
