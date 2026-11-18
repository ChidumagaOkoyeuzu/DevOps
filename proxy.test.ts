// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { config, proxy } from "./proxy";

describe("proxy", () => {
  it("sends guests to log in, remembering where they were going", () => {
    const response = proxy(new NextRequest("http://localhost:3000/kitchen"));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/log-in?next=%2Fkitchen",
    );
  });

  it("lets people with a login cookie through", () => {
    const request = new NextRequest("http://localhost:3000/kitchen", {
      headers: { cookie: "better-auth.session_token=abc123" },
    });
    const response = proxy(request);
    expect(response.headers.get("location")).toBeNull();
  });

  it("only guards the logged-in pages", () => {
    expect(config.matcher).toEqual([
      "/kitchen/:path*",
      "/account/:path*",
      "/recipes/new",
    ]);
  });
});
