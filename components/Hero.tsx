"use client";

import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Navbar } from "@/components";
import { textAnimation } from "@/motion";
import { Phone } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { getDict } from "@/lib/lang";

export default function Hero() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // ✅ MUST be inside component
  const { lang } = useLang();
  const t = useMemo(() => getDict(lang), [lang]);

  // 👉 lakši pristup
  const hero = t.hero;

  return (
    <div
      ref={container}
      className="relative w-full h-screen xm:min-h-screen sm:min-h-screen overflow-hidden"
    >
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source
          src="/videos/8756951-uhd_4096_2160_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50 -z-0" />

      {/* NAVBAR */}
      <Navbar />

      {/* HERO CONTENT */}
      <div className="w-full h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 lg:px-0 relative z-10">
        <div className="w-full lg:max-w-[900px] lg:ml-12">

          {/* TITLE */}
          <h1 className="text-4xl lg:text-7xl sm:text-3xl font-[Inter] text-white drop-shadow-lg">
            {hero.title}
          </h1>

          {/* LOCATIONS */}
          <h2 className="text-2xl lg:text-5xl sm:text-2xl font-[Inter] text-white drop-shadow-lg">
            <span className="text-yellow-400/80">Novi Beograd</span>{" "}
            <span className="text-yellow-400/80">Surčin</span>{" "}
            <span className="text-yellow-400/80">Obrenovac</span>
          </h2>

          {/* SUBTITLE */}
          <p className="mt-2 text-white text-xl lg:text-4xl drop-shadow-lg max-w-xl">
            {hero.subtitle}
          </p>

          {/* CTA + REVIEW */}
          <motion.div
            className="flex flex-col items-center lg:items-start gap-3 mt-6"
            variants={textAnimation}
            initial="initial"
            whileInView="enter"
            viewport={{ once: true }}
          >
            {/* BUTTON */}
            <button
              className="relative flex items-center justify-between bg-white text-black border border-[#08647d] py-2 pl-3 pr-2 rounded-full shadow-md hover:bg-gray-100 transition-all min-w-[230px]"
              aria-label="Kontaktiraj nas"
            >
              <div className="flex items-center gap-4 text-m font-[Inter] text-[#08647d]">
                <span className="ml-4">{hero.contact}</span>
                <span className="w-[1px] h-7 bg-gray-300 mr-3" />
              </div>

              <a
                href="tel:+38163211161"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#08647d] shadow-md hover:bg-[#07566b] transition-all mr-6 animate-float-horizontal"
                aria-label="Pozovi nas"
              >
                <Phone className="w-6 h-6 text-yellow-400/80" />
              </a>
            </button>

            {/* REVIEW */}
            <div className="flex items-center bg-gray-400/40 backdrop-blur-md rounded-xl px-6 py-3 gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="bg-gray-300/40 w-8 h-8 rounded-md flex items-center justify-center">
                  <Image
                    src="/icons/—Pngtree—white instagram icon png instagram_3562066.png"
                    alt="Instagram"
                    width={35}
                    height={35}
                  />
                </div>

                <div className="bg-gray-300/40 w-8 h-8 rounded-md flex items-center justify-center text-white font-bold">
                  G
                </div>

                <div className="bg-gray-300/40 w-8 h-8 rounded-md flex items-center justify-center text-white font-bold">
                  ★
                </div>
              </div>

              <div className="flex flex-col text-left">
                <div className="flex gap-1 text-yellow-400 text-sm">
                  ★★★★☆
                </div>
                <p className="text-white text-sm font-medium">
                  {hero.reviews}
                </p>
              </div>
            </div>
          </motion.div>
<div className="sr-only">
  <h1>Laundry service Belgrade Surčin</h1>
  <p>
    Professional laundry, ironing and dry cleaning service in Surčin,
    Novi Beograd and Obrenovac. Fast pickup and delivery.
  </p>

  <p>
    Прачечная Белград Сурчин. Стирка и глажка одежды с доставкой.
  </p>
</div>
        </div>
      </div>
    </div>
  );
}