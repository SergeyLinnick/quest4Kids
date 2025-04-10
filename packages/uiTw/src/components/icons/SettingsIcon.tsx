import { SettingsIcon as SettingsIconLucide } from "lucide-react";

export const SettingsIcon = ({
  className = "size-5",
}: {
  className?: string;
}) => {
  return <SettingsIconLucide className={className} />;
};
