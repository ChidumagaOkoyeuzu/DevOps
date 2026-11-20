// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)
import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { RecipeCard } from "@/components/recipe-card";
import { getPublicRecipes } from "@/lib/recipes/recipes";

export const metadata: Metadata = { title: "Recipes" };

export default function RecipesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="font-heading text-4xl text-ink-strong">Recipes</h1>
      <p className="mt-2 text-muted">
        Dishes from every tribe, shared by home cooks.
      </p>
      {/* The heading shows straight away; the list streams in when the database replies */}
      <Suspense fallback={<RecipeGridSkeleton />}>
        <RecipeGrid />
      </Suspense>
    </main>
  );
}

async function RecipeGrid() {
  await connection(); // read the database on each visit, not at build time
  const recipes = await getPublicRecipes();

  if (recipes.length === 0) {
    return <p className="mt-8">No recipes yet. Check back soon.</p>;
  }

  return (
    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}

function RecipeGridSkeleton() {
  return (
    <ul
      className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Loading recipes"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <li key={index} className="aspect-[4/3] animate-pulse bg-line" />
      ))}
    </ul>
  );
}
