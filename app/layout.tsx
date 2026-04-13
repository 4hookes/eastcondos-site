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
              "@type": "RealEstateAgent",
              name: "EastCondos.sg - Elfi Abdullah",
              description:
                "Singapore's data-first condo investment advisory. Expert HDB to condo upgrade planning.",
              url: "https://eastcondos.sg",
              telephone: "+6588415991",
              areaServed: {
                "@type": "Place",
                name: "East Singapore (Districts 14-18)",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "SG",
                addressRegion: "East Singapore",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
