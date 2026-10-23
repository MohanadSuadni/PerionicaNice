"use client";

import { motion } from "framer-motion";

type AnimatedCardProps = {
  children: React.ReactNode;
  index?: number;
};

export default function AnimatedCard({
  children,
  index = 0,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}