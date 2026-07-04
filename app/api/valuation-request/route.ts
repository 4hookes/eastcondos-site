import { NextResponse } from "next/server";
import { isDoNotContact } from "@/lib/dnc";

const SB_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://lamdtoejzynvbjxevein.supabase.co";
const SB_KEY = process.env.SUPABASE_SERVICE_KEY || "";

function refCode() {
  return (
    "VAL-" +
    Date.now().toString(36).toUpperCase() +
    "-" +
    Math.random().toString(36).slice(2, 6).toUpperCase()
  );
}

export async function POST(req: Request) {
  let body: {
    name?: string;
    whatsapp?: string;
    property?: string;
    email?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const whatsapp = (body.whatsapp || "").trim();
  const property = (body.property || "").trim();
  const email = (body.email || "").trim();

  if (!name || !whatsapp || !property) {
    return NextResponse.json(
      { error: "Please fill in your name, number and property." },
      { status: 400 }
    );
  }

  const digits = whatsapp.replace(/\D/g, "");
  if (digits.length < 8) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 400 }
    );
  }

  // Do-not-contact gate: someone who told Elfi to stop. Return a normal-looking
  // success (so the visitor sees no error) but write NOTHING to the spine.
  if (await isDoNotContact(whatsapp, email)) {
    console.warn("[valuation-request] blocked — on do_not_contact:", whatsapp);
    return NextResponse.json({ ok: true, code: refCode() }, { status: 200 });
  }

  if (!SB_KEY) {
    console.error("[valuation-request] SUPABASE_SERVICE_KEY is not set");
    return NextResponse.json(
      { error: "We hit a snag saving that. Please try again shortly." },
      { status: 500 }
    );
  }

  const code = refCode();
  const row = {
    ref_code: code,
    name,
    phone: whatsapp,
    email: email || null,
    source: "Valuation Request",
    status: "New",
    stage: "Submitted Address",
    address: property,
    date_submitted: new Date().toISOString().slice(0, 10),
    updated_at: new Date().toISOString(),
    details: { property_raw: property, requested_via: "East Report QR" },
  };

  try {
    const res = await fetch(`${SB_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error(
        "[valuation-request] supabase insert failed",
        res.status,
        detail
      );
      return NextResponse.json(
        { error: "We hit a snag saving that. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[valuation-request] insert exception", err);
    return NextResponse.json(
      { error: "We hit a snag saving that. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, code }, { status: 200 });
}
