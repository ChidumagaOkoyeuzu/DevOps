// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

// The one place pages read the logged-in user.
// It reads the request, so only call it inside a <Suspense> boundary.
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export type CurrentUser = {
  id: string;
  firstName: string;
  username: string | null;
  image: string | null;
};

// The logged-in user, or null for guests
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  return {
    id: session.user.id,
    firstName: session.user.name, // Better Auth's name is our firstName
    username: session.user.username ?? null,
    image: session.user.image ?? null,
  };
}

// For pages only logged-in users can see: sends guests to log in first
export async function requireUser(returnTo: string): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect(`/log-in?next=${encodeURIComponent(returnTo)}`);
  return user;
}
