import { PAGE_PATH } from "@/consts";
import { Box, Card, DataList, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import styles from "../page.module.css";

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageBackground}>
        <Box maxWidth="800px" mb="6">
          <Card variant="classic" size="5" mt="6">
            <Heading size="6" align="center" mb="4" color="violet">
              About Us
            </Heading>
            <Text as="p" color="gray" weight="light" size="3">
              At{" "}
              <Link href={PAGE_PATH.HOME}>
                <Text as="span" color="violet" weight="bold">
                  Quest4Kids
                </Text>
              </Link>{" "}
              our mission is to make learning fun, engaging, and rewarding for
              children. As parents and educators, we understand the importance
              of teaching kids responsibility and helping them develop good
              habits. That is why we created Quest4Kids—a platform designed to
              empower parents to create meaningful tasks for their kids while
              turning everyday chores into exciting challenges.
              <br />
              <br />
              Our app offers a simple yet effective way for parents to assign
              tasks, set rewards, and track progress. Whether it is completing
              homework, organizing toys, or finishing household chores,
              Quest4Kids helps children learn the value of hard work and
              perseverance through a gamified experience. Children earn points
              for each completed task, allowing them to track their progress and
              earn rewards. These points motivate kids to complete tasks,
              offering them a sense of achievement and a fun way to stay
              engaged.
              <br />
              <br />
              We believe that by incorporating fun and rewards into daily tasks,
              kids will not only accomplish more but also gain confidence, learn
              life skills, and enjoy the process along the way. With Quest4Kids,
              parenting just got a little bit easier—and a lot more fun!
            </Text>
          </Card>
          <Card variant="classic" size="5" mt="6">
            <Heading size="5" align="center" mb="4" color="violet">
              What Makes Quest4Kids Unique?
            </Heading>
            <Text as="p" color="gray" weight="light" size="3">
              <strong>For Parents:</strong> Sign in to Quest4Kids and take
              charge of managing family responsibilities with ease. Parents can:
              <DataList.Root>
                <DataList.Item>
                  Create tasks and assign them to specific kids.
                </DataList.Item>
                <DataList.Item>
                  Define clear objectives and set points for task completion.
                </DataList.Item>
                <DataList.Item>
                  Manage and update tasks, including descriptions, statuses, and
                  points.
                </DataList.Item>
              </DataList.Root>
              Parents also have access to a rewards system that motivates kids
              to accomplish their goals and track progress.
              <br />
              <br />
              <strong>For Kids:</strong> Kids can sign in using their profiles
              to:
              <DataList.Root>
                <DataList.Item>
                  View tasks assigned to them with clear descriptions and
                  objectives.
                </DataList.Item>
                <DataList.Item>
                  Change the status of tasks (e.g., marking as In Progress or
                  Done).
                </DataList.Item>
                <DataList.Item>
                  Upload and update their avatar images for profile
                  customization.
                </DataList.Item>
              </DataList.Root>
              Kids can track their progress while maintaining read-only access
              to other profile information, ensuring a secure and
              age-appropriate experience.
              <br />
              <br />
              <strong>The Task Page:</strong> The Task Page serves as the hub
              for task management:
              <DataList.Root>
                <DataList.Item>
                  Parents can view all tasks, update details, and filter tasks
                  by status or assignee.
                </DataList.Item>
                <DataList.Item>
                  Kids can view their tasks and update their status to show
                  progress.
                </DataList.Item>
              </DataList.Root>
              With its intuitive design, the Task Page ensures that both parents
              and kids can manage their responsibilities effectively.
              <br />
              <br />
              Join Quest4Kids today and transform everyday chores into exciting
              adventures while fostering a positive, collaborative family
              environment!
            </Text>
          </Card>
        </Box>
      </div>
    </div>
  );
}
