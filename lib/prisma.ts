import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Connect through Neon's pooler (safe for many requests on Vercel)
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL_POOLED!,
});

// Reuse one client during local dev, so hot reloads don't open extra connections
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
