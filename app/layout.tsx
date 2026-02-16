import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
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
