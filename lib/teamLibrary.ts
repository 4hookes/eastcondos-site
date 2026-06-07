/**
 * Server-side data access for the /team/library gallery.
 * Reads cp_assets_index — the master view that UNIONs cp_icons + cp_spots + cp_broll
 * + cp_audio + cp_external (HeyGen / ElevenLabs / local pointers).
 */

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SB_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export type AssetKind = "icon" | "spot" | "broll" | "audio" | "avatar" | "voice" | "local-broll" | string;

export interface Asset {
  kind: AssetKind;
  name: string;
  label: string | null;
  category: string | null;
  description: string | null;
  keywords: string[] | null;
  file_url: string | null;
  alt_url: string | null;
  external_id: string | null;
  source: string | null;
  storage: "supabase" | "external" | "local" | string;
  reusable: boolean | null;
  created_at: string;
}

export async function listAssets(): Promise<Asset[]> {
  if (!SB_URL || !SB_ANON) {
    throw new Error(
      "Supabase env vars missing — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
    );
  }
  const url = new URL("/rest/v1/cp_assets_index", SB_URL);
  url.searchParams.set("select", "*");
  url.searchParams.set("order", "kind.asc,name.asc");
  url.searchParams.set("limit", "500");

  const res = await fetch(url.toString(), {
    headers: {
      apikey: SB_ANON,
      Authorization: `Bearer ${SB_ANON}`,
    },
    // Don't cache — assets change as we sync new ones in.
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

/** Stable display order: icon → spot → broll → audio → external. */
export const KIND_ORDER: Record<AssetKind, number> = {
  icon: 0,
  spot: 1,
  broll: 2,
  audio: 3,
  avatar: 4,
  voice: 5,
  "local-broll": 6,
};

export function kindLabel(k: AssetKind): string {
  switch (k) {
    case "icon":
      return "Icon";
    case "spot":
      return "Illustration";
    case "broll":
      return "B-roll";
    case "audio":
      return "Audio";
    case "avatar":
      return "HeyGen avatar";
    case "voice":
      return "ElevenLabs voice";
    case "local-broll":
      return "Local B-roll";
    default:
      return String(k);
  }
}
