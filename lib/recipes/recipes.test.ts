// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  canView,
  getPublicRecipes,
  getRecipeForViewer,
  toSummary,
} from "./recipes";

// A pretend database, so these tests never touch a real one
const db = vi.hoisted(() => ({
  recipe: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
}));

vi.mock("@/lib/prisma", () => ({ prisma: db }));

const row = {
  id: "r1",
  title: "Suya",
  prepMinutes: 80,
  cookMinutes: 10,
  tribe: { name: "Hausa", slug: "hausa" },
  author: { username: "naijakitchen" },
  photos: [{ url: "/images/recipes/suya.jpg" }],
};

beforeEach(() => vi.clearAllMocks());

describe("toSummary", () => {
  it("turns a database row into card data", () => {
    expect(toSummary(row)).toEqual({
      id: "r1",
      title: "Suya",
      tribeName: "Hausa",
      tribeSlug: "hausa",
      authorUsername: "naijakitchen",
      photoUrl: "/images/recipes/suya.jpg",
      totalMinutes: 90,
    });
  });

  it("copes with no photo", () => {
    expect(toSummary({ ...row, photos: [] }).photoUrl).toBeNull();
  });
});

describe("getPublicRecipes", () => {
  it("only asks for public recipes, newest first", async () => {
    db.recipe.findMany.mockResolvedValue([row]);

    const recipes = await getPublicRecipes();

    const query = db.recipe.findMany.mock.calls[0][0];

    expect(query.where).toEqual({ isPublic: true });
    expect(query.orderBy).toEqual({ createdAt: "desc" });
    expect(recipes).toEqual([toSummary(row)]);
  });
});

describe("canView", () => {
  const publicRecipe = { isPublic: true, authorId: "amara" };
  const privateRecipe = { isPublic: false, authorId: "amara" };

  it("shows public recipes to everyone", () => {
    expect(canView(publicRecipe, null)).toBe(true);
    expect(canView(publicRecipe, "someone-else")).toBe(true);
  });

  it("shows private recipes only to their author", () => {
    expect(canView(privateRecipe, "amara")).toBe(true);
    expect(canView(privateRecipe, "someone-else")).toBe(false);
    expect(canView(privateRecipe, null)).toBe(false);
  });
});

describe("getRecipeForViewer", () => {
  const recipe = {
    id: "r1",
    title: "Masa",
    description: "Rice cakes",
    isPublic: false,
    authorId: "amara",
    prepMinutes: 90,
    cookMinutes: 20,
    servings: 4,
    tribe: { name: "Hausa", slug: "hausa" },
    author: { username: "amaracooks" },
    photos: [{ url: "/images/recipes/masa.jpg" }],
    ingredients: [
      { quantity: "0.5", unit: "tsp", name: "salt" },
      { quantity: null, unit: null, name: "oil, for frying" },
    ],
    steps: [{ instruction: "Soak the rice" }, { instruction: "Blend it" }],
  };

  it("returns null when the recipe doesn't exist", async () => {
    db.recipe.findUnique.mockResolvedValue(null);

    expect(await getRecipeForViewer("missing", null)).toBeNull();
  });

  it("hides a private recipe from other people", async () => {
    db.recipe.findUnique.mockResolvedValue(recipe);

    expect(await getRecipeForViewer("r1", null)).toBeNull();
    expect(await getRecipeForViewer("r1", "someone-else")).toBeNull();
  });

  it("shows a private recipe to its author, ready for the page", async () => {
    db.recipe.findUnique.mockResolvedValue(recipe);

    const result = await getRecipeForViewer("r1", "amara");

    expect(result?.title).toBe("Masa");

    expect(result?.ingredients).toEqual([
      { quantity: 0.5, unit: "tsp", name: "salt" },
      { quantity: null, unit: null, name: "oil, for frying" },
    ]);

    expect(result?.steps).toEqual(["Soak the rice", "Blend it"]);
  });
});
