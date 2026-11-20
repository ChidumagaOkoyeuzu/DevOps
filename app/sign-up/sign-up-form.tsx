// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { friendlyMessage } from "@/lib/auth-errors";
import {
  validateSignUp,
  type SignUpErrors,
  type SignUpInput,
} from "@/lib/validation/sign-up";

const EMPTY: SignUpInput = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type FieldProps = {
  name: keyof SignUpInput;
  label: string;
  type?: string;
  autoComplete: string;
  hint?: string;
  value: string;
  error?: string;
  onChange: (name: keyof SignUpInput, value: string) => void;
};

// One labelled input, with its hint and error message linked for screen readers
function Field({
  name,
  label,
  type = "text",
  autoComplete,
  hint,
  value,
  error,
  onChange,
}: FieldProps) {
  const hintId = `${name}-hint`;
  const errorId = `${name}-error`;
  const describedBy =
    [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[15px] font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="h-14 rounded border border-field bg-surface px-4 text-[15px]"
      />
      {hint && (
        <p id={hintId} className="text-[13px] text-neutral-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const [values, setValues] = useState<SignUpInput>(EMPTY);
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Update one field and keep the rest
  function update(name: keyof SignUpInput, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the page reloading
    setFormError(null);

    const fieldErrors = validateSignUp(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return; // show errors, don't send

    setSubmitting(true);
    const { error } = await authClient.signUp.email({
      name: values.firstName, // stored in firstName
      lastName: values.lastName,
      username: values.username,
      email: values.email.trim(),
      password: values.password,
    });
    setSubmitting(false);

    if (error) {
      setFormError(friendlyMessage(error));
      return;
    }
    router.push("/"); // signed up and logged in
    router.refresh(); // so the header shows the account menu
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-10 flex flex-col gap-5"
    >
      {formError && (
        <p
          role="alert"
          className="border border-red-700 bg-red-50 p-3 text-sm text-red-800"
        >
          {formError}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="firstName"
          label="First name"
          autoComplete="given-name"
          value={values.firstName}
          error={errors.firstName}
          onChange={update}
        />
        <Field
          name="lastName"
          label="Last name"
          autoComplete="family-name"
          value={values.lastName}
          error={errors.lastName}
          onChange={update}
        />
      </div>
      <Field
        name="username"
        label="Username"
        autoComplete="username"
        hint="Shown on your recipes and comments."
        value={values.username}
        error={errors.username}
        onChange={update}
      />
      <Field
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={values.email}
        error={errors.email}
        onChange={update}
      />
      <Field
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        hint="At least 8 characters, with a letter and a number."
        value={values.password}
        error={errors.password}
        onChange={update}
      />
      <Field
        name="confirmPassword"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        value={values.confirmPassword}
        error={errors.confirmPassword}
        onChange={update}
      />

 

  <button
        type="submit"
        disabled={submitting}
        className="h-15 rounded-sm bg-[#232323] text-[13px] font-bold text-white disabled:opacity-60"
      >
        Create account
      </button>

      <p className="text-[15px]">
        Already have an account?{" "}
        <Link
          href="/log-in"
          className="font-semibold underline underline-offset-2"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
