"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { logo2 } from "@/public";
import { footerItems, footerSocialsItems } from "@/constants";
import { useParams } from "next/navigation";
import { getDict } from "@/lib/lang";
import { languages } from "@/constants/languages";

export default function Footer() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, itemId: string) => {
    if (itemId === "about") {
      e.preventDefault();
      setIsAboutOpen(true);
    } else if (itemId === "contact") {
      e.preventDefault();
      setIsContactOpen(true);
    }
  };

const socialNames = {
  1: "Instagram",
  2: "LinkedIn",
  3: "Pinterest",
  4: "X",
  5: "YouTube",
};

  const params = useParams();
  const lang = (params.lang as "sr" | "en" | "ru") || "sr";
  const t = getDict(lang);
  return (
    <div className="w-full py-10 padding-x bg-[#064c5d]">
      <div className="w-full flex items-center justify-center flex-col gap-7">
        <div>
        <Image
  src={logo2}
  alt="Logo perionice veša Nice"
  width={100}
  height={40}
  sizes="100px"
  priority
/>
        </div>

        {/* Footer linkovi */}
       

        {/* Ostali footer linkovi */}
        <div className="flex items-center gap-4 xm:flex-col sm:flex-col">
           
          
          {footerItems.map((item) => (
            <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className="text-white text-[18px] font-[Inter] hover:text-[#fec502] transition"
              >
                {t.nav?.[item.id] || item.id}
              </Link>
          ))}
        </div>

        {/* Socials */}
    <div className="flex items-center gap-4">
  {footerSocialsItems.map((item) => (
    <Link
      href={item.href}
      key={item.id}
      aria-label={
        item.id === 1
          ? "Instagram"
          : item.id === 2
          ? "LinkedIn"
          : item.id === 3
          ? "Pinterest"
          : item.id === 4
          ? "X"
          : "YouTube"
      }
    >
      <Image
        src={item.src}
        alt=""
        width={30}
        height={30}
      />
    </Link>
  ))}
</div>

         <div className="mt-6 border-t border-border dark:border-dark_border pt-4 text-center text-sm text-white">
          &copy; {new Date().getFullYear()} perionice veša <span className="text-[#fec502] font-semibold font-sans"> Nice</span>. Dizajn by{" "}
          <a href="tel:+381695546541" className="text-white hover:text-primary font-semibold">
            M. Sudani
          </a>
        </div>
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
        Danas je upravo ovaj segment naš glavni fokus. Naša misija je da korisnicima uštedimo vreme, olakšamo svakodnevicu i pružimo vrhunski kvalitet usluge na koji mogu da se oslone.
      </p>

      <p className="text-gray-700 mb-4 leading-relaxed">
        Maestro Cleaning – jer čistoća je stvar poverenja.
      </p>

      <h3 className="text-xl font-semibold text-[#08647d] mt-4 mb-2">Naša vizija</h3>

      <p className="text-gray-700 leading-relaxed mb-6">
        Naš cilj je da ženama vratimo najvredniji resurs — vreme. Želimo da im omogućimo da budu posvećene sebi, svojim željama i onome što im je zaista važno, uz sigurnost da uvek imaju pouzdanog partnera na kog mogu da se oslone.
      </p>
            {/* Dodaj ostatak teksta po želji */}
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
            <div className="w-full h-64 my-4">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.123456789!2d20.0!3d44.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAleksandra%20Ace%20Simovića%2011a%2C%20Obrenovac%2C%20Beograd!5e0!3m2!1sen!2srs!4v1234567890"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
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
  );
}
