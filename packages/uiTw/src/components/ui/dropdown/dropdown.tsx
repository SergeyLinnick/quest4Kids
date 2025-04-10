import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuOption,
  DropdownMenuOptionType,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components";

interface DropdownProps {
  options: DropdownMenuOptionType[];
  children: React.ReactNode;
  size?: "sm" | "lg";
  variant?: "default" | "destructive";
}

export const Dropdown = ({
  options,
  children,
  size = "sm",
  variant = "default",
}: DropdownProps) => {
  const getContent = (option: DropdownMenuOptionType) => {
    if (option?.groupLabel) {
      return (
        <>
          <DropdownMenuLabel>{option.groupLabel}</DropdownMenuLabel>
          <DropdownMenuSeparator />
        </>
      );
    } else if (option?.checkbox) {
      return (
        <DropdownMenuCheckboxItem key={option.value} checked={option.checked}>
          {option.label}
        </DropdownMenuCheckboxItem>
      );
    } else {
      return (
        <DropdownMenuOption
          key={option.value}
          option={option}
          variant={variant}
          size={size}
        />
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>{options.map(getContent)}</DropdownMenuContent>
    </DropdownMenu>
  );
};
