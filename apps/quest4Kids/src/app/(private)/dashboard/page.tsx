import { PAGE_PATH_CHILD, PAGE_PATH_PARENT } from "@/consts/pagePath";
import { ROLE, RoleType } from "@/consts/roles";
import { Heading } from "@radix-ui/themes";
import Link from "next/link";

export default function DashboardPage() {
  const role: RoleType = "parent";

  const Content = () => {
    if (role === ROLE.PARENT) {
      return (
        <>
          <Heading mb="5" as="h1">
            Parent Dashboard
          </Heading>
          <Link href={PAGE_PATH_PARENT.CHILD_NEW}>Add Kid</Link>
        </>
      );
    } else {
      return (
        <>
          <Heading mb="5" as="h1">
            Kids Dashboard
          </Heading>
          <Link href={PAGE_PATH_CHILD.TASKS}>Go to my tasks</Link>
        </>
      );
    }
  };

  return <Content />;
}
