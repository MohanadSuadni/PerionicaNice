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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: string
  ) => {
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
        className="
          fixed w-full top-0 z-50 
          xm:hidden sm:hidden
          bg-gradient-to-r from-black/60 via-white/15 to-white/3
        "
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

      {/* ABOUT MODAL */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-[90%] text-center relative animate-fadeIn overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold text-[#08647d] mb-4">O nama</h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Perionica veša <span className="font-semibold">"Nice"</span> je
              lokalna firma iz Obrenovca koja već godinama pruža vrhunske
              usluge pranja i peglanja veša građanima Beograda i okoline.
            </p>

            <h3 className="text-xl font-semibold text-[#08647d] mt-4 mb-2">
              Naša misija
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              Verujemo da svaki komad veša zaslužuje pažnju i profesionalno
              rukovanje. Naša misija je da vam vratimo vreme koje biste
              potrošili na pranje i peglanje, omogućavajući vam da se fokusirate
              na važnije stvari u životu, dok mi brinemo o vašem vešu sa pažnjom
              koju zaslužuje.
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
