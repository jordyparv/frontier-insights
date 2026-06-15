"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import WaveSurfer from "wavesurfer.js";
import { addTagToText } from "@/utils/utils";
import FullScreenLoader from "@/components/FullSreenLoader";
import { STRAPI_URL } from "@/utils/constraints";

export default function Podcast({ podcast, trending }) {
  if (!podcast) {
    return <FullScreenLoader />;
  }
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const descriptionWithTags = podcast.description
    ? addTagToText(podcast.description, "podcast")
    : "";

  // Initialize WaveSurfer
  useEffect(() => {
  if (!waveformRef.current || !podcast?.audio_file?.url) return;

  setLoading(true);

  const ws = WaveSurfer.create({
    container: waveformRef.current,
    waveColor: "#ccc",
    progressColor: "#c8a85d",
    cursorColor: "#c8a85d",
    height: 80,
    barWidth: 2,
    barGap: 2,
  });

  wavesurfer.current = ws;

  ws.load(podcast.audio_file.url);

  ws.on("ready", () => {
    setDuration(ws.getDuration());
    setLoading(false);
  });

  ws.on("error", () => {
    setLoading(false);
  });

  return () => {
    ws.destroy();
    wavesurfer.current = null;
  };

}, [podcast.audio_file?.url]);
  const togglePlay = () => {
    wavesurfer.current.playPause();
    setIsPlaying(wavesurfer.current.isPlaying());
  };

  const skipForward = () => {
    wavesurfer.current.skip(15);
  };

  const skipBackward = () => {
    wavesurfer.current.skip(-15);
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-r from-[#eef2ec] via-[#f3ede3] to-[#faf8f3] pt-32">
      {/* Background Depth */}
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
              {podcast.updatedAt
                ? new Date(podcast.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </p>

            <h1 className="mt-8 text-6xl font-serif leading-[1.1] text-[#111]">
              {podcast.title}
            </h1>

            {/* Waveform */}
            <div ref={waveformRef} className="mt-12" />
            {loading && (
              <div className="mt-6 flex items-center gap-2 text-sm text-black/60">
                <span>Loading audio</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8a85d] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#c8a85d] rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#c8a85d] rounded-full animate-bounce [animation-delay:0.3s]" />
                </span>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={skipBackward}
                  disabled={loading}
                  className="px-4 py-2 border rounded-full text-sm hover:bg-black hover:text-white transition"
                >
                  -15s
                </button>

                <button
                  onClick={togglePlay}
                  disabled={loading}
                  className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-lg hover:bg-[#c8a85d] hover:text-black transition"
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>

                <button
                  onClick={skipForward}
                  disabled={loading}
                  className="px-4 py-2 border rounded-full text-sm hover:bg-black hover:text-white transition"
                >
                  +15s
                </button>
              </div>

              <div className="text-sm text-black/70">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <p className="mt-10 text-lg italic text-black/70 leading-relaxed">
              {podcast.excerpt}
            </p>

            <h2 className="mt-16 text-2xl font-serif text-black/90">
              About This Episode
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
              src={podcast?.cover_image?.url}
              className="relative z-10 shadow-[0_50px_120px_rgba(0,0,0,0.3)] rounded-md"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= CONTENT + SIDEBAR ================= */}
      <div className="relative max-w-7xl mx-auto px-8 grid lg:grid-cols-3 gap-24 items-start">
        {/* TRANSCRIPT */}
        <article className="lg:col-span-2 max-w-2xl">
          <div className="space-y-8 text-[18px] leading-[1.9] text-black/80 font-serif">
            <div
              className="first-letter:text-6xl first-letter:mr-3 first-letter:float-left first-letter:leading-none first-letter:text-[#c8a85d]"
              dangerouslySetInnerHTML={{ __html: podcast.transcript }}
            />
          </div>
        </article>

        {/* STICKY TRENDING */}
        <aside className="hidden lg:block sticky top-32 self-start h-fit">
          <div className="px-8 py-10 bg-white/60 backdrop-blur-xl border border-[#c8a85d]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl tracking-[0.2em] uppercase font-medium mb-12 text-black">
              Trending Episodes
              <div className="mt-4 w-10 h-[2px] bg-[#c8a85d]" />
            </h3>

            <div className="space-y-12">
              {trending?.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={item?.cover_image?.url}
                      className="transition duration-700 group-hover:scale-105"
                    />
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
    </main>
  );
}
