"use client";

import { STRAPI_URL } from "@/utils/constraints";
import Image from "next/image";
import { useEffect, useState, useMemo, useCallback } from "react";

export default function WomenVisionariesSection({ sectionData }) {
  const { content, media_items } = sectionData || {};
  const { title, description, primary_button_text, primary_button_link } =
    content || {};

  const slides = useMemo(() => media_items?.slice(0, 3) || [], [media_items]);

  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  }, [slides.length]);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next, slides.length]);

  if (!title || !description) return null;

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#d6e0f0] via-[#d9c3e6] to-[#f4c8df]">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-5xl md:text-6xl font-bold text-[#443730] tracking-wide">
          {title}
        </h2>

        <div className="h-1 bg-[#443730] mx-auto mt-4 rounded-full w-40 transition-all duration-500" />

        <p className="mt-8 text-gray-700 max-w-4xl mx-auto leading-relaxed">
          {description}
        </p>

        {primary_button_link && primary_button_text && (
          <a
            href={primary_button_link}
            className="inline-block mt-6 text-sm text-rose-700 uppercase tracking-widest border-b border-rose-400 pb-1 hover:opacity-70 transition"
          >
            {primary_button_text}
          </a>
        )}

        {/* Carousel */}
        {slides.length > 0 && (
          <div className="relative mt-20 flex items-center justify-center">

            <button
              onClick={prev}
              className="absolute left-0 z-20 bg-white/80 p-3 rounded-full shadow-md hover:scale-105 transition"
            >
              ◀
            </button>

            <div className="flex items-center justify-center gap-8 perspective-[1000px]">

              {slides.map((slide, i) => {
                const isCenter = i === index;
                const isRight = i === (index + 1) % slides.length;
                const isLeft =
                  i === (index - 1 + slides.length) % slides.length;

                return (
                  <a
                    key={i}
                    href={slide.image_link}
                    className={`relative w-[280px] h-[420px] overflow-hidden rounded-[40px] shadow-lg cursor-pointer transition-all duration-500
                      ${isCenter ? "scale-100 opacity-100 z-10" : "scale-90 opacity-70"}
                      ${isLeft ? "rotate-y-[15deg]" : ""}
                      ${isRight ? "-rotate-y-[15deg]" : ""}
                    `}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <img
                      src={slide?.image?.url}
                      alt={slide.alt_text}
                      sizes="(max-width:768px) 100vw, 300px"
                    />

                    <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <h3 className="text-lg font-semibold">
                        {slide.alt_text}
                      </h3>
                      <p className="text-sm opacity-80">
                        {slide.profession_title}
                      </p>
                    </div>
                  </a>
                );
              })}

            </div>

            <button
              onClick={next}
              className="absolute right-0 z-20 bg-white/80 p-3 rounded-full shadow-md hover:scale-105 transition"
            >
              ▶
            </button>

          </div>
        )}

      </div>
    </section>
  );
}