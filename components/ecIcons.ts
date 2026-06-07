// AUTO-GENERATED from public/icons/icon-library.json by scripts/sync_icon_library.py.
// Do not edit by hand — edit the JSON and re-run the sync script.

export type EcIconName =
  | "building-new"
  | "hdb-block"
  | "condo-tower"
  | "landed-house"
  | "show-gallery"
  | "skyline"
  | "stamp-duty"
  | "balance-scale"
  | "coins-stack"
  | "piggy-bank"
  | "home-loan"
  | "bridging-loan"
  | "wallet"
  | "bank"
  | "interest"
  | "cpf"
  | "property-tax"
  | "rent"
  | "consultation"
  | "checklist"
  | "calendar"
  | "otp-document"
  | "signing-pen"
  | "handover"
  | "key"
  | "calculator"
  | "magnifier"
  | "exit-door"
  | "mrt"
  | "school"
  | "swimming-pool"
  | "gym"
  | "park"
  | "expressway"
  | "sea-coast"
  | "shopping-mall"
  | "location-pin"
  | "target"
  | "compass"
  | "lightbulb"
  | "shield-check"
  | "growth-staircase"
  | "portfolio"
  | "clock"
  | "handshake"
  | "chart-up"
  | "lease"
  | "renovation"
  | "maintenance"
  | "floor-area"
  ;

export type EcIconCategory =
  | "advisory-brand"
  | "money-finance"
  | "place-lifestyle"
  | "process-transaction"
  | "property-attributes"
  | "property-types"
  ;

export interface EcIconMeta {
  name: EcIconName;
  category: EcIconCategory;
  label: string;
  description: string;
  keywords: string[];
  wave: number;
}

