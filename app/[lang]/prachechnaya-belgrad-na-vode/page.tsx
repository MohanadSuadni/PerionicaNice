import { Footer, Hero } from "@/components";
import FloatingCallButton from "@/components/FloatingCallButton";

type Props = {
  params: {
    lang: "sr" | "en" | "ru";
  };
};

export default function Page({ params }: Props) {
  const lang = (params.lang as "sr" | "en" | "ru") ?? "sr";

  const content = {
    sr: {
      h1: "Perionica veša Beograd na vodi – Premium pranje, peglanje i dostava",

      intro:
        "U dinamičnom okruženju Beograda na vodi, vreme je postalo najvredniji resurs. Zato je profesionalna usluga pranja i peglanja veša idealno rešenje za stanare, poslovne ljude, porodice i vlasnike apartmana koji žele besprekorno čist veš bez gubljenja vremena.",

      text1:
        "NICE – Perionica veša Beograd na vodi pruža premium uslugu pranja, sušenja, peglanja i pakovanja veša uz mogućnost preuzimanja i dostave na adresu.",

      title2: "Premium nega veša po vašoj meri",

      text2:
        "Ono što nas izdvaja jeste individualan pristup svakom klijentu. Kod nas imate mogućnost izbora deterdženta i omekšivača prema svojim željama i potrebama.",

      list1: [
        "Miris i vrsta omekšivača",
        "Vrsta deterdženta",
        "Blage preparate za osetljivu kožu",
        "Poseban tretman za dečiju garderobu",
        "Dodatna nega za luksuzne tkanine",
      ],

      text3:
        "Vaš veš se ne pere zajedno sa vešom drugih korisnika, već prolazi kroz pažljivo kontrolisan proces kako bi se očuvala higijena, kvalitet i dugotrajnost tkanina.",

      title3: "Profesionalno pranje i peglanje veša",

      text4:
        "Bez obzira da li je reč o svakodnevnoj garderobi, poslovnoj odeći, posteljini ili peškirima, naš tim vodi računa o svakom detalju.",

      list2: [
        "Pranje garderobe",
        "Sušenje veša",
        "Profesionalno peglanje",
        "Pakovanje veša",
        "Pranje posteljine",
        "Pranje peškira",
        "Pranje jorgana i ćebadi",
        "Održavanje veša za apartmane i stanove za izdavanje",
      ],

      text5:
        "Svaki komad veša prolazi kroz proces koji garantuje svežinu, urednost i profesionalan izgled.",

      title4: "Preuzimanje i dostava u Beogradu na vodi",

      text6:
        "Kako bismo vam uštedeli vreme, organizujemo preuzimanje i dostavu veša na željenoj adresi u Beogradu na vodi. Dovoljno je da nas kontaktirate, a naš tim će preuzeti veš, profesionalno ga oprati i vratiti čist, ispeglan i uredno upakovan.",

      title5: "Zašto odabrati NICE?",

      why: [
        "Premium kvalitet usluge",
        "Izbor praška i omekšivača po želji klijenta",
        "Profesionalno peglanje i pakovanje",
        "Mogućnost preuzimanja i dostave",
        "Brza i pouzdana usluga",
        "Posebna pažnja prema osetljivim tkaninama",
        "Dugogodišnje iskustvo i poverenje klijenata",
      ],

      finalTitle: "Perionica veša za Beograd na vodi",

      finalText:
        "Ako tražite pouzdanu perionicu veša u Beogradu na vodi koja nudi vrhunski kvalitet, profesionalnu negu i uslugu prilagođenu vašim potrebama, NICE je pravi izbor. Prepustite pranje i peglanje stručnom timu i iskoristite svoje vreme za ono što vam je zaista važno.",
    },

    en: {
      h1: "Laundry Service Belgrade Waterfront – Premium Washing, Ironing and Delivery",
      intro:
        "In Belgrade Waterfront, time is the most valuable resource. Professional laundry service for residents and businesses.",
      text1:
        "NICE provides washing, drying, ironing and delivery with pickup service.",
      title2: "Premium laundry care",
      text2:
        "Individual approach with detergent and softener selection.",
      list1: [
        "Softener choice",
        "Detergent type",
        "Sensitive skin care",
        "Children clothes",
        "Luxury fabrics",
      ],
      text3:
        "Laundry is never mixed with other customers.",
      title3: "Professional laundry service",
      text4:
        "We handle clothes, bedding and towels with care.",
      list2: [
        "Washing",
        "Drying",
        "Ironing",
        "Folding",
        "Bed linen",
        "Towels",
        "Blankets",
        "Apartment laundry",
      ],
      text5:
        "Every item is processed with care.",
      title4: "Pickup and delivery",
      text6:
        "We pick up and return laundry directly to your address.",
      title5: "Why choose NICE?",
      why: [
        "Premium service",
        "Custom detergent",
        "Ironing & packaging",
        "Pickup & delivery",
        "Fast service",
        "Fabric care",
        "Trusted company",
      ],
      finalTitle: "Laundry service Belgrade Waterfront",
      finalText:
        "Professional laundry service for residents and businesses.",
    },

    ru: {
      h1: "Прачечная Белград на воде – Премиальная стирка, глажка и доставка",
      intro:
        "В Белграде на воде время — самый ценный ресурс.",
      text1:
        "NICE предлагает стирку, сушку, глажку и доставку.",
      title2: "Премиальный уход",
      text2:
        "Индивидуальный подход к каждому клиенту.",
      list1: [
        "Выбор кондиционера",
        "Тип порошка",
        "Деликатные ткани",
        "Детская одежда",
        "Люксовые ткани",
      ],
      text3:
        "Одежда не смешивается с другими заказами.",
      title3: "Профессиональная обработка",
      text4:
        "Стирка одежды, белья и полотенец.",
      list2: [
        "Стирка",
        "Сушка",
        "Глажка",
        "Упаковка",
        "Постельное белье",
        "Полотенца",
        "Одеяла",
        "Апартаменты",
      ],
      text5:
        "Каждый заказ обрабатывается отдельно.",
      title4: "Забор и доставка",
      text6:
        "Мы забираем и доставляем белье.",
      title5: "Почему NICE?",
      why: [
        "Премиум сервис",
        "Индивидуальный подход",
        "Глажка и упаковка",
        "Доставка",
        "Быстро",
        "Аккуратно",
        "Надежно",
      ],
      finalTitle: "Прачечная Белград на воде",
      finalText:
        "Профессиональная прачечная с доставкой.",
    },
  };

  const t = content[lang];

  return (
    <>
         <Hero />


      {/* MAIN */}
     <section className="relative overflow-hidden py-36">

<div className="absolute inset-0">
  <div className="bg-black">
  </div>
</div>

        <div className="container relative mx-auto max-w-5xl px-4">

          {/* TITLE */}
          <h1 className="mb-8 text-4xl font-extrabold md:text-6xl">
            {t.h1}
          </h1>

          <p className="mb-6 text-lg text-slate-600">{t.intro}</p>
          <p className="mb-6 text-slate-600">{t.text1}</p>

          <h2 className="mb-4 mt-10 text-2xl font-bold">{t.title2}</h2>
          <p className="mb-4 text-slate-600">{t.text2}</p>

          <ul className="mb-10 list-disc space-y-2 pl-5 text-slate-700">
            {t.list1.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>

          <p className="mb-10 text-slate-600">{t.text3}</p>

          <h2 className="mb-4 text-2xl font-bold">{t.title3}</h2>
          <p className="mb-4 text-slate-600">{t.text4}</p>

          <ul className="mb-10 list-disc space-y-2 pl-5 text-slate-700">
            {t.list2.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>

          <p className="mb-10 text-slate-600">{t.text5}</p>

          <h2 className="mb-4 text-2xl font-bold">{t.title4}</h2>
          <p className="mb-10 text-slate-600">{t.text6}</p>

          <h2 className="mb-4 text-2xl font-bold">{t.title5}</h2>

          <ul className="mb-10 list-disc space-y-2 pl-5 text-slate-700">
            {t.why.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>

          <h2 className="mb-4 text-2xl font-bold">{t.finalTitle}</h2>
          <p className="text-slate-600">{t.finalText}</p>

          {/* CTA */}
         

        </div>

      </section>

      <Footer />


      <FloatingCallButton />
    </>
  );
}