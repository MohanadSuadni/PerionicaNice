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

  title: "Perionica veša Surčin | прачечная Белград |laundry Belgrade | Nice",
  
  description:
    "Profesionalna perionica veša u Surčinu. Pranje, peglanje i dostava.",

  alternates: {
    canonical: "/sr",

    languages: {
      "sr-RS": "/sr",
      "en-US": "/en",
      "ru-RU": "/ru",
    },
  },

  keywords: [
    "perionica veša Surčin preuzimanje i dostava",
  "perionica veša Beograd dostava na adresu",
  "pranje i sušenje veša Beograd pickup delivery",
  "pranje veša na kilo Beograd Surčin",
  "express perionica veša Beograd isti dan",
  "samouslužna perionica veša Beograd 24h",
  "hemijsko čišćenje Beograd pickup service",

  // EN (jači search intent)
  "laundry service Belgrade pickup delivery",
  "wash and fold Belgrade same day service",
  "dry cleaning Belgrade pickup service",
  "laundry near Belgrade Airport Surcin",
  "best laundry service Belgrade reviews",
  "24 hour laundry service Belgrade Serbia",

  // RU (širi reach)
  "прачечная Белград доставка",
  "прачечная Белград срочно",
  "химчистка Белград с доставкой",

  // “power search” / high intent
  "best rated laundry Belgrade pickup delivery",
  "cheap laundry service Belgrade same day",
  "laundry service near me Surcin open now",
  "top dry cleaners Belgrade reviews",
  ],

  openGraph: {
    title: "Nice Perionica",
    description:
      "Pranje, sušenje i peglanje veša uz brzu i pouzdanu uslugu.",
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