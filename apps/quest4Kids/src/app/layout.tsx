import { ApiProvider } from "@repo/api";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import "@repo/ui/globals.css";

import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Quest4Kids",
  description:
    "Quest4Kids is a web application where parents can create tasks for children, and children complete them to earn rewards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class">
          <Theme accentColor="violet">
            <ApiProvider>{children}</ApiProvider>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
