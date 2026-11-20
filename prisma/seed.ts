// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)
import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { SEED_AUTHOR, SEED_RECIPES, SEED_TRIBES } from "./seed-data";

async function main() {
  for (const tribe of SEED_TRIBES) {
    await prisma.tribe.upsert({
      where: { slug: tribe.slug },
      update: { name: tribe.name, description: tribe.description },
      create: tribe,
    });
  }

  await prisma.user.upsert({
    where: { id: SEED_AUTHOR.id },
    update: {},
    create: SEED_AUTHOR,
  });

  await prisma.recipe.deleteMany({ where: { authorId: SEED_AUTHOR.id } });

  for (const recipe of SEED_RECIPES) {
    await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        prepMinutes: recipe.prepMinutes,
        cookMinutes: recipe.cookMinutes,
        servings: recipe.servings,
        isPublic: true,
        author: { connect: { id: SEED_AUTHOR.id } },
        tribe: { connect: { slug: recipe.tribe } },
        photos: {
          create: [{ url: `/images/recipes/${recipe.photo}`, position: 0 }],
        },
        ingredients: {
          create: recipe.ingredients.map((ingredient, position) => ({
            position,
            ...ingredient,
          })),
        },
        steps: {
          create: recipe.steps.map((instruction, position) => ({
            position,
            instruction,
          })),
        },
      },
    });
  }

  console.log(
    `Seeded ${SEED_TRIBES.length} tribes and ${SEED_RECIPES.length} recipes`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
