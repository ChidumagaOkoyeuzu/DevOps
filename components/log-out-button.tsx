// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function LogOutButton() {
  const router = useRouter();

  async function logOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh(); // so the header shows the profile icon again
  }

  return (
    <button
      type="button"
      onClick={logOut}
      className="block w-full px-3 py-2 text-left hover:bg-line"
    >
      Log out
    </button>
  );
}
