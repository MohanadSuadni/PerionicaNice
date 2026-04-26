import { Metadata } from "next";
import Pricing from "@/components/Pricing";
import { Footer } from "@/components";
import {Hero} from "@/components";
import {LogoTicker} from "@/components";
import MiniGalleryScroller from "@/components/MiniGalleryScroller";
export const metadata: Metadata = {
  title: "Cenovnik hemijsko pranje i peglanja veša | Surčin Nvoi Beograd - Nice",
  description:
    "Pogledajte cene pranja, sušenja i peglanja veša u Surčinu i Beogradu. Transparentan cenovnik bez skrivenih troškova.",
  keywords: [
    "cenovnik pranja veša",
    "cena peglanja",
    "perionica veša Surčin cena",
    "pranje veša Beograd cena",
    "peglanje cena po kg",
  ],
};

export default function PricingPage() {
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pranje i peglanje veša",
    areaServed: {
      "@type": "Place",
      name: "Beograd",
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
    offers: [
      {
        "@type": "Offer",
        name: "Pranje i sušenje do 5kg",
        price: "1090",
        priceCurrency: "RSD",
      },
      {
        "@type": "Offer",
        name: "Pranje i sušenje preko 6kg",
        price: "200",
        priceCurrency: "RSD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "200",
          priceCurrency: "RSD",
          unitCode: "KGM",
        },
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
      {
        "@type": "Offer",
        name: "Košulje pranje i peglanje",
        price: "400",
        priceCurrency: "RSD",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingSchema),
        }}
      />
      <Hero />
            <LogoTicker />
      <Pricing />
           <MiniGalleryScroller /> 
            
               <Footer />
    </>
  );
}