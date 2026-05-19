import { Metadata } from "next";
import FAQRinseClean from "@/components/FAQ";
import {
  Footer,
  Hero,
  LogoTicker,
} from "@/components";
import MiniGalleryScroller from "@/components/MiniGalleryScroller";

type Props = {
  params: {
    lang: "sr" | "en" | "ru";
  };
};

const seo = {
  sr: {
    title:
      "Najčešća pitanja | Perionica veša Surčin-Novi Beograd - Nice",

    description:
      "Odgovori na pitanja o pranju, peglanju i dostavi veša u Beogradu.",
  },

  en: {
    title:
      "Frequently Asked Questions | Laundry Service Belgrade - Nice",

    description:
      "Answers about laundry, ironing and pickup service in Belgrade.",
  },

  ru: {
    title:
      "Часто задаваемые вопросы | Прачечная Белград - Nice",

    description:
      "Ответы на вопросы о стирке, глажке и доставке белья.",
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

    alternates: {
      canonical: `https://www.perionica-vesa-nice.rs/${lang}/faq`,

      languages: {
        "sr-RS":
          "https://www.perionica-vesa-nice.rs/sr/faq",

        "en-US":
          "https://www.perionica-vesa-nice.rs/en/faq",

        "ru-RU":
          "https://www.perionica-vesa-nice.rs/ru/faq",
      },
    },

    openGraph: {
      title: currentSeo.title,

      description: currentSeo.description,

      url: `https://www.perionica-vesa-nice.rs/${lang}/faq`,

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

export default function FAQPage({ params }: Props) {
  const lang = params.lang || "sr";

  const faqSchema = {
    "@context": "https://schema.org",

    "@type": "FAQPage",

    mainEntity:
      lang === "sr"
        ? [
            {
              "@type": "Question",

              name:
                "Da li postoji opcija pranja bez mirisa, za osetljivu kožu?",

              acceptedAnswer: {
                "@type": "Answer",

                text:
                  "Naravno. Ako želite potpuno nežan pristup pranju, samo napomenite našem vozaču bez mirisa.",
              },
            },

            {
              "@type": "Question",

              name: "Može li se veš izgubiti?",

              acceptedAnswer: {
                "@type": "Answer",

                text:
                  "Ne brinite — vaš veš je kod nas potpuno bezbedan.",
              },
            },

            {
              "@type": "Question",

              name: "Da li mogu da se skinu fleke?",

              acceptedAnswer: {
                "@type": "Answer",

                text:
                  "Mnoge fleke mogu biti uklonjene uz pravilan tretman.",
              },
            },

            {
              "@type": "Question",

              name:
                "Da li mešate veš sa vešom drugih klijenata?",

              acceptedAnswer: {
                "@type": "Answer",

                text:
                  "Ne — svaki korisnik dobija svoj zaseban ciklus pranja.",
              },
            },
          ]
        : lang === "ru"
        ? [
            {
              "@type": "Question",

              name:
                "Есть ли стирка без запаха для чувствительной кожи?",

              acceptedAnswer: {
                "@type": "Answer",

                text:
                  "Да, просто сообщите водителю о необходимости стирки без запаха.",
              },
            },

            {
              "@type": "Question",

              name: "Может ли белье потеряться?",

              acceptedAnswer: {
                "@type": "Answer",

                text:
                  "Нет, ваше белье полностью защищено и отслеживается.",
              },
            },

            {
              "@type": "Question",

              name: "Можно ли удалить пятна?",

              acceptedAnswer: {
                "@type": "Answer",

                text:
                  "Многие пятна можно удалить при правильной обработке.",
              },
            },
          ]
        : [
            {
              "@type": "Question",

              name:
                "Do you offer fragrance-free washing for sensitive skin?",

              acceptedAnswer: {
                "@type": "Answer",

                text:
                  "Yes, simply inform our driver that you prefer fragrance-free washing.",
              },
            },

            {
              "@type": "Question",

              name: "Can laundry get lost?",

              acceptedAnswer: {
                "@type": "Answer",

                text:
                  "No — your laundry is completely safe with us.",
              },
            },

            {
              "@type": "Question",

              name: "Can stains be removed?",

              acceptedAnswer: {
                "@type": "Answer",

                text:
                  "Many stains can be removed with proper treatment.",
              },
            },
          ],
  };

  return (
    <>
      {/* SEO FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Hero />

      <LogoTicker />

      <FAQRinseClean />

      <MiniGalleryScroller />

      <Footer />
    </>
  );
}