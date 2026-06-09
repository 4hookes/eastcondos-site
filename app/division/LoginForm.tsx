"use client";

import { useState } from "react";

export default function LoginForm({
  onLogin,
}: {
  /** Returns an error message string on failure, or null on success. */
  onLogin: (password: string) => string | null;
}) {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const pw = String(fd.get("password") ?? "");
        setError(onLogin(pw));
      }}
      className="mx-auto mt-12 sm:mt-16 max-w-[440px] bg-paper border border-charcoal p-8 sm:p-10"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="w-6 h-px bg-amber-deep" />
        <span className="text-[10px] uppercase tracking-[0.28em] text-amber-deep">Team only</span>
        <span className="w-6 h-px bg-amber-deep" />
      </div>
      <h2
        className="font-serif text-charcoal text-center mb-3"
        style={{ fontSize: "clamp(1.7rem, 4vw, 2.2rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
      >
        The Elfi Division
      </h2>
      <p className="font-serif italic text-charcoal text-center text-[15px] sm:text-[16px] text-gray-500 mb-7">
        Type the shared password to enter.
      </p>

      <label className="block text-[11px] uppercase tracking-[0.18em] text-charcoal mb-2">Password</label>
      <input
        type="password"
        name="password"
        required
        autoFocus
        autoComplete="current-password"
        className="w-full border border-charcoal bg-cream px-4 py-3 text-[16px] text-charcoal focus:outline-none focus:border-amber-deep"
      />

      {error && <div className="mt-3 text-[13px] text-red-700">{error}</div>}

      <button
        type="submit"
        className="mt-6 w-full bg-charcoal text-cream py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-charcoal-light transition-colors"
      >
        Enter
      </button>
    </form>
  );
}
