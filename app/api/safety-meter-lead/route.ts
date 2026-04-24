import { NextResponse } from "next/server";

// MailerLite subscriber endpoint:
// https://developers.mailerlite.com/docs/subscribers.html#create-upsert-subscriber
// Env vars needed:
//   MAILERLITE_API_KEY            — API token
//   MAILERLITE_SAFETY_METER_GROUP — (optional) group ID to auto-assign

type LeadPayload = {
  email: string;
  name?: string;
  persona: string;
  score: number;
};

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, name, persona, score } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_SAFETY_METER_GROUP;

  // No API key — log the lead server-side so it's not lost, and return success
  // so the UX still unlocks. Elfi can retrieve from server logs or add the key later.
  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.log("[safety-meter-lead] No MAILERLITE_API_KEY set. Lead captured:", {
      email,
      name,
      persona,
      score,
      capturedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, queued: true }, { status: 200 });
  }

  try {
    const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        fields: name ? { name } : undefined,
        groups: groupId ? [groupId] : undefined,
        // Use custom fields for persona + score tracking. Elfi can create these
        // fields in MailerLite UI first; API will ignore unknown fields silently.
        // Alternatively, store in a note/tag.
        ...(persona || score
          ? {
              fields: {
                ...(name ? { name } : {}),
                safety_meter_persona: persona,
                safety_meter_score: String(score),
              },
            }
          : {}),
      }),
    });

    if (!mlRes.ok) {
      const errText = await mlRes.text().catch(() => "");
      // eslint-disable-next-line no-console
      console.error("[safety-meter-lead] MailerLite error", mlRes.status, errText);
      // Still return success to avoid breaking UX
      return NextResponse.json({ ok: true, queued: true }, { status: 200 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[safety-meter-lead] Fetch failed", err);
    return NextResponse.json({ ok: true, queued: true }, { status: 200 });
  }
}