export const EC_ICONS: EcIconMeta[] = [
  { name: "building-new", category: "property-types", label: "New launch building", description: "A modern condo tower under/just after construction.", keywords: ["new launch", "BUC", "brand new condo", "developer sale", "under construction", "new project"], wave: 1 },
  { name: "hdb-block", category: "property-types", label: "HDB block", description: "A public-housing apartment block (HDB flats).", keywords: ["HDB", "public housing", "flat", "BTO", "resale flat", "upgrader start"], wave: 2 },
  { name: "condo-tower", category: "property-types", label: "Condo tower (resale)", description: "A sleek private condominium tower; existing/resale private home.", keywords: ["condo", "private property", "resale condo", "apartment", "private home"], wave: 2 },
  { name: "landed-house", category: "property-types", label: "Landed house", description: "A two-storey landed terrace home.", keywords: ["landed", "terrace", "semi-detached", "bungalow", "house"], wave: 2 },
  { name: "show-gallery", category: "property-types", label: "Showflat / show gallery", description: "A model home on a display stand; a developer showflat.", keywords: ["showflat", "show gallery", "showroom", "model unit", "viewing", "developer gallery"], wave: 2 },
  { name: "skyline", category: "property-types", label: "District skyline", description: "A cluster of condo towers; district or island-wide market view.", keywords: ["skyline", "district", "market", "macro", "island-wide", "D14-18", "city view"], wave: 2 },
  { name: "stamp-duty", category: "money-finance", label: "Stamp duty (BSD/ABSD)", description: "A document with a pressed stamp; buyer's and additional buyer's stamp duty.", keywords: ["stamp duty", "BSD", "ABSD", "buyer stamp duty", "additional buyer stamp duty", "SSD", "tax on purchase"], wave: 2 },
  { name: "balance-scale", category: "money-finance", label: "Affordability / TDSR", description: "A balanced weighing scale; affordability and debt-servicing balance.", keywords: ["TDSR", "MSR", "affordability", "debt servicing ratio", "income vs loan", "eligibility", "balance"], wave: 2 },
  { name: "coins-stack", category: "money-finance", label: "Downpayment / cash", description: "Rising stacks of coins; downpayment, cash outlay, deposit.", keywords: ["downpayment", "cash", "upfront", "deposit", "cash outlay", "savings needed"], wave: 2 },
  { name: "piggy-bank", category: "money-finance", label: "Savings", description: "A piggy bank; saving up, nest egg, setting money aside.", keywords: ["savings", "nest egg", "save up", "reserve fund", "rainy day"], wave: 2 },
  { name: "home-loan", category: "money-finance", label: "Home loan / mortgage", description: "A house with a coin; taking a housing loan / mortgage.", keywords: ["home loan", "mortgage", "housing loan", "bank loan", "financing", "LTV", "refinance"], wave: 2 },
  { name: "bridging-loan", category: "money-finance", label: "Bridging loan", description: "An arched bridge; bridging finance between selling and buying.", keywords: ["bridging loan", "bridge", "sell then buy", "timing gap", "short-term loan", "cash bridge"], wave: 2 },
  { name: "wallet", category: "money-finance", label: "Cash on hand", description: "An open wallet with cash; money on hand, budget, spending power.", keywords: ["wallet", "cash on hand", "budget", "spending power", "liquidity"], wave: 2 },
  { name: "bank", category: "money-finance", label: "Bank / lender", description: "A columned bank building; the bank, lender, loan approval.", keywords: ["bank", "lender", "financial institution", "loan approval", "IPA", "mortgage banker"], wave: 2 },
  { name: "interest", category: "money-finance", label: "Interest rate", description: "Interest / cost of borrowing.", keywords: ["interest", "interest rate", "cost of loan", "SORA", "floating rate", "fixed rate"], wave: 1 },
  { name: "cpf", category: "money-finance", label: "CPF", description: "Central Provident Fund used for property.", keywords: ["CPF", "OA", "ordinary account", "CPF accrued interest", "CPF for housing", "retirement funds"], wave: 1 },
  { name: "property-tax", category: "money-finance", label: "Property tax", description: "Annual property tax.", keywords: ["property tax", "IRAS", "annual value", "tax bill", "owner-occupier tax"], wave: 1 },
  { name: "rent", category: "money-finance", label: "Rent / rental", description: "Rental income or rent paid.", keywords: ["rent", "rental", "rental income", "yield", "tenant", "passive income"], wave: 1 },
  { name: "consultation", category: "process-transaction", label: "Consultation / chat", description: "Two speech bubbles; a conversation, advisory chat, discovery call.", keywords: ["consultation", "chat", "talk", "discovery call", "advice", "discussion"], wave: 2 },
  { name: "checklist", category: "process-transaction", label: "Checklist", description: "A clipboard with ticks; steps, requirements, eligibility checklist.", keywords: ["checklist", "steps", "requirements", "eligibility", "to-do", "tick"], wave: 2 },
  { name: "calendar", category: "process-transaction", label: "Timeline / dates", description: "A calendar; dates, timeline, MOP date, milestones.", keywords: ["calendar", "date", "timeline", "MOP", "schedule", "milestone", "deadline"], wave: 2 },
  { name: "otp-document", category: "process-transaction", label: "Option to Purchase", description: "A contract page with a signature line; the OTP / sale agreement.", keywords: ["OTP", "option to purchase", "contract", "agreement", "S&P", "paperwork"], wave: 2 },
  { name: "signing-pen", category: "process-transaction", label: "Signing / commit", description: "A pen signing; committing, exercising the option, closing.", keywords: ["sign", "signature", "commit", "exercise option", "close deal"], wave: 2 },
  { name: "handover", category: "process-transaction", label: "Key handover", description: "A hand offering a key; collection, handover, moving in.", keywords: ["handover", "collect keys", "TOP", "move in", "completion", "possession"], wave: 2 },
  { name: "key", category: "process-transaction", label: "Ownership / keys", description: "A key; ownership, your own home, access.", keywords: ["key", "ownership", "own home", "unlock", "access", "new home"], wave: 1 },
  { name: "calculator", category: "process-transaction", label: "Calculate / numbers", description: "A calculator; run the numbers, costs, sums.", keywords: ["calculator", "calculate", "numbers", "cost", "work out", "estimate"], wave: 1 },
  { name: "magnifier", category: "process-transaction", label: "Search / review", description: "A magnifier; search, due diligence, look closely.", keywords: ["search", "find", "review", "due diligence", "analyse", "research"], wave: 1 },
  { name: "exit-door", category: "process-transaction", label: "Exit / selling", description: "An exit door; selling, exit strategy, getting out.", keywords: ["exit", "sell", "exit strategy", "cash out", "when to sell"], wave: 1 },
  { name: "mrt", category: "place-lifestyle", label: "MRT / transport", description: "A train; MRT, connectivity, transport access.", keywords: ["MRT", "train", "transport", "connectivity", "station", "commute", "accessibility"], wave: 2 },
  { name: "school", category: "place-lifestyle", label: "Schools", description: "A graduation cap; schools, education, 1km enrolment.", keywords: ["school", "education", "1km", "primary school", "family", "enrolment"], wave: 2 },
  { name: "swimming-pool", category: "place-lifestyle", label: "Pool / facilities", description: "A pool; condo facilities, lifestyle, amenities.", keywords: ["pool", "swimming", "facilities", "amenities", "lifestyle", "condo perks"], wave: 2 },
  { name: "gym", category: "place-lifestyle", label: "Gym / fitness", description: "A dumbbell; gym, fitness facilities.", keywords: ["gym", "fitness", "dumbbell", "workout", "facilities", "health"], wave: 2 },
  { name: "park", category: "place-lifestyle", label: "Park / greenery", description: "A tree; parks, greenery, nature nearby.", keywords: ["park", "greenery", "nature", "green", "outdoors", "park connector"], wave: 2 },
  { name: "expressway", category: "place-lifestyle", label: "Expressway / roads", description: "A highway; expressway access, driving connectivity.", keywords: ["expressway", "highway", "road", "PIE", "ECP", "driving", "car access"], wave: 2 },
  { name: "sea-coast", category: "place-lifestyle", label: "East Coast / sea", description: "Ocean waves; the East Coast, sea view, coastal living.", keywords: ["sea", "coast", "East Coast", "waterfront", "sea view", "beach", "D15"], wave: 2 },
  { name: "shopping-mall", category: "place-lifestyle", label: "Malls / shopping", description: "A shopping bag; malls, retail, amenities nearby.", keywords: ["mall", "shopping", "retail", "amenities", "f&b", "convenience"], wave: 2 },
  { name: "location-pin", category: "place-lifestyle", label: "Location", description: "A map pin; location, where, address, area.", keywords: ["location", "where", "map", "area", "address", "neighbourhood", "district"], wave: 1 },
  { name: "target", category: "advisory-brand", label: "Goal / target", description: "A bullseye; your goal, the right target, precision.", keywords: ["goal", "target", "objective", "aim", "right fit", "plan"], wave: 2 },
  { name: "compass", category: "advisory-brand", label: "Strategy / direction", description: "A compass; strategy, direction, guidance, the right path.", keywords: ["strategy", "direction", "guidance", "plan", "navigate", "roadmap", "advice"], wave: 2 },
  { name: "lightbulb", category: "advisory-brand", label: "Insight / idea", description: "A light bulb; insight, the key idea, a realisation.", keywords: ["insight", "idea", "tip", "realisation", "smart move", "key point"], wave: 2 },
  { name: "shield-check", category: "advisory-brand", label: "Safety / protected", description: "A shield with a tick; safety, protection, the Safety Meter, low risk.", keywords: ["safety", "protected", "secure", "Safety Meter", "low risk", "defensive", "peace of mind", "safe buy"], wave: 2 },
  { name: "growth-staircase", category: "advisory-brand", label: "Growth / progression", description: "Rising steps; growth, upgrading step by step, progress.", keywords: ["growth", "progression", "upgrade", "step by step", "build wealth", "next step"], wave: 2 },
  { name: "portfolio", category: "advisory-brand", label: "Portfolio / assets", description: "A briefcase; property portfolio, holdings, assets.", keywords: ["portfolio", "assets", "holdings", "multiple properties", "wealth", "investments"], wave: 2 },
  { name: "clock", category: "advisory-brand", label: "Timing", description: "A clock; timing, when to act, holding period, time in market.", keywords: ["timing", "when", "time", "holding period", "time in market", "right time"], wave: 2 },
  { name: "handshake", category: "advisory-brand", label: "Trust / deal", description: "A handshake; trust, partnership, closing, referral.", keywords: ["trust", "deal", "partnership", "agreement", "referral", "relationship"], wave: 1 },
  { name: "chart-up", category: "advisory-brand", label: "Appreciation / value up", description: "A house with a rising arrow; value going up, appreciation, capital growth.", keywords: ["appreciation", "value up", "capital growth", "price rise", "gains", "upside", "ROI"], wave: 1 },
  { name: "lease", category: "property-attributes", label: "Lease / tenure", description: "Lease; leasehold tenure, 99-year, lease decay.", keywords: ["lease", "tenure", "99-year", "leasehold", "freehold", "lease decay", "remaining lease"], wave: 1 },
  { name: "renovation", category: "property-attributes", label: "Renovation", description: "Renovation; reno cost, fitting out, upgrading the home.", keywords: ["renovation", "reno", "fitting out", "upgrade home", "interior", "reno cost"], wave: 1 },
  { name: "maintenance", category: "property-attributes", label: "Maintenance fee", description: "Maintenance; monthly MCST fee, upkeep.", keywords: ["maintenance", "MCST", "monthly fee", "upkeep", "conservancy", "sinking fund"], wave: 1 },
  { name: "floor-area", category: "property-attributes", label: "Floor area / size", description: "Floor area; size, square feet, space, PSF.", keywords: ["floor area", "size", "sqft", "space", "PSF", "square feet", "layout"], wave: 1 },
];

export const EC_ICON_NAMES: EcIconName[] = EC_ICONS.map((i) => i.name);

/** Group icon names by category — handy for pickers / contact sheets. */
export const EC_ICONS_BY_CATEGORY: Record<EcIconCategory, EcIconName[]> =
  EC_ICONS.reduce((acc, i) => {
    (acc[i.category] ||= []).push(i.name);
    return acc;
  }, {} as Record<EcIconCategory, EcIconName[]>);
