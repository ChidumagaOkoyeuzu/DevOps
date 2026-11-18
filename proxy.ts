// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

// Runs before the pages below load. If there's no login cookie at all, it sends
// the visitor to log in straight away. Pages still check the session properly
// with requireUser(), because a cookie can be old or fake.
import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) return NextResponse.next();

  const logIn = new URL("/log-in", request.url);
  logIn.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(logIn);
}

// Pages that need a login (built in Sprint 2)
export const config = {
  matcher: ["/kitchen/:path*", "/account/:path*", "/recipes/new"],
};
