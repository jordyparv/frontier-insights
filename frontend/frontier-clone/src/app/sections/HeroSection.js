import { GradualSpacing } from "@/components/HeroTextAnimation";
import React from "react";

export default async function HeroSection(params) {
  const { site } = await params;
  return (
    <section className="relative overflow-hidden bg-[#f5f3ee]">
      <div className="absolute inset-0 bg-linear-to-r from-[#dcebea] via-[#ece6da] to-[#f6f4ef]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.05),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-10 md:px-24 pt-32 pb-36 text-center">
        <p className="uppercase tracking-[0.35em] mb-4 text-sm text-[#443730] font-medium">
          {site.hero_micro_label}
        </p>

        <GradualSpacing text={site.hero_title} />

        <h2 className="mt-8 max-w-4xl mx-auto text-[28px] md:text-[34px] font-serif italic text-[#1a1a1a] leading-snug">
          {site.hero_subtitle}
        </h2>

        <p className="mt-10 max-w-3xl mx-auto text-lg text-[#555] leading-relaxed">
          {site.hero_description}
        </p>

        <div className="mt-14 flex flex-col md:flex-row justify-center items-center gap-8">
          <a className="px-10 py-4 rounded-full bg-[#111] text-white text-sm tracking-widest uppercase font-medium hover:bg-[#443730] transition duration-300 shadow-xl"
          href={site.hero_cta_primary_link}
          >
            {site.hero_cta_primary_txt}
          </a>

          <a className="px-10 py-4 rounded-full border border-[#111] text-[#111] text-sm tracking-widest uppercase font-medium hover:bg-[#111] hover:text-white transition duration-300"
          href={site.hero_cta_secondary_link}
          >
            {site.hero_cta_secondary_txt}
          </a>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="flex -space-x-4">
            {["/team1.jpg", "/team2.jpg", "/team3.jpg", "/team4.jpg"].map(
              (src, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden"
                >
                  <img
                    src={src}
                    width={48}
                    height={48}
                    className="rounded-full object-cover w-12 h-12"
                    alt=""
                  />
                </div>
              ),
            )}
          </div>

          <p className="text-sm tracking-wide text-[#666]">
            <span className="font-semibold text-[#111]">
              {site.partner_brand_txt}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
