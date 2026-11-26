// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)
import type { Metadata } from "next";
import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { formatIngredient, formatMinutes } from "@/lib/format";
import { getRecipeForViewer, getRecipeTabTitle } from "@/lib/recipes/recipes";
import { getCurrentUser } from "@/lib/session";

// The browser tab shows the recipe's name, e.g. "Egusi Soup | Naija Kitchen"
export async function generateMetadata({
  params,
}: PageProps<"/recipes/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: await getRecipeTabTitle(id) };
}

export default function RecipePage({ params }: PageProps<"/recipes/[id]">) {
  return (
    <Suspense fallback={<RecipeSkeleton />}>
      {/* The recipe depends on the address and who's logged in, so it streams in */}
      <Recipe params={params} />
    </Suspense>
  );
}

async function Recipe({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connection();
  const viewer = await getCurrentUser();

  const recipe = await getRecipeForViewer(id, viewer?.id ?? null);

  if (!recipe) notFound();

  const [mainPhoto, ...morePhotos] = recipe.photos;

  const facts = [
    {
      label: "Prep",
      value: formatMinutes(recipe.prepMinutes),
    },
    {
      label: "Cook",
      value: formatMinutes(recipe.cookMinutes),
    },
    {
      label: "Serves",
      value: recipe.servings?.toString() ?? null,
    },
  ].filter((fact) => fact.value);

  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-10">
      {/* Recipe title */}
      <h1 className="font-heading text-5xl text-ink-strong">{recipe.title}</h1>

      {/* Author and tribe */}
      <p className="mt-3 text-muted">
        {recipe.authorUsername && <>by @{recipe.authorUsername} · </>}

        <Link
          href={`/tribes/${recipe.tribeSlug}`}
          className="underline underline-offset-4 hover:text-ink-strong"
        >
          {recipe.tribeName}
        </Link>

        {!recipe.isPublic && <> · Private</>}
      </p>

      {/* Recipe description */}
      {recipe.description && (
        <p className="mt-6 max-w-3xl text-base leading-7 text-muted">
          {recipe.description}
        </p>
      )}

      {/* Recipe facts */}
      {facts.length > 0 && (
        <dl className="mt-6 flex flex-wrap gap-8">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-sm text-muted">{fact.label}</dt>

              <dd className="mt-1 font-semibold text-ink-strong">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {/* Main recipe photo */}
      {mainPhoto && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={mainPhoto.url}
            alt={recipe.title}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Additional recipe photos */}
      {morePhotos.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {morePhotos.map((photo) => (
            <div
              key={photo.url}
              className="relative aspect-video overflow-hidden rounded-lg"
            >
              <Image
                src={photo.url}
                alt=""
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Ingredients and method */}
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr]">
        {/* Ingredients */}
        <section aria-labelledby="ingredients-heading">
          <h2
            id="ingredients-heading"
            className="font-heading text-2xl text-ink-strong"
          >
            Ingredients
          </h2>

          <ul className="mt-5 list-disc space-y-3 pl-5 text-muted">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{formatIngredient(ingredient)}</li>
            ))}
          </ul>
        </section>

        {/* Method */}
        <section aria-labelledby="method-heading">
          <h2
            id="method-heading"
            className="font-heading text-2xl text-ink-strong"
          >
            Method
          </h2>

          <ol className="mt-5 space-y-6">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="font-heading text-3xl text-muted"
                >
                  {index + 1}
                </span>

                <p className="pt-1 leading-7 text-ink-strong">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}

// Loading skeleton
function RecipeSkeleton() {
  return (
    <div
      aria-label="Loading recipe"
      className="mx-auto w-full max-w-5xl animate-pulse px-4 py-10"
    >
      {/* Title placeholder */}
      <div className="h-12 w-3/4 rounded-md bg-gray-200" />

      {/* Subtitle placeholder */}
      <div className="mt-4 h-4 w-1/3 rounded bg-gray-200" />

      {/* Main image placeholder */}
      <div className="mt-8 aspect-video w-full rounded-xl bg-gray-200" />
    </div>
  );
}
