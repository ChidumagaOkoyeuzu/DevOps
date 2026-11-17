// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import Image from "next/image";
import Link from "next/link";
import { formatMinutes } from "@/lib/format";
import type { RecipeSummary } from "@/lib/recipes/recipes";

export function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  const time = formatMinutes(recipe.totalMinutes);

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group block overflow-hidden border border-line bg-surface"
    >
      <div className="relative aspect-[4/3] bg-line">
        {recipe.photoUrl && (
          <Image
            src={recipe.photoUrl}
            alt={recipe.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <h2 className="font-heading text-lg font-semibold text-ink-strong group-hover:underline">
          {recipe.title}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {recipe.authorUsername && <>by @{recipe.authorUsername} · </>}
          {recipe.tribeName}
        </p>
        {time && <p className="mt-2 text-sm text-muted">{time}</p>}
      </div>
    </Link>
  );
}