// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { contentTypeFor, readImage } from "@/lib/uploads";

// Serves photos people uploaded while running locally (see lib/uploads.ts)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const name = (await params).path.join("/");
  const file = await readImage(name);
  if (!file) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": contentTypeFor(name),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
