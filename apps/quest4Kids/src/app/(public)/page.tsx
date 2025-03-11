import { Box, Card, Heading, Text } from "@radix-ui/themes";
import styles from "./page.module.css";

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageBackground}>
        <Box maxWidth="800px" pb="9">
          <Card variant="classic" size="5" mb="9">
            <Heading size="6" align="center" mb="4" color="violet">
              Landing Page
            </Heading>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              aperiam dolorem eligendi iure culpa sunt obcaecati beatae nesciunt
              doloribus ipsam modi quos commodi, a optio maxime quam, provident
              sit delectus ea itaque doloremque quasi, praesentium soluta?
              Cumque consequuntur architecto nemo alias molestias.
              <br />
              Possimus necessitatibus quam ipsam aperiam nobis temporibus
              voluptas tenetur, assumenda quae maiores tempore sequi eos nostrum
              consequatur deleniti laudantium expedita eum?
              <br />
              Animi officia accusamus, quia, explicabo quibusdam porro quos
              fugiat ipsam voluptatem itaque facilis eaque! Expedita distinctio
              officiis quia eveniet itaque, harum fugiat consequuntur odio
              excepturi ipsum voluptates dolorem beatae molestias fuga neque
              accusantium maxime rem similique nemo modi possimus. Minus
              voluptates asperiores itaque accusantium. Eum saepe quae sed
              quaerat debitis est consequatur provident fuga ut ullam possimus
              praesentium voluptatibus aliquam dolores, soluta sequi, eos esse
              nostrum, mollitia odit quos illum suscipit quod commodi!
              <br />
              Expedita odit dolorem facere eligendi laudantium laborum corrupti
              consequuntur dolorum quisquam at! Debitis voluptatem dolore nulla
              totam obcaecati iure dolorum ullam vero dolorem quia nesciunt
              quisquam at, labore repellat sequi voluptas magni expedita fugiat
              ipsam cumque, aut recusandae sunt sit.
              <br />
              Enim eveniet ad laboriosam quisquam similique veritatis id ullam
              pariatur doloremque amet iure culpa inventore at magni assumenda
              eius cumque corporis, impedit ex. Labore laudantium deleniti, nemo
              nulla voluptatibus quas voluptate fuga est libero? Quam dolores
              cumque culpa accusantium id veritatis numquam, nesciunt
              aspernatur. Facere ipsa nisi ab, voluptatum neque libero. Quod
              esse, iure hic dolore numquam rerum. Odit inventore quae
              repellendus hic nostrum deleniti, accusamus similique fugiat
              consequatur eveniet magni laboriosam natus magnam!
            </Text>
          </Card>
        </Box>
      </div>
    </div>
  );
}
