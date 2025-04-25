import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps, toast as sonnerToast } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

type ToastFunction = typeof sonnerToast;

const toast: ToastFunction = sonnerToast;

export { Toaster, toast };
