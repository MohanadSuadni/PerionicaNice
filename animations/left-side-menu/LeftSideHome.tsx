"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter, usePathname } from "next/navigation";

import Navbar from "./Navbar";
import { logo } from "@/public";
import { navVariants } from "@/motion";
import { getDict } from "@/lib/lang";
import { languages } from "@/constants/languages";
import ReactCountryFlag from "react-country-flag";

export default function LeftSideHome() {
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false); // ✔ FIX

  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const lang = (params.lang as "sr" | "en" | "ru") || "sr";
  const t = getDict(lang);

  const changeLanguage = (newLang: string) => {
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
  };

  return (
    <>
      <motion.div
        variants={navVariants}
        initial="initial"
        whileInView="enter"
        viewport={{ once: true }}
        className="fixed top-0 left-0 w-full flex items-center justify-between gap-5 px-6 py-3 
        bg-gradient-to-r from-black/70 via-white/0 to-white/0 z-[999]"
      >
        {/* LOGO */}
        <div>
          <Image src={logo} alt="logo" width={120} height={70} />
        </div>

        {/* LANGUAGE SWITCH */}
      
                  {/* LANG SWITCH */}
             <div className="relative">
        {/* TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="
            flex items-center gap-2
            px-3 py-1.5
            rounded-full
            bg-white/10 backdrop-blur-md
            border border-white/20
            hover:bg-white/20
            transition
            active:scale-95
          "
        >
          {/* FLAG (GLAVNI UX ELEMENT) */}
          <ReactCountryFlag
            countryCode={
              lang === "sr" ? "RS" :
              lang === "en" ? "GB" : "RU"
            }
            aria-label={lang}
            svg
            style={{
              width: "1.2em",
              height: "1.2em",
            }}
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
                <ReactCountryFlag
                  countryCode={
                    lng.code === "sr" ? "RS" :
                    lng.code === "en" ? "GB" : "RU"
                  }
                  svg
                  style={{
                    width: "1.2em",
                    height: "1.2em",
                  }}
                />
      
                <span className="text-sm text-gray-800">
                  {lng.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
        {/* HAMBURGER */}
        <div className="z-10">
          <div
            onClick={() => setIsActive(!isActive)}
            className="w-[50px] h-[50px] rounded-full bg-[#08647d] cursor-pointer flex items-center justify-center relative"
          >
            <div
              className="w-[50%] h-[2px] bg-[#fec502] absolute transition-transform"
              style={{
                transform: isActive ? "rotate(45deg)" : "translateY(-6px)",
              }}
            />
            <div
              className="w-[50%] h-[2px] bg-[#fec502] absolute transition-opacity"
              style={{
                opacity: isActive ? 0 : 1,
              }}
            />
            <div
              className="w-[50%] h-[2px] bg-[#fec502] absolute transition-transform"
              style={{
                transform: isActive ? "rotate(-45deg)" : "translateY(6px)",
              }}
            />
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {isActive && <Navbar closeMenu={() => setIsActive(false)} />}
      </AnimatePresence>
    </>
  );
}