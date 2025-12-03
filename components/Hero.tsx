"use client";

import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { Navbar } from "@/components";
import { textAnimation } from "@/motion";
import { ArrowRight } from "@/public";

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
      <div className="w-full h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 lg:px-0 relative z-10 font-bold">
        <div className="w-full lg:max-w-[900px] lg:ml-12">
          <h1 className="text-3xl lg:text-6xl sm:text-3xl font-[Inter] drop-shadow-lg text-white">
            Perionica veša &quot;Nice&quot;
          </h1>

          <h2 className="text-3xl lg:text-5xl sm:text-2xl font-[Inter] drop-shadow-lg text-white">
            <span className="text-yellow-400/60">Brzo</span>{" "}
            <span className="text-yellow-400/60">Pouzdano</span>{" "}
            <span className="text-yellow-400/60">Ekološki</span>.
          </h2>

          <p className="mt-4 text-white text-2xl drop-shadow-lg max-w-xl">
            Profesionalno pranje i peglanje veša.<br />
            Koristimo najkvalitetniju opremu.
          </p>

          {/* DUGME + REVIEW SEKCIJA */}
          <motion.div
            className="flex flex-col items-center lg:items-start gap-6 mt-6"
            variants={textAnimation}
            initial="initial"
            whileInView="enter"
            viewport={{ once: true }}
          >
            {/* Dugme */}
            <button
              onClick={() => setIsAboutOpen(true)}
              className="relative flex items-center justify-between bg-white text-black border border-[#08647d] py-2 pl-3 pr-2 rounded-full drop-shadow-lg hover:bg-gray-100 transition min-w-[260px]"
            >
              <div className="flex items-center gap-3 text-sm font-[Inter] text-[#08647d]">
                <span>O nama</span>
                <span className="w-[1px] h-10 bg-gray-300"></span>
                <span>Naša misija</span>
              </div>

              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-yellow-400/80">
                <Image
                  src={ArrowRight}
                  alt="ArrowRight"
                  width={25}
                  height={15}
                  className="invert"
                />
              </span>
            </button>

            {/* ⭐ REVIEW SEKCIJA — OVO JE TVOJ BLOK 1:1 VRAĆEN */}
            <div className="flex items-center bg-gray-400/40 backdrop-blur-md rounded-xl px-6 py-3 gap-4 mt-2">
              {/* Ikonice */}
              <div className="flex items-center gap-2">
                <div className="bg-gray-300/40 backdrop-blur-md w-10 h-8 rounded-md flex items-center justify-center">
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
                  6,000+ reviews
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MODAL: O nama */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-[90%] text-center relative animate-fadeIn overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold text-[#08647d] mb-4">O nama</h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Perionica veša <span className="font-semibold">&quot;Nice&quot;</span> je
              lokalna firma iz Obrenovca koja već godinama pruža vrhunske usluge.
            </p>

            <h3 className="text-xl font-semibold text-[#08647d] mt-4 mb-2">
              Naša misija
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              Naša misija je da vam vratimo vreme dok mi brinemo o vašem vešu.
            </p>

            <button
              onClick={() => setIsAboutOpen(false)}
              className="bg-[#08647d] text-white px-6 py-2 rounded-md hover:bg-[#064c5d] transition"
            >
              Zatvori
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
