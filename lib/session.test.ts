// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentUser, requireUser } from "./session";

const mocks = vi.hoisted(() => ({
  getSession: vi.fn(),
  redirect: vi.fn(() => {
    throw new Error("NEXT_REDIRECT"); // the real redirect() stops the page the same way
  }),
}));
vi.mock("@/lib/auth", () => ({
  auth: { api: { getSession: mocks.getSession } },
}));
vi.mock("next/headers", () => ({ headers: async () => new Headers() }));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));

const session = {
  user: { id: "u1", name: "Amara", username: "amaracooks", image: null },
};

beforeEach(() => vi.clearAllMocks());

describe("getCurrentUser", () => {
  it("returns null for guests", async () => {
    mocks.getSession.mockResolvedValue(null);
    expect(await getCurrentUser()).toBeNull();
  });

  it("returns the logged-in user", async () => {
    mocks.getSession.mockResolvedValue(session);
    expect(await getCurrentUser()).toEqual({
      id: "u1",
      firstName: "Amara",
      username: "amaracooks",
      image: null,
    });
  });
});

describe("requireUser", () => {
  it("sends guests to log in, then back to the page", async () => {
    mocks.getSession.mockResolvedValue(null);
    await expect(requireUser("/kitchen")).rejects.toThrow("NEXT_REDIRECT");
    expect(mocks.redirect).toHaveBeenCalledWith("/log-in?next=%2Fkitchen");
  });

  it("returns the user when logged in", async () => {
    mocks.getSession.mockResolvedValue(session);
    expect((await requireUser("/kitchen")).id).toBe("u1");
  });
});
