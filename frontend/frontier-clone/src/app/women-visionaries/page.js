"use client";

import { useEffect, useState } from "react";
import { GradualSpacing } from "@/components/HeroTextAnimation";
import { getStrapiData } from "@/utils/utils";
import { STRAPI_URL } from "@/utils/constraints";



export default function WomenVisionaries() {
  const [page, setPage] = useState(1);
  const [visionaries, setVisionaries] = useState([])
  const perPage = 8;
  const totalPages = Math.ceil(visionaries.length / perPage);

  const start = (page - 1) * perPage;
  const currentItems = visionaries.slice(start, start + perPage);
  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const data = await getStrapiData('/posts')
        const authors = data.filter(item=> item.category.slug=== 'women-visionaries').map(item=>item.author)
        setVisionaries(authors)
      } catch (error) {
        console.error("Error fetching visionaries:", error);
       setVisionaries([])
      }
    }
    fetchData()
  },[])
  return (
    <main className="relative min-h-screen bg-[#f6f3ed] overflow-x-hidden">
      {/* Subtle Paper Texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(circle,rgba(0,0,0,0.4)_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden">
        {/* Rose Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f9e4ec] via-[#f3c1d8] to-[#d87aa6]" />

        {/* Light Depth Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_60%)]" />

        {/* Dark Contrast */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 text-white px-8">
          <p className="uppercase tracking-[0.6em] text-[11px] text-[#ffd6ea] font-extrabold">
            Special Edition
          </p>

          <GradualSpacing
            textClassname="mt-10 text-6xl md:text-7xl font-serif font-bold leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-[#fff] to-[#ffd6ea]"
            text="Women Visionaries"
          />

          {/* Shimmer Line */}
          <div className="relative w-20 h-[2px] bg-white/30 mx-auto mt-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_2.5s_linear_infinite]" />
          </div>

          <p className="mt-10 text-xl italic text-white/90 max-w-2xl mx-auto">
            Celebrating leaders redefining industries with courage and
            precision.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-32 grid md:grid-cols-2 lg:grid-cols-4 gap-16">
        {currentItems.map((v, index) => (
          <div
            key={index}
            className="group cursor-pointer text-center transition-transform duration-300 hover:-translate-y-2 will-change-transform"
          >
            <a href={`/blogs/${v.name}?author`} target="_blank" rel="noopener noreferrer">
            <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={v.avatar.url}
                alt={v.name}
                sizes="(max-width:768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </a>
            <h3 className="mt-6 text-xl font-medium group-hover:text-[#b76e79] transition-colors">
              {v.name}
            </h3>

            <p className="text-black/60 text-sm mt-2">{v.profession}</p>

            <div className="mt-4 w-8 h-[1px] bg-black/20 mx-auto group-hover:bg-[#b76e79] transition-colors" />
          </div>
        ))}
      </section>
        
      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center items-center gap-6 pb-32">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-6 py-2 border border-black/30 hover:border-[#b76e79] hover:text-[#b76e79] transition text-sm tracking-wide"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-12 h-12 transition font-medium ${
              page === i + 1
                ? "bg-[#b76e79] text-white shadow-[0_10px_30px_rgba(183,110,121,0.35)]"
                : "border border-black/20 hover:border-[#b76e79] hover:text-[#b76e79]"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-6 py-2 border border-black/30 hover:border-[#b76e79] hover:text-[#b76e79] transition text-sm tracking-wide"
        >
          Next
        </button>
      </div>

      {/* ================= ROSE QUOTE ================= */}
      <section className="py-32 bg-[#111] text-center">
        <blockquote className="text-5xl font-serif text-[#b76e79] leading-[1.3] max-w-4xl mx-auto">
          “Leadership is not granted. It is earned through conviction and
          clarity.”
        </blockquote>
      </section>
    </main>
  );
}
