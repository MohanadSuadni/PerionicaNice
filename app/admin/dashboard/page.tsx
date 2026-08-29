import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminMobileMenu from "@/components/admin/AdminMobileMenu";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { count: totalPosts } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true });

  const { count: publishedPosts } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  const { count: draftPosts } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("status", "draft");

  
   return (
  <div className="min-h-screen bg-gray-100">
    <div className="flex min-h-screen">

      {/* Desktop Sidebar */}
<aside className="hidden md:flex  lg:flex     w-64 flex-col bg-white shadow-md shadow-lg ">
   <div className="relative h-28 w-40">
  <Image
              src="/Stylized__N__Logo_Design-removebg-preview (1).png"
    alt="Perionica Nice"
    fill
    priority
    className="object-contain object-left"
  />
</div>       <div className="flex h-20 items-center border-b px-6">
          <div>
            <h1 className="text-xl font-bold tracking-wide text-gray-900">
              Administratorski panel
            </h1>

            <p className="text-xs tracking-[0.25em] text-gray-500">
              NICE
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">

          <Link
            href="/admin/dashboard"
            className="mb-2 flex items-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white"
          >
            Kontrolna tabla
          </Link>

          <Link
            href="/admin/pricing"
            className="mb-2 flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cenovnik
          </Link>

          <Link
            href="/admin/blog"
            className="mb-2 flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Blog objave
          </Link>

          <Link
            href="/admin/blog/new"
            className="mb-2 flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Nova blog objava
          </Link>

          <Link
            href="/admin/settings"
            className="mb-2 flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Podešavanja
          </Link>

        </nav>

        {/* User */}
        <div className="border-t p-4">

          <div className="mb-4 rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">
              Prijavljeni ste kao
            </p>

            <p className="mt-1 truncate text-sm font-medium text-gray-900">
              {user.email}
            </p>
          </div>

          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Odjavi se
            </button>
          </form>

        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">

        {/* Mobile Menu */}
        <AdminMobileMenu email={user.email ?? ""} />

        <div className="mx-auto max-w-7xl p-5 md:p-8">

          {/* Header */}
          <div className="mb-8">

            <p className="text-sm font-medium text-gray-500">
              Administratorski panel
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              Kontrolna tabla
            </h2>

            <p className="mt-2 text-gray-600">
              Dobrodošli nazad, {user.email}
            </p>

          </div>

          {/* ostatak tvog dashboard koda... */}

  
            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {/* Total */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

                <p className="text-sm font-medium text-gray-500">
                  Ukupno blog objava
                </p>

                <div className="mt-4 flex items-end justify-between">

                  <p className="text-4xl font-bold text-gray-900">
                    {totalPosts ?? 0}
                  </p>

                  <div className="rounded-xl bg-gray-100 px-3 py-2 text-xl">
                    📝
                  </div>

                </div>

              </div>

              {/* Published */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

                <p className="text-sm font-medium text-gray-500">
                  Objavljeno
                </p>

                <div className="mt-4 flex items-end justify-between">

                  <p className="text-4xl font-bold text-green-600">
                    {publishedPosts ?? 0}
                  </p>

                  <div className="rounded-xl bg-green-50 px-3 py-2 text-xl">
                    ✓
                  </div>

                </div>

              </div>

              {/* Drafts */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

                <p className="text-sm font-medium text-gray-500">
                  Nacrti
                </p>

                <div className="mt-4 flex items-end justify-between">

                  <p className="text-4xl font-bold text-orange-500">
                    {draftPosts ?? 0}
                  </p>

                  <div className="rounded-xl bg-orange-50 px-3 py-2 text-xl">
                    ✎
                  </div>

                </div>

              </div>

            </div>

            {/* Blog Management */}
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Upravljanje blogom
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Kreirajte i upravljajte svojim višejezičnim blog objavama.
                  </p>
                </div>

                <Link
                  href="/admin/blog/new"
                  className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  + Nova blog objava
                </Link>

              </div>

            </div>

            {/* Quick Links */}
            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <Link
                href="/admin/blog"
                className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Blog objave
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Pregledajte, uređujte i brišite svoje blog objave.
                </p>

                <p className="mt-5 text-sm font-medium text-gray-900">
                  Upravljaj blog objavama →
                </p>
              </Link>

              <Link
                href="/admin/blog/new"
                className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Kreiraj blog objavu
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Kreirajte novu blog objavu na više jezika.
                </p>

                <p className="mt-5 text-sm font-medium text-gray-900">
                  Kreiraj blog objavu →
                </p>
              </Link>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}