import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/types/dict";
import { Footer, Navbar } from "@/components";
import FloatingCallButton from "@/components/FloatingCallButton";
import MiniGalleryScroller from "@/components/MiniGalleryScroller";

type BlogPageProps = {
  params: Promise<{
    lang: Locale;
  }>;
};

type BlogPost = {
  id: string;
  slug: string;
  featured_image: string | null;
  published_at: string | null;
  blog_post_translations: {
    title: string;
    excerpt: string | null;
    content: string;
    seo_title: string | null;
    seo_description: string | null;
  }[];
};

const allowedLanguages: Locale[] = ["sr", "en", "ru"];

const WHATSAPP_NUMBER = " 381692121985"; // Replace with your actual WhatsApp number

const labels = {
  sr: {
    title: "Blog",
    description:
      "Najnovije vesti, korisni saveti i informacije iz sveta pranja i nege veša.",
    back: "← Nazad na početnu stranu",
    readMore: "Pročitaj više",
    noPostsTitle: "Naš blog uskoro počinje",
    noPosts:
      "Pripremamo korisne savete, novosti i zanimljive informacije koje će vam pomoći da bolje brinete o svom vešu.",
    introTitle: "Korisni saveti za svakodnevni život",
    introText:
      "Na našem blogu pronaći ćete praktične savete o pranju, sušenju, održavanju odeće i pravilnoj nezi različitih materijala. Kao i korisnike naših usluga i spoljnih saradnika. ",
    explore: "Istražite naše usluge ",
    noImage: "Bez slike",
    bookingTitle: "Rezervacija",
    bookingSubtitle: "Termin",
    bookingHint: "Pošaljite upit ",
  },

  en: {
    title: "Blog",
    description:
      "Latest news, useful tips and information about laundry and garment care.",
    back: "← Back to Home",
    readMore: "Read more",
    noPostsTitle: "Our blog is coming soon",
    noPosts:
      "We are preparing useful tips, news and interesting information to help you take better care of your clothes.",
    introTitle: "Useful tips for everyday life",
    introText:
      "Discover practical advice about washing, drying, garment maintenance and proper care for different types of fabrics.",
    explore: "Explore our services",
    noImage: "No image",
    bookingTitle: "Booking",
    bookingSubtitle: "Appointment",
    bookingHint: "Send an inquiry",
  },

  ru: {
    title: "Блог",
    description:
      "Последние новости, полезные советы и информация о стирке и уходе за одеждой.",
    back: "← Назад на главную",
    readMore: "Читать далее",
    noPostsTitle: "Наш блог скоро появится",
    noPosts:
      "Мы готовим полезные советы, новости и интересную информацию, которые помогут вам правильно ухаживать за одеждой.",
    introTitle: "Полезные советы на каждый день",
    introText:
      "Здесь вы найдете практические советы по стирке, сушке, уходу за одеждой и различными видами тканей.",
    explore: "Наши услуги",
    noImage: "Нет изображения",
    bookingTitle: "Бронирование",
    bookingSubtitle: "Запись",
    bookingHint: "Отправить запрос",
  },
};

