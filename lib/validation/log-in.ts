// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

export type LogInInput = { identifier: string; password: string };
export type LogInErrors = Partial<Record<keyof LogInInput, string>>;

// Anything with an @ is treated as an email; everything else as a username
export function isEmail(identifier: string): boolean {
  return identifier.includes("@");
}

export function validateLogIn(input: LogInInput): LogInErrors {
  const errors: LogInErrors = {};
  if (!input.identifier.trim()) {
    errors.identifier = "Enter your email or username";
  }
  if (!input.password) errors.password = "Enter your password";
  return errors;
}
