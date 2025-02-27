import { Button as ButtonRadix } from "@radix-ui/themes";
import { BaseButtonProps } from "@radix-ui/themes/components/_internal/base-button";
import clsx from "clsx";

export const Button = ({
  children,
  color = "violet",
  type = "button",
  className,
  variant,
  style,
  disabled,
  onClick,
}: BaseButtonProps) => {
  return (
    <ButtonRadix
      className={clsx(className)}
      type={type}
      onClick={onClick}
      style={style}
      disabled={disabled}
      color={color}
      variant={variant}
    >
      {children}
    </ButtonRadix>
  );
};
