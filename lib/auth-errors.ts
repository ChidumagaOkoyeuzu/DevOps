// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

// Turns Better Auth's error codes into messages people understand.
// Also used by Login / logout (#17).
export function friendlyMessage(error: { code?: string }): string {
  const code = error.code ?? "";

  if (code === "USERNAME_IS_ALREADY_TAKEN") {
    return "That username is taken. Try another.";
  }
  if (code.startsWith("USER_ALREADY_EXISTS")) {
    return "An account with this email already exists. Log in instead?";
  }
  return "Something went wrong. Please try again.";
}
