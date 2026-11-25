// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import Link from "next/link";
import { ICON_BUTTON, UserIcon } from "@/components/icons";
import { LogOutButton } from "@/components/log-out-button";
import { getCurrentUser } from "@/lib/session";

// The profile icon for guests
export function LogInLink() {
  return (
    <Link
      href="/log-in"
      aria-label="Log in or sign up"
      title="Log in or sign up"
      className={ICON_BUTTON}
    >
      <UserIcon />
    </Link>
  );
}

// Guests see the profile icon; logged-in users see their initial and a menu.
// Reads the session, so the header wraps it in <Suspense>.
export async function AccountMenu() {
  const user = await getCurrentUser();
  if (!user) return <LogInLink />;

  return (
    <details className="relative">
      <summary
        aria-label="Account menu"
        className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full bg-line font-semibold text-ink-strong"
      >
        {user.firstName.charAt(0).toUpperCase()}
      </summary>
      <div className="absolute right-0 z-10 mt-2 w-52 border border-line bg-surface p-2 shadow-lg">
        <p className="px-3 py-2 text-sm text-muted">
          {user.username ? `@${user.username}` : user.firstName}
        </p>
        <Link href="/kitchen" className="block px-3 py-2 hover:bg-line">
          My kitchen
        </Link>
        <Link href="/account" className="block px-3 py-2 hover:bg-line">
          Edit profile
        </Link>
        <LogOutButton />
      </div>
    </details>
  );
}
