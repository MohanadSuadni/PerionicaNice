"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { textAnimation } from "@/motion";
import { X } from "lucide-react";

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const items = [
    { icon: "/icons/laundry-service (1).png", name: "Pranje i sušenje 1 mašina do 5kg veša", price: "1090 RSD" },
    { icon: "/icons/dry.png", name: "Pranje i sušenje preko 6kg", price: "200 RSD/kg" },
    { icon: "/icons/iron.png", name: "Peglanje", price: "320 RSD/kg" },
    { icon: "/icons/laundry-service.png", name: "Pranje i peglanje", price: "460 RSD/kg" },
    { icon: "/icons/shirt (1).png", name: "Košulje pranje i peglanje", price: "400 RSD/kom" },
    { icon: "/icons/work.png", name: "Košulje samo peglanje", price: "300 RSD/kom" },
    { icon: "/icons/skirt.png", name: "Suknje svečane", price: "po dogovoru" },
    { icon: "/icons/sleep.png", name: "Pranje jorgana, ćebadi, presvlaka za jorgane", price: "500 RSD/kg" },
    { icon: "/icons/windows.png", name: "Zavese draperije", price: "500 RSD/kg" },
    { icon: "/icons/curtains.png", name: "Zavese til, markiza ili drugi oblik konca", price: "1000 RSD/kom" },
    { icon: "/icons/dress.png", name: "Kačenje posle pranja", price: "1000 RSD po garnisli" },
    { icon: "/icons/wedding.png", name: "Venčanice i ostale delikatne stvari", price: "po dogovoru" },
    { icon: "/icons/laundry-service.png", name: "Zimske jakne", price: "1500-2000 RSD/kom" },
    { icon: "/icons/jersey.png", name: "Sve od vune", price: "400 RSD/kg" }
  ];

  // prikazuju se samo 2 u preview sekciji
  const previewItems = items.slice(0, 2);

  return (
    <section id="CN"
      ref={sectionRef}
      className="w-full py-20 px-6 bg-gradient-to-b from-[#f5f7fa] to-[#e0e6ef] overflow-hidden"
    >
      {/* NASLOV */}
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl sm:text-5xl font-[Inter] text-left text-[#08647d]"
          variants={textAnimation}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true }}
        >
          Cenovnik
        </motion.h1>

        <motion.div
          className="h-[3px] mt-3 rounded-full bg-gradient-to-r from-[#08647d] to-[#facc15] shadow-[0_0_12px_rgba(8,100,125,0.45)]"
          initial={{ width: 0 }}
          whileInView={{ width: "150px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-10">
        {/* SLIKA */}
        <motion.div style={{ y }} className="flex justify-center lg:justify-start">
          <div className="relative w-[550px] max-w-full">
            <Image
              src="/images/444444444.png"
              alt="Perionica cenovnik"
              width={550}
              height={550}
              className="rounded-2xl shadow-2xl object-cover"
            />
          </div>
        </motion.div>

        {/* KARTICE PREVIEW */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            {previewItems.map((item, idx) => (
              <PriceCard key={idx} item={item} />
            ))}
          </div>

          {/* DUGME */}
          <div className="mt-6 flex justify-center ">
            <button
              onClick={() => setOpen(true)}
              className=" w-full px-8 py-4 text-[#fec502] font-[Inter] text-base border border-[#08647d] rounded-full bg-[#064c5d] hover:bg-[#08647d]/30 hover:border-[#08647d] transition drop-shadow-lg w-fit"
            >
              Pogledaj ceo cenovnik
            </button>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-5xl rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* X dugme */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 bg-[#08647d] text-white p-2 rounded-full"
              >
                <X />
              </button>

              <h2 className="text-3xl font-bold text-center mb-10 text-[#08647d]">
                Ceo Cenovnik
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, idx) => (
                  <PriceCard key={idx} item={item} />
                ))}
              </div>

              {/* DUGME DOLE */}
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-[#08647d] text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-[#064c5d] transition duration-300"
                >
                  Zatvori cenovnik
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* KOMPONENTA ZA JEDNU KARTICU */
function PriceCard({ item }: { item: any }) {
  return (
    <motion.div
      className="relative bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 hover:-translate-y-2 transition-all duration-500 group overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fec502] via-[#08647d] to-[#064c5d] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

      {/* IKONICA SA SIVO-SVETLIM BG */}
      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gray-100 mb-4 shadow-md">
        <Image
          src={item.icon}
          width={32}
          height={32}
          alt={item.name}
          className="filter invert-0" // crna ikona
        />
      </div>

      <p className="text-lg font-semibold text-[#064c5d] mb-2">{item.name}</p>
      <p className="text-xl font-bold text-[#08647d] drop-shadow-[0_0_8px_rgba(248,212,45,0.8)]">{item.price}</p>
    </motion.div>
  );
}
