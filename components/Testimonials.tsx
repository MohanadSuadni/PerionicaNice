"use client";
import Image from "next/image";
import { Heading } from "@/components";
import { motion } from "framer-motion";
import { textAnimation } from "@/motion";
import { testimonials } from "@/constants";
import { useParams } from "next/navigation";
import { getDict } from "@/lib/lang";

export default function Testimonials() {
    const params = useParams();
    const lang = (params.lang as "sr" | "en" | "ru") || "sr";
    const dict = getDict(lang);
  const phares = [dict.testimonials.heading];
  const phares1 = [
    "„Briga o vašem vešu sa preciznošću i posvećenošću,",
    "perionica Nice je izbor klijenata koji cene kvalitet i pouzdanost.“",
  ];

  return (
        <section id="RV">

    <div className="w-full flex flex-col items-center px-6 py-10 gap-20 bg-white xm:gap-10 sm:gap-10">
      {/* Naslov */}
      <div className="flex flex-col items-center gap-5  font-[Inter] lg:font-[Inter]  mt-6">
        <div className="overflow-hidden">
          <motion.button
            className="w-fit py-2 px-3 rounded-full border border-[#2222221A] text-black font-dmSans text-sm font-medium leading-tight tracking-[-0.02188rem]"
            variants={textAnimation}
            initial="initial"
            whileInView="enter"
            viewport={{ once: true }}
          >
            {dict.testimonials.label}
          </motion.button>
        </div>
       <div className="flex flex-col items-center text-center gap-4 px-4 md:px-8">
  
  <Heading
    classname="
      text-3xl
      sm:text-4xl
      lg:text-5xl
font-dmSans
      font-[Inter]
      text-[#08647d]
      leading-tight
    "
    title={phares}
  />

  <Heading
    classname="
      text-base
      sm:text-lg
      lg:text-xl
      text-gray-600
      font-normal
      max-w-3xl
      leading-relaxed
    "
    title={[dict.testimonials.description]}
  />

</div>
      </div>

      {/* Testimonials */}
      <motion.div className="w-full flex gap-5 xm:flex-col sm:flex-col xm:w-full py-10 sm:w-full overflow-hidden h-[750px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] mt-10">
        {[0, 3, 6].map((start, idx) => (
          <motion.div
            key={idx}
            className="w-1/3 flex flex-col h-fit xm:w-full sm:w-full"
            animate={{ y: "-50%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              duration: 25 + idx,
            }}
          >
            {[...testimonials.slice(start, start + 3), ...testimonials.slice(start, start + 3)].map((item) => (
              <div key={item.id} className="flex flex-col gap-5">
                <div className="p-10 mb-5 shadow border border-[#222222]/10 rounded-[30px] bg-white flex flex-col gap-5">
                  
                  {/* 5 zvezdica */}
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="gold"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gold"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.045 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"
                        />
                      </svg>
                    ))}
                  </div>

                  {/* Google logo i ocena */}
                  <div className="flex items-center gap-2 mb-2">
                    <Image src="/icons/7611770.png" alt="Google Reviews" width={24} height={24} />
                    <span className="text-sm text-gray-600 font-semibold">4.9</span>
                  </div>

                  {/* Tekst testimoniala */}
                  <p className="text-[#010D3E]  text-l  font-dmSans font-normal  leading-tight">
                    {item.text}
                  </p>

                  {/* Korisnik info */}
                  <div className="flex items-center gap-5">
                    <Image src={item.src} alt={item.name} width={60} height={60} className="rounded-full" />
                    <div className="flex flex-col">
                      <h1 className="text-[#010D3E] font-dmSans text-xl font-normal leading-tight">{item.name}</h1>
                      <p className="text-[#010D3E] font-dmSans text-xl font-normal leading-tight">{item.username}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
        </section>

  );
}
