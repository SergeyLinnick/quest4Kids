import { Header } from "@/components/layouts";
import { Container } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Container size="4">{children}</Container>
    </>
  );
}
