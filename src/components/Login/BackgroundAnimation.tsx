"use client";

import { motion } from "framer-motion";

const BackgroundAnimation = () =>  {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Lapisan gradien utama */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#1e40af] via-[#ff6b00] to-white opacity-90"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "300% 300%",
        }}
      />

      {/* Bola blur halus */}
      <motion.div
        className="absolute w-72 h-72 bg-[#ff6b00]/40 rounded-full blur-3xl top-10 left-10"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-[#1e40af]/40 rounded-full blur-3xl bottom-10 right-10"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default BackgroundAnimation