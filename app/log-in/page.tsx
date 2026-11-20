// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import type { Metadata } from "next";
import { Bitter, Lexend } from "next/font/google";
import { Suspense } from "react";
import { LogInForm } from "./log-in-form";

// Bitter bold for the heading; Lexend regular for text (bold on the button)
const bitter = Bitter({ subsets: ["latin"], weight: "700" });
const lexend = Lexend({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = { title: "Log in" };

// The cream background is set here so the page matches the design even when the
// browser is in dark mode. Swap for the theme class once App shell (#51) is in.
export default function LogInPage() {
  return (
    <div
      className={`${lexend.className} min-h-screen bg-[#faf8f3] text-[#1f1f1f] dark:bg-[#121212] dark:text-[#f5f5f5]`}
    >
      <main className="mx-auto w-full max-w-[992px] px-4 py-20">
        <section className="w-full max-w-[352px]">
          <h1 className={`${bitter.className} text-4xl font-bold`}>Log in</h1>
          {/* The form reads ?next= from the address, so it waits inside Suspense */}
          <Suspense>
            <LogInForm />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
