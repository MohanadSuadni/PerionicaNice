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
  metadataBase: new URL("https://www.perionica-vesa-nice.rs"),

  title:
    "Perionica veša Surčin i Beograd | Pranje i dostava veša | Nice",

  description:
    "Profesionalna perionica veša u Surčinu i Beogradu. Pranje, sušenje i peglanje uz brzu dostavu na adresu – Surčin, Novi Beograd, Zemun i okolina.",

  alternates: {
    canonical: "/sr",
    languages: {
      "sr-RS": "/sr",
      "en-US": "/en",
      "ru-RU": "/ru",
    },
  },

  keywords: [
    // SR
    "perionica veša Surčin",
    "perionica veša Beograd",
    "pranje veša Beograd dostava",
    "pranje i sušenje veša Beograd pickup delivery",
    "pranje veša na kilo Beograd Surčin",
    "express perionica veša Beograd isti dan",
    "samouslužna perionica veša Beograd 24h",
    "hemijsko čišćenje Beograd pickup service",

    // GEO EXPANSION
    "perionica veša Novi Beograd",
    "perionica veša Zemun",
    "pranje veša Obrenovac",
    "laundry near Belgrade airport Surcin",
    "Surcin airport laundry service",
    "laundry service Belgrade pickup delivery",

    // EN
    "laundry service Belgrade pickup delivery",
    "wash and fold Belgrade same day service",
    "dry cleaning Belgrade pickup service",
    "best laundry service Belgrade reviews",
    "24 hour laundry service Belgrade Serbia",

    // RU
    "прачечная Белград доставка",
    "прачечная Белград срочно",
    "химчистка Белград с доставкой",
  ],

  openGraph: {
    title: "Nice Perionica – Surčin & Beograd",
    description:
      "Pranje, sušenje i peglanje veša uz brzu dostavu u Surčinu, Beogradu i okolini.",
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
      addressCountry: "RS",
    },

    areaServed: [
      "Surčin",
      "Beograd",
      "Novi Beograd",
      "Zemun",
      "Obrenovac",
      "Ledine",
      "Aerodrom Nikola Tesla",
    ],

    serviceType: "Pranje, sušenje i peglanje veša",

    url: "https://www.perionica-vesa-nice.rs",
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
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}