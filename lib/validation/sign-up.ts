// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

export type SignUpInput = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpErrors = Partial<Record<keyof SignUpInput, string>>;

const USERNAME_PATTERN = /^[a-zA-Z0-9_.]{3,30}$/; // 3–30 letters, numbers, _ or .
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // text@text.text, no spaces

// Returns an object with one message per field that's wrong; {} means all fine
export function validateSignUp(input: SignUpInput): SignUpErrors {
  const errors: SignUpErrors = {};

  if (!input.firstName.trim()) errors.firstName = "Enter your first name";
  if (!input.lastName.trim()) errors.lastName = "Enter your last name";

  if (!USERNAME_PATTERN.test(input.username)) {
    errors.username = "3–30 characters: letters, numbers, _ or .";
  }

  if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  const hasLetter = /[a-zA-Z]/.test(input.password);
  const hasNumber = /[0-9]/.test(input.password);
  if (input.password.length < 8 || !hasLetter || !hasNumber) {
    errors.password = "At least 8 characters, with a letter and a number";
  }

  if (input.confirmPassword !== input.password) {
    errors.confirmPassword = "Passwords don't match";
  }

  return errors;
}
