"use client";

import { Button as ButtonRadix } from "@radix-ui/themes";
import { ReactNode } from "react";
import styles from "./button.module.css";

export interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  type?: "submit" | "button";
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = "primary",
  type = "button",
  style,
  onClick,
}: ButtonProps) => {
  const variantClass =
    variant === "primary" ? styles.primary : styles.secondary;

  return (
    <ButtonRadix
      className={`${styles.button} ${variantClass}`}
      type={type}
      onClick={onClick}
      style={style}
    >
      {children}
    </ButtonRadix>
  );
};
