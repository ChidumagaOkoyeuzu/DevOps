import { prisma } from "../prisma";
import { totalMinutes } from "../format";

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
  author: { name: string | null };
  photos: { url: string }[];
};

// Turns a database row into card data
export function toSummary(row: SummaryRow): RecipeSummary {
  return {
    id: row.id,
    title: row.title,
    tribeName: row.tribe.name,
    tribeSlug: row.tribe.slug,
    authorUsername: row.author.name,
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
      author: { select: { name: true } },
      photos: { orderBy: { position: "asc" }, take: 1, select: { url: true } },
    },
  });
  return rows.map(toSummary);
}
