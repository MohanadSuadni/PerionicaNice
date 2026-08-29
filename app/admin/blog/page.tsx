import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DeletePostButton from "./components/DeletePostButton";

type BlogPost = {
  id: string;
  slug: string;
  featured_image: string | null;
  status: "draft" | "published";
  created_at: string;
  published_at: string | null;
};

type Translation = {
  post_id: string;
  language: "sr" | "en" | "ru";
  title: string;
};

export default async function AdminBlogPage() {
  const supabase = await createClient();

  // ==========================================
  // CHECK USER
  // ==========================================

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // ==========================================
  // GET POSTS
  // ==========================================

  const {
    data: posts,
    error: postsError,
  } = await supabase
    .from("blog_posts")
    .select(
      `
        id,
        slug,
        featured_image,
        status,
        created_at,
        published_at
      `
    )
    .order("created_at", {
      ascending: false,
    });

  if (postsError) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            Greška pri učitavanju blog objava:
            <br />
            {postsError.message}
          </div>
        </div>
      </main>
    );
  }

  const postList = (posts || []) as BlogPost[];

  // ==========================================
  // GET TRANSLATIONS
  // ==========================================

  const postIds = postList.map((post) => post.id);

  let translations: Translation[] = [];

  if (postIds.length > 0) {
    const {
      data: translationData,
    } = await supabase
      .from("blog_post_translations")
      .select(
        `
          post_id,
          language,
          title
        `
      )
      .in("post_id", postIds);

    translations = (translationData || []) as Translation[];
  }

  // ==========================================
  // HELPERS
  // ==========================================

  function getTitle(postId: string) {
    const translation = translations.find(
      (item) =>
        item.post_id === postId &&
        item.language === "sr"
    );

    if (translation?.title) {
      return translation.title;
    }

    const fallback = translations.find(
      (item) => item.post_id === postId
    );

    return fallback?.title || "Blog objava bez naslova";
  }

  function getLanguages(postId: string) {
    return translations
      .filter((item) => item.post_id === postId)
      .map((item) => item.language);
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("sr-RS", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-gray-100">

      <div className="mx-auto max-w-7xl p-5 md:p-8">

        {/* ================================== */}
        {/* HEADER */}
        {/* ================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <Link
              href="/admin/dashboard"
              className="text-sm text-gray-500 transition hover:text-gray-900"
            >
              ← Kontrolna tabla
            </Link>

            <h1 className="mt-3 text-3xl font-bold text-gray-900">
              Blog objave
            </h1>

            <p className="mt-1 text-gray-500">
              Upravljajte svojim višejezičnim blog objavama.
            </p>

          </div>

          <Link
            href="/admin/blog/new"
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            + Nova blog objava
          </Link>

        </div>

        {/* ================================== */}
        {/* EMPTY STATE */}
        {/* ================================== */}

        {postList.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-200">

            <div className="text-5xl">
              📝
            </div>

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Još nema blog objava
            </h2>

            <p className="mt-2 text-gray-500">
              Kreirajte svoju prvu blog objavu.
            </p>

            <Link
              href="/admin/blog/new"
              className="mt-6 inline-flex rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Kreiraj blog objavu
            </Link>

          </div>
        ) : (

          /* ================================== */
          /* POSTS */
          /* ================================== */

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">

            {/* Desktop header */}

            <div className="hidden border-b border-gray-200 bg-gray-50 px-6 py-4 md:grid md:grid-cols-[100px_1fr_160px_140px_150px] md:items-center md:gap-5">

              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Slika
              </div>

              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Blog objava
              </div>

              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Jezici
              </div>

              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </div>

              <div className="text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Radnje
              </div>

            </div>

            {/* Posts */}

            <div className="divide-y divide-gray-200">

              {postList.map((post) => {

                const languages =
                  getLanguages(post.id);

                const title =
                  getTitle(post.id);

                return (
                  <div
                    key={post.id}
                    className="p-5 transition hover:bg-gray-50 md:grid md:grid-cols-[100px_1fr_160px_140px_150px] md:items-center md:gap-5 md:px-6"
                  >

                    {/* IMAGE */}

                    <div>

                      {post.featured_image ? (
                        <img
                          src={post.featured_image}
                          alt={title}
                          className="h-20 w-full rounded-lg object-cover md:h-16 md:w-24"
                        />
                      ) : (
                        <div className="flex h-20 w-full items-center justify-center rounded-lg bg-gray-100 text-2xl md:h-16 md:w-24">
                          🖼️
                        </div>
                      )}

                    </div>

                    {/* POST */}

                    <div className="mt-4 md:mt-0">

                      <h2 className="font-semibold text-gray-900">
                        {title}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        /blog/{post.slug}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Kreirano {formatDate(post.created_at)}
                      </p>

                    </div>

                    {/* LANGUAGES */}

                    <div className="mt-4 flex flex-wrap gap-2 md:mt-0">

                      {languages.includes("sr") && (
                        <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          🇷🇸 SR
                        </span>
                      )}

                      {languages.includes("en") && (
                        <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                          🇬🇧 EN
                        </span>
                      )}

                      {languages.includes("ru") && (
                        <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                          🇷🇺 RU
                        </span>
                      )}

                    </div>

                    {/* STATUS */}

                    <div className="mt-4 md:mt-0">

                      {post.status === "published" ? (
                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Objavljeno
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          Nacrt
                        </span>
                      )}

                    </div>

                    {/* ACTIONS */}

                    <div className="mt-5 flex gap-2 md:mt-0 md:justify-end">

                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        Uredi
                      </Link>

                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        Pogledaj
                      </Link>

                      <DeletePostButton
                        postId={post.id}
                        title={title}
                      />

                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        )}

      </div>

    </main>
  );
}