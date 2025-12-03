"use client";
import Links from "./Links";
import Link from "next/link";
import { navigationItems } from "@/constants";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { curve, menuSlide } from "@/motion";
import { usePathname } from "next/navigation";

type NavbarProps = {
  closeMenu: () => void;
};

export default function Navbar({ closeMenu }: NavbarProps) {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  // MODAL STATES
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, title: string) => {
    if (title === "O nama") {
      e.preventDefault();
      setIsAboutOpen(true);
      return; // ne zatvaraj sidebar
    }

    if (title === "Kontakt") {
      e.preventDefault();
      setIsContactOpen(true);
      return; // ne zatvaraj sidebar
    }

    // zatvori sidebar za obične linkove
    closeMenu();
  };

  return (
    <>
      <motion.div
        variants={menuSlide}
        initial="initial"
        animate="enter"
        exit="exit"
        className="h-screen bg-[#08647d] fixed right-0 top-0 text-white"
      >
        <div className="box-border h-full z-[999] relative py-[30px] px-[60px] sm:px-[40px] xm:px-[40px] flex flex-col justify-between">
          {/* CENTERED TEXT & LINKS */}
          <div
            onMouseLeave={() => setSelectedIndicator(pathname)}
            className="flex flex-col items-center text-center text-[50px] md:text-[45px] sm:text-[40px] xm:text-[30px] mt-[60px]"
          >
            <div className="text-[#fec502] border-b-[1px] border-[#fec502] uppercase text-[12px] mb-[20px]">
              <p>Navigation</p>
            </div>

            {navigationItems.map((data, index) => (
              <a
                key={index}
                href={data.href}
                onClick={(e) => handleClick(e, data.title)}
              >
                <Links
                  className="text-white"
                  data={{ ...data, index }}
                  isActive={selectedIndicator === data.href}
                  setSelectedIndicator={setSelectedIndicator}
                />
              </a>
            ))}
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex w-full justify-between text-[12px] gap-[20px]">
            <Link href={"/"}>Awwwards</Link>
            <Link href={"/"}>Instagram</Link>
            <Link href={"/"}>Dribble</Link>
            <Link href={"/"}>LinkedIn</Link>
          </div>
        </div>

        {/* SIDE CURVE */}
        <svg className="absolute top-0 left-[-99px] w-[100px] h-full fill-[#08647d]">
          <motion.path
            variants={curve}
            initial="initial"
            animate="enter"
            exit="exit"
          />
        </svg>
      </motion.div>

      {/* ABOUT MODAL */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-[90%] text-center relative animate-fadeIn overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold text-[#08647d] mb-4">O nama</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Perionica veša <span className="font-semibold">"Nice"</span> je lokalna
              firma iz Obrenovca koja već godinama pruža vrhunske usluge pranja i
              peglanja veša građanima Beograda i okoline.
            </p>
            <h3 className="text-xl font-semibold text-[#08647d] mt-4 mb-2">
              Naša misija
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Verujemo da svaki komad veša zaslužuje pažnju i profesionalno
              rukovanje. Naša misija je da vam vratimo vreme koje biste potrošili na
              pranje i peglanje, omogućavajući vam da se fokusirate na važnije stvari
              u životu, dok mi brinemo o vašem vešu sa pažnjom koju zaslužuje.
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

      {/* CONTACT MODAL */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-[90%] text-center relative animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#08647d] mb-4">
              Kontaktiraj nas
            </h2>
           <div className="text-gray-800 space-y-3 mb-6">
  {/* Telefon */}
  <p>
    📞{" "}
    <a
      className="font-semibold text-[#08647d]"
      href="tel:+38163211161"
    >
      +38163211161
    </a>
  </p>

  {/* Email */}
  <p>
    ✉️{" "}
    <a
      className="font-semibold text-[#08647d]"
      href="mailto:office@pranjeipeglanje.rs"
    >
      office@pranjeipeglanje.rs
    </a>
  </p>

  {/* Lokacija */}
  <p>
    📍{" "}
    <a
      className="font-semibold text-[#08647d] hover:underline"
      href="https://www.google.com/maps/place/Aleksandra+Ace+Simovića+11a,+Obrenovac,+Beograd"
      target="_blank"
      rel="noopener noreferrer"
    >
      Aleksandra Ace Simovića 11a, 11500 Obrenovac, Beograd
    </a>
  </p>

  {/* Radno vreme */}
  <p>
    ⏰ Radno vreme: <span className="font-semibold">Ponedeljak – Petak: 08:00 – 15:00</span>
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
    </>
  );
}
