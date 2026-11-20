// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import type { Metadata } from "next";
import { Bitter, Lexend } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

// Body text
const lexend = Lexend({ variable: "--font-lexend", subsets: ["latin"] });
// Headings
const bitter = Bitter({ variable: "--font-bitter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Naija Kitchen", template: "%s | Naija Kitchen" },
  description:
    "Recipes for Nigerian dishes from every tribe, shared by home cooks.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning // the theme script changes data-theme before React loads
      className={`${lexend.variable} ${bitter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col bg-page font-sans text-ink">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
