import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eastcondos.sg"),
  title: "EastCondos.sg — Singapore's Data-First Condo Investment Advisory",
  description:
    "We run your numbers before we show you a single property. 13 years of helping East Singapore families upgrade from HDB to condo with confidence. 500+ families served, 80% referral rate.",
  openGraph: {
    title: "EastCondos.sg — Singapore's Data-First Condo Investment Advisory",
    description:
      "We run your numbers before we show you a single property. 13 years of helping East Singapore families upgrade from HDB to condo with confidence.",
    type: "website",
    url: "https://eastcondos.sg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="antialiased bg-offwhite font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "RealEstateAgent",
                  "@id": "https://eastcondos.sg/#organization",
                  name: "EastCondos.sg",
                  alternateName: "The Elfi Division · ERA Singapore",
                  description:
                    "Singapore's data-first condo investment advisory. Specialist in HDB-to-condo upgrades across East Singapore (Districts 14–18).",
                  url: "https://eastcondos.sg",
                  telephone: "+6596667496",
                  priceRange: "$$$",
                  founder: { "@id": "https://eastcondos.sg/#elfi" },
                  areaServed: [
                    { "@type": "AdministrativeArea", name: "District 14, Singapore (Geylang, Eunos, Paya Lebar)" },
                    { "@type": "AdministrativeArea", name: "District 15, Singapore (Katong, Joo Chiat, Marine Parade)" },
                    { "@type": "AdministrativeArea", name: "District 16, Singapore (Bedok, Upper East Coast, Siglap)" },
                    { "@type": "AdministrativeArea", name: "District 17, Singapore (Changi, Loyang, Pasir Ris)" },
                    { "@type": "AdministrativeArea", name: "District 18, Singapore (Tampines, Pasir Ris)" },
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "SG",
                    addressRegion: "East Singapore",
                  },
                  knowsAbout: [
                    "HDB to condo upgrade planning",
                    "Singapore property investment advisory",
                    "Property by Design (PBD) methodology",
                    "ABSD and SSD timing strategy",
                    "CPF optimization for property purchase",
                    "Singapore loan structuring (TDSR, MSR, LTV)",
                  ],
                  slogan: "We run your numbers before we show you a single property.",
                  sameAs: [
                    "https://www.youtube.com/channel/UCglVDJ8Y7rKc0WlqdLGOc5Q",
                    "https://www.facebook.com/eastcondossg",
                  ],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "EastCondos Advisory Services",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "HDB-to-Condo Upgrade Advisory",
                          serviceType: "Property investment advisory",
                          description:
                            "End-to-end planning for HDB owners upgrading to a private condominium in East Singapore — numbers, timeline, financing structure, property selection.",
                          areaServed: {
                            "@type": "Place",
                            name: "East Singapore (Districts 14–18)",
                          },
                          provider: { "@id": "https://eastcondos.sg/#organization" },
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Property Portfolio Review",
                          serviceType: "Property investment advisory",
                          description:
                            "A data-first review of your current property position using the Property by Design (PBD™) 11-factor framework — entry pricing, exit audience, financing runway, and portfolio fit.",
                          provider: { "@id": "https://eastcondos.sg/#organization" },
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Clarity Call",
                          serviceType: "Consultation",
                          description:
                            "A 10-minute call to apply the Property by Design (PBD™) framework to your specific numbers and timeline. No pitch, no pressure.",
                          provider: { "@id": "https://eastcondos.sg/#organization" },
                        },
                      },
                    ],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://eastcondos.sg/#website",
                  url: "https://eastcondos.sg",
                  name: "EastCondos.sg",
                  publisher: { "@id": "https://eastcondos.sg/#organization" },
                  inLanguage: "en-SG",
                },
                {
                  "@type": "Person",
                  "@id": "https://eastcondos.sg/#elfi",
                  name: "Elfi Abdullah",
                  givenName: "Elfi",
                  familyName: "Abdullah",
                  jobTitle: "Division Director",
                  description:
                    "Founder of EastCondos.sg and Division Director at ERA Singapore. Specialist in HDB-to-condo upgrades across East Singapore (Districts 14–18). Creator of the Property by Design (PBD™) framework.",
                  url: "https://eastcondos.sg/about",
                  worksFor: { "@id": "https://eastcondos.sg/#organization" },
                  knowsAbout: [
                    "HDB to condo upgrade planning",
                    "Singapore property investment advisory",
                    "Property by Design (PBD™) methodology",
                    "ABSD and SSD timing strategy",
                    "CPF optimization for Singapore property purchase",
                    "Singapore loan structuring (TDSR, MSR, LTV)",
                    "East Singapore property market (Districts 14–18)",
                  ],
                  hasCredential: [
                    {
                      "@type": "EducationalOccupationalCredential",
                      credentialCategory: "license",
                      name: "CEA (Council for Estate Agencies) Registered Salesperson",
                      recognizedBy: {
                        "@type": "GovernmentOrganization",
                        name: "Council for Estate Agencies, Singapore",
                      },
                    },
                  ],
                  award: [
                    "13 years in Singapore residential real estate",
                    "500+ families advised",
                    "80% client referral rate",
                  ],
                  sameAs: [
                    "https://www.instagram.com/elfi.abd",
                  ],
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
