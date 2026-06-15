"use client";

import { useEffect, useState } from "react";
import { getStrapiData } from "@/utils/utils";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await getStrapiData("/privacy-policy?populate=deep");
      setData(res);
      console.log("Privacy Policy data:", res);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const current = window.scrollY;
      setProgress((current / total) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!data) return null;

  return (
    <main className="relative bg-[#f6f4ef]">

      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#c8a85d] z-50 transition-all"
        style={{ width: `${progress}%` }}
      />

      {/* HERO */}
      <section className="relative pt-40 pb-28 text-center overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-[#f1efe9] via-[#ece6da] to-[#f8f6f2]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.04),transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative max-w-4xl mx-auto px-8"
        >
          <p className="uppercase tracking-[0.5em] text-[11px] text-[#c8a85d]">
            Legal Framework
          </p>

          <h1 className="mt-8 text-6xl md:text-7xl font-serif text-[#111]">
            {data.title}
          </h1>

          <div className="relative w-24 h-[2px] bg-[#c8a85d]/30 mx-auto mt-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c8a85d] to-transparent animate-[shimmer_3s_linear_infinite]" />
          </div>

          <p className="mt-10 text-sm text-black/60 tracking-wide">
            Version {data.version} • Updated {data.last_updated}
          </p>
        </motion.div>
      </section>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mt-4 mx-auto px-8 flex gap-20 pb-40">

        {/* Sticky Sidebar */}
        <aside className="hidden lg:block w-64 sticky top-40 h-fit">
          <h3 className="text-sm uppercase tracking-widest text-black/50 mb-8">
            Sections
          </h3>
          <ul className="space-y-4 text-sm">
            {data.sections?.map((section, i) => (
              <li key={i}>
                <a
                  href={`#section-${i}`}
                  className="hover:text-[#c8a85d] transition"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Policy Content */}
        <section className="flex-1 space-y-24">

          {/* Introduction */}
          <div className="bg-white/70 backdrop-blur-xl border border-black/5 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-14">
            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-p:text-black/70"
              dangerouslySetInnerHTML={{ __html: data.introduction }}
            />
          </div>

          {/* Sections */}
          {data.sections?.map((section, i) => (
            <motion.div
              key={i}
              id={`section-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-center gap-6 mb-6">
                <span className="text-4xl font-serif text-[#c8a85d]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-[1px] bg-black/10 group-hover:bg-[#c8a85d] transition" />
              </div>

              <h2 className="text-3xl font-serif text-[#111] mb-8">
                {section.title}
              </h2>

              <div
                className="prose prose-lg max-w-none prose-headings:font-serif prose-p:text-black/70"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </motion.div>
          ))}

        </section>
      </div>

      {/* Bottom Statement */}
      <section className="py-24 bg-[#111] text-center">
        <p className="text-[#c8a85d] font-serif text-2xl max-w-3xl mx-auto">
          Your privacy is not a feature. It is a responsibility.
        </p>
      </section>
    </main>
  );
}