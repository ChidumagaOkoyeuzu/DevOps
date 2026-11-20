// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import Link from "next/link";
import { Suspense } from "react";
import { AccountMenu, LogInLink } from "@/components/account-menu";
import { ICON_BUTTON, PlusIcon, SearchIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "/plans", label: "Our Plans" },
  { href: "/about", label: "About Us" },
  { href: "/recipes", label: "Recipes" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-page">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 md:gap-x-10">
        <Link
          href="/"
          className="font-heading text-2xl text-ink-strong"
          aria-label="Naija Kitchen home"
        >
          <span className="font-bold text-brand">naija</span>KITCHEN
        </Link>

        {/* On phones the links drop to a second row */}
        <nav
          aria-label="Main"
          className="order-last w-full md:order-none md:w-auto"
        >
          <ul className="flex gap-6 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/recipes"
            aria-label="Search recipes"
            className={ICON_BUTTON}
          >
            <SearchIcon />
          </Link>
          <ThemeToggle />
          <Link
            href="/recipes/new"
            aria-label="Create recipe"
            title="Create recipe"
            className={ICON_BUTTON}
          >
            <PlusIcon />
          </Link>
          {/* Shows the profile icon first, then the account menu if logged in */}
          <Suspense fallback={<LogInLink />}>
            <AccountMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
