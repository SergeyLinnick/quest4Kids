"use server";

import { PAGE_PATH_PARENT } from "@/consts";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import { fetchChildren, IChild } from "@repo/api";
import { ButtonLink, UserCard } from "@repo/ui";
import Link from "next/link";

export default async function KidsPage() {
  const children = await fetchChildren();

  return (
    <>
      <Flex justify="between" align="center">
        <Heading>My Kids</Heading>
        <ButtonLink href={PAGE_PATH_PARENT.CHILD_NEW}>Add Kid</ButtonLink>
      </Flex>
      <Grid
        columns={{ initial: "1", md: "2", lg: "3" }}
        gap="4"
        maxWidth="1200px"
        my="5"
      >
        {children?.data?.length > 0 ? (
          children?.data?.map((child: IChild) => (
            <Link
              key={child.id}
              href={PAGE_PATH_PARENT.CHILD(child.id.toString())}
            >
              <UserCard user={child} isLink />
            </Link>
          ))
        ) : (
          <Grid>
            <Heading>No children found</Heading>
            <Link href={PAGE_PATH_PARENT.CHILD_NEW}>Add the child</Link>
          </Grid>
        )}
      </Grid>
    </>
  );
}
