"use client"

import { motion } from "framer-motion"

export default function PreviewModal({ magazine, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <motion.div
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sm"
        >
          Close
        </button>

        <div className="grid md:grid-cols-2 gap-8 ">
          <img src={magazine.image}  className="rounded-lg border-4 border-[#b9974d]" />
          <div>
            <h2 className="text-3xl font-serif">{magazine.title}</h2>
            <p className="mt-4 text-gray-600">{magazine.issue}</p>
            <p className="mt-6 text-gray-700">{magazine.excerpt}</p>
            <div className="w-full h-[2px] bg-gray-300 my-6"></div>
            <a href={magazine.link} className="mt-8 self-end px-10 py-3 border border-[#111] bg-[#111] text-white text-sm uppercase tracking-widest rounded-full transition">
            Read Now
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
