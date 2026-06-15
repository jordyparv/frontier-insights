"use client"

import { STRAPI_URL } from "@/utils/constraints"
import { getStrapiData } from "@/utils/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"



export default function EditorialHighlight({sectionData}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % posts.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getStrapiData(
          "/posts?page=1&pageSize=5"
        );

        const formatted = data.map((post) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          image: post.cover_image?.url
            ? post.cover_image.url
            : "/placeholder.jpg",
          link: `/blogs/${post.slug}`,
        }));

        setPosts(formatted);
      } catch (error) {
        console.error("Trending fetch error:", error);
      }
    };

    fetchPosts();
  }, []);


  const next = () => setIndex((prev) => (prev + 1) % posts.length)
  const prev = () =>
    setIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1))

  const { content } = sectionData || {}
  const { title, description } = content || {}
  if(!title || !description) return null

  return (
    <section className="py-32 bg-[#f5f3ee]">

      <div className="max-w-7xl mx-auto px-8">

        {/* Section Heading */}
        <div className="mb-20 max-w-3xl">
          <h2 className="text-4xl font-serif text-[#1d1d1f]">
            {title}
          </h2>
          <div className="w-24 h-[1px] bg-gray-400 mt-6"></div>
          <p className="mt-6 text-gray-600">{description}</p>
        </div>

        <div className="relative h-[600px] overflow-hidden rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.12)]">

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={posts[index].image}
              src={posts[index].image}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Soft bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Slide Numbers */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`text-sm tracking-widest transition ${
                  i === index
                    ? "text-black font-semibold"
                    : "text-black/40"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>

          {/* Editorial Panel */}
          <motion.div
            key={posts[index].title}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute right-20 top-1/2 -translate-y-1/2 bg-[#f8f6f1] p-14 max-w-xl rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] z-20"
          >
            <p className="uppercase text-xs tracking-[0.3em] text-gray-500">
              {posts[index].category}
            </p>

            <h2 className="mt-6 text-3xl font-serif text-[#1d1d1f] leading-snug">
              {posts[index].title}
            </h2>

            <a
              href={posts[index].link}
              className="inline-block mt-8 text-sm tracking-wide text-black border-b border-black hover:opacity-70 transition"
            >
              Explore Article →
            </a>
          </motion.div>

          {/* Navigation */}
          <div className="absolute right-10 bottom-10 flex gap-4 z-30">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:opacity-70 transition"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:opacity-70 transition"
            >
              →
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
