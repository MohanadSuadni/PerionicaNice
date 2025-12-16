"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heading } from "@/components";
import { ArrowRight, spring, star } from "@/public";
import { Star, X } from "lucide-react";
import emailjs from "@emailjs/browser"; 


export default function CallToAction() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const phares1 = ["Utisci naših klijenata"];
  const phares2 = [
    "Preciznost, čistoća i posvećenost u svakom pranju",
    "Perionica Nice je prvi izbor za one koji žele kvalitet",
    "bez kompromisa.",
  ];
  const phares3 = [
    "Preciznost, čistoća i posvećenost u svakom pranju Perionica Nice je prvi izbor za one koji žele kvalitet bez kompromisa.",
  ];

  const sendReview = () => {
    if (!email || !comment || rating === 0) {
      alert("Molimo popunite sve podatke i ocenite uslugu.");
      return;
    }

    const templateParams = {
      user_email: email,
      message: comment,
      rating: rating,
    };

    // emailjs.send(serviceID, templateID, templateParams, publicKey)
    emailjs
      .send(
        "service_35ipyrs",
        "template_0vavn2n",
        templateParams,
        "jJT0oY9CFoSG9LRvj"
      )
      .then(
        () => {
          alert("Recenzija poslata! Hvala.");
          setOpen(false);
          setEmail("");
          setComment("");
          setRating(0);
          setHover(0);
        },
        (err) => {
          console.error(err);
          alert("Došlo je do greške pri slanju recenzije.");
        }
      );
  };

  return (
    <section id="">

      <div className="w-full padding-x py-10 relative bg-gradient-to-b from-white to-[#d2dcff]">
        <div className="w-full flex items-center gap-5">
          {/* LEVA ZVEZDA */}
          <div className="xm:hidden sm:hidden relative">
            <Image src={star} alt="star" width={400} height={400} />
          </div>

          {/* TEKST + INPUT */}
          <div className="w-full flex items-center flex-col gap-3">
            <Heading
              classname="heading font-[Inter] lg:font-[Inter] xm:text-center sm:text-center text-[#08647d]"
              title={phares1}
            />

            <Heading
              classname="paragraph font-normal text-center block xm:hidden sm:hidden"
              title={phares2}
            />

            <Heading
              classname="paragraph font-normal text-center hidden xm:block sm:block"
              title={phares3}
            />

            {/* INPUT + DUGME */}
			 <div className="flex flex-wrap justify-center lg:justify-start gap-4 items-center w-full">

  <div className="w-full max-w-full sm:max-w-[350px]">
    <div
      onClick={() => setOpen(true)}
      className="
        cursor-pointer
        flex items-center justify-between gap-2
        bg-white text-black
        border border-[#08647d]
        py-2 px-3
        rounded-full
        drop-shadow-lg
        w-full
      "
    >
      
      <input
        type="email"
        placeholder=" Ostavite vašu recenziju ..."
        className="
          flex-1 min-w-0 bg-transparent outline-none border-none
          text-sm sm:text-base 
          text-[#08647d] placeholder:text-gray-400
        "
        readOnly
      />

      {/* Tekst se skriva na baš malim ekranima */}
      <span className="hidden sm:block text-sm font-semibold text-[#08647d] whitespace-nowrap">
        Ostavite recenziju
      </span>

      {/* Dugme */}
      <div
        className="
          flex items-center justify-center 
          w-9 h-9 sm:w-11 sm:h-11
          rounded-full 
          bg-[#08647d] 
          shrink-0
        "
      >
  <Image
  src={ArrowRight}
  alt="Pošalji"
  width={22}
  height={18}
  className="brightness-0 saturate-100 invert hue-rotate-20"
 />
      </div>
    </div>
  </div>
</div>
 </div>
		  


          {/* DESNA SLIKA */}
          <div className="xm:hidden sm:hidden relative">
            <Image src={spring} alt="spring" width={400} height={400} />
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* X */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-[#08647d]"
              >
                <X />
              </button>

              <h2 className="text-xl font-bold text-[#08647d] mb-6 text-center">
                Ostavite vašu recenziju
              </h2>

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Vaš email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:border-[#08647d]"
              />

              {/* KOMENTAR */}
              <textarea
                placeholder="Napišite komentar..."
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:border-[#08647d]"
              ></textarea>

              {/* ZVEZDICE */}
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((starNum) => (
                  <Star
                    key={starNum}
                    size={30}
                    className={`cursor-pointer transition ${
                      (hover || rating) >= starNum
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-400"
                    }`}
                    onMouseEnter={() => setHover(starNum)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(starNum)}
                  />
                ))}
              </div>

              {/* DUGME */}
              <button
                onClick={sendReview}
                className="
                  w-full bg-[#08647d] text-white py-3 rounded-full 
                  font-semibold hover:bg-[#064c5d] transition
                "
              >
                Pošalji recenziju
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
