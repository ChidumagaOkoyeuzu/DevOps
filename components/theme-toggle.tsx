
// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

"use client";

import { ICON_BUTTON, MoonIcon, SunIcon } from "@/components/icons";
import { nextTheme, THEME_STORAGE_KEY } from "@/lib/theme";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const theme = nextTheme(root.getAttribute("data-theme"));

    root.setAttribute("data-theme", theme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage blocked (e.g. private mode):
      // the theme still changes for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      title="Dark mode"
      className={ICON_BUTTON}
    >
      {/* CSS picks the icon, so it's right before React loads */}
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </button>
  );
}
