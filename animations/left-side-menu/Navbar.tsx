"use client";

import Links from "./Links";
import Link from "next/link";
import { navigationItems } from "@/constants";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { curve, menuSlide } from "@/motion";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { getDict } from "@/lib/lang";
import { languages } from "@/constants/languages";
type NavbarProps = {
  closeMenu: () => void;
};

export default function Navbar({ closeMenu }: NavbarProps) {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  const { lang } = useLang();
  const t = getDict(lang);

  // MODALS
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={menuSlide}
        initial="initial"
        animate="enter"
        exit="exit"
        className="h-screen bg-[#08647d] fixed right-0 top-0 text-white"
      >
        <div className="h-full flex flex-col justify-between py-[30px] px-[60px]">

          {/* NAV LINKS */}
          <div
            onMouseLeave={() => setSelectedIndicator(pathname)}
            className="flex flex-col items-center text-center text-[40px] mt-[60px]"
          >
            <div className="text-[#fec502] uppercase text-[12px] mb-[20px]">
              Navigation
            </div>

            {navigationItems.map((item, index) => {
              const isModal = item.id === "about" || item.id === "contact";

              if (isModal) {
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === "about") setIsAboutOpen(true);
                      if (item.id === "contact") setIsContactOpen(true);
                    }}
                    className="bg-transparent border-none cursor-pointer"
                  >
                    <Links
                      className="text-white"
                      data={{
                        title: t.nav[item.id],
                        href: item.href,
                        index,
                      }}
                      isActive={selectedIndicator === item.href}
                      setSelectedIndicator={setSelectedIndicator}
                    />
                  </button>
                );
              }

              return (
                <Link key={item.id} href={item.href}>
                  <div onClick={() => closeMenu()}>
                    <Links
                      className="text-white"
                      data={{
                        title: t.nav[item.id],
                        href: item.href,
                        index,
                      }}
                      isActive={selectedIndicator === item.href}
                      setSelectedIndicator={setSelectedIndicator}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* SOCIAL */}
          <div className="flex justify-between text-[12px]">
            <Link href="/">Instagram</Link>
            <Link href="/">LinkedIn</Link>
            <Link href="/">YouTube</Link>
          </div>

        </div>

        {/* CURVE */}
        <svg className="absolute top-0 left-[-99px] w-[100px] h-full fill-[#08647d]">
          <motion.path
            variants={curve}
            initial="initial"
            animate="enter"
            exit="exit"
          />
        </svg>
      </motion.div>

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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-[90%]">

            <h2 className="text-2xl font-bold text-[#08647d] mb-4">
              {t.contact.title}
            </h2>

            <p>📞 +38163211161</p>
            <p>✉️ office@pranjeipeglanje.rs</p>
            <p>📍 Obrenovac, Beograd</p>

            <div className="w-full h-64 mt-4 rounded-xl overflow-hidden">
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
              className="bg-[#08647d] text-white px-6 py-2 rounded-md mt-4"
            >
              Zatvori
            </button>
          </div>
        </div>
      )}
    </>
  );
}