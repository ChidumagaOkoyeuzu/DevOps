
// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { describe, expect, it } from "vitest";
import { nextTheme, THEME_SCRIPT } from "./theme";

// Runs THEME_SCRIPT with a pretend browser and returns the theme it sets
function runScript(saved: string | null, deviceIsDark: boolean) {
  let theme: string | null = null;
  const fakeWindow = {
    localStorage: { getItem: () => saved },
    matchMedia: () => ({ matches: deviceIsDark }),
    document: {
      documentElement: {
        setAttribute: (_name: string, value: string) => (theme = value),
      },
    },
  };
  new Function("window", "localStorage", "document", THEME_SCRIPT)(
    fakeWindow,
    fakeWindow.localStorage,
    fakeWindow.document,
  );
  return theme;
}

describe("nextTheme", () => {
  it("switches dark to light and light to dark", () => {
    expect(nextTheme("dark")).toBe("light");
    expect(nextTheme("light")).toBe("dark");
  });

  it("treats a missing theme as light", () => {
    expect(nextTheme(null)).toBe("dark");
  });
});

describe("THEME_SCRIPT", () => {
  it("uses the saved theme", () => {
    expect(runScript("dark", false)).toBe("dark");
    expect(runScript("light", true)).toBe("light");
  });

  it("follows the device when nothing is saved", () => {
    expect(runScript(null, true)).toBe("dark");
    expect(runScript(null, false)).toBe("light");
  });
});