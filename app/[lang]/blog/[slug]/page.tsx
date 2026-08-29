import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/types/dict";
import { Footer, Navbar } from "@/components";
import FloatingCallButton from "@/components/FloatingCallButton";
import MiniGalleryScroller from "@/components/MiniGalleryScroller";

type BlogPostPageProps = {
  params: Promise<{
    lang: Locale;
    slug: string;
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

/*
  IMPORTANT:
  Replace this with the real WhatsApp number.

  Serbia example:
  +381 6X XXX XXXX
  becomes:
  3816XXXXXXXX

  Do NOT use +, spaces or dashes.
*/
const WHATSAPP_NUMBER = " 381692121985";

const labels = {
  sr: {
    back: "Nazad na blog",
    noPost: "Članak nije pronađen.",

    bookingTitle: "Rezervacija",
    bookingSubtitle: "Termin",
    bookingHint: "Pošaljite upit ",

    whatsappMessage:
      "Pozdrav, želeo/la bih da rezervišem termin u Perionici Nice.",
  },

  en: {
    back: "Back to blog",
    noPost: "Article not found.",

    bookingTitle: "Booking",
    bookingSubtitle: "Appointment",
    bookingHint: "Send your request ",

    whatsappMessage:
      "Hello, I would like to book an appointment at Perionica Nice.",
  },

  ru: {
    back: "Назад в блог",
    noPost: "Статья не найдена.",

    bookingTitle: "Бронирование",
    bookingSubtitle: "Время",
    bookingHint: "Отправьте запрос ",

    whatsappMessage:
      "Здравствуйте, я хотел(а) бы забронировать время в Perionica Nice.",
  },
};

async function getPost(
  lang: Locale,
  slug: string
) {
  const supabase = await createClient();

  const {
    data,
    error,
  } = await supabase
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
    .eq("slug", slug)
    .eq("status", "published")
    .eq(
      "blog_post_translations.language",
      lang
    )
    .maybeSingle();

  if (error) {
    console.error("Blog post error:", error);
    return null;
  }

  return data as BlogPost | null;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!allowedLanguages.includes(lang)) {
    return {};
  }

  const post = await getPost(
    lang,
    slug
  );

  if (!post) {
    return {};
  }

  const translation =
    post.blog_post_translations?.[0];

  if (!translation) {
    return {};
  }

  return {
    title:
      translation.seo_title ||
      translation.title,

    description:
      translation.seo_description ||
      translation.excerpt ||
      undefined,

    openGraph: {
      title:
        translation.seo_title ||
        translation.title,

      description:
        translation.seo_description ||
        translation.excerpt ||
        undefined,

      images: post.featured_image
        ? [
            {
              url: post.featured_image,
            },
          ]
        : undefined,

      type: "article",

      publishedTime:
        post.published_at ||
        undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const {
    lang,
    slug,
  } = await params;

  if (!allowedLanguages.includes(lang)) {
    notFound();
  }

  const post = await getPost(
    lang,
    slug
  );

  if (!post) {
    notFound();
  }

  const translation =
    post.blog_post_translations?.[0];

  if (!translation) {
    notFound();
  }

  const text = labels[lang];

  const locale =
    lang === "sr"
      ? "sr-RS"
      : lang === "ru"
      ? "ru-RU"
      : "en-US";

  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}?text=` +
    encodeURIComponent(
      text.whatsappMessage
    );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f9f8]">

        {/* ==========================================
            HERO
        ========================================== */}
        <section className="relative isolate overflow-hidden">

          {/* HERO IMAGE */}
          <div className="absolute inset-0 -z-20">
            <img
              src="/images/Commercial Laundry Facility Interior.png"
              alt="Perionica Nice Blog"
              className="h-full w-full object-cover"
            />
          </div>

          {/* VERY LIGHT BRAND OVERLAY */}
          <div className="absolute inset-0 -z-10 bg-[#064c5d]/20" />

          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#064c5d]/35 via-[#064c5d]/15 to-transparent" />

          <div className="mx-auto flex min-h-[470px] max-w-7xl items-center px-5 py-20 md:px-8">

            <div className="max-w-4xl text-white">

              {/* BRAND LABEL */}
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/25 bg-[#064c5d]/30 px-4 py-2 backdrop-blur-sm">

                <span className="h-2.5 w-2.5 rounded-full bg-[#fec502]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Perionica Nice
                </span>

              </div>

              {/* TITLE */}
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                {translation.title}
              </h1>

              {/* GOLD ACCENT */}
              <div className="mt-5 h-1 w-16 rounded-full bg-[#fec502]" />

              {/* ======================================
                  WHATSAPP BOOKING BUTTON
              ====================================== */}
              {/* ======================================
    WHATSAPP BOOKING BUTTON
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

        {/* ==========================================
            BACK TO BLOG
        ========================================== */}
        <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8">

          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#08647d] transition-colors duration-300 hover:text-[#064c5d]"
          >
            <span className="text-[#08647d]">
              ←
            </span>

            {text.back}
          </Link>

        </div>

        {/* ==========================================
            FEATURED IMAGE
        ========================================== */}
        {post.featured_image && (
          <div className="mx-auto max-w-7xl px-5 pt-6 md:px-8 md:pt-8">

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#dce7e8]">

              <img
                src={post.featured_image}
                alt={translation.title}
                className="h-auto max-h-[600px] w-full object-cover"
              />

            </div>

          </div>
        )}

        {/* ==========================================
            ARTICLE
        ========================================== */}
        <article className="mx-auto max-w-4xl px-5 py-10 md:px-8 md:py-16">

          {/* DATE */}
          {post.published_at && (
            <p className="text-sm font-semibold uppercase tracking-wider text-[#08647d]">
              {new Date(
                post.published_at
              ).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}

          {/* EXCERPT */}
          {translation.excerpt && (
            <p className="mt-8 border-l-4 border-[#fec502] pl-5 text-lg leading-8 text-slate-600 md:text-xl">
              {translation.excerpt}
            </p>
          )}

          {/* CONTENT */}
          <div
            className="
              prose
              prose-lg
              mt-10
              max-w-none

              prose-headings:font-bold
              prose-headings:text-[#064c5d]

              prose-p:text-slate-700
              prose-p:leading-8

              prose-a:text-[#08647d]
              prose-a:no-underline
              hover:prose-a:text-[#064c5d]
              hover:prose-a:underline

              prose-strong:text-[#064c5d]

              prose-img:mx-auto
              prose-img:my-8
              prose-img:w-full
              prose-img:rounded-2xl
              prose-img:object-cover

              prose-ul:my-6
              prose-ol:my-6

              prose-li:my-2

              prose-blockquote:border-[#fec502]
              prose-blockquote:text-slate-600

              prose-hr:border-[#dce7e8]
            "
            dangerouslySetInnerHTML={{
              __html: translation.content,
            }}
          />

          {/* ==========================================
              WHATSAPP BOOKING - BOTTOM
          ========================================== */}
          <div className="mt-14 border-t border-[#dce7e8] pt-10">

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                items-center
                rounded-full
                bg-white
                p-1.5
                shadow-md
                ring-1
                ring-[#dce7e8]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-xl
              "
            >

              <div className="px-5 py-2.5">

                <p className="text-sm font-bold text-[#064c5d]">
                  {text.bookingTitle}
                </p>

                <p className="text-xs text-slate-500">
                  {text.bookingSubtitle}
                </p>

              </div>

              <div className="h-10 w-px bg-slate-200" />

              <div className="px-5 py-2.5">

                <p className="text-xs font-medium text-slate-400">
                  WhatsApp
                </p>

                <p className="text-sm font-semibold text-[#08647d]">
                  {text.bookingHint}
                </p>

              </div>

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-[#fec502]
                  text-[#064c5d]
                  transition-all
                  duration-300
                  group-hover:bg-[#f2b900]
                "
              >
                <span className="text-xl transition-transform duration-300 group-hover:translate-y-1">
                  →
                </span>
              </div>

            </a>

          </div>

        </article>

      </main>
      <MiniGalleryScroller />

      <Footer />

      <FloatingCallButton />
    </>
  );
}