/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { getChildrenURL } from "./services";

// const getData = unstable_cache(
//   async (token) => {
//     console.log("Fetching fresh data...");
//     const res = await fetch(getChildrenURL, {
//       headers: token ? { Authorization: `Bearer ${token}` } : {},
//     });
//     return res.json();
//   },
//   ["children-list"],
//   { revalidate: 60, tags: ["children-list"] },
// );

const getData = async (token: string | null) => {
  console.log("Fetching fresh data...");
  const res = await fetch(getChildrenURL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: "force-cache",
    next: { tags: ["children-list"], revalidate: 60 },
  } as any);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
};

export async function fetchChildren() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  const children = await getData(token);

  return children?.data;
}
