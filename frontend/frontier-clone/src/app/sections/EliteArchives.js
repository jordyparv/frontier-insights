"use client";
import { STRAPI_URL } from "@/utils/constraints";
import { motion } from "framer-motion";

export default function EliteArchivesSection({ sectionData }) {
  const { content, media_items } = sectionData || {};
  const { title, description, primary_button_text, primary_button_link } =
    content;
  if (!title || !description) return null;
  return (
    <section className="py-36 bg-[#f8f7f4]">
      <div className="max-w-7xl mx-auto px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-semibold tracking-tight text-[#111]">
            {title}
          </h2>

          <div className="w-24 h-[1px] bg-black/30 mx-auto my-8" />

          <p className="text-xl md:text-2xl font-serif italic text-[#222] leading-relaxed">
            {description}
          </p>
          {primary_button_link && primary_button_text && (
            <a
              href={primary_button_link}
              className="inline-block mt-6 text-sm uppercase tracking-widest border-b border-black pb-1 hover:opacity-60 transition"
            >
              {primary_button_text}
            </a>
          )}
        </div>

        {/* Magazine Grid */}
        {media_items?.length > 0 && (
          <div className="grid md:grid-cols-4 gap-20 mt-24">
            {media_items?.slice(0, 4)?.map((member, index) => (
              <a
                key={member?.alt_text || index}
                href={member?.image_link || null}
              >
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="group"
                >
                  {/* Portrait */}
                  <div className="relative h-[520px] overflow-hidden rounded-[28px] shadow-xl">
                    <img
                      alt={member?.alt_text}
                      src={member?.image?.url}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-700 ease-out"
                    />

                    {/* Soft bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Caption */}
                  <div className="mt-8 text-center">
                    <h3 className="text-xl font-medium tracking-wide text-[#111] transition group-hover:text-[#b8860b]">
                      {member?.alt_text}
                    </h3>

                    <p className="mt-3 text-xs uppercase tracking-[0.25em] text-gray-500 transition group-hover:text-[#b8860b]">
                      {member?.profession_title}
                    </p>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
