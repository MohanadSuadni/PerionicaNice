import { Metadata } from "next";
import Usluga from "@/components/Usluga";
import { Footer } from "@/components";
import {Hero} from "@/components";
import {LogoTicker} from "@/components";
import MiniGalleryScroller from "@/components/MiniGalleryScroller";
export const metadata: Metadata = {
  title: "Usluge hemijsko pranje i peglanja veša | Surčin - Beograd",
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
};

export default function UslugePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Usluge pranja i peglanja veša",
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
    serviceType: [
      "Pranje veša",
      "Sušenje veša",
      "Peglanje veša",
      "Hemijsko pranje veša",
      "Dostava veša",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usluge perionice",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pranje i sušenje veša",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Peglanje veša",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hemijsko pranje veša",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <Hero />
            <LogoTicker />
      <Usluga />
       <MiniGalleryScroller /> 
                  
                     <Footer />
    </>
  );
}