"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getStrapiData } from "@/utils/utils";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function AboutPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStrapiData("/about?populate=*");
        setData(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div className="p-20 text-center">Loading...</div>;

  return (
    <main className="relative min-h-screen bg-[#f6f3ed] pt-36 overflow-x-hidden">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-8 text-center mb-40">

        <p className="uppercase tracking-[0.7em] text-[11px] text-[#b9974d]">
          {data.hero_label}
        </p>

        <h1 className="mt-10 text-[64px] leading-[1.05] font-serif text-[#111]">
          {data.hero_title}
        </h1>

        <div className="mt-10 mx-auto w-16 h-[2px] bg-[#b9974d]" />

        <p className="mt-12 text-xl italic text-black/70 max-w-3xl mx-auto">
          {data.hero_subtitle}
        </p>
      </section>

      {/* STORY */}
      <section className="max-w-7xl mx-auto px-8 grid lg:grid-cols-12 gap-20 mb-48">

        <div className="lg:col-span-7 text-[19px] leading-[1.9] text-black/80 font-serif">

          <h2 className="text-3xl mb-6">{data.story_title}</h2>

          <div className="w-12 h-[2px] bg-[#b9974d] mb-10" />

          <p
            className="first-letter:text-6xl first-letter:float-left"
            dangerouslySetInnerHTML={{ __html: data.story_text_1 }}
          />

          <p
            className="mt-8"
            dangerouslySetInnerHTML={{ __html: data.story_text_2 }}
          />
        </div>

        <div className="lg:col-span-5 relative">
          <img
            src={STRAPI_URL + data.story_image?.url}
            className="shadow-xl"
          />
        </div>

      </section>

      {/* PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-8 mb-48">

        <h2 className="text-center text-3xl font-serif mb-20">
          Our Philosophy
        </h2>

        <div className="grid md:grid-cols-3 gap-16">

          {data.philosophy?.map((item, i) => (
            <motion.div key={i} className="text-center">
              <div className="w-10 h-[2px] bg-[#b9974d] mx-auto mb-6" />
              <h3 className="text-xl mb-4">{item.title}</h3>
              <p className="text-black/70">{item.text}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-6xl mx-auto px-8 mb-48">

        <h2 className="text-3xl text-center mb-16">Our Journey</h2>

        <div className="border-l ml-6 space-y-16">

          {data.timeline?.map((item, i) => (
            <div key={i} className="pl-10 relative">
              <div className="absolute -left-2 w-3 h-3 bg-[#b9974d] rounded-full" />
              <h4>{item.year}</h4>
              <p>{item.text}</p>
            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="text-center pb-32">

        <h2 className="text-4xl mb-8">{data.cta_text}</h2>

        <button className="px-10 py-4 border border-[#b9974d] text-[#b9974d] hover:bg-[#b9974d] hover:text-white transition">
          {data.cta_button}
        </button>

      </section>

    </main>
  );
}