import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LangProvider } from "@/context/LangContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: "sr" | "en" | "ru" }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "sr" | "en" | "ru" }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const seo = {
    sr: {
      title: "Perionica veša Surčin i Beograd | Nice",
      description:
        "Profesionalna perionica veša u Surčinu i Beogradu. Pranje, peglanje i hemijsko čišćenje sa dostavom.",
    },

    en: {
      title: "Laundry Service Belgrade | Wash & Fold | Nice",
      description:
        "Professional laundry service in Belgrade with pickup and delivery.",
    },

    ru: {
      title: "Прачечная Белград | Nice",
      description:
        "Профессиональная прачечная в Белграде с доставкой.",
    },
  };

  const currentSeo = seo[lang];

  return {
    metadataBase: new URL("https://www.perionica-vesa-nice.rs"),

    title: currentSeo.title,

    description: currentSeo.description,

    keywords:
      lang === "sr"
        ? [
            "perionica veša",
            "pranje veša Beograd",
            "hemijsko čišćenje",
            "Surčin perionica",
            "peglanje veša",
          ]
        : lang === "ru"
        ? [
            "прачечная Белград",
            "стирка белья",
            "химчистка",
            "глажка одежды",
          ]
        : [
            "laundry service Belgrade",
            "dry cleaning",
            "wash and fold",
            "laundry pickup",
          ],

    alternates: {
      canonical: `https://www.perionica-vesa-nice.rs/${lang}`,

      languages: {
        "sr-RS": "https://www.perionica-vesa-nice.rs/sr",
        "en-US": "https://www.perionica-vesa-nice.rs/en",
        "ru-RU": "https://www.perionica-vesa-nice.rs/ru",
      },
    },

    openGraph: {
      title: currentSeo.title,

      description: currentSeo.description,

      url: `https://www.perionica-vesa-nice.rs/${lang}`,

      siteName: "Nice Perionica",

      locale:
        lang === "en"
          ? "en_US"
          : lang === "ru"
          ? "ru_RU"
          : "sr_RS",

      type: "website",

      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Nice Perionica",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: currentSeo.title,
      description: currentSeo.description,
      images: ["/og-image.jpg"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { lang } = await params;

  const schema = {
    "@context": "https://schema.org",

    "@type": "LocalBusiness",

    name: "Nice Perionica",

    image: "https://www.perionica-vesa-nice.rs/og-image.jpg",

    url: `https://www.perionica-vesa-nice.rs/${lang}`,

    telephone: "+38163211161",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Aleksandra Ace Simovića 11a",
      addressLocality: "Surčin",
      postalCode: "11271",
      addressCountry: "RS",
    },

    areaServed: [
      "Surčin",
      "Beograd",
      "Novi Beograd",
      "Zemun",
      "Obrenovac",
    ],

    serviceType: [
      "Laundry Service",
      "Dry Cleaning",
      "Ironing Service",
    ],

    openingHours: "Mo-Fr 08:00-15:00",

    priceRange: "€€",
  };

  return (
    <html lang={lang}>
      <head>
        {/* SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />

        {/* FAVICON */}
        <link rel="icon" href="/favicon.ico" />

        {/* THEME */}
        <meta name="theme-color" content="#08647d" />
      </head>

      <body className={`${inter.variable} antialiased`}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}