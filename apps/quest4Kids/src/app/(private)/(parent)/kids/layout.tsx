import { Heading } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Heading mb="5" as="h1">
        Kids
      </Heading>
      {children}
    </div>
  );
}
