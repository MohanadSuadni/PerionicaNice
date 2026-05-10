"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Navbar } from "@/components";
import { textAnimation } from "@/motion";
import { Search, Droplets, Shirt, Package } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getDict } from "@/lib/lang";
export default function UslugainseClean() {
  const sectionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
const{ lang } = useLang();
const dict = getDict(lang);
  const steps = [
    {
      icon: <Search size={22} />,
      title: dict.productShowcase.express.title,
      text: dict.productShowcase.express.text
    },
    {
      icon: <Droplets size={22} />,
      title: dict.productShowcase.equipment.title,
      text: dict.productShowcase.equipment.text
    },
    {
      icon: <Shirt size={22} />,
      title: dict.productShowcase.eco.title,
      text: dict.productShowcase.eco.text
    },
    {
      icon: <Package size={22} />,
      title: dict.usluga.title,
      text: dict.usluga.dostavaText
    }
  ];

  return (
    <>
      <Navbar />
      <section id="USLUGE" ref={sectionRef} className="w-full py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start px-6">

          {/* LEFT SIDE – USLUGA */}
          <div>
            <motion.h1
              className="text-4xl sm:text-5xl font-[Inter] text-left text-[#08647d]"
              variants={textAnimation}
              initial="initial"
              whileInView="enter"
              viewport={{ once: true }}
            >
          {dict.usluga.heading}
            </motion.h1>

            <motion.div
              className="h-[3px] mt-3 rounded-full bg-gradient-to-r from-[#08647d] to-[#facc15] shadow-[0_0_12px_rgba(8,100,125,0.45)] mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: "250px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            />

            <p className="text-gray-600 mb-16 max-w-2xl">
              {dict.usluga.description}
            </p>

            <div className="relative w-full flex flex-col gap-10">
              <div className="hidden md:block absolute left-[28px] top-[28px] h-full w-[1px] bg-[#08647d]" />
              <div className="md:hidden absolute left-[28px] top-0 w-[1px] h-full bg-[#08647d]" />

              {steps.map((step, index) => (
                <motion.div key={index} variants={textAnimation} initial="initial" whileInView="enter" viewport={{ once: true }} className="relative w-full flex flex-row items-start gap-4">
                  <div className="w-14 h-14 rounded-xl border border-[#08647d] text-[#08647d] flex items-center justify-center bg-white">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-[Inter] text-[#08647d] text-base">{step.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 max-w-xs">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE – VIDEO */}
          <div className="w-full flex flex-col items-center justify-start gap-6 lg:mt-40">
            <div className="w-full h-96 relative flex items-center justify-center bg-gray-100 rounded-2xl overflow-hidden">
              {/* MASKA */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#08647d] to-yellow-100 opacity-40 mix-blend-multiply pointer-events-none rounded-2xl"></div>

              {!isPlaying && (
                <button onClick={() => setIsPlaying(true)} className="absolute z-10 w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#08647d] to-yellow-400 shadow-lg text-white text-4xl hover:scale-105 transform transition-all">
                  ▶
                </button>
              )}

              {isPlaying ? (
                <video src="/videos/VID-20251127-WA0000.mp4" controls autoPlay muted={isMuted} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <Image src="/images/IMG-20251122-WA0011.jpg" alt="Video prikaz" width={800} height={400} className="w-full h-full object-cover rounded-2xl" />
              )}

              {isPlaying && (
                <button onClick={() => setIsMuted(!isMuted)} className="absolute bottom-4 right-4 z-20 bg-[#08647d]/80 text-white px-3 py-2 rounded-full hover:bg-[#08647d]/100 transition">
                  {isMuted ? "Unmute" : "Mute"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
