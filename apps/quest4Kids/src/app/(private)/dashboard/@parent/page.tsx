import { PAGE_PATH_PARENT } from "@/consts";
import { Heading } from "@radix-ui/themes";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <Heading mb="5" as="h1">
        Parent Dashboard
      </Heading>
      <Link href={PAGE_PATH_PARENT.CHILD_NEW}>Add Kid</Link>
    </>
  );
}
