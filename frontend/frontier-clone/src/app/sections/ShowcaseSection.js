"use client";

import { motion } from "framer-motion";

export default function ShowcaseSection({ sectionData }) {
  const { content } = sectionData || {};
  const {
    title: headline,
    description,
    subtitle: subTitle,
    micro_title,
    primary_button_text,
    primary_button_link,
    secondary_button_text,
    secondary_button_link,
  } = content || {};
  if (!headline) return null;

  return (
    <section className="py-36 bg-[#f6f4ef]">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-28 items-start">
        {/* LEFT CONTENT */}
        <div>
          <span className="text-xs uppercase tracking-[0.35em] text-[#443730] font-medium">
            {micro_title}
          </span>

          <h2 className="mt-8 text-4xl md:text-5xl font-semibold text-[#111] leading-tight">
            {headline}
          </h2>

          <div className="w-20 h-[1px] bg-black/30 mt-8"></div>

          <p className="mt-10 text-lg text-[#444] leading-relaxed max-w-xl">
            {subTitle}
          </p>

          <p className="mt-6 text-lg text-[#444] leading-relaxed max-w-xl">
            {description}
          </p>

          {/* Premium Buttons */}
          <div className="flex flex-wrap gap-6 mt-14">
            {primary_button_text && primary_button_link && (
              <a
                href={primary_button_link}
                className="px-10 py-3 bg-[#111] text-white text-sm uppercase tracking-widest rounded-full hover:opacity-80 transition"
              >
                {primary_button_text}
              </a>
            )}
            {secondary_button_text && secondary_button_link && (
              <a
                href={secondary_button_link}
                className="px-10 py-3 border border-[#111] text-[#111] text-sm uppercase tracking-widest rounded-full hover:bg-[#111] hover:text-white transition"
              >
                {secondary_button_text}
              </a>
            )}
            <button
              className="px-10 py-3 bg-[#443730] text-white text-sm uppercase tracking-widest rounded-full hover:opacity-90 transition shadow-lg"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-semibold text-[#111]">
              Latest Issues
            </h3>

            <span className="text-sm uppercase tracking-widest text-[#443730]">
              View Archive
            </span>
          </div>

          <div className="w-16 h-[1px] bg-black/30 mt-6"></div>

          {/* Magazine Covers */}
          <div className="grid sm:grid-cols-2 gap-14 mt-16">
            {["/team1.jpg", "/team2.jpg"].map((img, i) => (
              <a href="/magazine" key={i}>
                <motion.div
                  key={i}
                  whileHover={{ y: -14 }}
                  transition={{ duration: 0.4 }}
                  className="relative group"
                >
                  {/* Shadow depth */}
                  <div className="absolute inset-0 bg-black/10 blur-2xl rounded-[28px] translate-y-6 opacity-60 group-hover:translate-y-8 transition duration-500"></div>

                  <div className="relative overflow-hidden rounded-[28px] shadow-2xl">
                    <img
                      src={img}
                      className="w-full h-[480px] object-cover group-hover:scale-105 transition duration-700"
                    />

                    {/* Soft glass reflection */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
