// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

// Recipe queries. Pages import these instead of calling Prisma directly,
// so the rules (like "only public recipes") live in one place.

import { prisma } from "@/lib/prisma";
import { totalMinutes, type IngredientLine } from "@/lib/format";

// What a recipe card needs
export type RecipeSummary = {
  id: string;
  title: string;
  tribeName: string;
  tribeSlug: string;
  authorUsername: string | null;
  photoUrl: string | null;
  totalMinutes: number | null;
};

type SummaryRow = {
  id: string;
  title: string;
  prepMinutes: number | null;
  cookMinutes: number | null;
  tribe: { name: string; slug: string };
  author: { username: string | null };
  photos: { url: string }[];
};

// Turns a database row into card data
export function toSummary(row: SummaryRow): RecipeSummary {
  return {
    id: row.id,
    title: row.title,
    tribeName: row.tribe.name,
    tribeSlug: row.tribe.slug,
    authorUsername: row.author.username,
    photoUrl: row.photos[0]?.url ?? null,
    totalMinutes: totalMinutes(row.prepMinutes, row.cookMinutes),
  };
}

// Every public recipe, newest first
export async function getPublicRecipes(): Promise<RecipeSummary[]> {
  const rows = await prisma.recipe.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      prepMinutes: true,
      cookMinutes: true,
      tribe: { select: { name: true, slug: true } },
      author: { select: { username: true } },
      photos: {
        orderBy: { position: "asc" },
        take: 1,
        select: { url: true },
      },
    },
  });

  return rows.map(toSummary);
}

// Everything the recipe page shows
export type RecipeDetail = {
  id: string;
  title: string;
  description: string | null;
  isPublic: boolean;
  prepMinutes: number | null;
  cookMinutes: number | null;
  servings: number | null;
  tribeName: string;
  tribeSlug: string;
  authorUsername: string | null;
  photos: { url: string }[];
  ingredients: IngredientLine[];
  steps: string[];
};

// Public recipes are for everyone; private ones only for the person who wrote them
export function canView(
  recipe: { isPublic: boolean; authorId: string },
  viewerId: string | null,
): boolean {
  return recipe.isPublic || recipe.authorId === viewerId;
}

// One recipe, or null if it doesn't exist or this viewer isn't allowed to see it
export async function getRecipeForViewer(
  id: string,
  viewerId: string | null,
): Promise<RecipeDetail | null> {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      tribe: { select: { name: true, slug: true } },
      author: { select: { username: true } },
      photos: {
        orderBy: { position: "asc" },
        select: { url: true },
      },
      ingredients: {
        orderBy: { position: "asc" },
      },
      steps: {
        orderBy: { position: "asc" },
      },
    },
  });

  // Return the same result for missing and inaccessible recipes
  if (!recipe || !canView(recipe, viewerId)) {
    return null;
  }

  return {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    isPublic: recipe.isPublic,
    prepMinutes: recipe.prepMinutes,
    cookMinutes: recipe.cookMinutes,
    servings: recipe.servings,
    tribeName: recipe.tribe.name,
    tribeSlug: recipe.tribe.slug,
    authorUsername: recipe.author.username,
    photos: recipe.photos,

    // Convert Prisma Decimal quantities into regular JavaScript numbers
    ingredients: recipe.ingredients.map((ingredient) => ({
      quantity:
        ingredient.quantity === null ? null : Number(ingredient.quantity),
      unit: ingredient.unit,
      name: ingredient.name,
    })),

    // Return only the instruction text
    steps: recipe.steps.map((step) => step.instruction),
  };
}
