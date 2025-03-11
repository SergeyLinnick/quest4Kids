"use server";

import { PAGE_PATH_PARENT } from "@/consts/pagePath";
import { Box, Grid, Heading } from "@radix-ui/themes";
import { fetchChildren, IChild } from "@repo/api";
import { ButtonLink, UserCard } from "@repo/ui";
import Link from "next/link";

export default async function KidsPage() {
  const children = await fetchChildren();

  return (
    <>
      <Box mb="4">
        <ButtonLink href={PAGE_PATH_PARENT.CHILD_NEW}>Add Kid</ButtonLink>
      </Box>
      <Grid
        columns={{ initial: "1", md: "2", lg: "3" }}
        gap="4"
        maxWidth="1200px"
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
          <>
            <Heading>No children found</Heading>
            <Link href={PAGE_PATH_PARENT.CHILD_NEW}>Add the child</Link>
          </>
        )}
      </Grid>
    </>
  );
}
