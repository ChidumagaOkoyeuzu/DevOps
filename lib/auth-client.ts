// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";

// Used in the browser to call sign up, log in and log out
export const authClient = createAuthClient({
  plugins: [
    usernameClient({ displayUsername: false }),
    inferAdditionalFields<typeof auth>(), // tells TypeScript about lastName
  ],
});
