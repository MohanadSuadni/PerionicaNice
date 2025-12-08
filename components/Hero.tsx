"use client";

import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { Navbar } from "@/components";
import { textAnimation } from "@/motion";
import { ArrowRight } from "@/public";
import { Phone } from "lucide-react";
export default function Hero() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const [isAboutOpen, setIsAboutOpen] = useState(false);

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
      <div className="w-full h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 lg:px-0 relative z-10 ">
        <div className="w-full lg:max-w-[900px] lg:ml-12">
          <h1 className="text-4xl lg:text-7xl sm:text-3xl font-[Inter] drop-shadow-lg text-white">
            Perionica veša &quot;Nice&quot;
          </h1>

          <h2 className="text-2xl lg:text-5xl sm:text-2xl font-[Inter] drop-shadow-lg text-white">
            <span className="text-yellow-400/80">Novi Beograd</span>{" "}
            <span className="text-yellow-400/80">I </span>{" "}
            <span className="text-yellow-400/80">Obrenovac</span>
          </h2>

          <p className="mt-2 text-white text-xl   lg:text-4xl   drop-shadow-lg max-w-xl">
          Preuzimanje I dostava  
           
          </p>

        {/* DUGME + REVIEW SEKCIJA */}
<motion.div
  className="flex flex-col items-center lg:items-start gap-3 mt-6"
  variants={textAnimation}
  initial="initial"
  whileInView="enter"
  viewport={{ once: true }}
>
  {/* Dugme */}
  <button
  onClick={(e) => e.stopPropagation()}
    className="relative flex items-center justify-between bg-white text-black border border-[#08647d] py-2 pl-3 pr-2 rounded-full drop-shadow-lg hover:bg-gray-100 transition min-w-[280px]"
    aria-label="O nama i naša misija"
  >
    <div className="flex items-center gap-3 text-sm font-[Inter] text-[#08647d]">
      <span>Kontaktiraj nas</span>
     <span className="w-[1px] h-10 bg-gray-300" />
           <span >Zakaži odmah</span>

    </div>

   {/* KRUG: link koji zove telefonom */}
<a
  href="tel:+38163211161"
  onClick={(e) => e.stopPropagation()}
  className="flex items-center justify-center w-11 h-11 rounded-full bg-[#08647d] shadow-md"
  aria-label="Pozovi nas"
  title="Pozovi nas"
>
  <Phone
    className="w-6 h-6 text-yellow-400/90 transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(0,150,255,0.9)] "
  />
</a>


  </button>


            {/* ⭐ REVIEW SEKCIJA —  */}
            <div className="flex items-center bg-gray-400/40 backdrop-blur-md rounded-xl px-6 py-3 gap-4 mt-2">
              {/* Ikonice */}
              <div className="flex items-center gap-2">
                <div className="bg-gray-300/40 backdrop-blur-md w-8 h-8 rounded-md flex items-center justify-center">
                  <Image
                    src="/icons/—Pngtree—white instagram icon png instagram_3562066.png"
                    alt="Instagram"
                    width={35}
                    height={35}
                  />
                </div>
                <div className="bg-gray-300/40 backdrop-blur-md w-8 h-8 rounded-md flex items-center justify-center text-xl font-bold text-white">
                  G
                </div>
                <div className="bg-gray-300/40 backdrop-blur-md w-8 h-8 rounded-md flex items-center justify-center text-xl font-bold text-white">
                  ★
                </div>
              </div>

              {/* Zvezdice i broj */}
              <div className="flex flex-col text-left">
                <div className="flex gap-1 text-sm items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>

                  {/* pola zvezdice */}
                  <span className="relative inline-block text-gray-300 leading-none">
                    ★
                    <span className="absolute left-0 top-0 w-1/2 overflow-hidden text-yellow-400">
                      ★
                    </span>
                  </span>
                </div>

                <p className="text-white text-sm font-medium">
                  500+ reviews
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


    </div>
  );
}
