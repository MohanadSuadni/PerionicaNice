"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { FaViber } from "react-icons/fa";

export default function FloatingContactButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed right-5 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-4 transition-all duration-700 ease-out ${
        visible
          ? "translate-x-0 opacity-100"
          : "translate-x-24 opacity-0 pointer-events-none"
      }`}
    >
      {/* CALL */}
      <Link
        href="tel:+38163211161"
        aria-label="Pozovi"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-2xl"
      >
        <Phone
          size={24}
          className="transition-transform duration-300 group-hover:rotate-12"
        />
      </Link>

      {/* WHATSAPP */}
     <Link
  href="https://wa.me/38163211161"
  target="_blank"
  aria-label="WhatsApp"
  className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-2xl"
>
  {/* WhatsApp oblačić */}
  <MessageCircle
    size={28}
    className="transition-transform duration-300 group-hover:scale-110"
  />

  {/* Mala slušalica u sredini */}
  <Phone
    size={14}
    strokeWidth={2.8}
    className="absolute transition-transform duration-300 group-hover:rotate-12"
  />
</Link>   

      {/* VIBER */}
      <Link
href="viber://add?number=38163211161"
        aria-label="Viber"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#7360F2] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-2xl"
      >
        <FaViber
          size={24}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </Link>
    </div>
  );
}