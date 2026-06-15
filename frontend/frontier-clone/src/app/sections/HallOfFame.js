"use client";

import { STRAPI_URL } from "@/utils/constraints";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function WallOfFame({ sectionData }) {
  const { content, media_items } = sectionData || {};
  const headline = content?.title || "";
  const description = content?.subtitle || "";
  if (!headline && !description) return null;
  const leaders = media_items?.slice(0, 3) || [];
  return (
    <section className="relative py-40 overflow-hidden bg-gradient-to-r from-[#0b0b0b] via-[#141414] to-[#b8860b] animate-slowGradient">
      {/* Ambient spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#d4af37]/10 rounded-full blur-[220px]" />

      {/* Floating particles */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#d4af37]/60 rounded-full blur-sm animate-float" />
      <div className="absolute bottom-40 right-20 w-2 h-2 bg-[#f5e6a8]/60 rounded-full blur-sm animate-float" />
      <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-[#d4af37]/50 rounded-full blur-sm animate-float" />

      <div className="relative max-w-7xl mx-auto px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-28"
        >
          <h2 className="text-6xl font-serif tracking-[0.25em] bg-gradient-to-r from-[#d4af37] via-[#f5e6a8] to-[#d4af37] bg-clip-text text-transparent animate-goldShimmer">
            {headline}
          </h2>

          <div className="w-48 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-8"></div>

          <p className="mt-10 text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg">
            {description}
          </p>
        </motion.div>

        {/* Cards */}
        {leaders.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.25 },
              },
            }}
            className="grid md:grid-cols-3 gap-16"
          >
            {leaders.map((leader, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 80 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Tilt
                  // glareEnable={true}
                  glareMaxOpacity={0.25}
                  glareColor="#d4af37"
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  className="rounded-3xl"
                >
                  <motion.div
                    whileHover={{ y: -20, scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className="relative group rounded-3xl overflow-hidden bg-[#111] border border-[#d4af37]/40 shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
                  >
                    {/* Animated gold border */}
                    <div className="absolute inset-0 border border-[#d4af37]/20 group-hover:border-[#d4af37]/70 transition duration-500 rounded-3xl"></div>

                    {/* Image */}
                    <div className="relative h-[480px] overflow-hidden">
                      <img
                        src={leader?.image?.url}
                        alt={leader?.alt_text}
                        className="w-full h-full object-cover transition duration-1000 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-10 text-white">
                      <h3 className="text-2xl font-semibold text-[#d4af37] tracking-wide">
                        {leader?.alt_text}
                      </h3>

                      <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mt-3">
                        {leader?.profession_title}
                      </p>

                      <p className="mt-8 italic text-gray-300 leading-relaxed">
                        {leader?.image_quote}
                      </p>
                    </div>
                  </motion.div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
