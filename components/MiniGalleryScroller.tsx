"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

// Gornja traka
const topImages = [
  "/images/IMG-20251122-WA0001.jpg",
  "/images/IMG-20251122-new3.jpg",
  "/images/IMG-20251122-WA0007.jpg",
  "/images/IMG-20251122-WA00051.png",
  "/images/IMG-20251122-WA0018.jpg",
];

// Donja traka
const bottomImages = [
  "/images/Screenshot 2025-11-22 222706.png",
  "/images/IMG-20251122-new.jpg",
  "/images/IMG-20251127-new.jpg",
  "/images/IMG-20251122-WA00051.png",
  "/images/IMG-20251122-WA0018.jpg",
  "/images/IMG-20251122-WA0007.jpg",
  "/images/IMG-20251122-WA00051.png",
  "/images/IMG-20251122-WA0018.jpg",
];

export default function ScrollParallaxGalleryInfiniteFixed() {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 3x ponavljanje zbog infinite efekta
  const repeatTop = [...topImages, ...topImages, ...topImages];
  const repeatBottom = [...bottomImages, ...bottomImages, ...bottomImages];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // GORNJA traka — ide levo
      if (topRef.current) {
        const width = topRef.current.scrollWidth / 3;
        const x = -((scrollY * 0.5) % width);
        topRef.current.style.transform = `translateX(${x}px)`;
      }

      // DONJA traka — ide desno ali BEZ RUPA
      // Ključ: uvijek negativan translateX + invertovan smer
      if (bottomRef.current) {
        const width = bottomRef.current.scrollWidth / 3;
        const x = ((scrollY * 0.5) % width) - width; 
        bottomRef.current.style.transform = `translateX(${x}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trackClass =
    "flex gap-2 transition-transform duration-75 ease-linear w-max";
  const imgBoxClass =
    "flex-shrink-0  lg:h-[200px]  lg:w-[370px]    h-[150px] w-[250px]  relative rounded overflow-hidden";

  return (
<div className="w-full overflow-hidden bg-[#064c5d] py-2 flex flex-col gap-2">

      {/* Gornja traka */}
      <div className="overflow-hidden">
        <div ref={topRef} className={trackClass}>
          {repeatTop.map((src, i) => (
            <div key={`top-${i}`} className={imgBoxClass}>
              <Image
                src={src}
                alt={`top image ${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Donja traka */}
      <div className="overflow-hidden">
        <div ref={bottomRef} className={trackClass}>
          {repeatBottom.map((src, i) => (
            <div key={`bottom-${i}`} className={imgBoxClass}>
              <Image
                src={src}
                alt={`bottom image ${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
