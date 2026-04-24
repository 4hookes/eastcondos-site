"use client";

import { useState } from "react";
import type { VerdictResult } from "@/lib/safetyMeter";
import { fmt, fmtPct } from "@/lib/format";
import { PERSONAS } from "../personas";
import styles from "../safety-meter.module.css";

type Props = {
  verdict: VerdictResult;
  buyer1Name: string;
  buyer2Name?: string;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function StrategySection({ verdict, buyer1Name, buyer2Name }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const meta = PERSONAS[verdict.persona];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setErrorMsg("Please enter a valid email.");
      setFormState("error");
      return;
    }
    setFormState("submitting");
    setErrorMsg("");

    // Submission targets (in order):
    //   1. NEXT_PUBLIC_MAILERLITE_FORM_URL — MailerLite's public embedded form endpoint (works with static export)
    //   2. /api/safety-meter-lead — Next.js route (works only in dev / SSR deployments)
    // If neither works, still unlock so the user isn't blocked.
    const mlFormUrl = process.env.NEXT_PUBLIC_MAILERLITE_FORM_URL;
    const payload = { email, name, persona: verdict.persona, score: verdict.score };

    const trySubmit = async () => {
      if (mlFormUrl) {
        // MailerLite public forms accept POST as form-encoded. We send minimal fields.
        const fd = new FormData();
        fd.append("fields[email]", email);
        if (name) fd.append("fields[name]", name);
        fd.append("fields[safety_meter_persona]", verdict.persona);
        fd.append("fields[safety_meter_score]", String(verdict.score));
        // Use no-cors to avoid CORS errors; we can't read the response but submission still lands
        await fetch(mlFormUrl, { method: "POST", body: fd, mode: "no-cors" });
        return true;
      }
      try {
        const res = await fetch("/api/safety-meter-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        return res.ok;
      } catch {
        return false;
      }
    };

    await trySubmit();
    setFormState("success");
    setUnlocked(true);
  };

  return (
    <section className="bg-paper py-14 sm:py-16 border-b border-charcoal">
      <div className="max-w-broadsheet mx-auto px-5 sm:px-10">
        <div className="flex items-center gap-3 mb-2.5">
          <span className="w-6 h-px bg-amber-deep" />
          <span className="text-[10px] tracking-[0.26em] uppercase text-amber-deep">Elfi's Strategy</span>
        </div>
        <h2 className="font-serif text-[24px] sm:text-[32px] text-charcoal leading-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
          Your full report &mdash; <em className="text-amber-deep italic">unlocked</em> with email.
        </h2>
        <p className="font-serif italic text-[16px] sm:text-[17px] text-gray-500 max-w-[52ch] mb-8 leading-snug">
          The breakdown your banker won't give you: exact upfront costs, month-by-month survival math, and the plan Elfi would give you in a meeting room.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start">
          {/* Gate form */}
          {!unlocked ? (
            <form onSubmit={submit} className="bg-cream border border-charcoal p-6 sm:p-7 lg:sticky lg:top-5">
              <div className="inline-flex items-center gap-2 bg-charcoal text-amber px-2.5 py-1.5 text-[9px] tracking-[0.24em] uppercase mb-4">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="10" /><path d="M8 11V7a4 4 0 118 0v4" /></svg>
                Unlock
              </div>
              <h3 className="font-serif text-[22px] text-charcoal mb-4" style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                Elfi's Strategy &middot; for your exact numbers.
              </h3>
              <input
                className={styles.gateInput}
                type="text"
                placeholder="First name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="given-name"
              />
              <input
                className={styles.gateInput}
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full bg-amber text-charcoal px-5 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium border border-amber hover:bg-amber-light transition-colors disabled:opacity-50"
              >
                {formState === "submitting" ? "Sending..." : "Send me my strategy →"}
              </button>
              {formState === "error" && (
                <p className="text-[12px] text-red-700 mt-2">{errorMsg}</p>
              )}
              <p className="font-serif italic text-[12px] text-gray-500 text-center mt-3">
                No spam. Your report + one note from Elfi.
              </p>
            </form>
          ) : (
            <div className="bg-cream border border-charcoal p-6 sm:p-7 lg:sticky lg:top-5">
              <div className="inline-flex items-center gap-2 bg-amber text-charcoal px-2.5 py-1.5 text-[9px] tracking-[0.24em] uppercase mb-4">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                Unlocked
              </div>
              <h3 className="font-serif text-[22px] text-charcoal mb-3" style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                Sent. Check your inbox.
              </h3>
              <p className="text-[14px] text-body leading-relaxed">
                Your full report is below, and a copy is on the way to <strong>{email}</strong>. Elfi reads every lead personally and will follow up within one working day.
              </p>
              <a
                href="https://wa.me/6596667496"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-5 text-center bg-charcoal text-cream px-5 py-3.5 text-[11px] uppercase tracking-[0.22em] hover:bg-amber hover:text-charcoal transition-colors"
              >
                WhatsApp Elfi now →
              </a>
            </div>
          )}

          {/* Breakdown — blurred until unlocked */}
          <div className={unlocked ? "" : styles.lockedFade}>
            <div className="border border-charcoal bg-cream p-5 sm:p-6 mb-3.5">
              <h4 className="font-serif text-[19px] text-charcoal mb-3 flex items-center gap-2.5" style={{ letterSpacing: "-0.02em" }}>
                <span className="text-[12px] text-amber-deep italic tracking-[0.22em]">01</span>
                Upfront costs
              </h4>
              <Row label="5% cash deposit" value={fmt(verdict.cashDeposit5)} />
              <Row label="20% CPF / cash deposit" value={fmt(verdict.cpfDeposit20)} />
              <Row label="Buyer's Stamp Duty" value={fmt(verdict.buyerStampDuty)} />
              <Row label="Legal fees" value={fmt(verdict.legalFees)} />
              <RowTotal label="Total outlay" value={fmt(verdict.totalOutlay)} />
            </div>

            <div className="border border-charcoal bg-cream p-5 sm:p-6 mb-3.5">
              <h4 className="font-serif text-[19px] text-charcoal mb-3 flex items-center gap-2.5" style={{ letterSpacing: "-0.02em" }}>
                <span className="text-[12px] text-amber-deep italic tracking-[0.22em]">02</span>
                Monthly runway
              </h4>
              <Row label="Monthly installment" value={fmt(verdict.monthlyInstallment)} />
              <Row label="Less CPF OA deduction" value={`(${fmt(verdict.cpfMonthlyDeduction)})`} />
              <Row label="Cash top-up required" value={`${fmt(verdict.cashTopUpRequired)}/mo`} />
              <Row
                label="Runway on reserves"
                value={
                  verdict.runwayYears >= 99
                    ? "Unlimited (CPF covers installment)"
                    : `${verdict.runwayYears.toFixed(1)} years`
                }
              />
              <Row label="Your TDSR" value={fmtPct(verdict.tdsr)} />
            </div>

            <div className="border border-charcoal bg-cream p-5 sm:p-6 mb-3.5">
              <h4 className="font-serif text-[19px] text-charcoal mb-3 flex items-center gap-2.5" style={{ letterSpacing: "-0.02em" }}>
                <span className="text-[12px] text-amber-deep italic tracking-[0.22em]">03</span>
                Final position
              </h4>
              <Row label="Final cash after purchase" value={fmt(verdict.finalCash)} />
              <Row label="Final CPF after purchase" value={fmt(verdict.finalCPF)} />
              <Row label="Net cash from HDB sale" value={fmt(verdict.cashProceedsFromHdb)} />
            </div>

            <div className="border border-charcoal bg-cream p-5 sm:p-6">
              <h4 className="font-serif text-[19px] text-charcoal mb-4 flex items-center gap-2.5" style={{ letterSpacing: "-0.02em" }}>
                <span className="text-[12px] text-amber-deep italic tracking-[0.22em]">04</span>
                Elfi's letter {buyer2Name ? `· for ${buyer1Name} & ${buyer2Name}` : buyer1Name ? `· for ${buyer1Name}` : ""}
              </h4>
              <div className="font-serif italic text-[15px] sm:text-[16px] text-body leading-relaxed whitespace-pre-line">
                {verdict.letter}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] py-2 border-b border-dotted border-[#c9bfa3] last:border-b-0 text-[14px] sm:text-[15px]">
      <span className="text-body">{label}</span>
      <span className="text-charcoal font-medium">{value}</span>
    </div>
  );
}

function RowTotal({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] pt-3 mt-1 border-t-2 border-charcoal font-serif text-[18px] sm:text-[20px]" style={{ letterSpacing: "-0.01em" }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
