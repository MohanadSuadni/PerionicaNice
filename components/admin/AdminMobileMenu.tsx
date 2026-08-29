"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type AdminMobileMenuProps = {
  email: string;
};

export default function AdminMobileMenu({
  email,
}: AdminMobileMenuProps) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
    <div className="flex items-center justify-between border-b bg-white px-5 py-4 md:hidden lg:hidden">
     <div className="relative h-28 w-40">
  <Image
              src="/Stylized__N__Logo_Design-removebg-preview (1).png"
    alt="Perionica Nice"
    fill
    priority
    className="object-contain object-left"
  />
</div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-2xl text-gray-800 shadow-sm"
          aria-label="Otvori meni"
        >
          ☰
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <button
          type="button"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-label="Zatvori meni"
        />
      )}

      {/* Mobile Menu */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85%] flex-col bg-white shadow-2xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex h-20 items-center justify-between border-b px-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              PERIONICA
            </h2>

            <p className="text-xs tracking-[0.25em] text-gray-500">
              NICE
            </p>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-gray-700 transition hover:bg-gray-100"
            aria-label="Zatvori meni"
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <Link
            href="/admin/dashboard"
            onClick={closeMenu}
            className="mb-2 flex items-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white"
          >
            Kontrolna tabla
          </Link>

          <Link
            href="/admin/pricing"
            onClick={closeMenu}
            className="mb-2 flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cenovnik
          </Link>

          <Link
            href="/admin/blog"
            onClick={closeMenu}
            className="mb-2 flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Blog objave
          </Link>

          <Link
            href="/admin/blog/new"
            onClick={closeMenu}
            className="mb-2 flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Nova blog objava
          </Link>

          <Link
            href="/admin/settings"
            onClick={closeMenu}
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
              {email}
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
    </>
  );
}