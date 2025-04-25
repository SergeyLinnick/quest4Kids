import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "./PopoverPrimitives";

type PopoverButtonProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  size?: "default" | "sm" | "lg";
  onOpenAutoFocus?: (e: Event) => void;
};

export const Popover = ({
  children,
  content,
  size,
  onOpenAutoFocus,
}: PopoverButtonProps) => {
  const handleOpenAutoFocus = (e: Event) => {
    onOpenAutoFocus?.(e);
  };

  return (
    <PopoverRoot>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent onOpenAutoFocus={handleOpenAutoFocus} size={size}>
        {content}
      </PopoverContent>
    </PopoverRoot>
  );
};
