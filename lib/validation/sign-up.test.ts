// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { describe, expect, it } from "vitest";
import { validateSignUp } from "./sign-up";

const valid = {
  firstName: "Amara",
  lastName: "Okafor",
  username: "amaracooks",
  email: "amara@example.com",
  password: "Jollof2026",
  confirmPassword: "Jollof2026",
};

describe("validateSignUp", () => {
  it("accepts valid input", () => {
    expect(validateSignUp(valid)).toEqual({});
  });

  it("requires first and last name", () => {
    const errors = validateSignUp({ ...valid, firstName: " ", lastName: "" });
    expect(errors.firstName).toBeDefined();
    expect(errors.lastName).toBeDefined();
  });

  it("rejects usernames that are too short, too long or have spaces", () => {
    expect(validateSignUp({ ...valid, username: "ab" }).username).toBeDefined();
    expect(
      validateSignUp({ ...valid, username: "a".repeat(31) }).username,
    ).toBeDefined();
    expect(
      validateSignUp({ ...valid, username: "amara cooks" }).username,
    ).toBeDefined();
  });

  it("rejects an invalid email", () => {
    expect(
      validateSignUp({ ...valid, email: "amara.example.com" }).email,
    ).toBeDefined();
  });

  it("needs 8+ characters with a letter and a number", () => {
    expect(
      validateSignUp({
        ...valid,
        password: "short1",
        confirmPassword: "short1",
      }).password,
    ).toBeDefined();
    expect(
      validateSignUp({
        ...valid,
        password: "lettersonly",
        confirmPassword: "lettersonly",
      }).password,
    ).toBeDefined();
  });

  it("rejects passwords that don't match", () => {
    expect(
      validateSignUp({ ...valid, confirmPassword: "Different1" })
        .confirmPassword,
    ).toBeDefined();
  });
});
