// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import type { Metadata } from "next";
import { Suspense } from "react";
import { LogInForm } from "./log-in-form";

export const metadata: Metadata = { title: "Log in" };

export default function LogInPage() {
  return (
    <main className="mx-auto w-full max-w-[992px] px-4 py-20">
      <section className="w-full max-w-[352px]">
        <h1 className="font-heading text-4xl font-bold">Log in</h1>
        {/* The form reads ?next= from the address, so it waits inside Suspense */}
        <Suspense>
          <LogInForm />
        </Suspense>
      </section>
    </main>
  );
}
