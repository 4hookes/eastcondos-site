"use client";

import { useState, useMemo } from "react";
import styles from "./discovery.module.css";

const WHATSAPP_NUMBER = "6596667496";

type GoalKey =
  | ""
  | "hdb-to-private"
  | "second-property"
  | "private-to-private"
  | "investment"
  | "hdb-to-hdb"
  | "first-hdb-bto"
  | "exploring";

type IncomeKey = "" | "under-8k" | "8-10k" | "10-15k" | "15-25k" | "25k-plus";

type TimelineKey = "" | "now" | "3-6mo" | "6-12mo" | "12mo-plus" | "researching";

const GOAL_LABELS: Record<GoalKey, string> = {
  "": "Select your situation",
  "hdb-to-private": "Upgrading from HDB to private property",
  "second-property": "Buying a 2nd property (alongside existing)",
  "private-to-private": "Selling private property to buy another private",
  "investment": "Pure investment property",
  "hdb-to-hdb": "Selling HDB to buy another HDB",
  "first-hdb-bto": "First-time HDB or BTO purchase",
  "exploring": "Just exploring — no firm plan yet",
};

const INCOME_LABELS: Record<IncomeKey, string> = {
  "": "Select income range",
  "under-8k": "Below S$8,000 / month",
  "8-10k": "S$8,000 – S$10,000 / month",
  "10-15k": "S$10,000 – S$15,000 / month",
  "15-25k": "S$15,000 – S$25,000 / month",
  "25k-plus": "Above S$25,000 / month",
};

const TIMELINE_LABELS: Record<TimelineKey, string> = {
  "": "Select timeline",
  "now": "Buying within 3 months",
  "3-6mo": "3 – 6 months",
  "6-12mo": "6 – 12 months",
  "12mo-plus": "More than 12 months",
  "researching": "Just researching for now",
};

