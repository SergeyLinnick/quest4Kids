import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import * as React from "react";

import { cn } from "../../../lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        `peer
        size-5
        relative
        text-background
        shrink-0
        disabled:cursor-not-allowed disabled:opacity-50
        `,

        `after:content-['']
        after:absolute
        after:border-input
        after:rounded-sm
        after:border
        after:size-5
        after:shadow-xs
        after:top-0
        after:left-0
        after:bg-accent
        focus-visible:after:ring-[2px]
        focus-visible:after:border-ring
        focus-visible:after:ring-ring
        aria-invalid:after:ring-destructive/20
        dark:aria-invalid:after:ring-destructive/40
        aria-invalid:after:border-destructive
        data-[state=checked]:after:bg-primary
        data-[state=checked]:after:border-primary
        data-[state=checked]:after:text-primary-foreground
        `,

        `before:content-['']
        before:opacity-0
        before:size-5
        before:rounded-md
        before:bg-input/15
        before:absolute
        before:top-1/2
        before:left-1/2
        before:-translate-x-1/2
        before:-translate-y-1/2
        before:transition-all
        before:duration-300
        before:ease-in-out
        hover:before:size-8
        hover:before:opacity-100
        `,
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5 z-1" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
