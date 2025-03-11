import { PAGE_PATH_CHILD } from "@/consts";
import { Heading } from "@radix-ui/themes";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <Heading mb="5" as="h1">
        Kids Dashboard
      </Heading>
      <Link href={PAGE_PATH_CHILD.TASKS}>Go to my tasks</Link>
    </>
  );
}
