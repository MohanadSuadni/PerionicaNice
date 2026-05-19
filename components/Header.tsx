"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components";
import { navVariants } from "@/motion";
import { MobileMenu } from "@/animations";
import { navigationItems } from "@/constants";
import { logo } from "@/public";
import { motion } from "framer-motion";
import { useState } from "react";
import { getDict } from "@/lib/lang";
import { languages } from "@/constants/languages";
import {
  usePathname,
  useRouter,
  useParams,
} from "next/navigation";

export default function Navbar() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [open, setOpen] = useState(false); // ✔ FIX

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // LANG IZ URL-a
  const lang = (params.lang as "sr" | "en" | "ru") || "sr";
const currentLang = languages.find((l) => l.code === lang) || languages[0];
  // PREVODI
  const t = getDict(lang);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    itemId: string
  ) => {
    if (itemId === "about") {
      e.preventDefault();
      setIsAboutOpen(true);
    }

    if (itemId === "contact") {
      e.preventDefault();
      setIsContactOpen(true);
    }
  };

  // PROMENA JEZIKA
  const changeLanguage = (newLang: string) => {
    const segments = pathname.split("/");

    // ako nema lang segment
    if (!segments[1]) {
      router.push(`/${newLang}`);
      return;
    }

    // zameni lang
    segments[1] = newLang;

    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.div
        initial="initial"
        whileInView="enter"
        variants={navVariants}
        className="fixed w-full top-0 z-50 xm:hidden sm:hidden bg-gradient-to-r from-black/60 via-white/15 to-white/3"
      >
        <div className="w-full flex items-center justify-between px-6 py-3">

          {/* LEFT */}
          <div className="flex items-center gap-6">
         <Image
  src={logo}
  alt="logo"
  width={351}
  height={170}
  className="h-auto w-[150px]"
/>

            {navigationItems.map((item) => (
              <Link
                key={item.id}
href={
  item.id === "about" || item.id === "contact"
    ? "#"
    : `/${lang}${item.href}`
}                onClick={(e) => handleNavClick(e, item.id)}
                className="text-white text-[18px] font-[Inter] hover:text-[#fec502] transition"
              >
                {t.nav?.[item.id] || item.id}
              </Link>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* LANG SWITCH */}
       <div className="relative">
  {/* TOGGLE */}
  <button
    onClick={() => setOpen(!open)}
    className="
      flex items-center gap-2
      px-4 py-1.5
      rounded-full
      bg-white/10 backdrop-blur-md
      border border-white/20
      hover:bg-white/20
      transition
      active:scale-95
    "
  >
    {/* FLAG (GLAVNI UX ELEMENT) */}
    <Image
  src={
    lang === "sr"
      ? "/flags/rs.png"
      : lang === "en"
      ? "/flags/en.png"
      : "/flags/ru.webp"
  }
  alt={
    lang === "sr"
      ? "Srpski jezik"
      : lang === "en"
      ? "English language"
      : "Русский язык"
  }
  width={20}
  height={20}
  className="rounded-sm"
/>

    {/* TEXT */}
          <span className="text-white hover:text-[#fec502] text-sm font-medium">
      {lang.toUpperCase()}
    </span>
  </button>

  {/* DROPDOWN */}
  {open && (
    <div className="
      absolute right-0 mt-2
      min-w-[140px]
      rounded-xl
      bg-white/90 backdrop-blur-xl
      shadow-xl
      overflow-hidden
      z-50
    ">
      {languages.map((lng) => (
        <button
          key={lng.code}
          onClick={() => {
            changeLanguage(lng.code);
            setOpen(false);
          }}
          className="
            w-full flex items-center gap-2
            px-4 py-2
            hover:bg-gray-100
            transition
          "
        >
        <Image
  src={
    lng.code === "sr"
      ? "/flags/rs.png"
      : lng.code === "en"
      ? "/flags/en.png"
      : "/flags/ru.webp"
  }
  alt={lng.label}
  width={18}
  height={18}
  className="rounded-sm"
/>

          <span className="text-sm text-gray-800">
            {lng.label}
          </span>
        </button>
      ))}
    </div>
  )}
</div>
            {/* LOGIN */}
    <button
  aria-label="Uloguj se"
  className="
    px-6
    py-3
    rounded-full
    border
    border-white/20
    bg-white/10
    backdrop-blur-md
text-yellow-400/80
    font-medium
    transition-all
    duration-300
    hover:bg-[#08647d]
    hover:text-white
    hover:border-[#08647d]
    shadow-md
    active:scale-95
  "
>
  Uloguj se
</button>
          </div>
        </div>
      </motion.div>

      {/* Mobile */}
      <div className="fixed w-full top-0 z-50 hidden xm:block sm:block">
        <MobileMenu />
      </div>

      {/* ABOUT MODAL */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-[90%] text-center relative animate-fadeIn overflow-y-auto max-h-[80vh]">

            <h2 className="text-2xl font-bold text-[#08647d] mb-4">
              {t.about.title}
            </h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              <span className="font-semibold">
                Maestro Cleaning
              </span>{" "}
              {t.about.p1}
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              {t.about.p2}
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              {t.about.p3}
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Maestro Cleaning – {t.about.vision}
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              {t.about.extra}
            </p>

            <button
              onClick={() => setIsAboutOpen(false)}
              className="bg-[#08647d] text-white px-6 py-2 rounded-md hover:bg-[#064c5d] transition"
            >
              {t.common.close}
            </button>
          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-[90%] text-center">

            <h2 className="text-2xl font-bold text-[#08647d] mb-4">
              {t.contact.title}
            </h2>

            <div className="space-y-2 mb-4 text-gray-800">

              <p>📞 +38163211161</p>

              <p>✉️ office@pranjeipeglanje.rs</p>

              <p>
                📍 Aleksandra Ace Simovića 11a,
                11500 Obrenovac, Beograd
              </p>

              <p>
                ⏰ Radno vreme:{" "}
                <span className="font-semibold">
                  Ponedeljak – Petak: 08:00 – 15:00
                </span>
              </p>
            </div>

            {/* MAP */}
            <div className="w-full h-64 rounded-xl overflow-hidden mb-4">
              <iframe
                src="https://www.google.com/maps?q=Aleksandra+Ace+Simovića+11a+Obrenovac&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

            <button
              onClick={() => setIsContactOpen(false)}
              className="bg-[#08647d] text-white px-6 py-2 rounded-md"
            >
              {t.common.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
}