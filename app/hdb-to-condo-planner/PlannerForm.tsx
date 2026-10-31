"use client";

import { useState } from "react";
import { track } from "@/lib/fbq";

// The door lives on the Safety Meter app, which holds the Supabase key. It writes
// the lead and queues the same WhatsApp the Meta planner form gets.
const DOOR =
  process.env.NEXT_PUBLIC_PLANNER_LEAD_URL ||
  "https://safetymeter.eastcondos.sg/api/planner-lead";
const ASK_ON_WHATSAPP =
  "https://wa.me/6588415991?text=" +
  encodeURIComponent("Hi, I'd like the HDB-to-Condo Planner please.");
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "content_id"];

type Done = "queued" | "known" | null;

export default function PlannerForm({ id }: { id: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<Done>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const q = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(UTM_KEYS.filter((k) => q.get(k)).map((k) => [k, q.get(k)]));
    try {
      const res = await fetch(DOOR, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, website, utm, page: window.location.pathname }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      track("Lead", { content_name: "HDB-to-Condo Planner" });
      setDone(data.state === "known" ? "known" : "queued");
    } catch (err) {
      setError(
        err instanceof Error && err.message && err.message !== "Failed to fetch"
          ? err.message
          : "That did not go through. Please try again, or WhatsApp us."
      );
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="bg-cream text-charcoal-deep p-6 sm:p-8" role="status">
        <h2 className="font-sans text-[28px] font-light leading-[1.15] tracking-[-0.02em]">
          {done === "queued" ? "Now check your WhatsApp." : "Let's get it to you on WhatsApp."}
        </h2>
        <p className="mt-3 text-[16px] leading-[1.55]">
          {done === "queued"
            ? "In about a minute you'll get a message from +65 8841 5991. Tap Yes and we'll send your own copy of the planner."
            : "We may already have your number. Send us this one message and we'll sort out your copy."}
        </p>
        <a
          href={ASK_ON_WHATSAPP}
          className="mt-5 inline-flex items-center justify-center bg-charcoal-deep text-cream font-sans text-[16px] font-semibold px-7 py-3.5 transition-colors duration-200 hover:bg-charcoal-light"
        >
          {done === "queued" ? "No message? WhatsApp us" : "WhatsApp us"}
        </a>
      </div>
    );
  }

  const field =
    "w-full bg-charcoal-light text-cream caret-amber text-[18px] px-4 py-3.5 transition-colors duration-200 hover:bg-[#37374f] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-amber";

  return (
    <form onSubmit={submit}>
      <div className="grid sm:grid-cols-2 gap-x-3 gap-y-5">
        <div>
          <label htmlFor={`${id}-name`} className="block text-[16px] text-cream mb-2">
            Your name
          </label>
          <input
            id={`${id}-name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            maxLength={80}
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="block text-[16px] text-cream mb-2">
            Your WhatsApp number
          </label>
          <input
            id={`${id}-phone`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={field}
          />
        </div>
      </div>
      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] opacity-0">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {error && (
        <p role="alert" className="mt-4 text-[16px] text-amber-light">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="w-full mt-4 bg-amber text-charcoal-deep font-sans text-[18px] font-semibold px-7 py-4 transition-[background-color,transform] duration-200 hover:bg-amber-light active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber disabled:opacity-70"
      >
        {busy ? "Sending..." : "Send me the planner"}
      </button>
      <p className="mt-4 text-[14px] leading-[1.5] text-[#CBC8C0]">
        By tapping, you agree that EastCondos can message you on WhatsApp about this planner and
        your home plans.
      </p>
    </form>
  );
}
