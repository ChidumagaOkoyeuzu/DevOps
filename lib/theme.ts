// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

// Runs in <head> before the page paints, so there's no flash of the wrong theme.
// Uses the saved choice, or the device setting if nothing is saved yet.
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

// The theme to switch to when the toggle is pressed
export function nextTheme(current: string | null | undefined): Theme {
  return current === "dark" ? "light" : "dark";
}
