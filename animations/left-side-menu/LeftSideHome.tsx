"use client";
import Navbar from "./Navbar";
import Image from "next/image";
import { logo } from "@/public";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navVariants } from "@/motion";
import { useLang } from "@/context/LangContext";
import { languages } from "@/constants/languages";
import ReactCountryFlag from "react-country-flag";
export default function LeftSideHome() {
  const [isActive, setIsActive] = useState(false);
  const { lang, setLang } = useLang();

  return (
    <>
      {/* Gornji navbar container */}
      <motion.div
        variants={navVariants}
        initial="initial"
        whileInView="enter"
        viewport={{ once: true }}
        className="fixed top-0 left-0 w-full flex items-center justify-between gap-5 padding-x py-[12px] 
                   bg-gradient-to-r from-black/70 via-white/0 to-white/0 shadow-md  
                   z-[999] transition-all duration-500"
      >
        {/* Logo */}
        <div>
          <Image src={logo} alt="logo" width={120} height={70} />
        </div>
<div className="flex items-center bg-black/60 backdrop-blur-xl px-1 py-1 rounded-full border border-white/20">

  {languages.map((lng) => {
    const active = lang === lng.code;

    return (
      <button
        key={lng.code}
        onClick={() => setLang(lng.code as "sr" | "en" | "ru")}
        className="relative flex items-center gap-1 px-3 py-1 text-xs rounded-full transition-all"
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
          style={{
            width: "1.1em",
            height: "1.1em",
            borderRadius: "3px",
          }}
        />

        {/* LABEL */}
        <span
          className={`uppercase tracking-wide transition-colors ${
            active ? "text-black font-semibold" : "text-white"
          }`}
        >
          {lng.label}
        </span>

        {/* ACTIVE BACKGROUND */}
        {active && (
          <motion.div
            layoutId="lang-indicator"
            className="absolute inset-0 bg-yellow-400 rounded-full -z-10"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
      </button>
    );
  })}
</div>
        {/* Hamburger dugme */}
        <div className="z-10">
          <div
            onClick={() => setIsActive(!isActive)}
            className="w-[50px] h-[50px] rounded-full bg-[#08647d] cursor-pointer flex items-center justify-center relative"
          >
            <div
              className={`w-[50%] h-[2px] bg-[#fec502] absolute ${
                !isActive && "top-[45%]"
              } transform -translate-x-1/3 -translate-y-1/3`}
              style={{
                transform: isActive ? "rotate(45deg)" : "none",
                transition: "transform 0.3s",
              }}
            />
            <div
              className={`w-[45%] h-[2px] bg-[#fec502] absolute ${
                !isActive && "top-[55%]"
              } transform -translate-x-1/3 -translate-y-1/3`}
              style={{
                transform: isActive ? "rotate(-45deg)" : "none",
                transition: "transform 0.3s",
              }}
            />
            <div
              className={`w-[50%] h-[2px] bg-[#fec502] absolute ${
                !isActive && "top-[65%]"
              } transform -translate-x-1/3 -translate-y-1/3`}
              style={{
                transform: isActive ? "rotate(-45deg)" : "none",
                transition: "transform 0.3s",
              }}
            />
          </div>
        </div>



        
      </motion.div>
 
      {/* Otvaranje navigacije */}
      <AnimatePresence mode="wait">
        {isActive && <Navbar closeMenu={() => setIsActive(false)} />}
      </AnimatePresence>
    </>
  );
}
