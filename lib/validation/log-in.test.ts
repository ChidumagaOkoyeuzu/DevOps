// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { describe, expect, it } from "vitest";
import { isEmail, validateLogIn } from "./log-in";

describe("isEmail", () => {
  it("spots an email", () => {
    expect(isEmail("amara@example.com")).toBe(true);
  });

  it("treats anything else as a username", () => {
    expect(isEmail("amaracooks")).toBe(false);
  });
});

describe("validateLogIn", () => {
  it("accepts an identifier and password", () => {
    expect(validateLogIn({ identifier: "amaracooks", password: "x" })).toEqual(
      {},
    );
  });

  it("needs both fields", () => {
    const errors = validateLogIn({ identifier: "  ", password: "" });
    expect(errors.identifier).toBeDefined();
    expect(errors.password).toBeDefined();
  });
});
