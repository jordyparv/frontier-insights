"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { addTagToText } from "@/utils/utils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import Link from "next/link";
import { STRAPI_URL } from "@/utils/constraints";

const PDFViewer = dynamic(() => import("./PDFViewer"), {
  ssr: false,
});

export default function MagazineDetail({ magazine, trending }) {
  const [open, setOpen] = useState(false);
  const descriptionWithTags = magazine.description
    ? addTagToText(magazine.description, "magazine")
    : "";

  return (
    <main className="relative min-h-screen bg-gradient-to-r from-[#eef2ec] via-[#f3ede3] to-[#faf8f3] pt-32">
      {/* Subtle Background Depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.04),transparent_60%)]" />

      {/* ================= HERO ================= */}
      <section className="relative mb-40">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-24 items-center"
        >
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <p className="uppercase tracking-[0.6em] text-[11px] text-[#c8a85d] font-medium">
              {magazine.issue}
            </p>

            <h1 className="mt-8 text-6xl font-serif leading-[1.1] text-[#111]">
              {magazine.title}
            </h1>

            {/* Gold Shimmer */}
            <div className="relative w-40 h-[2px] mt-8 overflow-hidden bg-[#c8a85d]/30">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute w-20 h-full bg-gradient-to-r from-transparent via-[#c8a85d] to-transparent"
              />
            </div>

            <p className="mt-8 text-lg italic text-black/70 leading-relaxed">
              {magazine.excerpt}
            </p>

            <button
              onClick={() => setOpen(true)}
              className="mt-12 px-10 py-3 border border-black rounded-full tracking-wide hover:bg-black hover:text-white transition"
            >
              Open Magazine
            </button>

            <h2 className="mt-16 text-2xl font-serif text-black/90">
              {magazine.subTitle}
            </h2>

            <div className="w-full my-6 h-[1px] bg-black/20" />

            <div
              className="text-lg leading-relaxed text-black/80 font-serif"
              dangerouslySetInnerHTML={{ __html: descriptionWithTags }}
            />
          </div>

          {/* RIGHT COVER */}
          <div className="relative flex justify-center">
            <div className="absolute w-[420px] h-[420px] bg-[#c8a85d]/20 blur-[120px] rounded-full" />

            <motion.img
              whileHover={{ rotateY: 6, rotateX: 4, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 120 }}
              src={magazine.cover_image?.url}
              className="relative z-10 shadow-[0_50px_120px_rgba(0,0,0,0.3)] rounded-md"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= CONTENT + SIDEBAR ================= */}
      <div className="relative max-w-7xl mx-auto px-8 grid lg:grid-cols-3 gap-24 items-start">
        {/* ARTICLE */}
        <article className="lg:col-span-2 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 text-[18px] leading-[1.9] text-black/80 font-serif first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:leading-none first-letter:text-[#c8a85d] prose prose-lg max-w-none prose-headings:font-serif prose-p:font-serif"
          >

            <BlocksRenderer
              content={magazine.content}
              blocks={{

                paragraph: ({ children }) => (
                  <p className="text-[18px] leading-[1.9] text-black/80 font-serif mb-6">
                    {children}
                  </p>
                ),

                heading: ({ children, level }) => {
                  switch (level) {
                    case 1:
                      return (
                        <h1 className="text-5xl font-serif font-semibold mt-16 mb-6 text-[#111]">
                          {children}
                        </h1>
                      )

                    case 2:
                      return (
                        <h2 className="text-3xl font-serif font-semibold mt-12 mb-4 text-[#111]">
                          {children}
                        </h2>
                      )

                    case 3:
                      return (
                        <h3 className="text-2xl font-serif font-medium mt-10 mb-3 text-[#111]">
                          {children}
                        </h3>
                      )

                    case 4:
                      return (
                        <h4 className="text-xl font-serif font-medium mt-8 mb-2 text-[#111]">
                          {children}
                        </h4>
                      )

                    default:
                      return (
                        <h2 className="text-3xl font-serif font-semibold mt-12 mb-4 text-[#111]">
                          {children}
                        </h2>
                      )
                  }
                },

                list: ({ children, format }) => {
                  if (format === "ordered") {
                    return (
                      <ol className="list-decimal pl-6 mb-6 space-y-2 text-black/80 font-serif">
                        {children}
                      </ol>
                    )
                  }

                  return (
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-black/80 font-serif">
                      {children}
                    </ul>
                  )
                },

                quote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#c8a85d] pl-6 italic text-lg text-black/70 my-10 font-serif">
                    {children}
                  </blockquote>
                ),

                link: ({ children, url }) => (
                  <Link
                    href={url}
                    className="text-[#c8a85d] underline hover:opacity-70 transition"
                  >
                    {children}
                  </Link>
                ),
              }}

              modifiers={{

                bold: ({ children }) => (
                  <strong className="font-semibold text-black">{children}</strong>
                ),

                italic: ({ children }) => (
                  <span className="italic">{children}</span>
                ),

                underline: ({ children }) => (
                  <span className="underline">{children}</span>
                ),

                code: ({ children }) => (
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {children}
                  </code>
                ),
              }}
            />
            {/* <p className="first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:leading-none first-letter:text-[#c8a85d]">
              {magazine.content}
            </p> */}
          </motion.div>
        </article>

        {/* ================= STICKY TRENDING ================= */}
        <aside className="hidden lg:block sticky top-32 self-start h-fit mb-12">
          <div className="px-8 py-10 bg-white/60 backdrop-blur-xl border border-[#c8a85d]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl tracking-[0.2em] uppercase font-medium mb-12 text-black">
              Trending
              <div className="mt-4 w-10 h-[2px] bg-[#c8a85d]" />
            </h3>

            <div className="space-y-12">
              {trending?.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      className="transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  <h4 className="mt-5 text-[15px] leading-snug font-medium group-hover:text-[#c8a85d] transition">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
     
      {/* ================= PDF MODAL ================= */}
      {open && (
        <PDFViewer file={`/api/pdf/file?url=${magazine.pdf_file.url}`} onClose={() => setOpen(false)} />
      )}
    </main>
  );
}
