import { Metadata } from "next";
import Usluga from "@/components/Usluga";
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
      "Usluge hemijskog pranja i peglanja veša | Surčin - Beograd",
    description:
      "Profesionalne usluge pranja, sušenja, peglanja i hemijskog pranja veša u Surčinu. Besplatna dostava u Novom Beogradu i Obrenovcu.",
    keywords: [
      "usluge pranja veša",
      "peglanje veša Beograd",
      "hemijsko pranje Beograd",
      "pranje veša Surčin",
      "dostava veša Novi Beograd",
      "perionica veša usluge",
    ],
  },

  en: {
    title:
      "Laundry, ironing and dry cleaning services | Belgrade",
    description:
      "Professional laundry, ironing and dry cleaning services in Belgrade. Free pickup and delivery in New Belgrade and Obrenovac.",
    keywords: [
      "laundry service Belgrade",
      "dry cleaning Belgrade",
      "ironing service",
      "laundry pickup Belgrade",
      "laundry Surcin",
      "professional laundry service",
    ],
  },

  ru: {
    title:
      "Услуги прачечной и химчистки | Белград",
    description:
      "Профессиональные услуги стирки, глажки и химчистки в Белграде. Бесплатная доставка в Новом Белграде и Обреноваце.",
    keywords: [
      "прачечная Белград",
      "химчистка Белград",
      "глажка одежды",
      "стирка с доставкой",
      "прачечная Сурчин",
      "услуги прачечной",
    ],
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
    keywords: currentSeo.keywords,

    alternates: {
      canonical: `https://www.perionica-vesa-nice.rs/${lang}/usluge`,
      languages: {
        sr: "https://www.perionica-vesa-nice.rs/sr/usluge",
        en: "https://www.perionica-vesa-nice.rs/en/services",
        ru: "https://www.perionica-vesa-nice.rs/ru/uslugi",
      },
    },

    openGraph: {
      title: currentSeo.title,
      description: currentSeo.description,
      url: `https://www.perionica-vesa-nice.rs/${lang}/usluge`,
      siteName: "Nice Perionica",
      locale:
        lang === "sr"
          ? "sr_RS"
          : lang === "ru"
          ? "ru_RU"
          : "en_US",
      type: "website",
    },
  };
}

export default function UslugePage({ params }: Props) {
  const lang = params.lang || "sr";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name:
      lang === "sr"
        ? "Usluge pranja i peglanja veša"
        : lang === "ru"
        ? "Услуги стирки и глажки"
        : "Laundry and ironing services",

    areaServed: ["Surčin", "Novi Beograd", "Obrenovac"],

    provider: {
      "@type": "LocalBusiness",
      name: "Nice Perionica",

      address: {
        "@type": "PostalAddress",
        addressLocality: "Surčin",
        addressCountry: "RS",
      },
    },

    serviceType:
      lang === "sr"
        ? [
            "Pranje veša",
            "Sušenje veša",
            "Peglanje veša",
            "Hemijsko pranje veša",
            "Dostava veša",
          ]
        : lang === "ru"
        ? [
            "Стирка белья",
            "Глажка белья",
            "Химчистка",
            "Доставка белья",
          ]
        : [
            "Laundry service",
            "Ironing service",
            "Dry cleaning",
            "Laundry delivery",
          ],
  };

  return (
    <>
      {/* SEO SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      {/* PAGE */}
      <Hero />

      <LogoTicker />

      <Usluga />

      <MiniGalleryScroller />

      <Footer />
    </>
  );
}