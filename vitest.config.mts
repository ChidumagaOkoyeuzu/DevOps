// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**", "app/generated/**"],
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      include: ["lib/**/*.ts", "prisma/**/*.ts"],
      exclude: [
        "**/*.test.ts",
        "lib/prisma.ts",
        "lib/auth.ts",
        "lib/auth-client.ts",
        "prisma/seed.ts",
      ],
      reporter: ["text", "html", "json-summary"],
      thresholds: { lines: 70, functions: 70, branches: 70, statements: 70 },
    },
  },
});
