// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { describe, expect, it } from "vitest";
import { friendlyMessage } from "./auth-errors";

describe("friendlyMessage", () => {
  it("explains a taken username", () => {
    expect(friendlyMessage({ code: "USERNAME_IS_ALREADY_TAKEN" })).toMatch(
      /username is taken/,
    );
  });

  it("explains an email that's already used", () => {
    expect(
      friendlyMessage({ code: "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL" }),
    ).toMatch(/already exists/);
  });

  it("falls back to a general message", () => {
    expect(friendlyMessage({ code: "SOMETHING_NEW" })).toMatch(/went wrong/);
    expect(friendlyMessage({})).toMatch(/went wrong/);
  });
});