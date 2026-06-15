"use client";

import { STRAPI_URL } from "@/utils/constraints";
import { motion } from "framer-motion";

export default function VisionaryVoices({ sectionData }) {
  const { content, media_items } = sectionData || {};

  const headline = content?.title || "";
  const description = content?.description || "";

  const { micro_label, primary_button_text, primary_button_link } =
    content || {};

  if (!headline && !description) return null;

  const right_media =
    media_items?.map((item) => ({
      title: item.image_quote,
      subtitle: item.profession_title,
      link: item.image_link || "/contact",
      text: item.alt_text,
      image: item.image?.url ? item.image.url : "/placeholder.jpg",
    })) || [];

  return (
    <section className="py-36 bg-[#f7f6f3]" id="podcast_link">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-28 items-center">
        {/* LEFT CONTENT */}
        <div>
          {micro_label && (
            <span className="inline-block text-xs tracking-[0.35em] uppercase text-[#443730] font-medium">
              {micro_label}
            </span>
          )}

          <div className="w-16 h-[1px] bg-black/30 mt-6"></div>

          <h2 className="mt-10 text-4xl md:text-5xl font-semibold text-[#111] leading-tight">
            {headline}
          </h2>

          <p className="mt-8 mb-3 text-lg text-[#444] leading-relaxed max-w-xl">
            {description}
          </p>

          {primary_button_text && primary_button_link && (
            <a
              href={primary_button_link}
              className="inline-block mt-14 px-8 py-3 bg-[#111] text-white text-sm uppercase tracking-widest rounded-full hover:opacity-80 transition"
            >
              {primary_button_text}
            </a>
          )}
        </div>

        {/* RIGHT CARDS */}
        <div className="grid sm:grid-cols-2 gap-12">
          {right_media.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              whileHover={{ y: -12 }}
              transition={{ duration: 0.4 }}
              className="relative h-[420px] rounded-[36px] overflow-hidden group"
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/30" />

              {/* Soft Purple Glow */}
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#443730]/20 rounded-full blur-3xl group-hover:bg-[#443730]/30 transition duration-700" />

              {/* Pink Glow */}
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl group-hover:bg-pink-500/30 transition duration-700" />

              {/* Glass Layer */}
              <div className="absolute inset-0 bg-black/10 backdrop-blur border border-white/10 rounded-[36px]" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-center h-full px-10 text-white">
                {item.subtitle && (
                  <p className="text-xs tracking-[0.3em] uppercase text-white/60">
                    {item.subtitle}
                  </p>
                )}

                <h3 className="mt-6 text-3xl font-semibold leading-snug">
                  {item.title}
                </h3>

                <div className="w-12 h-[1px] bg-white/40 my-8" />

                <span className="text-sm uppercase tracking-[0.3em] text-white/70 group-hover:text-white transition">
                  Contact Us
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