export default function DiscoveryPage() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [income, setIncome] = useState<IncomeKey>("");
  const [goal, setGoal] = useState<GoalKey>("");
  const [timeline, setTimeline] = useState<TimelineKey>("");
  const [context, setContext] = useState("");

  const ageNum = parseInt(age) || 0;

  // Soft warnings — never block, just inform
  const ageWarning = ageNum > 50;
  const goalWarningHdbHdb = goal === "hdb-to-hdb";
  const goalWarningFirstHdb = goal === "first-hdb-bto";
  const incomeWarning = income === "under-8k";

  const isFormReady = useMemo(
    () => Boolean(name && whatsapp && age && income && goal && timeline),
    [name, whatsapp, age, income, goal, timeline]
  );

  const whatsappLink = useMemo(() => {
    if (!isFormReady) return "";
    const lines = [
      "Hi Elfi, I just used the calculator on EastCondos.sg and would like a 7-min discovery call.",
      "",
      `Name: ${name}`,
      `Age: ${age}`,
      `Combined household income: ${INCOME_LABELS[income]}`,
      `Timeline: ${TIMELINE_LABELS[timeline]}`,
      `Goal: ${GOAL_LABELS[goal]}`,
    ];
    if (email) lines.push(`Email: ${email}`);
    if (context.trim()) {
      lines.push("");
      lines.push(`Context: ${context.trim()}`);
    }
    lines.push("");
    lines.push(`Best contact: this WhatsApp number (${whatsapp})`);
    const message = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }, [name, age, income, timeline, goal, email, context, whatsapp, isFormReady]);

  return (
    <div className="bg-cream min-h-screen">
      {/* ===== Hero ===== */}
      <section className="border-b border-charcoal text-center px-5 sm:px-10 py-10 sm:py-16 max-w-broadsheet mx-auto">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <span className="w-5 sm:w-8 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
            Discovery call
          </span>
          <span className="w-5 sm:w-8 h-px bg-amber-deep" />
        </div>
        <h1
          className="font-serif text-charcoal mx-auto"
          style={{
            fontSize: "clamp(2rem, 6vw, 3.6rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            maxWidth: "20ch",
            marginBottom: "16px",
          }}
        >
          Tell me about your <em className="text-amber-deep italic">plans.</em>
        </h1>
        <p className="font-serif italic text-charcoal text-[17px] sm:text-[20px] leading-snug max-w-[46ch] mx-auto">
          A short form. If we&apos;re a good fit, I&apos;ll WhatsApp you back to set up a 7-minute call —
          no pressure, no pitch.
        </p>
      </section>

      {/* ===== Body ===== */}
      <main className="max-w-[760px] mx-auto px-5 sm:px-10 py-9 sm:py-14">
        {/* Honesty box */}
        <div
          className="bg-paper border border-charcoal mb-9 sm:mb-12 p-5 sm:p-7 grid gap-4 sm:gap-5"
          style={{
            borderLeft: "3px solid #D4A843",
            gridTemplateColumns: "auto 1fr",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              border: "1px solid #B8902F",
              color: "#B8902F",
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: 16,
              fontStyle: "italic",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            i
          </div>
          <div>
            <h2
              className="font-serif text-[18px] sm:text-[20px] text-charcoal mb-2 sm:mb-2.5"
              style={{ letterSpacing: "-0.01em" }}
            >
              Before you fill this in — what I do, and what I don&apos;t
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body mb-2.5">
              I focus on{" "}
              <em className="font-serif italic text-charcoal">
                private property purchases and HDB-to-private upgrades
              </em>{" "}
              in Singapore. I&apos;ve served 500+ families in Districts 14–18 over 13 years.
            </p>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body mb-2.5">
              I&apos;m{" "}
              <em className="font-serif italic text-charcoal">
                not the right person for HDB-to-HDB transactions or first-time HDB/BTO purchases
              </em>{" "}
              — there are excellent specialists for that.
            </p>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body mb-2.5">
              Private property purchase typically requires a combined household income of{" "}
              <em className="font-serif italic text-charcoal">S$10,000 or above</em>, and I work
              best with buyers aged 21–50.
            </p>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body">
              You&apos;re welcome to fill this in regardless — but knowing this upfront saves us both
              time.
            </p>
          </div>
        </div>

        {/* ===== Form ===== */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (whatsappLink) window.open(whatsappLink, "_blank");
          }}
        >
          {/* Name */}
          <Field label="Your name" required>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Tan"
              required
            />
          </Field>

          {/* WhatsApp */}
          <Field label="WhatsApp number" hint="With country code, e.g. +65 9123 4567" required>
            <input
              type="tel"
              className={styles.input}
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+65 9123 4567"
              required
            />
          </Field>

          {/* Email (optional) */}
          <Field label="Email" hint="Optional, but useful for sending follow-up materials">
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </Field>

          {/* Age */}
          <Field label="Your age" required>
            <input
              type="number"
              className={styles.input}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min={21}
              max={80}
              placeholder="35"
              required
            />
            {ageWarning && (
              <Warning>
                <strong>Heads up.</strong> I work mostly with buyers aged 21–50. If you&apos;re above
                50, my approach (long-tenure mortgages, multi-decade appreciation plays) may not
                fit your timeline. Happy to refer you to a colleague who specialises in this stage.
              </Warning>
            )}
          </Field>

          {/* Income */}
          <Field label="Combined household income" required>
            <select
              className={styles.select}
              value={income}
              onChange={(e) => setIncome(e.target.value as IncomeKey)}
              required
            >
              {(Object.keys(INCOME_LABELS) as IncomeKey[]).map((k) => (
                <option key={k} value={k} disabled={k === ""}>
                  {INCOME_LABELS[k]}
                </option>
              ))}
            </select>
            {incomeWarning && (
              <Warning>
                <strong>Heads up.</strong> Private property purchase typically requires a combined
                income of S$10,000 or above. With under S$8k, the math rarely works for a private
                purchase under MAS TDSR rules. You can still submit — we may discuss alternatives
                or timeline-based planning.
              </Warning>
            )}
          </Field>

          {/* Goal */}
          <Field label="What are you looking to do?" required>
            <select
              className={styles.select}
              value={goal}
              onChange={(e) => setGoal(e.target.value as GoalKey)}
              required
            >
              {(Object.keys(GOAL_LABELS) as GoalKey[]).map((k) => (
                <option key={k} value={k} disabled={k === ""}>
                  {GOAL_LABELS[k]}
                </option>
              ))}
            </select>
            {goalWarningHdbHdb && (
              <Warning>
                <strong>Heads up.</strong> I don&apos;t typically handle HDB-to-HDB transactions —
                that&apos;s a different specialism. If your real goal is to eventually move to private,
                I can help with the planning runway. Otherwise, I&apos;ll refer you to a trusted HDB
                specialist.
              </Warning>
            )}
            {goalWarningFirstHdb && (
              <Warning>
                <strong>Heads up.</strong> I don&apos;t cover first-time HDB or BTO purchases. My
                practice focuses on private property and HDB-to-private upgrades. I&apos;ll refer you
                to a colleague who handles HDB/BTO well.
              </Warning>
            )}
          </Field>

          {/* Timeline */}
          <Field label="Timeline" required>
            <select
              className={styles.select}
              value={timeline}
              onChange={(e) => setTimeline(e.target.value as TimelineKey)}
              required
            >
              {(Object.keys(TIMELINE_LABELS) as TimelineKey[]).map((k) => (
                <option key={k} value={k} disabled={k === ""}>
                  {TIMELINE_LABELS[k]}
                </option>
              ))}
            </select>
          </Field>

          {/* Context */}
          <Field
            label="Anything else I should know?"
            hint="Optional — current property, location preference, key concerns, etc. (max ~200 chars)"
          >
            <textarea
              className={styles.textarea}
              value={context}
              onChange={(e) => setContext(e.target.value.slice(0, 240))}
              placeholder="e.g. Currently in 4-room HDB in Tampines, looking at D15 condos around S$1.5M"
              maxLength={240}
            />
          </Field>

          {/* Submit */}
          <div className="mt-9 sm:mt-10 pt-7 border-t border-dotted border-[#c9bfa3]">
            <p className="text-[13px] sm:text-[14px] text-gray-500 mb-5 leading-relaxed">
              When you tap below, your details open in WhatsApp prefilled — you just hit send. I
              get the message directly and reply within 24 hours.
            </p>
            <button
              type="submit"
              disabled={!isFormReady}
              className="block w-full sm:w-auto sm:inline-block bg-charcoal text-cream px-7 sm:px-9 py-4 sm:py-4 text-[12px] uppercase tracking-[0.2em] font-medium border border-charcoal hover:bg-amber hover:text-charcoal hover:border-amber transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Send via WhatsApp →
            </button>
            {!isFormReady && (
              <p className="text-[12px] text-gray-500 mt-3 italic">
                Fill in the required fields above to enable the button.
              </p>
            )}
          </div>
        </form>

        {/* Trust footer */}
        <div className="mt-12 sm:mt-16 pt-7 border-t border-charcoal">
          <p className="text-[12px] text-gray-500 leading-relaxed italic">
            Your details are sent directly to Elfi&apos;s WhatsApp via your own device — nothing is
            stored on this site, no third-party form processor sees your data. You decide if and
            when to send.
          </p>
        </div>
      </main>
    </div>
  );
}

// ===== Reusable field wrapper =====
function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 sm:mb-7">
      <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-amber-deep mb-2">
        {label}
        {required && <span className="ml-1 text-amber">*</span>}
      </label>
      {children}
      {hint && (
        <p className="block text-[12px] sm:text-[13px] text-gray-500 mt-1.5 font-serif italic">
          {hint}
        </p>
      )}
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return <div className={styles.warning}>{children}</div>;
}
