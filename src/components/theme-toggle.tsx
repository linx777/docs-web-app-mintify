"use client";

import * as React from "react";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const label =
    theme === "system"
      ? `System (${resolvedTheme === "dark" ? "Dark" : "Light"})`
      : theme === "dark"
        ? "Dark"
        : "Light";

  return (
    <button
      type="button"
      className={cn(
        "rounded-md border border-border bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-secondary hover:text-foreground transition-colors dark:bg-muted/20 dark:text-gray-200",
      )}
      onClick={() => setTheme(nextTheme)}
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      {label}
    </button>
  );
}
