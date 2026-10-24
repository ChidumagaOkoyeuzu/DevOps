// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

// Health check: shows the API is running
export function GET() {
  return Response.json({ status: "ok" });
}
