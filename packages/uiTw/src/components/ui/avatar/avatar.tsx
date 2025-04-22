import { cn } from "../../../lib/utils";
import { AvatarFallback, AvatarImage, AvatarRoot } from "./avatarPrimitives";

type AvatarProps = {
  src?: string;
  fallback?: string;
  className?: string;
};

export const Avatar = ({ src, fallback, className }: AvatarProps) => {
  return (
    <AvatarRoot className={cn(className)}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarRoot>
  );
};
