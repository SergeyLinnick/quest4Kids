"use client";

import { Button, Theme } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import { THEME_MODE } from "../../constants";
import { MoonIcon, SunIcon } from "../../icons";

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const toggleMode = () =>
    setTheme(theme == THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT);

  const icon = theme === THEME_MODE.LIGHT ? <SunIcon /> : <MoonIcon />;

  return (
    <Theme accentColor="violet">
      <Button radius="full" variant="solid" onClick={toggleMode}>
        {icon}
      </Button>
    </Theme>
  );
};
