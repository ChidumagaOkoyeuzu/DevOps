// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { beforeEach, describe, expect, it, vi } from "vitest";

// Fake database
const db = vi.hoisted(() => ({
  recipe: { findMany: vi.fn() },
}));

// Mock Prisma BEFORE importing recipes
vi.mock("../prisma", () => ({
  prisma: db,
}));

import { getPublicRecipes, toSummary } from "./recipes";

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

  it("handles no photo", () => {
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
