// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SignUpForm } from "./sign-up-form";

export const metadata: Metadata = { title: "Sign up" };

export default function SignUpPage() {
  return (
    <main className="mx-auto grid w-full max-w-6xl items-stretch gap-16 px-4 py-12 lg:grid-cols-2">
      {/* Left: the form */}
      <section>
        <h1 className="font-heading text-4xl font-bold">Sign up</h1>
        <SignUpForm />
      </section>

      {/* Right: Premium card, hidden on phones */}
      <aside className="hidden flex-col rounded-[14px] bg-footer p-8 text-white lg:flex">
        <div className="relative min-h-80 flex-1 overflow-hidden rounded-[14px]">
          <Image
            src="/images/premium-dishes.jpg"
            alt="Premium dishes"
            width={1200}
            height={800}
            loading="eager"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full"
          />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-premium">Premium</h2>
        <p className="mt-2 text-sm text-white/90">
          Exclusive recipes and full methods from our community.{" "}
          <Link
            href="/plans"
            className="font-semibold text-white underline underline-offset-2"
          >
            See plans
          </Link>
        </p>
      </aside>
    </main>
  );
}
