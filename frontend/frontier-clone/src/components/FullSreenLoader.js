"use client"

import { motion } from "framer-motion"

export default function FullScreenLoader({text, textColor = "text-black", loadingColor = "black"}) {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-[#eef2ec] via-[#f3ede3] to-[#faf8f3] flex items-center justify-center z-50">

      <div className="text-center">

        <h2 className={`text-4xl font-serif tracking-wide ${textColor}`}>
          {text || "Loading..."}
        </h2>

        <div className="mt-6 relative w-40 h-[2px] mx-auto bg-[#c8a85d]/30 overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute w-16 h-full bg-gradient-to-r from-transparent via-[#c8a85d] to-transparent"
          />
        </div>

      </div>

    </div>
  )
}
