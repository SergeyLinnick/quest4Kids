"use server";

import { SwapModal } from "@/components/forms/swapForm/SwapModal";
import { PAGE_PATH_PARENT } from "@/consts";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import { fetchAvatar, fetchChildren, IChild } from "@repo/api";
import { AddIcon, AddUserCard, ButtonLink, UserCard } from "@repo/ui";
import Link from "next/link";

export default async function KidsPage() {
  const children = await fetchChildren();

  const childrenWithAvatars = await Promise.all(
    children?.data?.map(async (child: IChild) => {
      const avatar = await fetchAvatar(child.id);
      return { ...child, avatar };
    }) || [],
  );

  // Sorted children by createdAt in descending order (newest first)
  const sortedChildren = childrenWithAvatars.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <>
      <Heading>My Kids</Heading>

      {sortedChildren?.length > 0 ? (
        <Grid
          columns={{ initial: "1", md: "2", lg: "3" }}
          gap="4"
          maxWidth="1200px"
          my="5"
        >
          {sortedChildren?.map((child: IChild) => {
            const id = child.id;
            return (
              <UserCard
                key={id}
                user={child}
                href={PAGE_PATH_PARENT.CHILD(id.toString())}
              >
                <Flex gap="2" justify="start" mt="4" pl="9">
                  <SwapModal
                    user={child}
                    isDisabled={child.availablePoints === 0}
                  />
                  <ButtonLink
                    href={`/kids/${id}/add-task`}
                    variant="outline"
                    color="cyan"
                  >
                    <AddIcon />
                    Add Task
                  </ButtonLink>
                </Flex>
              </UserCard>
            );
          })}
          <AddUserCard href={PAGE_PATH_PARENT.CHILD_NEW} />
        </Grid>
      ) : (
        <Grid>
          <Heading>No children found</Heading>
          <Link href={PAGE_PATH_PARENT.CHILD_NEW}>Add the child</Link>
          <AddUserCard href={PAGE_PATH_PARENT.CHILD_NEW} />
        </Grid>
      )}
    </>
  );
}
