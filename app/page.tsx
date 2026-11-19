// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16">
      <h1 className="font-heading text-5xl text-ink-strong">
        Recipe inspiration
      </h1>

      <p className="mt-4 max-w-xl text-lg text-muted">
        From classics to modern twists: whether it&apos;s your first time in the
        kitchen or you&apos;re an OG, we&apos;ve got just the recipe for you.
      </p>

      <Link
        href="/recipes"
        className="mt-8 inline-flex h-14 items-center bg-primary px-8 font-semibold text-on-primary"
      >
        Browse recipes
      </Link>
    </main>
  );
}
