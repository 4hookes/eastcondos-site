import type { Metadata } from "next";
import { Inter, Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eastcondos.sg – Own Your Dream Condo with Elfi",
  description:
    "Expert HDB to condo upgrade planning for East Singapore families. 13 years experience, 500+ families helped. Get your free Zero-Cash Upgrade Checker for Districts 15, 16 & 18.",
  openGraph: {
    title: "eastcondos.sg – Own Your Dream Condo with Elfi",
    description:
      "Expert HDB to condo upgrade planning for East Singapore families. 13 years experience, 500+ families helped. Get your free Zero-Cash Upgrade Checker for Districts 15, 16 & 18.",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${lato.variable}`}>
      <body className="antialiased bg-cream font-sans">
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
              "name": "EastCondos.sg - Elfi",
              "description": "Expert HDB to condo upgrade planning for East Singapore families",
              "url": "https://eastcondos.sg",
              "telephone": "+6588415991",
              "areaServed": {
                "@type": "Place",
                "name": "East Singapore (Districts 15, 16, 18)"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SG",
                "addressRegion": "East Singapore"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
