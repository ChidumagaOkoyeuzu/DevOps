// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Sends every /api/auth/* request (sign up, log in, log out…) to Better Auth
export const { GET, POST } = toNextJsHandler(auth);
