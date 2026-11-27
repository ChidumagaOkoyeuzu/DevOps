// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import Link from "next/link";
import { AppBadges } from "@/components/app-badges";

const COLUMNS = [
  {
    title: "Naija Kitchen",
    links: [
      { href: "/recipes", label: "Recipes" },
      { href: "/sustainability", label: "Sustainability" },
    ],
  },
  {
    title: "Your kitchen",
    links: [
      { href: "/kitchen", label: "Dashboard" },
      { href: "/kitchen/saved", label: "Saved recipes" },
      { href: "/kitchen/recipes", label: "Your recipes" },
      { href: "/recipes/new", label: "Create a recipe" },
    ],
  },
  {
    title: "Tribes",
    links: [
      { href: "/tribes/yoruba", label: "Yoruba" },
      { href: "/tribes/igbo", label: "Igbo" },
      { href: "/tribes/hausa", label: "Hausa" },
      { href: "/tribes/efik-ibibio", label: "Efik & Ibibio" },
    ],
  },
  {
    title: "Help centre",
    links: [
      { href: "/account", label: "Account settings" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-footer text-white">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-5">
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h2 className="font-sans text-sm font-semibold">{column.title}</h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="underline underline-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-2 md:col-span-1">
          <h2 className="font-sans text-sm font-semibold">Download our app</h2>
          <p className="mt-4 text-sm text-white/80">
            Your favourite recipes, anywhere, anytime.
          </p>
          <AppBadges className="mt-4" />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-6 border-t border-white/15 px-4 py-6 text-sm">
        <span className="font-semibold">© Naija Kitchen 2026</span>

        <Link href="/terms" className="underline underline-offset-2">
          Terms and Conditions
        </Link>

        <Link href="/privacy" className="underline underline-offset-2">
          Privacy
        </Link>

        <Link href="/accessibility" className="underline underline-offset-2">
          Accessibility
        </Link>
      </div>
    </footer>
  );
}
