// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  checkImage,
  cloudinaryConfig,
  contentTypeFor,
  hasFile,
  isSafeUploadName,
  saveImage,
  signCloudinary,
} from "./uploads";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("checkImage", () => {
  it("accepts small JPG, PNG and WebP photos only", () => {
    expect(checkImage({ type: "image/png", size: 1000 })).toBeNull();
    expect(checkImage({ type: "image/gif", size: 1000 })).toMatch(/JPG/);
    expect(checkImage({ type: "image/jpeg", size: 5 * 1024 * 1024 })).toMatch(
      /4 MB/,
    );
  });
});

describe("hasFile", () => {
  it("spots an empty file input", () => {
    expect(hasFile(new File([], "empty.jpg"))).toBe(false);
    expect(hasFile(new File(["x"], "photo.jpg"))).toBe(true);
    expect(hasFile("text")).toBe(false);
  });
});

describe("signCloudinary", () => {
  it("matches the example in Cloudinary's docs", () => {
    const params = {
      timestamp: 1315060510,
      public_id: "sample_image",
      eager: "w_400,h_300,c_pad|w_260,h_200,c_crop",
    };
    expect(signCloudinary(params, "abcd")).toBe(
      "bfd09f95f331f558cbd1320e67aa8d488770583e",
    );
  });
});

describe("cloudinaryConfig", () => {
  it("is null until all three settings are there", () => {
    vi.stubEnv("CLOUDINARY_CLOUD_NAME", "demo");
    vi.stubEnv("CLOUDINARY_API_KEY", "");
    expect(cloudinaryConfig()).toBeNull();
    vi.stubEnv("CLOUDINARY_API_KEY", "123");
    vi.stubEnv("CLOUDINARY_API_SECRET", "shh");
    expect(cloudinaryConfig()).toEqual({
      cloudName: "demo",
      apiKey: "123",
      apiSecret: "shh",
    });
  });
});

describe("saveImage", () => {
  const photo = new File(["x"], "jollof.jpg", { type: "image/jpeg" });

  it("uploads to Cloudinary and returns its address", async () => {
    vi.stubEnv("CLOUDINARY_CLOUD_NAME", "demo");
    vi.stubEnv("CLOUDINARY_API_KEY", "123");
    vi.stubEnv("CLOUDINARY_API_SECRET", "shh");
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        Response.json({ secure_url: "https://res.cloudinary.com/demo/a.jpg" }),
      );
    vi.stubGlobal("fetch", fetchMock);

    await expect(saveImage(photo, "recipes")).resolves.toBe(
      "https://res.cloudinary.com/demo/a.jpg",
    );
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.cloudinary.com/v1_1/demo/image/upload");
    const sent = options.body as FormData;
    expect(sent.get("folder")).toBe("naija-kitchen/recipes");
    expect(sent.get("api_key")).toBe("123");
    expect(sent.get("signature")).toMatch(/^[0-9a-f]{40}$/);
    expect(sent.has("api_secret")).toBe(false); // the secret never leaves the server
  });

  it("throws when Cloudinary says no", async () => {
    vi.stubEnv("CLOUDINARY_CLOUD_NAME", "demo");
    vi.stubEnv("CLOUDINARY_API_KEY", "123");
    vi.stubEnv("CLOUDINARY_API_SECRET", "wrong");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("no", { status: 401 })),
    );
    await expect(saveImage(photo, "avatars")).rejects.toThrow(/401/);
  });

  it("refuses to save to disk on Vercel", async () => {
    vi.stubEnv("CLOUDINARY_CLOUD_NAME", "");
    vi.stubEnv("VERCEL", "1");
    await expect(saveImage(photo, "recipes")).rejects.toThrow(/CLOUDINARY/);
  });
});

describe("local photo names", () => {
  it("only serves names we made", () => {
    expect(
      isSafeUploadName("recipes/0f8fad5b-d9cb-469f-a165-70867728950e.jpg"),
    ).toBe(true);
    expect(isSafeUploadName("../.env")).toBe(false);
    expect(isSafeUploadName("recipes/photo.gif")).toBe(false);
  });

  it("sends the right content type", () => {
    expect(contentTypeFor("a.webp")).toBe("image/webp");
    expect(contentTypeFor("a.txt")).toBe("application/octet-stream");
  });
});
