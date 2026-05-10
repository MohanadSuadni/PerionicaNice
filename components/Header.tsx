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
import { useLang } from "@/context/LangContext";
import { getDict } from "@/lib/lang";
import { languages } from "@/constants/languages";
import ReactCountryFlag from "react-country-flag";
export default function Navbar() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const { setLang, lang } = useLang();
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
            <Image src={logo} alt="logo" width={150} height={80} priority />

            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className="text-white text-[18px] font-[Inter] hover:text-[#fec502] transition"
              >
                {t.nav?.[item.id] || item.id}
              </Link>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            
            {/* LANG SWITCH */}
       <div className="flex gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
  {languages.map((lng) => (
    <button
      key={lng.code}
      onClick={() => setLang(lng.code as "sr" | "en" | "ru")}
      className={`px-3 py-1 text-sm rounded-full transition-all flex items-center gap-1 ${
        lang === lng.code
          ? "bg-yellow-400 text-black font-semibold"
          : "text-white hover:bg-white/20"
      }`}
    >
      {/* FLAG */}
      <ReactCountryFlag
        countryCode={
          lng.code === "sr"
            ? "RS"
            : lng.code === "en"
            ? "GB"
            : "RU"
        }
        svg
        style={{ width: "1.2em", height: "1.2em" }}
      />

      {/* LABEL */}
      <span>{lng.label}</span>
    </button>
  ))}
</div>
            {/* LOGIN */}
            <Button
              className="text-[#fec502] px-4 py-2 bg-[#08647d] rounded-md drop-shadow-lg"
              title={t.nav?.login || "Login"}
            />
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
        <span className="font-semibold">Maestro Cleaning</span>{" "}
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
          📍Aleksandra Ace Simovića 11a, 11500 Obrenovac, Beograd

        </p>

        <p>
          ⏰  Radno vreme: <span className="font-semibold">Ponedeljak – Petak: 08:00 – 15:00</span>
        </p>
      </div>

      {/* MAPA (REAL FIX) */}
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