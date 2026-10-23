
import FloatingCallButton from "@/components/FloatingCallButton";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AnimatedCard from "@/components/AnimatedCard";

type Locale = "sr" | "en" | "ru";

type PageProps = {
  params: { lang: string };
};

const SITE_URL = "https://perionica-vesa-nice.rs";
const SLUG = "perionica-vesa-za-firme-novi-beograd";

const translations = {
  sr: {
    title: "Perionica veša za firme Novi Beograd | Vešernice NICE",
    description:
      "Vešernice NICE nude profesionalno pranje, sušenje, peglanje i dostavu veša za firme u Beogradu i Novom Beogradu. B2B saradnja i plaćanje preko računa.",
    eyebrow: "B2B USLUGE · BEOGRAD",
    h1: "Perionica veša za firme u Beogradu i Novom Beogradu",
    intro:
      "Pouzdana usluga pranja, sušenja i peglanja poslovnog tekstila, prilagođena potrebama vašeg poslovanja.",
    primary: "Dogovorite saradnju",
    secondary: "Naše usluge",
    benefitsTitle: "Pouzdana podrška vašem poslovanju",
    benefitsIntro:
      "Vešernice NICE nude profesionalnu uslugu pranja veša za firme, preduzetnike i ustanove kojima je potrebna redovna i organizovana obrada tekstila.",
    benefits: [
      {
        title: "Pranje i sušenje",
        text: "Profesionalna obrada veša prema dogovorenim potrebama vašeg poslovanja.",
      },
      {
        title: "Peglanje i slaganje",
        text: "Uredan tekstil spreman za ponovnu upotrebu u vašem objektu.",
      },
      {
        title: "Organizovana isporuka",
        text: "Dogovor o preuzimanju i isporuci u skladu sa rasporedom vašeg poslovanja.",
      },
      {
        title: "B2B saradnja",
        text: "Dogovor o obimu usluge, učestalosti i načinu plaćanja za poslovne klijente.",
      },
    ],
    clientsTitle: "Za koje poslovne klijente radimo?",
    clientsIntro:
      "Uslugu možemo prilagoditi različitim delatnostima i vrstama poslovnog tekstila.",
    clients: [
      "Restorani i sale za venčanja",
      "Apartmani i stanovi za kratkoročni najam",
      "Hoteli i smeštajni objekti",
      "Spa i wellness centri",
      "Masažni centri",
      "Frizerski i beauty saloni",
      "Saloni za venčanice",
      "Ordinacije i druge ustanove",
    ],
    processTitle: "Usluga prilagođena vašim potrebama",
    processIntro:
      "Svaki poslovni klijent ima drugačiju količinu veša i dinamiku rada. Zato model saradnje dogovaramo pojedinačno.",
    process: [
      {
        number: "01",
        title: "Dogovor o potrebama",
        text: "Razgovaramo o vrsti tekstila, količini veša i učestalosti usluge.",
      },
      {
        number: "02",
        title: "Planiranje usluge",
        text: "Dogovaramo preuzimanje, obradu, pakovanje i vreme isporuke.",
      },
      {
        number: "03",
        title: "Redovna saradnja",
        text: "Uslugu organizujemo prema dogovorenom rasporedu i potrebama vašeg objekta.",
      },
    ],
    billingTitle: "Jednostavnija organizacija poslovanja",
    billingIntro:
      "Pre početka saradnje dogovaramo praktične detalje kako bi usluga odgovarala vašem poslovanju.",
    billing: [
      "Dogovorena dinamika preuzimanja i isporuke",
      "Pranje, sušenje, peglanje i slaganje prema dogovoru",
      "Mogućnost fakturisanja i plaćanja preko računa, uz prethodni dogovor",
      "Mesečni pregled obavljenih usluga, prema dogovoru",
    ],
    whyTitle: "Vi se bavite svojim poslom, a mi vašim vešom",
    whyText:
      "Od stolnjaka i salveta u restoranima do posteljine i peškira u apartmanima, hotelima i salonima, čisti tekstil važan je deo svakodnevnog poslovanja. NICE vam pomaže da organizujete pranje veša prema potrebama svog objekta.",
    ctaTitle: "Postanite poslovni partner NICE",
    ctaText:
      "Kontaktirajte nas i razgovarajmo o količini veša, vrsti tekstila, dinamici preuzimanja i mogućnostima saradnje za vaše poslovanje u Beogradu i Novom Beogradu.",
    ctaButton: "Pogledajte naše usluge",
    backHome: "Početna",
    serviceLink: "Usluge",
    breadcrumb: "Perionica veša za firme",
    note:
      "Dostupnost preuzimanja, isporuke i posebnih uslova potvrđuje se u dogovoru sa klijentom.",
  },

  en: {
    title: "Commercial Laundry Novi Beograd | NICE Laundry",
    description:
      "NICE Laundry offers professional washing, drying, ironing and laundry delivery for businesses in Belgrade and Novi Beograd. Business cooperation and invoicing by agreement.",
    eyebrow: "BUSINESS LAUNDRY · BELGRADE",
    h1: "Commercial laundry services in Belgrade and Novi Beograd",
    intro:
      "Reliable washing, drying and ironing of business textiles, tailored to your operational needs.",
    primary: "Discuss a partnership",
    secondary: "Our services",
    benefitsTitle: "Reliable support for your business",
    benefitsIntro:
      "NICE Laundry provides laundry services for businesses, entrepreneurs and organizations that need regular textile care.",
    benefits: [
      {
        title: "Washing and drying",
        text: "Professional textile care tailored to your business requirements.",
      },
      {
        title: "Ironing and folding",
        text: "Neatly prepared textiles ready for use at your premises.",
      },
      {
        title: "Scheduled delivery",
        text: "Collection and delivery arrangements based on your schedule.",
      },
      {
        title: "Business cooperation",
        text: "Agree on service volume, frequency and payment arrangements.",
      },
    ],
    clientsTitle: "Who do we work with?",
    clientsIntro:
      "Our service can be tailored to different industries and types of business textiles.",
    clients: [
      "Restaurants and wedding venues",
      "Apartments and short-term rentals",
      "Hotels and accommodation providers",
      "Spa and wellness centres",
      "Massage centres",
      "Hair and beauty salons",
      "Bridal shops",
      "Clinics and other organizations",
    ],
    processTitle: "A service tailored to your needs",
    processIntro:
      "Every business has different laundry volumes and schedules, so we agree on a suitable service model individually.",
    process: [
      {
        number: "01",
        title: "Discuss your needs",
        text: "Tell us about your textiles, laundry volume and service frequency.",
      },
      {
        number: "02",
        title: "Plan the service",
        text: "Agree on collection, processing, packaging and delivery times.",
      },
      {
        number: "03",
        title: "Ongoing cooperation",
        text: "We organize the service according to the agreed schedule.",
      },
    ],
    billingTitle: "Simpler business operations",
    billingIntro:
      "Before starting, we agree on practical details to make the service work for your business.",
    billing: [
      "Agreed collection and delivery schedule",
      "Washing, drying, ironing and folding as agreed",
      "Business invoicing and bank transfer by prior agreement",
      "Monthly service summaries by agreement",
    ],
    whyTitle: "Focus on your business. Leave the laundry to us.",
    whyText:
      "From restaurant tablecloths and napkins to bedding and towels in apartments, hotels and salons, clean textiles are an important part of daily operations. NICE helps you organize laundry services around your needs.",
    ctaTitle: "Become a NICE business partner",
    ctaText:
      "Contact us to discuss your laundry volume, textile types, collection schedule and cooperation options in Belgrade and Novi Beograd.",
    ctaButton: "Explore our services",
    backHome: "Home",
    serviceLink: "Services",
    breadcrumb: "Commercial laundry",
    note:
      "Collection, delivery and any special arrangements are confirmed individually with each client.",
  },

  ru: {
    title: "Прачечная для компаний в Нови-Београде | NICE",
    description:
      "NICE предлагает профессиональную стирку, сушку, глажку и доставку белья для компаний в Белграде и Нови-Београде. Условия сотрудничества и оплата по счёту согласовываются заранее.",
    eyebrow: "УСЛУГИ ДЛЯ БИЗНЕСА · БЕЛГРАД",
    h1: "Прачечная для компаний в Белграде и Нови-Београде",
    intro:
      "Стирка, сушка и глажка текстиля с учётом потребностей вашего бизнеса.",
    primary: "Обсудить сотрудничество",
    secondary: "Наши услуги",
    benefitsTitle: "Надёжная поддержка вашего бизнеса",
    benefitsIntro:
      "NICE предлагает услуги прачечной компаниям, предпринимателям и организациям, которым необходим регулярный уход за текстилем.",
    benefits: [
      {
        title: "Стирка и сушка",
        text: "Профессиональная обработка белья с учётом потребностей вашего бизнеса.",
      },
      {
        title: "Глажка и складывание",
        text: "Аккуратно подготовленный текстиль, готовый к использованию.",
      },
      {
        title: "Согласованная доставка",
        text: "Время забора и доставки согласовывается с вашим графиком.",
      },
      {
        title: "Сотрудничество с компаниями",
        text: "Согласование объёма услуг, частоты и способов оплаты.",
      },
    ],
    clientsTitle: "Для кого предназначены наши услуги?",
    clientsIntro:
      "Мы можем адаптировать услуги под разные сферы деятельности и виды текстиля.",
    clients: [
      "Рестораны и свадебные залы",
      "Апартаменты и краткосрочная аренда",
      "Отели и объекты размещения",
      "Спа- и велнес-центры",
      "Массажные центры",
      "Парикмахерские и салоны красоты",
      "Свадебные салоны",
      "Клиники и другие организации",
    ],
    processTitle: "Услуга с учётом ваших потребностей",
    processIntro:
      "У каждой компании свой объём белья и график работы, поэтому условия сотрудничества согласовываются индивидуально.",
    process: [
      {
        number: "01",
        title: "Обсуждение потребностей",
        text: "Определяем тип текстиля, объём белья и частоту обслуживания.",
      },
      {
        number: "02",
        title: "Планирование услуги",
        text: "Согласовываем забор, обработку, упаковку и время доставки.",
      },
      {
        number: "03",
        title: "Регулярное сотрудничество",
        text: "Организуем обслуживание по согласованному графику.",
      },
    ],
    billingTitle: "Удобнее организовать работу",
    billingIntro:
      "Перед началом сотрудничества согласовываем детали, чтобы услуга соответствовала вашему бизнесу.",
    billing: [
      "Согласованный график забора и доставки",
      "Стирка, сушка, глажка и складывание по договорённости",
      "Выставление счетов и оплата переводом по предварительному согласованию",
      "Ежемесячный отчёт об услугах по договорённости",
    ],
    whyTitle: "Вы занимаетесь бизнесом — мы заботимся о белье",
    whyText:
      "От скатертей и салфеток в ресторанах до постельного белья и полотенец в апартаментах, отелях и салонах — чистый текстиль важен для повседневной работы. NICE поможет организовать уход за бельём с учётом ваших потребностей.",
    ctaTitle: "Станьте деловым партнёром NICE",
    ctaText:
      "Свяжитесь с нами, чтобы обсудить объём белья, тип текстиля, график забора и варианты сотрудничества в Белграде и Нови-Београде.",
    ctaButton: "Наши услуги",
    backHome: "Главная",
    serviceLink: "Услуги",
    breadcrumb: "Прачечная для компаний",
    note:
      "Возможность забора, доставки и особые условия согласовываются индивидуально.",
  },
} satisfies Record<Locale, Record<string, any>>;

