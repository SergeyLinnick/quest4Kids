import Image from "next/image";

import { Avatar as AvatarRadix } from "radix-ui";
import styles from "./avatar.module.css";

interface AvatarProps {
  size?: number;
  src?: string;
  alt?: string;
  fallback?: string;
}

export const Avatar = ({
  size = 35,
  src,
  alt,
  fallback = "CT",
}: AvatarProps) => {
  return (
    <AvatarRadix.Root
      className={styles.avatarRoot}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || "avatar"}
          fill
          className={styles.avatarImage}
          sizes={`${size}px`}
          priority
          quality={90}
        />
      ) : (
        <AvatarRadix.Fallback className={styles.avatarFallback} delayMs={600}>
          {fallback}
        </AvatarRadix.Fallback>
      )}
    </AvatarRadix.Root>
  );
};
