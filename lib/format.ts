// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

export function totalMinutes(
  prepMinutes: number | null,
  cookMinutes: number | null,
): number | null {
  if (prepMinutes === null && cookMinutes === null) {
    return null;
  }

  return (prepMinutes ?? 0) + (cookMinutes ?? 0);
}

export function formatMinutes(minutes: number | null): string | null {
  if (minutes === null || minutes <= 0) {
    return null;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${minutes} ${minutes === 1 ? "min" : "mins"}`;
  }

  const hourText = `${hours} ${hours === 1 ? "hr" : "hrs"}`;

  if (remainingMinutes === 0) {
    return hourText;
  }

  return `${hourText} ${remainingMinutes} ${
    remainingMinutes === 1 ? "min" : "mins"
  }`;
}

export type IngredientLine = {
  quantity: number | null;
  unit: string | null;
  name: string;
};

export function formatIngredient({
  quantity,
  unit,
  name,
}: IngredientLine): string {
  const amount = quantity === null ? null : String(Number(quantity));

  return [amount, unit, name].filter(Boolean).join(" ");
}
