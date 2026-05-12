import { Metadata } from "next";
import FAQRinseClean from "@/components/FAQ";
import { Footer } from "@/components";
import {Hero} from "@/components";
import {LogoTicker} from "@/components";
import MiniGalleryScroller from "@/components/MiniGalleryScroller";
export const metadata: Metadata = {
  title: "Najčešća pitanja | Perionica veša Surčin-Novi Beograd - Nice",
  description: "Odgovori na pitanja o pranju, peglanju i dostavi veša u Beogradu.",
};

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Da li postoji opcija pranja bez mirisa, za osetljivu kožu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Naravno. Ako želite potpuno nežan pristup pranju, samo napomenite našem vozaču bez mirisa..."
        }
      },
      {
        "@type": "Question",
        "name": "Može li se veš izgubiti?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ne brinite — vaš veš je kod nas potpuno bezbedan..."
        }
      },
      {
        "@type": "Question",
        "name": "Da li mogu da se skinu fleke?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mnoge fleke mogu biti uklonjene uz pravilan tretman..."
        }
      },
      {
        "@type": "Question",
        "name": "Da li mešate veš sa vešom drugih klijenata?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ne — svaki korisnik dobija svoj zaseban ciklus pranja..."
        }
      },
      {
        "@type": "Question",
        "name": "Da li postoji opcija za posebne želje?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Da, postoji — posebno za premium korisnike..."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
<Hero />
            <LogoTicker />
      <FAQRinseClean />
                  <MiniGalleryScroller /> 
      
         <Footer />
      
    </>
  );
}