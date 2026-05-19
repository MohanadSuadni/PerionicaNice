import { Metadata } from "next";
import Pricing from "@/components/Pricing";
import { Footer, Hero, LogoTicker } from "@/components";
import MiniGalleryScroller from "@/components/MiniGalleryScroller";

type Props = {
  params: {
    lang: "sr" | "en" | "ru";
  };
};

const seo = {
  sr: {
    title:
      "Cenovnik hemijskog pranja i peglanja veša | Surčin - Beograd - Nice",
    description:
      "Pogledajte cene pranja, sušenja i peglanja veša u Surčinu i Beogradu. Transparentan cenovnik bez skrivenih troškova.",
  },

  en: {
    title:
      "Laundry Pricing | Wash, Dry & Iron Services Belgrade - Nice",
    description:
      "Check transparent laundry pricing in Belgrade. Washing, ironing and dry cleaning with no hidden costs.",
  },

  ru: {
    title:
      "Прайс-лист прачечной | Белград - Nice",
    description:
      "Прозрачные цены на стирку, глажку и химчистку в Белграде без скрытых затрат.",
  },
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const lang = params.lang || "sr";

  const currentSeo = seo[lang];

  return {
    title: currentSeo.title,
    description: currentSeo.description,

    keywords:
      lang === "sr"
        ? [
            "cenovnik pranja veša",
            "cena peglanja Beograd",
            "perionica veša Surčin cena",
            "pranje veša cena",
            "peglanje veša po kg",
          ]
        : lang === "ru"
        ? [
            "цены прачечной",
            "стирка Белград цена",
            "глажка одежды цена",
            "химчистка Белград",
          ]
        : [
            "laundry pricing Belgrade",
            "washing price per kg",
            "ironing service price",
            "dry cleaning Belgrade cost",
          ],

    alternates: {
      canonical: `https://www.perionica-vesa-nice.rs/${lang}/pricing`,
      languages: {
        "sr-RS":
          "https://www.perionica-vesa-nice.rs/sr/pricing",
        "en-US":
          "https://www.perionica-vesa-nice.rs/en/pricing",
        "ru-RU":
          "https://www.perionica-vesa-nice.rs/ru/pricing",
      },
    },

    openGraph: {
      title: currentSeo.title,
      description: currentSeo.description,
      url: `https://www.perionica-vesa-nice.rs/${lang}/pricing`,
      siteName: "Nice Perionica",
      locale:
        lang === "en"
          ? "en_US"
          : lang === "ru"
          ? "ru_RU"
          : "sr_RS",
      type: "website",
    },
  };
}

export default function PricingPage({ params }: Props) {
  const lang = params.lang || "sr";

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name:
      lang === "sr"
        ? "Pranje i peglanje veša"
        : lang === "ru"
        ? "Стирка и глажка белья"
        : "Laundry washing and ironing services",

    areaServed: {
      "@type": "Place",
      name: "Belgrade",
    },

    provider: {
      "@type": "LocalBusiness",
      name: "Nice Perionica",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Surčin",
        addressCountry: "RS",
      },
    },

    offers:
      lang === "sr"
        ? [
            {
              "@type": "Offer",
              name: "Pranje i sušenje do 5kg",
              price: "1090",
              priceCurrency: "RSD",
            },
            {
              "@type": "Offer",
              name: "Pranje i sušenje po kg",
              price: "200",
              priceCurrency: "RSD",
            },
            {
              "@type": "Offer",
              name: "Peglanje",
              price: "320",
              priceCurrency: "RSD",
            },
            {
              "@type": "Offer",
              name: "Pranje i peglanje",
              price: "460",
              priceCurrency: "RSD",
            },
          ]
        : [
            {
              "@type": "Offer",
              name: "Laundry up to 5kg",
              price: "1090",
              priceCurrency: "RSD",
            },
            {
              "@type": "Offer",
              name: "Laundry per kg",
              price: "200",
              priceCurrency: "RSD",
            },
            {
              "@type": "Offer",
              name: "Ironing",
              price: "320",
              priceCurrency: "RSD",
            },
            {
              "@type": "Offer",
              name: "Wash & Iron",
              price: "460",
              priceCurrency: "RSD",
            },
          ],
  };

  return (
    <>
      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingSchema),
        }}
      />

      {/* PAGE */}
      <Hero />
      <LogoTicker />
      <Pricing />
      <MiniGalleryScroller />
      <Footer />
    </>
  );
}