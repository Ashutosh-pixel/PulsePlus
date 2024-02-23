// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Switch
        defaultSelected
        size="lg"
        color="default"
        thumbIcon={({ isSelected, className }) => {
          if (isSelected) {
            setTheme("dark");
            return <SunIcon className={className} />;
          } else {
            setTheme("light");
            return <MoonIcon className={className} />;
          }
        }}
      ></Switch>
    </div>
  );
}
