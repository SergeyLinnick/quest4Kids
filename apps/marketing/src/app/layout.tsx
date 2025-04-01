import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { Header } from "@repo/ui-tw";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quest4Kids - Marketing",
  description: "Quest4Kids - Marketing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Header isOutside>
            <a href="/marketing">About Us</a>
            <a href="/signup">Sign Up</a>
            <a href="/signin">Sign In</a>
          </Header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
