// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)
import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ALLOWED_UNITS, SEED_RECIPES, SEED_TRIBES } from "./seed-data";

const tribeSlugs = SEED_TRIBES.map((tribe) => tribe.slug);

describe("seed data", () => {
  it("has at least two recipes for every tribe", () => {
    for (const slug of tribeSlugs) {
      const count = SEED_RECIPES.filter((r) => r.tribe === slug).length;
      expect(count, slug).toBeGreaterThanOrEqual(2);
    }
  });

  it("only uses tribes that exist", () => {
    for (const recipe of SEED_RECIPES) {
      expect(tribeSlugs, recipe.title).toContain(recipe.tribe);
    }
  });

  it("gives every recipe ingredients, steps and timings", () => {
    for (const recipe of SEED_RECIPES) {
      expect(recipe.ingredients.length, recipe.title).toBeGreaterThanOrEqual(3);
      expect(recipe.steps.length, recipe.title).toBeGreaterThanOrEqual(3);
      expect(recipe.prepMinutes + recipe.cookMinutes).toBeGreaterThan(0);
      expect(recipe.servings).toBeGreaterThan(0);
    }
  });

  it("only uses units the app knows", () => {
    for (const recipe of SEED_RECIPES) {
      for (const { unit } of recipe.ingredients) {
        if (unit !== null) expect(ALLOWED_UNITS).toContain(unit);
      }
    }
  });

  it("has unique titles", () => {
    const titles = SEED_RECIPES.map((r) => r.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("has a photo file for every recipe", () => {
    for (const recipe of SEED_RECIPES) {
      const path = `public/images/recipes/${recipe.photo}`;
      expect(existsSync(path), path).toBe(true);
    }
  });
});