export default async function BlogPage({
  params,
}: BlogPageProps) {
  const { lang } = await params;

  if (!allowedLanguages.includes(lang)) {
    notFound();
  }

  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select(
      `
        id,
        slug,
        featured_image,
        published_at,
        blog_post_translations!inner (
          title,
          excerpt,
          content,
          seo_title,
          seo_description
        )
      `
    )
    .eq("status", "published")
    .eq("blog_post_translations.language", lang)
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    console.error("Blog posts error:", error);
  }

  const translatedPosts = (posts as BlogPost[]) || [];
  const text = labels[lang];
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\s+/g, "")}`;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f9f8]">

        {/* HERO */}
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-20">
            <img
              src="/images/Commercial Laundry Facility Interior.png"
              alt="Perionica Nice Blog"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Brand color overlay */}
        <div className="absolute inset-0 -z-10 bg-[#064c5d]/20" />

<div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#064c5d]/35 via-[#064c5d]/15 to-transparent" />

          <div className="mx-auto flex min-h-[460px] max-w-7xl items-center px-5 py-20 md:px-8">
            <div className="max-w-3xl text-white">

              {/* BRAND LABEL */}
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-[#064c5d]/50 px-4 py-2 backdrop-blur-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#fec502]" />

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-white">
                  Perionica Nice
                </span>
              </div>

              <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
                {text.title}
              </h1>

              <div className="mt-5 h-1 w-16 rounded-full bg-[#fec502]" />

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
                {text.description}
              </p>

                {/* WHATSAPP BOOKING BUTTON
                ====================================== */}
<div className="mt-7">
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={text.bookingHint}
    className="
      group
      inline-flex
      w-full
      max-w-[260px]
      items-center
      rounded-full
      bg-white
      p-1
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:shadow-xl
      sm:max-w-[280px]
    "
  >
    {/* LEFT */}
    <div className="shrink-0 px-4 py-2 sm:px-5">
      <p className="text-xs font-bold leading-4 text-[#064c5d] sm:text-sm">
        {text.bookingTitle}
      </p>

      <p className="text-[11px] leading-4 text-slate-500 sm:text-xs">
        {text.bookingSubtitle}
      </p>
    </div>

    {/* DIVIDER */}
    <div className="h-9 w-px bg-slate-200 sm:h-10" />

    {/* MIDDLE */}
    <div className="min-w-0 flex-1 px-3 py-2 sm:px-4">
      <p className="text-[10px] font-medium leading-4 text-slate-400 sm:text-xs">
        WhatsApp
      </p>

      <p className="truncate text-xs font-semibold leading-4 text-[#08647d] sm:text-sm">
        {text.bookingHint}
      </p>
    </div>

    {/* ARROW */}
    <div
      className="
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-[#fec502]
        text-[#064c5d]
        shadow-sm
        transition-all
        duration-300
        group-hover:bg-[#f2b900]
        group-hover:shadow-md
      "
    >
      <span className="text-xl font-light transition-transform duration-300 group-hover:translate-y-1">
          →

      </span>
    </div>
  </a>
</div>

            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2">

            <div>
              <div className="mb-5 h-1 w-14 rounded-full bg-[#fec502]" />

              <h2 className="text-3xl font-bold tracking-tight text-[#064c5d] md:text-4xl">
                {text.introTitle}
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
                {text.introText}
              </p>

              <Link
                href={`/${lang}/usluge`}
                className="mt-7 inline-flex rounded-full bg-[#064c5d] px-6 py-3 text-sm font-semibold text-[#fec502] shadow-md transition duration-300 hover:bg-[#08647d] hover:shadow-lg"
              >
                {text.explore}
              </Link>
            </div>

            {/* BRAND CARD */}
            <div className="relative overflow-hidden rounded-3xl bg-[#064c5d] p-8 text-white shadow-xl md:p-10">

              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#08647d]/60" />

              <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-[#fec502]/10" />

              <div className="relative">

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#08647d] text-2xl text-[#fec502]">
                  ✦
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Perionica Nice
                </h3>

                <p className="mt-4 leading-7 text-white/75">
                  Kvalitetna usluga, pažljiv odnos prema vašoj odeći i
                  profesionalna nega svakog komada.
                </p>

                <div className="mt-6 h-px w-full bg-white/10" />

                <p className="mt-5 text-sm font-semibold text-[#fec502]">
                  Kvalitet • Pouzdanost • Profesionalnost
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* POSTS */}
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">

          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#08647d]">
              Perionica Nice
            </p>

            <div className="mt-2 flex items-center gap-4">
              <div className="h-1 w-12 rounded-full bg-[#fec502]" />

              <h2 className="text-3xl font-bold text-[#064c5d]">
                {text.title}
              </h2>
            </div>
          </div>

          {translatedPosts.length === 0 ? (

            <div className="relative overflow-hidden rounded-3xl border border-[#dce7e8] bg-white px-6 py-20 text-center shadow-sm md:px-12">

              <div className="absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 bg-[#fec502]" />

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#eef5f5] text-3xl text-[#08647d]">
                ✦
              </div>

              <h3 className="mt-7 text-2xl font-bold text-[#064c5d] md:text-3xl">
                {text.noPostsTitle}
              </h3>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 md:text-lg">
                {text.noPosts}
              </p>

              <Link
                href={`/${lang}/usluge`}
                className="mt-8 inline-flex rounded-full bg-[#064c5d] px-7 py-3 text-sm font-semibold text-[#fec502] shadow-md transition duration-300 hover:bg-[#08647d] hover:shadow-lg"
              >
                {text.explore}
              </Link>

            </div>

          ) : (

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {translatedPosts.map((post) => {

                const translation =
                  post.blog_post_translations?.[0];

                if (!translation) {
                  return null;
                }

                return (
                  <article
                    key={post.id}
                    className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#dce7e8] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-[#08647d]/40"
                  >

                    {/* IMAGE */}
                    <Link
                      href={`/${lang}/blog/${post.slug}`}
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-[#eef5f5]">

                        {post.featured_image ? (

                          <img
                            src={post.featured_image}
                            alt={translation.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />

                        ) : (

                          <div className="flex h-full items-center justify-center text-sm font-medium text-[#08647d]">
                            {text.noImage}
                          </div>

                        )}

                        {/* BLOG LABEL */}
                        <div className="absolute left-4 top-4 rounded-full bg-[#064c5d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#fec502] shadow-lg">
                          Nice Blog
                        </div>

                      </div>
                    </Link>

                    {/* CONTENT */}
                    <div className="p-6">

                      {post.published_at && (
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#08647d]">
                          {new Date(
                            post.published_at
                          ).toLocaleDateString(
                            lang === "sr"
                              ? "sr-RS"
                              : lang === "ru"
                              ? "ru-RU"
                              : "en-US"
                          )}
                        </p>
                      )}

                      <h2 className="mt-3 text-xl font-bold leading-tight text-[#064c5d]">
                        <Link
                          href={`/${lang}/blog/${post.slug}`}
                          className="transition duration-300 hover:text-[#08647d]"
                        >
                          {translation.title}
                        </Link>
                      </h2>

                      {translation.excerpt && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                          {translation.excerpt}
                        </p>
                      )}

                      <div className="mt-6 border-t border-[#e5eeee] pt-5">

                        <Link
                          href={`/${lang}/blog/${post.slug}`}
                          className="inline-flex items-center text-sm font-bold text-[#064c5d] transition duration-300 hover:text-[#08647d]"
                        >
                          {text.readMore}

                          <span className="ml-2 text-[#fec502] transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>
          )}




        </section>

      </main>
<MiniGalleryScroller />
      <Footer />

      <FloatingCallButton />
    </>
  );
}