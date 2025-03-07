import { Box, Card, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import styles from "../page.module.css";

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageBackground}>
        <Box maxWidth="800px">
          <Card className={styles.card}>
            <Heading size="6" align="center" mb="4" color="violet">
              About Us
            </Heading>
            <article>
              <Text as="p" color="gray" weight="light" size="3">
                At{" "}
                <Link href="/">
                  <Text as="span" color="violet" weight="bold">
                    Quest4Kids
                  </Text>
                </Link>{" "}
                our mission is to make learning fun, engaging, and rewarding for
                children. As parents and educators, we understand the importance
                of teaching kids responsibility and helping them develop good
                habits. That's why we created Quest4Kids—a platform designed to
                empower parents to create meaningful tasks for their kids while
                turning everyday chores into exciting challenges.
                <br />
                Our app offers a simple yet effective way for parents to assign
                tasks, set rewards, and track progress. Whether it's completing
                homework, organizing toys, or finishing household chores,
                Quest4Kids helps children learn the value of hard work and
                perseverance through a gamified experience. Children earn points
                for each completed task, allowing them to track their progress
                and earn rewards. These points motivate kids to complete tasks,
                offering them a sense of achievement and a fun way to stay
                engaged.
                <br />
                We believe that by incorporating fun and rewards into daily
                tasks, kids will not only accomplish more but also gain
                confidence, learn life skills, and enjoy the process along the
                way. With Quest4Kids, parenting just got a little bit easier—and
                a lot more fun!
              </Text>
            </article>
          </Card>
        </Box>
      </div>
    </div>
  );
}
