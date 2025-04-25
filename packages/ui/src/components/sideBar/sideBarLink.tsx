"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./sideBar.module.css";

interface SideBarLinkProps {
  href: string;
  label: string;
}

const SideBarLink = ({ href, label }: SideBarLinkProps) => {
  const pathname = usePathname();
  const firstSegment = pathname.split("/").filter(Boolean)[0] || "/";
  const firstHrefSegment = href.toString().split("/").filter(Boolean)[0] || "/";

  const isActive = firstSegment === firstHrefSegment;

  return (
    <Link
      className={clsx(styles.sideBarNav, isActive && styles.active)}
      href={href}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
};

export default SideBarLink;
