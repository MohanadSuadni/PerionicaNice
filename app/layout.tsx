import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LangProvider } from "@/context/LangContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Perionica veša Surčin | Pranje i peglanje Beograd - Nice",
  description:
    "Profesionalna perionica veša u Surčinu. Pranje, peglanje i dostava u Novom Beogradu i Obrenovcu.",
  keywords: [
    "perionica veša Surčin",
    "pranje veša Beograd",
    "peglanje veša",
    "hemijsko pranje veša",
    "dry cleaning Beograd",
    "Novi Beograd",
    "Obrenovac"
  ],
  openGraph: {
    title: "Perionica veša Nice | Surčin",
    description:
      "Pranje, sušenje i peglanje veša uz brzu i pouzdanu uslugu u Beogradu.",
    url: "https://www.perionica-vesa-nice.rs",
    siteName: "Nice Perionica",
    locale: "sr_RS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Nice Perionica",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surčin",
      addressCountry: "RS"
    },
    areaServed: [
      "Surčin",
      "Novi Beograd",
      "Obrenovac"
    ],
    serviceType: "Pranje i peglanje veša"
  };

  return (
    <html lang="sr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      </head>

      <body className={inter.variable}>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}