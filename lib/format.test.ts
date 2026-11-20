// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)
import { describe, expect, it } from "vitest";
import { formatMinutes, totalMinutes } from "./format";

describe("totalMinutes", () => {
  it("adds prep and cook time", () => {
    expect(totalMinutes(20, 60)).toBe(80);
  });

  it("works when only one is known", () => {
    expect(totalMinutes(null, 30)).toBe(30);
    expect(totalMinutes(15, null)).toBe(15);
  });

  it("returns null when neither is known", () => {
    expect(totalMinutes(null, null)).toBeNull();
  });
});

describe("formatMinutes", () => {
  it("shows minutes under an hour", () => {
    expect(formatMinutes(45)).toBe("45 mins");
    expect(formatMinutes(1)).toBe("1 min");
  });

  it("shows whole hours", () => {
    expect(formatMinutes(60)).toBe("1 hr");
    expect(formatMinutes(120)).toBe("2 hrs");
  });

  it("shows hours and minutes", () => {
    expect(formatMinutes(90)).toBe("1 hr 30 mins");
    expect(formatMinutes(150)).toBe("2 hrs 30 mins");
  });

  it("returns null for nothing or zero", () => {
    expect(formatMinutes(null)).toBeNull();
    expect(formatMinutes(0)).toBeNull();
  });
});
