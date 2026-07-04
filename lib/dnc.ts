/**
 * Do-not-contact check — the permanent suppression list for people who told
 * Elfi to stop (see crm-viewer's "Purge" button, which writes here). Every
 * lead-intake route must check this BEFORE inserting a row, so a
 * purged/opted-out number can never re-enter the spine.
 *
 * Fails OPEN (false) on any Supabase hiccup — a check outage must never
 * block a real, legitimate lead.
 */

const SB_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://lamdtoejzynvbjxevein.supabase.co";
const SB_KEY = process.env.SUPABASE_SERVICE_KEY || "";

/** SG match key = last 8 digits — same normalization as crm-viewer's purge. */
function phoneKey(raw: string): string {
  const d = String(raw || "").replace(/\D/g, "");
  return d.slice(-8);
}

export async function isDoNotContact(
  phone?: string | null,
  email?: string | null,
): Promise<boolean> {
  if (!SB_KEY) return false;
  const key = phone ? phoneKey(phone) : "";
  const em = (email || "").trim().toLowerCase();
  if (!key && !em) return false;

  const conds: string[] = [];
  if (key) conds.push(`phone.eq.${key}`);
  if (em) conds.push(`email.eq.${encodeURIComponent(em)}`);

  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/do_not_contact?or=(${conds.join(",")})&select=id&limit=1`,
      {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
        cache: "no-store",
      },
    );
    if (!res.ok) return false;
    const rows = (await res.json()) as unknown[];
    return Array.isArray(rows) && rows.length > 0;
  } catch {
    return false;
  }
}
