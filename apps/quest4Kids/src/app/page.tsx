import { Header } from "@/components/layouts";
import { PAGE_PATH } from "@/consts/pagePath";
import { AspectRatio, Box, Flex, Link, Text } from "@radix-ui/themes";
import { Button } from "@repo/ui";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.banner}>
          <Box className={styles.bannerImage}>
            <AspectRatio ratio={16 / 9}>
              <Image src="/banner.webp" alt="Quest for Kids" fill />
            </AspectRatio>
          </Box>
        </div>
        <Flex direction="column" gap="2" align="center">
          <Text>Hello from Radix Themes :)</Text>
          <Link href={PAGE_PATH.DASHBOARD}>Lets go to Dashboard</Link>
          <Button>Button</Button>
          <Button color="teal">Btn Teal</Button>
          <Button variant="classic">Classic</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="solid">Solid</Button>
          <Button variant="surface">Surface</Button>
          <Button variant="surface">Surface</Button>
        </Flex>
      </main>
    </div>
  );
}
