import { Button as ButtonRadix } from "@radix-ui/themes";
import { BaseButtonProps } from "@radix-ui/themes/components/_internal/base-button";
import clsx from "clsx";
import Link from "next/link";

export const ButtonLink = ({
  children,
  color = "violet",
  className,
  variant,
  size = "3",
  style,
  disabled,
  href,
  isLoading = false,
}: BaseButtonProps & { isLoading?: boolean; href: string }) => {
  return (
    <ButtonRadix
      className={clsx(className)}
      style={style}
      disabled={disabled}
      color={color}
      variant={variant}
      size={size}
      loading={isLoading}
      asChild
    >
      <Link href={href}>{children}</Link>
    </ButtonRadix>
  );
};
