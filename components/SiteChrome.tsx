"use client";

import { usePathname } from "next/navigation";

// Squeeze pages have one job, so they drop the site's nav and footer. Add a path
// here to do the same for another page.
const BARE_PATHS = ["/hdb-to-condo-planner"];

export default function SiteChrome({
  nav,
  footer,
  children,
}: {
  nav: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const path = (usePathname() || "").replace(/(\.html|\/)$/, "");
  const bare = BARE_PATHS.includes(path);
  return (
    <>
      {!bare && nav}
      <main>{children}</main>
      {!bare && footer}
    </>
  );
}
