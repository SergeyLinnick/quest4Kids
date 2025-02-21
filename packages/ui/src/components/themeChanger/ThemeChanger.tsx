"use client";

import { THEME_MODE } from "@/constants/common";
import { MoonIcon, SunIcon } from "@/icons";
import { Button } from "@radix-ui/themes";
import { useTheme } from "next-themes";

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const toggleMode = () =>
    setTheme(theme == THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT);

  const icon = theme === THEME_MODE.LIGHT ? <SunIcon /> : <MoonIcon />;

  return (
    <div>
      <Button radius="full" variant="soft" onClick={toggleMode}>
        {icon}
      </Button>
    </div>
  );
};
