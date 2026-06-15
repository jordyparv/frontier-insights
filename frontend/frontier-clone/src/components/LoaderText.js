"use client"

import { motion } from "framer-motion"

export default function LoaderText({ text = "Loading" }) {
  return (
    <div className="flex items-center gap-3 text-black font-serif tracking-wide">
      
      <span>{text}</span>

      <div className="relative w-12 h-[2px] overflow-hidden bg-[#c8a85d]/30">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="absolute w-6 h-full bg-gradient-to-r from-transparent via-[#c8a85d] to-transparent"
        />
      </div>

    </div>
  )
}
