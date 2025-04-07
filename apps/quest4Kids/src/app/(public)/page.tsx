import { PAGE_PATH } from "@/consts";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import { Button, buttonVariants } from "@repo/ui-tw";
import Link from "next/link";

import styles from "./page.module.css";

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageBackground}>
        <Box maxWidth="800px" pb="9">
          <Card variant="classic" size="5" mb="9">
            <Heading size="6" align="center" mb="4" color="violet">
              Welcome to Quest4Kids
            </Heading>
            <Heading size="3" align="center" mb="4" color="violet">
              Where Learning Becomes an Adventure!
            </Heading>

            <main
              style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
            >
              <section>
                <Heading size="3" align="left" mb="4" color="violet">
                  How It Works:
                </Heading>

                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ marginBottom: "10px" }}>
                    <span style={{ fontWeight: "bold" }}>
                      Create Meaningful Tasks:
                    </span>{" "}
                    Assign tasks like homework, organizing toys, or helping
                    around the house.
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <span style={{ fontWeight: "bold" }}>Set Rewards:</span>{" "}
                    Motivate your child with rewards they’ll love, like extra
                    playtime or a special treat.
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <span style={{ fontWeight: "bold" }}>Track Progress:</span>{" "}
                    Watch their confidence grow as they complete tasks and earn
                    points.
                  </li>
                </ul>
              </section>
              <br />
              <section>
                <Heading size="3" align="left" mb="4" color="violet">
                  Why Quest4Kids?
                </Heading>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ marginBottom: "10px" }}>
                    <span style={{ fontWeight: "bold" }}>Fun & Engaging:</span>{" "}
                    Gamified tasks turn responsibilities into exciting quests.
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <span style={{ fontWeight: "bold" }}>Family Bonding:</span>{" "}
                    Strengthen your relationship as you work together to achieve
                    goals.
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <span style={{ fontWeight: "bold" }}>Life Skills:</span>{" "}
                    Help your child build independence, responsibility, and good
                    habits.
                  </li>
                </ul>
              </section>
              <br />
              <section>
                <Heading size="3" align="center" mb="4" color="violet">
                  Take the first step toward transforming chores into adventures
                  and teaching your kids that responsibility can be rewarding!
                </Heading>
                <Heading align="center">
                  <Link
                    className={buttonVariants({ variant: "outline" })}
                    href={PAGE_PATH.SIGNIN}
                  >
                    Get Started
                  </Link>
                </Heading>
                <Flex align="center" justify="center" my="2">
                  <Button variant="destructive" className="text-center">
                    Tailwind Button
                  </Button>
                </Flex>
              </section>
            </main>
          </Card>
        </Box>
      </div>
    </div>
  );
}
