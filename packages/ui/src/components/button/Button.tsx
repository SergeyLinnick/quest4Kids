import { Button as ButtonRadix, Spinner } from "@radix-ui/themes";
import { BaseButtonProps } from "@radix-ui/themes/components/_internal/base-button";
import clsx from "clsx";

export const Button = ({
  children,
  color = "violet",
  type = "button",
  className,
  variant,
  size = "3",
  style,
  disabled,
  onClick,
  isLoading,
  icon,
}: BaseButtonProps & { isLoading?: boolean; icon?: React.ReactNode }) => {
  return (
    <ButtonRadix
      className={clsx(className)}
      type={type}
      onClick={onClick}
      style={style}
      disabled={disabled}
      color={color}
      variant={variant}
      size={size}
      loading={isLoading}
    >
      {icon && <Spinner loading={isLoading}>{icon}</Spinner>}

      {children}
    </ButtonRadix>
  );
};
