import { Box, ScrollArea } from "@radix-ui/themes";
import SideBarLink from "./sideBarLink";

import styles from "./sideBar.module.css";

interface SideBarProps {
  menuItems: {
    label: string;
    href: string;
  }[];
}

export const SideBar = ({ menuItems }: SideBarProps) => {
  return (
    <aside className={styles.sideBar}>
      <ScrollArea
        type="hover"
        scrollbars="vertical"
        className={styles.sideBarScroll}
      >
        <Box px="4" py="4">
          {menuItems.map((item, index) => (
            <Box key={index}>
              <SideBarLink href={item.href} label={item.label} />
            </Box>
          ))}
        </Box>
      </ScrollArea>
    </aside>
  );
};
