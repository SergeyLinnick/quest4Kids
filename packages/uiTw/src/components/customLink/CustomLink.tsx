import Link from "next/link";
import React from "react";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  isOutside?: boolean;
  className?: string;
}

export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  children,
  isOutside,
  className,
}) => {
  return isOutside ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};
