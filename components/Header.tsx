"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components";
import { navVariants } from "@/motion";
import { MobileMenu } from "@/animations";
import { navigationItems } from "@/constants";
import { logo } from "@/public";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    if (item === "O nama") {
      e.preventDefault();
      setIsAboutOpen(true);
    }
    if (item === "Kontakt") {
      e.preventDefault();
      setIsContactOpen(true);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.div
        initial="initial"
        whileInView="enter"
        variants={navVariants}
        className="fixed w-full top-0 z-50 xm:hidden sm:hidden bg-gradient-to-r from-black/60 via-white/15 to-white/3"
      >
        <div className="w-full flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <Image src={logo} alt="logo" width={150} height={80} priority />
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.title)}
                className="text-white text-[18px] font-[Inter] hover:text-[#fec502] transition"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <Button
            className="text-[#fec502] px-4 py-2 bg-[#08647d] rounded-md drop-shadow-lg"
            title="Uloguj se"
          />
        </div>
      </motion.div>

      {/* Mobile Navbar */}
      <div className="fixed w-full top-0 z-50 hidden xm:block sm:block">
        <MobileMenu />
      </div>

      {/* About Modal */}
    {isAboutOpen && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-[90%] text-center relative animate-fadeIn overflow-y-auto max-h-[80vh]">

      <h2 className="text-2xl font-bold text-[#08647d] mb-4">O nama</h2>

      <p className="text-gray-700 mb-4 leading-relaxed">
        <span className="font-semibold">Maestro Cleaning</span> posluje od 2018. godine i nastao je iz želje da podignemo standard čistoće i brige o prostoru. Na početku smo se bavili održavanjem poslovnih objekata i stambenih jedinica, gde smo izgradili reputaciju pouzdanosti, preciznosti i poverenja.
      </p>

      <p className="text-gray-700 mb-4 leading-relaxed">
        Kako su potrebe naših klijenata rasle, 2021. godine pokrenuli smo novu poslovnu granu — profesionalni veseraj. U okviru kompanije Maestro Cleaning otvorili smo novu radnu jedinicu <span className="font-semibold">„NICE“</span>, specijalizovanu za modernu, efikasnu i brzu uslugu pranja, sušenja i pakovanja veša.
      </p>

      <p className="text-gray-700 mb-4 leading-relaxed">
       Danas je upravo ovaj segment naš glavni fokus. Posvećeni smo tome da korisnicima uštedimo vreme, olakšamo svakodnevicu i pružimo vrhunski kvalitet na koji mogu da se oslone.
      </p>

      <p className="text-gray-700 mb-4 leading-relaxed">
        Maestro Cleaning – jer čistoća je stvar poverenja.
      </p>


      <p className="text-gray-700 leading-relaxed mb-6">
        Naš cilj je da ženama vratimo najvredniji resurs — vreme. Želimo da im omogućimo da budu posvećene sebi, svojim željama i onome što im je zaista važno, uz sigurnost da uvek imaju pouzdanog partnera na kog mogu da se oslone.
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


      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-[90%] text-center relative animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#08647d] mb-4">Kontaktiraj nas</h2>
            <div className="text-gray-800 space-y-3 mb-6">
              <p>📞 <a className="font-semibold text-[#08647d]" href="tel:+38163211161">+38163211161</a></p>
              <p>✉️ <a className="font-semibold text-[#08647d]" href="mailto:office@pranjeipeglanje.rs">office@pranjeipeglanje.rs</a></p>
              <p>📍 <a className="font-semibold text-[#08647d] hover:underline" href="https://www.google.com/maps/place/Aleksandra+Ace+Simovića+11a,+Obrenovac,+Beograd" target="_blank" rel="noopener noreferrer">Aleksandra Ace Simovića 11a, 11500 Obrenovac, Beograd</a></p>
              <p>⏰ Radno vreme: <span className="font-semibold">Ponedeljak – Petak: 08:00 – 15:00</span></p>
            </div>
            <button onClick={() => setIsContactOpen(false)} className="bg-[#08647d] text-white px-6 py-2 rounded-md hover:bg-[#064c5d] transition">Zatvori</button>
          </div>
        </div>
      )}
    </>
  );
}
