"use server";

import { PAGE_PATH_PARENT } from "@/consts/pagePath";
import { Flex } from "@radix-ui/themes";
import { fetchChildren, IChild } from "@repo/api";
import { UserCard } from "@repo/ui";
import Link from "next/link";

export default async function KidsPage() {
  const children = await fetchChildren();

  return (
    <Flex gap="5" direction="column" width="400px">
      {children?.map((child: IChild) => (
        <Link key={child.id} href={PAGE_PATH_PARENT.CHILD(child.id.toString())}>
          <UserCard user={child} isLink />
        </Link>
      ))}

      <Link href={PAGE_PATH_PARENT.CHILD_NEW}>Add Kid</Link>
    </Flex>
  );
}
