"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import RichTextEditor from "../components/RichTextEditor";

type Language = "sr" | "en" | "ru";

type Translation = {
  title: string;
  excerpt: string;
  content: string;
  seo_title: string;
  seo_description: string;
};

export default function NewBlogPostPage() {
  const router = useRouter();
  const supabase = createClient();

  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [translations, setTranslations] = useState<
    Record<Language, Translation>
  >({
    sr: {
      title: "",
      excerpt: "",
      content: "",
      seo_title: "",
      seo_description: "",
    },
    en: {
      title: "",
      excerpt: "",
      content: "",
      seo_title: "",
      seo_description: "",
    },
    ru: {
      title: "",
      excerpt: "",
      content: "",
      seo_title: "",
      seo_description: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function updateTranslation(
    language: Language,
    field: keyof Translation,
    value: string
  ) {
    setTranslations((current) => ({
      ...current,
      [language]: {
        ...current[language],
        [field]: value,
      },
    }));
  }

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage(
        "Dozvoljene su samo JPG, PNG i WebP slike."
      );

      event.target.value = "";
      return;
    }

    // Check file size - 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setMessage(
        "Slika mora biti manja od 5 MB."
      );

      event.target.value = "";
      return;
    }

    setMessage("");
    setFeaturedImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      // ==========================================
      // VALIDATION
      // ==========================================

      if (!slug.trim()) {
        throw new Error("Slug je obavezan.");
      }

      if (!featuredImage) {
        throw new Error("Glavna slika je obavezna.");
      }

      if (!translations.sr.title.trim()) {
        throw new Error("Naslov na srpskom jeziku je obavezan.");
      }

      if (!translations.sr.content.trim()) {
        throw new Error("Sadržaj na srpskom jeziku je obavezan.");
      }

      // ==========================================
      // GET CURRENT USER
      // ==========================================

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/admin/login");
        return;
      }

      // ==========================================
      // UPLOAD FEATURED IMAGE
      // ==========================================

      let featuredImageUrl: string | null = null;

      if (featuredImage) {
        const fileExtension =
          featuredImage.name
            .split(".")
            .pop()
            ?.toLowerCase() || "jpg";

        const fileName =
          `${crypto.randomUUID()}.${fileExtension}`;

        const filePath =
          `${user.id}/${fileName}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from("blog")
          .upload(
            filePath,
            featuredImage,
            {
              cacheControl: "3600",
              upsert: false,
              contentType: featuredImage.type,
            }
          );

        if (uploadError) {
          throw new Error(
            `Greška pri učitavanju slike: ${uploadError.message}`
          );
        }

        const {
          data: publicUrlData,
        } = supabase.storage
          .from("blog")
          .getPublicUrl(filePath);

        featuredImageUrl =
          publicUrlData.publicUrl;
      }

      // ==========================================
      // CREATE BLOG POST
      // ==========================================

      const {
        data: post,
        error: postError,
      } = await supabase
        .from("blog_posts")
        .insert({
          slug: slug.trim(),
          status,
          author_id: user.id,
          featured_image: featuredImageUrl,
          published_at:
            status === "published"
              ? new Date().toISOString()
              : null,
        })
        .select()
        .single();

      if (postError) {
        throw new Error(
          `Greška pri kreiranju blog objave: ${postError.message}`
        );
      }

      // ==========================================
      // CREATE TRANSLATIONS
      // ==========================================

      const languages: Language[] = [
        "sr",
        "en",
        "ru",
      ];

      const translationRows = languages
        .filter(
          (language) =>
            translations[language].title.trim()
        )
        .map((language) => ({
          post_id: post.id,
          language,
          title:
            translations[language].title.trim(),

          excerpt:
            translations[language].excerpt.trim() ||
            null,

          content:
            translations[language].content.trim(),

          seo_title:
            translations[language].seo_title.trim() ||
            null,

          seo_description:
            translations[language]
              .seo_description
              .trim() || null,
        }));

      if (translationRows.length === 0) {
        // Delete post if translations are missing
        await supabase
          .from("blog_posts")
          .delete()
          .eq("id", post.id);

        throw new Error(
          "Potrebna je najmanje jedna jezička verzija."
        );
      }

      const {
        error: translationError,
      } = await supabase
        .from("blog_post_translations")
        .insert(translationRows);

      if (translationError) {
        // Delete post if translations fail
        await supabase
          .from("blog_posts")
          .delete()
          .eq("id", post.id);

        throw new Error(
          `Greška pri kreiranju prevoda: ${translationError.message}`
        );
      }

      // ==========================================
      // SUCCESS
      // ==========================================

      router.push("/admin/blog");
      router.refresh();

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Došlo je do greške."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-6xl p-5 md:p-8">

        {/* ===================================== */}
        {/* HEADER */}
        {/* ===================================== */}

        <div className="mb-8">

          <Link
            href="/admin/blog"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            ← Nazad na blog
          </Link>

          <div className="mt-3">

            <h1 className="text-3xl font-bold text-gray-900">
              Nova blog objava
            </h1>

            <p className="mt-1 text-gray-500">
              Kreirajte višejezičnu blog objavu.
            </p>

          </div>

        </div>

        {/* ===================================== */}
        {/* ERROR MESSAGE */}
        {/* ===================================== */}

        {message && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* ===================================== */}
          {/* GENERAL */}
          {/* ===================================== */}

          <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

            <h2 className="text-xl font-semibold text-gray-900">
              Opšte informacije
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* SLUG */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  URL adresa (Slug)
                </label>

                <input
                  type="text"
                  value={slug}
                  onChange={(event) =>
                    setSlug(
                      event.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(
                          /[^a-z0-9-]/g,
                          ""
                        )
                    )
                  }
                  placeholder="my-first-blog-post"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  required
                />

                <p className="mt-1 text-xs text-gray-500">
                  Primer: /blog/my-first-blog-post
                </p>

              </div>

              {/* STATUS */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value as
                        | "draft"
                        | "published"
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gray-900"
                >
                  <option value="draft">
                    Nacrt
                  </option>

                  <option value="published">
                    Objavljeno
                  </option>
                </select>

              </div>

            </div>

          </section>

          {/* ===================================== */}
          {/* FEATURED IMAGE */}
          {/* ===================================== */}

          <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

            <div>

              <h2 className="text-xl font-semibold text-gray-900">
                Glavna slika
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Ova slika će biti korišćena kao glavna Hero slika za ovu blog objavu.
              </p>

            </div>

            <div className="mt-6">

              <label className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-gray-500 hover:bg-gray-100">

                {imagePreview ? (
                  <div className="w-full">

                    <img
                      src={imagePreview}
                      alt="Pregled glavne slike"
                      className="mx-auto max-h-[350px] w-full rounded-lg object-cover"
                    />

                    <p className="mt-3 text-xs text-gray-500">
                      Kliknite na sliku da izaberete drugu sliku.
                    </p>

                  </div>
                ) : (
                  <>
                    <div className="text-5xl">
                      🖼️
                    </div>

                    <p className="mt-4 text-sm font-semibold text-gray-900">
                      Kliknite da učitate glavnu sliku
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      JPG, PNG ili WebP
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Maksimalna veličina: 5 MB
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Preporučena veličina: 1200 × 630
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />

              </label>

            </div>

          </section>

          {/* ===================================== */}
          {/* LANGUAGES */}
          {/* ===================================== */}

          {(
            ["sr", "en", "ru"] as Language[]
          ).map((language) => {

            const labels = {
              sr: "🇷🇸 Srpski",
              en: "🇬🇧 Engleski",
              ru: "🇷🇺 Ruski",
            };

            return (
              <section
                key={language}
                className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
              >

                <h2 className="text-xl font-semibold text-gray-900">
                  {labels[language]}
                </h2>

                <div className="mt-6 space-y-5">

                  {/* TITLE */}
                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Naslov
                    </label>

                    <input
                      type="text"
                      value={
                        translations[language].title
                      }
                      onChange={(event) =>
                        updateTranslation(
                          language,
                          "title",
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                      required={language === "sr"}
                    />

                    {language === "sr" && (
                      <p className="mt-1 text-xs text-gray-500">
                        Obavezno polje
                      </p>
                    )}

                  </div>

                  {/* EXCERPT */}
                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Kratak opis
                    </label>

                    <textarea
                      value={
                        translations[language]
                          .excerpt
                      }
                      onChange={(event) =>
                        updateTranslation(
                          language,
                          "excerpt",
                          event.target.value
                        )
                      }
                      rows={3}
                      placeholder="Kratak opis blog objave..."
                      className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                    />

                  </div>

                  {/* CONTENT */}
                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Sadržaj
                    </label>

                    <RichTextEditor
                      value={translations[language].content}
                      onChange={(value) =>
                        updateTranslation(
                          language,
                          "content",
                          value
                        )
                      }
                      placeholder={`Napišite sadržaj blog objave na jeziku: ${language.toUpperCase()}...`}
                    />

                    {language === "sr" && (
                      <p className="mt-1 text-xs text-gray-500">
                        Obavezno polje
                      </p>
                    )}

                  </div>

                  {/* SEO */}
                  <div>

                    <h3 className="mb-4 text-sm font-semibold text-gray-900">
                      SEO podešavanja
                    </h3>

                    <div className="grid gap-5 md:grid-cols-2">

                      {/* SEO TITLE */}
                      <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          SEO naslov
                        </label>

                        <input
                          type="text"
                          value={
                            translations[
                              language
                            ].seo_title
                          }
                          onChange={(event) =>
                            updateTranslation(
                              language,
                              "seo_title",
                              event.target.value
                            )
                          }
                          placeholder="SEO naslov..."
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                        />

                      </div>

                      {/* SEO DESCRIPTION */}
                      <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          SEO opis
                        </label>

                        <input
                          type="text"
                          value={
                            translations[
                              language
                            ].seo_description
                          }
                          onChange={(event) =>
                            updateTranslation(
                              language,
                              "seo_description",
                              event.target.value
                            )
                          }
                          placeholder="SEO opis..."
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </section>
            );
          })}

          {/* ===================================== */}
          {/* BUTTONS */}
          {/* ===================================== */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/admin/blog"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Otkaži
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Učitavanje i čuvanje..."
                : "Sačuvaj blog objavu"}
            </button>

          </div>

        </form>

      </div>
    </main>
  );
}