"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import PreviewModal from "./PreviewModal";

export default function MagazinesPage({
  magazines = [],
  pagination,
  currentPage,
}) {
  const router = useRouter();
  const [active, setActive] = useState(null);

  const highlight = useMemo(() => magazines?.[0], [magazines]);
  const trending = useMemo(() => magazines?.slice(0, 2), [magazines]);

  const totalPages = pagination?.pageCount || 1;

  const changePage = (page) => {
    router.push(`/magazines?page=${page}`);
  };

  return (
    <main className="relative bg-gradient-to-r from-[#eef2ec] via-[#f3ede3] to-[#faf8f3] min-h-screen">

      <div className="relative max-w-7xl mx-auto px-8 py-32 grid lg:grid-cols-3 gap-20 items-start">

        {/* LEFT */}
        <div className="lg:col-span-2">

          {/* HEADER */}
          <section className="mb-32 text-center">
            <p className="uppercase tracking-[0.5em] text-xs text-[#b9974d]">
              Editorial Archive
            </p>

            <h1 className="mt-6 text-6xl font-bold text-black">
              MAGAZINES
            </h1>

            <div className="relative w-40 h-[2px] mx-auto mt-8 bg-[#b9974d]/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b9974d] to-transparent animate-shimmer" />
            </div>

            <p className="mt-10 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A curated collection of influence and insight shaping global leadership.
            </p>
          </section>

          {/* HIGHLIGHT */}
          {highlight && (
            <section className="mb-36 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="uppercase tracking-[0.4em] text-xs text-[#b9974d]">
                  Highlight Edition
                </p>

                <h2 className="mt-6 text-5xl font-serif text-[#111]">
                  {highlight.title}
                </h2>

                <p className="mt-6 text-gray-700 leading-relaxed">
                  {highlight.excerpt}
                </p>

                <button className="mt-10 px-10 py-4 border border-black hover:bg-black hover:text-white transition">
                  Explore Feature
                </button>
              </div>

              <div className="shadow-xl rounded-xl overflow-hidden transition-transform duration-500 hover:scale-105">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="object-cover w-full h-auto"
                />
              </div>
            </section>
          )}

          {/* GRID */}
          <div className="grid md:grid-cols-4 gap-8">
            {magazines.map((mag) => (
              <div
                key={mag.id}
                className="group cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                onClick={() => setActive(mag)}
              >
                <a href={`/magazines/${mag.slug}`} target="_blank" rel="noopener noreferrer">
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={mag.image}
                    alt={mag.title}
                    className="object-cover w-full h-54 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 w-12 h-[2px] bg-[#b9974d]" />
                </div>

                <div className="mt-6">
                  <p className="text-xs tracking-widest text-gray-500">
                    {mag.issue}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-black group-hover:text-[#b9974d] transition-colors">
                    {mag.title}
                  </h3>
                </div>
                </a>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-20">
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => changePage(page)}
                    className={`w-10 h-10 border transition ${
                      currentPage === page
                        ? "bg-[#b9974d] text-white border-[#b9974d]"
                        : "border-black/30 hover:border-[#b9974d] hover:text-[#b9974d]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <h3 className="text-2xl font-semibold mb-8 underline underline-offset-8 decoration-[#b9974d] decoration-4">
              Trending
            </h3>

            {trending.map((item) => (
              <div key={item.id} className="mb-12">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-md mb-4"
                />
                <h4 className="font-medium text-black">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {active && (
        <PreviewModal
          magazine={active}
          onClose={() => setActive(null)}
        />
      )}
    </main>
  );
}