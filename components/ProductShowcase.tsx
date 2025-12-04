"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextMask } from "@/animations";
import { useState, useEffect } from "react";
import { icons } from "@/public";
import { textAnimation } from "@/motion";

export default function ProductShowcase() {
  const [isClient, setIsClient] = useState(false);
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
const [isContactOpen, setIsContactOpen] = useState(false);

  const cards = [
    {
      id: "express",
      title: "Ekspres usluga",
      text: "Brza i pouzdana usluga pranja i peglanja sa minimalnim rokom isporuke.",
      icon: "/icons/schedule_3652221.png",
    },
    {
      id: "eco",
      title: "Ekološki deterdženti",
      text: "Koristimo samo bezbedne, ekološke deterdžente koji čuvaju tkanine i prirodu.",
      icon: "/icons/tshirt.png",
    },
    {
      id: "equipment",
      title: "Profesionalna oprema",
      text: "Najmodernije industrijske mašine garantuju najviši kvalitet usluge.",
      icon: "/icons/perks_11264773.png",
    },
  ];

  // First card open by default, active može biti string ili null
  const [active, setActive] = useState<string | null>(cards[0].id);

  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;

  const phares1 = ["Pranje & peglanje"];
  const phares2 = [
    "Naša posvećenost kvalitetu, ekologiji i lokalnoj zajednici čini nas najboljim izborom za vaše potrebe pranja i peglanja veša.",
  ];

  // Pronalaženje trenutno aktivne kartice
  const activeCard = cards.find((c) => c.id === active);

  return (
<section className="w-full padding-x pt-24 pb-10 relative bg-gradient-to-b from-white to-gray-100">
 
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEVA STRANA */}
        <div className="flex flex-col gap-6 text-left lg:text-left lg:pr-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="hidden sm:block"
          >
            <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700">
              Naša prednost
            </span>
          </motion.div>

          <h1 className=" font-[Inter] lg:font-[Inter] text-4xl md:text-5xl leading-tight  text-[#08647d]">
            <TextMask>{phares1}</TextMask>
          </h1>
<motion.div
  initial={{ width: 0 }}
  whileInView={{ width: "150px" }}
  transition={{ duration: 0.6 }}
  className="h-[3px] mt-0 rounded-full 
             bg-gradient-to-r from-[#08647d] to-yellow-400"
/>
        
  <motion.div style={{ y }} className="flex justify-center lg:justify-start">
          <div className="relative w-[550px] max-w-full">
            <Image
              src="/images/Commercial Laundry Facility Interior.png"
              alt="Perionica cenovnik"
              width={550}
              height={550}
              className="rounded-2xl shadow-2xl object-cover"
            />
          </div>
        </motion.div>
        <br/>
       <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
            <TextMask>{phares2}</TextMask>
          </p>
        </div>

        {/* DESNA STRANA — KARTICE */}
        <div className="overflow-visible flex flex-col gap-4 ">

          {/* Top icons row */}
          <div className="grid grid-cols-3 gap-3">
            {cards.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(active === c.id ? null : c.id)}
                className={`border-2 rounded-2xl py-3 flex flex-col items-center transition-all
                  ${active === c.id ? "border-[#08647d] shadow-md" : "border-gray-300"}
                `}
              >
                <Image src={c.icon} alt={c.title} width={30} height={30} />
                <span className="mt-2 text-sm  text-[#08647d]   font-[Inter] lg:font-[Inter]">{c.title}</span>
              </button>
            ))}
          </div>

          {/* Info card (opens on click) */}
          {activeCard && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 border-2 border-[#08647d] rounded-2xl shadow-md bg-white"
            >
              <h3 className=" font-[Inter] lg:font-[Inter] text-xl text-[#08647d] mb-2">
                {activeCard.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {activeCard.text}
              </p>
            </motion.div>



          )}
          

          
<div className=" mt-2  flex justify-center">
  <button
    onClick={() => setIsContactOpen(true)}
    className="
    w-full
      px-8 py-4
      text-[#fec502]  font-[Inter] lg:font-[Inter] text-base
      border border-[#08647d]
      rounded-full
       bg-[#064c5d]
      backdrop-blur-md
      hover:bg-[#08647d]/30
      hover:border-[#08647d]
      transition
      drop-shadow-lg
      w-fit
    "
  >
    Kontaktiraj nas
  </button>
</div>

        </div>
        
{isContactOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-[90%] text-center relative animate-fadeIn">
      <h2 className="text-2xl font-bold text-[#08647d] mb-4">
        Kontaktiraj nas
      </h2>

      <div className="text-gray-800 space-y-3 mb-6">

        <p>
          📞{" "}
          <a
            href="tel:+381641234567"
            className="font-semibold text-[#08647d] hover:underline"
          >
            +381 64 123 4567
          </a>
        </p>

        <p>
          ✉️{" "}
          <a
            href="mailto:info@niceperionica.rs"
            className="font-semibold text-[#08647d] hover:underline"
          >
            info@niceperionica.rs
          </a>
        </p>

        <p>
          📍{" "}
          <a
            href="https://www.google.com/maps?q=Beograd,+Obrenovac"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#08647d] hover:underline"
          >
            Beograd / Obrenovac
          </a>
        </p>
      </div>

      <button
        onClick={() => setIsContactOpen(false)}
        className="bg-[#08647d] text-white px-6 py-2 rounded-md hover:bg-[#064c5d] transition"
      >
        Zatvori
      </button>
    </div>
  </div>
)}
      </div>
    </section>
  );
}
