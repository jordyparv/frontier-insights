"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import WaveSurfer from "wavesurfer.js";
import { STRAPI_URL } from "@/utils/constraints";


export default function Podcasts({ podcasts }) {
  const router = useRouter();

  const [playingId, setPlayingId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const waveformRefs = useRef({});
  const wavesurferRef = useRef(null);

  const totalPages = podcasts?.meta?.pagination?.pageCount || 1;
  const currentPage = podcasts?.meta?.pagination?.page || 1;

  useEffect(() => {
    return () => wavesurferRef.current?.destroy();
  }, []);

  useEffect(() => {
    if (!playingId) return;

    const podcast = podcasts.data?.find((p) => p.id === playingId);
    if (!podcast?.audio_file?.url) return;

    const container = waveformRefs.current[playingId];
    if (!container) return;

    wavesurferRef.current?.destroy();
    setLoadingId(playingId);

    const ws = WaveSurfer.create({
      container,
      waveColor: "#ddd",
      progressColor: "#c8a85d",
      cursorColor: "#c8a85d",
      height: 60,
      barWidth: 2,
      barGap: 2,
    });

    ws.load(podcast.audio_file.url);

    ws.on("ready", () => {
      setLoadingId(null);
      ws.play();
    });

    ws.on("finish", () => {
      setPlayingId(null);
    });

    wavesurferRef.current = ws;

    return () => ws.destroy();
  }, [playingId, podcasts]);

  const toggleAudio = (id) => {
    if (loadingId) return;

    if (playingId === id) {
      wavesurferRef.current?.destroy();
      setPlayingId(null);
      setLoadingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const changePage = (page) => {
    router.push(`/podcasts?page=${page}`);
  };

  const getVisiblePages = () => {
    const pages = [];
    const delta = 2;

    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("...");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <main className="min-h-screen bg-[#f6f3ed] pt-20 pb-32">
      {/* ================= HERO ================= */}
      <section className="text-center mb-28">
        <p className="uppercase tracking-[0.6em] text-[11px] text-[#c8a85d]">
          Podcast Archive
        </p>

        <h1 className="mt-8 text-6xl font-serif text-black uppercase">
          Voices of Impact
        </h1>

        <div className="w-16 h-[2px] bg-[#c8a85d] mx-auto mt-6" />
      </section>

      {/* ================= GRID ================= */}
      {podcasts.data?.length === 0 && (
        <p className="text-center text-black/60">No podcasts found.</p>
      )}
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-16">
        {podcasts.data?.length &&
          podcasts.data?.map((pod) => (
            <motion.div
              key={pod.id}
              whileHover={{ y: -6 }}
              className="group"
            >
              <a href={`/podcasts/${pod.slug}`}>
                <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={pod?.cover_image?.url}
                    alt={pod.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </a>

              <div className="mt-6">
                <a href={`/podcasts/${pod.slug}`}>
                  <h3 className="text-lg font-medium group-hover:text-[#c8a85d] transition">
                    {pod.title}
                  </h3>
                </a>
                <p className="mt-2 text-sm text-black/60">{pod.duration}</p>

                <div className="mt-6">
                  <button
                    onClick={() => toggleAudio(pod.id)}
                    disabled={loadingId === pod.id}
                    className="px-5 py-2 border border-[#c8a85d] text-[#c8a85d] hover:bg-[#c8a85d] hover:text-white transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingId === pod.id
                      ? "Loading..."
                      : playingId === pod.id
                        ? "Stop Preview"
                        : "Play Preview"}
                  </button>

                  {playingId === pod.id && (
                    <div
                      ref={(el) => (waveformRefs.current[pod.id] = el)}
                      className="mt-4"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center mt-24 gap-3 flex-wrap">
        {getVisiblePages().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => changePage(page)}
              className={`w-10 h-10 border transition ${
                currentPage === page
                  ? "bg-[#c8a85d] text-white border-[#c8a85d]"
                  : "border-black/30 hover:border-[#c8a85d] hover:text-[#c8a85d]"
              }`}
            >
              {page}
            </button>
          ),
        )}
      </div>
    </main>
  );
}
