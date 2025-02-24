import { Header } from "@/components/layouts";
import { AspectRatio, Box, Flex, Text } from "@radix-ui/themes";
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
          <Button>Lets go</Button>
          <Button variant="secondary">Open alert</Button>
        </Flex>
      </main>
    </div>
  );
}
