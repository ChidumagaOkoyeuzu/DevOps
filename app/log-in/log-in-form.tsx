// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { friendlyMessage } from "@/lib/auth-errors";
import { safeNextPath } from "@/lib/redirects";
import {
  isEmail,
  validateLogIn,
  type LogInErrors,
} from "@/lib/validation/log-in";

// Green links from the Figma frame (swap for the exact hex or theme class)
const LINK = "text-[#0a7a3b] underline underline-offset-2";

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  autoComplete: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

// One input with its label inside the box (it shrinks up when you type).
// It's still a real <label>, and the error stays linked for screen readers.
function Field({
  id,
  label,
  type = "text",
  autoComplete,
  value,
  error,
  onChange,
}: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="peer h-[46px] w-full rounded-sm border border-[#8d8674] bg-transparent px-3 pt-4 text-[13px] placeholder-transparent"
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-neutral-600 transition-all peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]"
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} className="text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function LogInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<LogInErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the page reloading
    setFormError(null);

    const fieldErrors = validateLogIn({ identifier, password });
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return; // show errors, don't send

    setSubmitting(true);
    const value = identifier.trim();
    // Log in with whichever the person typed: email or username
    const { error } = isEmail(value)
      ? await authClient.signIn.email({ email: value, password, rememberMe })
      : await authClient.signIn.username({
          username: value,
          password,
          rememberMe,
        });
    setSubmitting(false);

    if (error) {
      setFormError(friendlyMessage(error));
      return;
    }
    router.push(safeNextPath(searchParams.get("next")));
    router.refresh(); // so the header shows the account menu
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-8 flex flex-col gap-6"
    >
      {formError && (
        <p
          role="alert"
          className="border border-red-700 bg-red-50 p-3 text-[13px] text-red-800"
        >
          {formError}
        </p>
      )}

      <Field
        id="identifier"
        label="Email or username"
        autoComplete="username"
        value={identifier}
        error={errors.identifier}
        onChange={setIdentifier}
      />
      <Field
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        error={errors.password}
        onChange={setPassword}
      />

      <label className="flex items-center gap-3 text-[13px]">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="size-5 accent-[#232323]"
        />
        Keep me signed in
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="h-10 rounded-sm bg-primary text-[13px] font-bold text-on-primary disabled:opacity-60"
      >
        {submitting ? "Logging in…" : "Log in"}
      </button>

      <p className="text-[13px]">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className={`ml-1 ${LINK}`}>
          Sign up
        </Link>
      </p>
    </form>
  );
}