function isLocale(value: string): value is Locale {
  return value === "sr" || value === "en" || value === "ru";
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const lang: Locale = isLocale(params.lang) ? params.lang : "sr";
  const t = translations[lang];
  const pageUrl = `${SITE_URL}/${lang}/${SLUG}`;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: pageUrl,
      languages: {
        sr: `${SITE_URL}/sr/${SLUG}`,
        en: `${SITE_URL}/en/${SLUG}`,
        ru: `${SITE_URL}/ru/${SLUG}`,
        "x-default": `${SITE_URL}/sr/${SLUG}`,
      },
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "Vešernice NICE",
      title: t.title,
      description: t.description,
      locale: lang === "sr" ? "sr_RS" : lang === "ru" ? "ru_RU" : "en_US",
    },
  };
}

export default function BusinessLaundryPage({ params }: PageProps) {
  const lang: Locale = isLocale(params.lang) ? params.lang : "sr";
  const t = translations[lang];

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <Header />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#123F50] text-white">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#2E8993]/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-36 -left-20 h-80 w-80 rounded-full bg-[#E5BD49]/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-28 lg:px-10 lg:pb-28 lg:pt-32">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2 text-sm text-white/70"
          >
            <Link href={`/${lang}`} className="transition hover:text-white">
              {t.backHome}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">{t.breadcrumb}</span>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.16em] text-[#F6D979]">
              {t.eyebrow}
            </p>

            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t.h1}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              {t.intro}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#saradnja"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F6D979] px-6 py-3 text-sm font-bold text-[#123F50] transition hover:bg-[#FFE79A] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#123F50]"
              >
                {t.primary}
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </a>

              <Link
                href={`/${lang}/usluge`}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
              >
                {t.secondary}
              </Link>
            </div>

            <p className="mt-5 text-xs leading-6 text-white/60">{t.note}</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#1687A0]">
            Vešernice NICE
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#173B50] sm:text-4xl">
            {t.benefitsTitle}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            {t.benefitsIntro}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.benefits.map((benefit, index) => (
            <AnimatedCard key={benefit.title} index={index}>
              <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F3F4] text-sm font-bold text-[#126A78]">
                  0{index + 1}
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#173B50]">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {benefit.text}
                </p>
              </article>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Target clients */}
      <section className="bg-[#F4F8F8]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#1687A0]">
              B2B
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#173B50] sm:text-4xl">
              {t.clientsTitle}
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              {t.clientsIntro}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {t.clients.map((client, index) => (
              <AnimatedCard key={client} index={index}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E4F2EE] text-sm font-bold text-[#247A61]"
                  >
                    ✓
                  </span>
                  <span className="text-sm font-medium leading-6 text-[#173B50]">
                    {client}
                  </span>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#173B50] sm:text-4xl">
            {t.processTitle}
          </h2>
          <p className="mt-5 leading-8 text-slate-600">{t.processIntro}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.process.map((step, index) => (
            <AnimatedCard key={step.number} index={index}>
              <article className="relative h-full rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
                <p className="text-4xl font-bold text-[#D5E9E9]">
                  {step.number}
                </p>
                <h3 className="mt-5 text-lg font-bold text-[#173B50]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.text}
                </p>
              </article>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Billing */}
      <section className="bg-[#123F50] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#F6D979]">
              NICE · B2B
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">
              {t.billingTitle}
            </h2>
            <p className="mt-5 leading-8 text-white/75">{t.billingIntro}</p>
          </div>

          <ul className="space-y-4">
            {t.billing.map((item, index) => (
              <AnimatedCard key={item} index={index}>
                <li className="flex gap-3 rounded-xl transition duration-300 hover:translate-x-1">
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-[#F6D979]"
                  >
                    ✓
                  </span>
                  <span className="text-sm leading-7 text-white/90">
                    {item}
                  </span>
                </li>
              </AnimatedCard>
            ))}
          </ul>
        </div>
      </section>

      {/* Why NICE */}
      <section className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <AnimatedCard>
          <h2 className="text-2xl font-bold tracking-tight text-[#173B50] sm:text-4xl">
            {t.whyTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl leading-8 text-slate-600">
            {t.whyText}
          </p>
        </AnimatedCard>
      </section>

      {/* Cooperation CTA */}
      <section
        id="saradnja"
        className="scroll-mt-8 px-5 pb-16 sm:px-8 sm:pb-20"
      >
        <AnimatedCard>
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#EAF3F3] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-[#173B50] sm:text-4xl">
                {t.ctaTitle}
              </h2>
              <p className="mt-5 leading-8 text-slate-600">{t.ctaText}</p>
              <Link
                href={`/${lang}/usluge`}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#126A78] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0D5662] focus:outline-none focus:ring-2 focus:ring-[#126A78] focus:ring-offset-2"
              >
                {t.ctaButton}
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
            </div>
          </div>
        </AnimatedCard>
      </section>

      <Footer />
      <FloatingCallButton />
    </main>
  );
}
