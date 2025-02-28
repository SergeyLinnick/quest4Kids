import { getChildrenList } from "@repo/api";
import { cookies } from "next/headers";

export default async function KidsPage() {
  const children = await getChildrenList();
  console.log("children", children);
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  console.log("token", token);

  return <div>Kids list</div>;
}
