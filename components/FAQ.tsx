"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { textAnimation } from "@/motion";

export default function FAQRinseClean() {
  const faqs = [
    {
      id: 1,
      question: "Da li postoji opcija pranja bez mirisa, za osetljivu kožu?",
      answer:
        "Naravno. Ako želite potpuno nežan pristup pranju, samo napomenite našem vozaču „bez mirisa“ prilikom preuzimanja. " +
        "Koristimo deterdžente bez parfema, pogodne za osetljivu kožu, bebe i osobe sklone alergijama.",
    },
    {
      id: 2,
      question: "Može li se veš izgubiti?",
      answer:
        "Ne brinite — vaš veš je kod nas potpuno bezbedan. " +
        "Svaka porudžbina se označi odmah pri preuzimanju, a ista oznaka prati veš kroz ceo proces sve do trenutka kada ga vraćamo nazad u vaše ruke. " +
        "Mi ne gubimo veš — mi ga pažljivo peremo i čuvamo.",
    },
    {
      id: 3,
      question: "Da li mogu da se skinu fleke?",
      answer:
        "Mnoge fleke mogu biti uklonjene, ali nam je potrebna mala pomoć s vaše strane:\n" +
        "I. Pošaljite veš što je brže moguće, dok se fleka ne “zapeče”.\n" +
        "II. Odvojite komade sa flekama od ostatka veša.\n" +
        "III. Obeležite ih i, ako možete, napišite od čega je fleka — to nam mnogo pomaže.\n" +
        "Naš tim zatim bira odgovarajući tretman, kako bi tkanina ostala zaštićena, a rezultat maksimalan.",
    },
    {
      id: 4,
      question: "Da li mešate veš sa vešom drugih klijenata?",
      answer:
        "Ne — svaki korisnik dobija svoj zaseban ciklus pranja. " +
        "Naši kapaciteti su baš zato prilagođeni manjim porudžbinama. " +
        "U vešeraju su odvojeni putevi „čistog“ i „prljavog“, tako da se veš nikada ne dodiruje niti ukršta sa tuđim.",
    },
    {
      id: 5,
      question: "Da li postoji opcija za posebne želje?",
      answer:
        "Da, postoji — posebno za naše premium korisnike. " +
        "Možete birati:\n" +
        "• omekšivač i prašak po svojoj želji\n" +
        "• tačno vreme dostave\n" +
        "• posebno slaganje veša\n" +
        "• dodatne personalizovane zahteve\n" +
        "Naš cilj je da se osećate zbrinuto i rasterećeno, kao da imate lično osoblje u kući.",
    },
  ];

  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="FAQ" className="w-full px-6 py-20 bg-gradient-to-b from-[#f9fafb] to-[#eceff1]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center gap-4"
          variants={textAnimation}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true }}
        >
          <button className="w-fit py-2 px-4 rounded-full border border-[#2222221A] text-black font-dmSans text-sm font-medium">
            FAQ
          </button>
          <h2 className="text-4xl sm:text-5xl text-[#08647d] font-[Inter] text-center">
            Najčešća pitanja
          </h2>
        </motion.div>

        {/* FAQ list */}
        <div className="divide-y divide-gray-200 bg-white border border-gray-300 shadow-sm rounded-2xl overflow-hidden">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-6">
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-lg font-[Inter] text-[#08647d] tracking-tight">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown size={22} className="text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
