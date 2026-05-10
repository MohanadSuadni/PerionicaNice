"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { textAnimation } from "@/motion";
import { useLang } from "@/context/LangContext";
import { getDict } from "@/lib/lang";
import { FAQItem } from "@/types/dict";

export default function FAQRinseClean() {
  const { lang } = useLang();
  const dict = getDict(lang);

  const faqs: FAQItem[] = dict.faq;

  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="w-full px-6 py-20 bg-gradient-to-b from-[#f9fafb] to-[#eceff1]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        <motion.div
          className="flex flex-col items-center gap-4"
          variants={textAnimation}
          initial="initial"
          whileInView="enter"
        >
          <h2 className="text-4xl text-[#08647d]">FAQ</h2>
        </motion.div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

  {faqs.map((faq, i) => {
    const isOpen = openId === i;

    return (
      <div
        key={i}
        className="border-b border-gray-100 last:border-none"
      >
        <button
          onClick={() => setOpenId(isOpen ? null : i)}
          className="
            w-full
            flex
            items-center
            justify-between
            gap-4
            px-6
            py-5
            text-left
            transition-all
            duration-300
            hover:bg-gray-50
          "
        >
          <span
            className={`
              text-base
              md:text-lg
              font-semibold
              transition-colors
              ${isOpen ? 'text-[#08647d]' : 'text-gray-900'}
            `}
          >
            {faq.question}
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="
              min-w-[40px]
              h-10
              w-10
              rounded-full
              bg-[#08647d]/10
              flex
              items-center
              justify-center
            "
          >
            <ChevronDown className="w-5 h-5 text-[#08647d]" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div
                className="
                  px-6
                  pb-6
                  text-gray-600
                  leading-relaxed
                  text-sm
                  md:text-base
                "
              >
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  })}
</div>

      </div>
    </section>
  );
}