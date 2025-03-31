import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

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
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
