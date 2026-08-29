"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import RichTextEditor from "../../components/RichTextEditor";

type Language = "sr" | "en" | "ru";

type Translation = {
  title: string;
  excerpt: string;
  content: string;
  seo_title: string;
  seo_description: string;
};

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();

  const supabase = createClient();

  const postId = params.id as string;

  const [slug, setSlug] = useState("");
  const [status, setStatus] =
    useState<"draft" | "published">("draft");

  const [featuredImage, setFeaturedImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [currentImage, setCurrentImage] =
    useState("");

  const [translations, setTranslations] =
    useState<Record<Language, Translation>>({
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

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ==========================================
  // LOAD POST
  // ==========================================

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/admin/login");
          return;
        }

        // Get post

        const {
          data: post,
          error: postError,
        } = await supabase
          .from("blog_posts")
          .select(
            `
              id,
              slug,
              featured_image,
              status
            `
          )
          .eq("id", postId)
          .single();

        if (postError) {
          throw new Error(
            postError.message
          );
        }

        if (!post) {
          throw new Error(
            "Objava nije pronađena."
          );
        }

        setSlug(post.slug);

        setStatus(
          post.status as
            | "draft"
            | "published"
        );

        if (post.featured_image) {
          setCurrentImage(
            post.featured_image
          );
        }

        // Get translations

        const {
          data: translationData,
          error: translationError,
        } = await supabase
          .from("blog_post_translations")
          .select(
            `
              language,
              title,
              excerpt,
              content,
              seo_title,
              seo_description
            `
          )
          .eq("post_id", postId);

        if (translationError) {
          throw new Error(
            translationError.message
          );
        }

        const newTranslations: Record<
          Language,
          Translation
        > = {
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
        };

        for (const translation of
          translationData || []) {
          const language =
            translation.language as Language;

          if (
            language === "sr" ||
            language === "en" ||
            language === "ru"
          ) {
            newTranslations[
              language
            ] = {
              title:
                translation.title || "",

              excerpt:
                translation.excerpt || "",

              content:
                translation.content || "",

              seo_title:
                translation.seo_title || "",

              seo_description:
                translation.seo_description ||
                "",
            };
          }
        }

        setTranslations(
          newTranslations
        );
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Učitavanje objave nije uspelo."
        );
      } finally {
        setLoading(false);
      }
    }

    if (postId) {
      loadPost();
    }
  }, [postId]);

  // ==========================================
  // UPDATE TRANSLATION
  // ==========================================

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

  // ==========================================
  // IMAGE CHANGE
  // ==========================================

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(file.type)
    ) {
      setMessage(
        "Dozvoljene su samo JPG, PNG i WebP slike."
      );

      event.target.value = "";

      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setMessage(
        "Slika mora biti manja od 5 MB."
      );

      event.target.value = "";

      return;
    }

    setMessage("");
    setSuccess("");

    setFeaturedImage(file);

    setImagePreview(
      URL.createObjectURL(file)
    );
  }

  // ==========================================
  // SAVE
  // ==========================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setSuccess("");
    setSaving(true);

    let uploadedFilePath: string | null =
      null;

    try {
      if (!slug.trim()) {
        throw new Error(
          "Slug je obavezan."
        );
      }

      if (
        !translations.sr.title.trim()
      ) {
        throw new Error(
          "Naslov na srpskom jeziku je obavezan."
        );
      }

      if (
        !translations.sr.content.trim()
      ) {
        throw new Error(
          "Sadržaj na srpskom jeziku je obavezan."
        );
      }

      // ======================================
      // USER
      // ======================================

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/admin/login");
        return;
      }

      // ======================================
      // IMAGE
      // ======================================

      let imageUrl =
        currentImage || null;

      if (featuredImage) {
        const extension =
          featuredImage.name
            .split(".")
            .pop()
            ?.toLowerCase() || "jpg";

        const fileName =
          `${crypto.randomUUID()}.${extension}`;

        uploadedFilePath =
          `${user.id}/${fileName}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from("blog")
          .upload(
            uploadedFilePath,
            featuredImage,
            {
              cacheControl: "3600",
              upsert: false,
              contentType:
                featuredImage.type,
            }
          );

        if (uploadError) {
          throw new Error(
            `Otpremanje slike nije uspelo: ${uploadError.message}`
          );
        }

        const {
          data: publicUrlData,
        } = supabase.storage
          .from("blog")
          .getPublicUrl(
            uploadedFilePath
          );

        imageUrl =
          publicUrlData.publicUrl;
      }

      // ======================================
      // UPDATE POST
      // ======================================

      const {
        error: postError,
      } = await supabase
        .from("blog_posts")
        .update({
          slug: slug.trim(),

          status,

          featured_image: imageUrl,

          published_at:
            status === "published"
              ? new Date().toISOString()
              : null,

          updated_at:
            new Date().toISOString(),
        })
        .eq("id", postId);

      if (postError) {
        // Delete newly uploaded image
        if (uploadedFilePath) {
          await supabase.storage
            .from("blog")
            .remove([
              uploadedFilePath,
            ]);
        }

        if (
          postError.code === "23505"
        ) {
          throw new Error(
            "Ovaj slug već postoji. Izaberite drugi slug."
          );
        }

        throw new Error(
          `Izmena objave nije uspela: ${postError.message}`
        );
      }

      // ======================================
      // TRANSLATIONS
      // ======================================

      const languages: Language[] = [
        "sr",
        "en",
        "ru",
      ];

      for (const language of languages) {
        const translation =
          translations[language];

        const hasContent =
          translation.title.trim() ||
          translation.content.trim();

        if (!hasContent) {
          // Remove translation if all fields empty
          await supabase
            .from(
              "blog_post_translations"
            )
            .delete()
            .eq("post_id", postId)
            .eq(
              "language",
              language
            );

          continue;
        }

        const {
          data: existingTranslation,
        } = await supabase
          .from(
            "blog_post_translations"
          )
          .select("id")
          .eq("post_id", postId)
          .eq(
            "language",
            language
          )
          .maybeSingle();

        if (existingTranslation) {
          const {
            error:
              translationUpdateError,
          } = await supabase
            .from(
              "blog_post_translations"
            )
            .update({
              title:
                translation.title.trim(),

              excerpt:
                translation.excerpt.trim() ||
                null,

              content:
                translation.content.trim(),

              seo_title:
                translation.seo_title
                  .trim() || null,

              seo_description:
                translation.seo_description
                  .trim() || null,

              updated_at:
                new Date().toISOString(),
            })
            .eq(
              "id",
              existingTranslation.id
            );

          if (
            translationUpdateError
          ) {
            throw new Error(
              `Izmena prevoda na jeziku ${language} nije uspela: ${translationUpdateError.message}`
            );
          }
        } else {
          const {
            error:
              translationInsertError,
          } = await supabase
            .from(
              "blog_post_translations"
            )
            .insert({
              post_id: postId,

              language,

              title:
                translation.title.trim(),

              excerpt:
                translation.excerpt.trim() ||
                null,

              content:
                translation.content.trim(),

              seo_title:
                translation.seo_title
                  .trim() || null,

              seo_description:
                translation.seo_description
                  .trim() || null,
            });

          if (
            translationInsertError
          ) {
            throw new Error(
              `Kreiranje prevoda na jeziku ${language} nije uspelo: ${translationInsertError.message}`
            );
          }
        }
      }

      // ======================================
      // SUCCESS
      // ======================================

      setCurrentImage(
        imageUrl || ""
      );

      setFeaturedImage(null);
      setImagePreview("");

      setSuccess(
        "Objava je uspešno izmenjena."
      );

      router.refresh();

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Došlo je do greške."
      );
    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">

        <div className="rounded-xl bg-white px-8 py-6 shadow-sm">
          <p className="text-gray-600">
            Učitavanje objave...
          </p>
        </div>

      </main>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-gray-100">

      <div className="mx-auto max-w-6xl p-5 md:p-8">

        {/* HEADER */}

        <div className="mb-8">

          <Link
            href="/admin/blog"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            ← Nazad na blog
          </Link>

          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Izmeni blog objavu
          </h1>

          <p className="mt-1 text-gray-500">
            Izmenite svoju višejezičnu blog objavu.
          </p>

        </div>

        {/* MESSAGE */}

        {message && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {message}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* GENERAL */}

          <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

            <h2 className="text-xl font-semibold text-gray-900">
              Opšte informacije
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Slug
                </label>

                <input
                  type="text"
                  value={slug}
                  onChange={(event) =>
                    setSlug(
                      event.target.value
                        .toLowerCase()
                        .replace(
                          /\s+/g,
                          "-"
                        )
                        .replace(
                          /[^a-z0-9-]/g,
                          ""
                        )
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  required
                />

              </div>

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

          {/* FEATURED IMAGE */}

          <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

            <h2 className="text-xl font-semibold text-gray-900">
              Naslovna slika
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Promenite glavnu Hero sliku ako je potrebno.
            </p>

            <div className="mt-6">

              <label className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center hover:border-gray-500">

                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Nova naslovna slika"
                    className="max-h-[350px] w-full rounded-lg object-cover"
                  />
                ) : currentImage ? (
                  <img
                    src={currentImage}
                    alt="Trenutna naslovna slika"
                    className="max-h-[350px] w-full rounded-lg object-cover"
                  />
                ) : (
                  <>
                    <div className="text-5xl">
                      🖼️
                    </div>

                    <p className="mt-4 text-sm font-semibold text-gray-900">
                      Kliknite da otpremite Hero sliku
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      JPG, PNG ili WebP
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={
                    handleImageChange
                  }
                />

              </label>

            </div>

          </section>

          {/* LANGUAGES */}

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
                        translations[
                          language
                        ].title
                      }
                      onChange={(event) =>
                        updateTranslation(
                          language,
                          "title",
                          event.target.value
                        )
                      }
                      required={
                        language === "sr"
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                    />

                  </div>

                  {/* EXCERPT */}

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Kratak opis
                    </label>

                    <textarea
                      value={
                        translations[
                          language
                        ].excerpt
                      }
                      onChange={(event) =>
                        updateTranslation(
                          language,
                          "excerpt",
                          event.target.value
                        )
                      }
                      rows={3}
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
                      placeholder={`Napišite sadržaj objave na ${labels[language].split(" ")[1] || language} jeziku...`}
                    />

                  </div>

                  {/* SEO */}

                  <div>

                    <h3 className="mb-4 text-sm font-semibold text-gray-900">
                      SEO
                    </h3>

                    <div className="grid gap-5 md:grid-cols-2">

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
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                        />

                      </div>

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
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </section>
            );
          })}

          {/* BUTTONS */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/admin/blog"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Otkaži
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Čuvanje..."
                : "Sačuvaj izmene"}
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}