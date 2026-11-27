// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

// Saves uploaded photos (recipe photos and profile pictures).
// On Vercel the disk is wiped, so photos go to Cloudinary when its settings are in the env.
// Running on your own computer without them, photos are saved in the uploads/ folder instead.

import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { MAX_UPLOAD_BYTES } from "@/lib/upload-limits";

export { MAX_RECIPE_PHOTOS, MAX_UPLOAD_BYTES } from "@/lib/upload-limits";

const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export type UploadFolder = "recipes" | "avatars";

// A file input with nothing chosen still sends an empty file
export function hasFile(file: unknown): file is File {
  return file instanceof File && file.size > 0;
}

// The reason a file can't be used, or null if it's fine
export function checkImage(file: {
  type: string;
  size: number;
}): string | null {
  if (!TYPES[file.type]) return "Photos must be JPG, PNG or WebP";
  if (file.size > MAX_UPLOAD_BYTES) return "Photos must be 4 MB or smaller";
  return null;
}

// ---------- Cloudinary ----------

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

export function cloudinaryConfig(): CloudinaryConfig | null {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return null;
  return { cloudName, apiKey, apiSecret };
}

// Cloudinary's signature: the settings sorted by name, joined with &, then the secret, then SHA-1
export function signCloudinary(
  params: Record<string, string | number>,
  apiSecret: string,
): string {
  const text = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1")
    .update(text + apiSecret)
    .digest("hex");
}

async function uploadToCloudinary(
  file: File,
  folder: UploadFolder,
  config: CloudinaryConfig,
): Promise<string> {
  const params = {
    folder: `naija-kitchen/${folder}`,
    timestamp: Math.floor(Date.now() / 1000),
  };
  const body = new FormData();
  body.append("file", file);
  body.append("api_key", config.apiKey);
  body.append("folder", params.folder);
  body.append("timestamp", String(params.timestamp));
  body.append("signature", signCloudinary(params, config.apiSecret));

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    { method: "POST", body },
  );
  if (!response.ok) {
    throw new Error(`Photo upload failed (Cloudinary said ${response.status})`);
  }
  const result = (await response.json()) as { secure_url: string };
  return result.secure_url;
}

// ---------- Local folder (only when running on your own computer) ----------

const UPLOAD_ROOT = path.join(process.cwd(), "uploads");

// Only names we created: folder/uuid.ext
const SAFE_NAME =
  /^(recipes|avatars)\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$/;

async function saveLocally(file: File, folder: UploadFolder): Promise<string> {
  const name = `${randomUUID()}.${TYPES[file.type]}`;
  const dir = path.join(UPLOAD_ROOT, folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${folder}/${name}`;
}

// Saves the photo and returns the address the page uses to show it
export async function saveImage(
  file: File,
  folder: UploadFolder,
): Promise<string> {
  const config = cloudinaryConfig();
  if (config) return uploadToCloudinary(file, folder, config);
  // Vercel wipes its disk, so a photo saved there would vanish
  if (process.env.VERCEL) {
    throw new Error("Photo uploads need the CLOUDINARY_* settings on Vercel");
  }
  return saveLocally(file, folder);
}

export function isSafeUploadName(name: string): boolean {
  return SAFE_NAME.test(name);
}

export function contentTypeFor(name: string): string {
  const ext = name.split(".").pop();
  return (
    Object.entries(TYPES).find(([, value]) => value === ext)?.[0] ??
    "application/octet-stream"
  );
}

// Reads a locally saved photo, or null if the name isn't one of ours or it's gone
export async function readImage(name: string): Promise<Buffer | null> {
  if (!isSafeUploadName(name)) return null;
  try {
    return await readFile(path.join(UPLOAD_ROOT, name));
  } catch {
    return null;
  }
}
