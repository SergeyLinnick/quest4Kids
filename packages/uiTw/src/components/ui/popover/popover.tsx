import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "./PopoverPrimitives";

type PopoverButtonProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  size?: "default" | "sm" | "lg";
};

export const Popover = ({ children, content, size }: PopoverButtonProps) => {
  return (
    <PopoverRoot>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent size={size}>{content}</PopoverContent>
    </PopoverRoot>
  );
};
