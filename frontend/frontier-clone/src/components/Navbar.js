"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ navData }) {
  const [open, setOpen] = useState(false);
  const { navItems, showContact, logo } = navData || {
    navItems: [],
    showContact: false,
  };
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* <div className="w-6 h-6 rounded-full border-2 border-black"></div> */}
          {/* <div> */}
          {logo ? (
            // <img
            //   src={process.env.NEXT_PUBLIC_API_URL + logo}
            //   alt="Frontier Logo"
            //   className="w-full h-auto max-h-16 object-contain"
            // />
            <div className="bg-transparent"> {/* or any color */}
            <img
              src={process.env.NEXT_PUBLIC_API_URL + logo}
              alt="Frontier Logo"
              className="w-full h-auto max-h-14 object-contain bg-blend-overlay"
            />
          </div>
          ) : (
            <span className="text-xl tracking-wide font-semibold">
              FRONTLINE INSIGHTS
            </span>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-14 text-[15px] tracking-wide font-medium text-black">
          {navItems.map((item) => (
            <a key={item.id} href={item.href} className="relative group">
              {item.name}
              <span className="absolute left-0 -bottom-3 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-8">
          {showContact && (
            <button className="hidden md:inline-block px-8 py-3 border border-black rounded-full text-sm tracking-wide hover:bg-black hover:text-white transition">
              Contact
            </button>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1"
          >
            <span
              className={`w-6 h-[2px] bg-black transition ${open ? "rotate-45 translate-y-[6px]" : ""}`}
            ></span>
            <span
              className={`w-6 h-[2px] bg-black transition ${open ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`w-6 h-[2px] bg-black transition ${open ? "-rotate-45 -translate-y-[6px]" : ""}`}
            ></span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-black/10"
          >
            <div className="flex flex-col px-8 py-10 gap-8 text-lg tracking-wide">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="hover:opacity-60 transition"
                >
                  {item.name}
                </a>
              ))}

              {showContact && (
                <a
                  href="/#footer__section"
                  className="mt-4 px-8 py-3 border border-black rounded-full hover:bg-black hover:text-white transition"
                >
                  Contact
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
