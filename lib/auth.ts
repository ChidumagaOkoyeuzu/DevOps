// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  // Sign up and log in with email (or username) and password
  emailAndPassword: { enabled: true, minPasswordLength: 8 },

  user: {
    // Better Auth's "name" is stored in our firstName column (see PR #50)
    fields: { name: "firstName" },
    additionalFields: {
      lastName: { type: "string", required: true },
    },
  },

  plugins: [
    // Unique, lowercase usernames; we don't keep the original capitals
    username({
      minUsernameLength: 3,
      maxUsernameLength: 30,
      displayUsername: false,
    }),
    nextCookies(), // must stay last: lets server code set the login cookie
  ],
});
