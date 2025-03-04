import { Header } from "@/components/layouts";
import { PAGE_PATH } from "@/consts/pagePath";
import { AspectRatio, Box, Flex, Link } from "@radix-ui/themes";
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
          <Link href={PAGE_PATH.DASHBOARD}>Lets go to Dashboard</Link>
          <Link href={PAGE_PATH.LOGIN}>Lets go to Login</Link>
        </Flex>
      </main>
    </div>
  );
}
