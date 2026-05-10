"use client";

import { TlinksProps } from "@/types";
import { slide, scale } from "@/motion";
import { motion } from "framer-motion";

export default function Links({
  data,
  isActive,
  setSelectedIndicator,
}: TlinksProps) {
  const { title, href, index } = data;

  return (
    <motion.div
      className="relative flex items-center cursor-pointer"
      onMouseEnter={() => setSelectedIndicator(href)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className="w-[10px] h-[10px] bg-white rounded-full absolute left-[-20px]"
      />

      {/* IMPORTANT: no Link here */}
      <span>{title}</span>
    </motion.div>
  );
}