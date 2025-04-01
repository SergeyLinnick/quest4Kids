import { ThemeChanger } from "@repo/ui";
import Image from "next/image";
import { CustomLink } from "../../customLink/CustomLink";

export const Header = ({
  children,
  isOutside,
}: {
  children: React.ReactNode;
  isOutside?: boolean;
}) => {
  return (
    <header className="bg-header text-header-foreground sticky top-0 z-2 dark:border-b dark:border-b-violet-11">
      <div className="flex justify-between items-center h-full px-4 py-1.5">
        <CustomLink
          href="/"
          isOutside={isOutside}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.svg"
            alt="Quest4Kids"
            width={162}
            height={50}
            priority
          />
        </CustomLink>
        <div className="flex gap-4 items-center">
          {children}
          <ThemeChanger />
        </div>
      </div>
    </header>
  );
};
