"use client"
import { motion } from "framer-motion"
import { truncate } from "../../utils/utils"
import { STRAPI_URL } from "@/utils/constraints"

export default function BlogPage({ blogData = [] }) {

  if (!blogData.length) {
    return <div className="pt-40 text-center">No posts found</div>
  }

  const featured = blogData[0]
  const others = blogData.slice(1)

  const getImage = (post) => {
    if (!post?.cover_image?.url) return "/fallback.jpg"
    return post.cover_image.url
  }

  return (
    <main className="relative min-h-screen bg-[#f6f3ed] pt-36 pb-40 overflow-x-hidden">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-8 text-center mb-32">
        <p className="uppercase tracking-[0.6em] text-[11px] text-[#b9974d]">
          Editorial Journal
        </p>
        <h1 className="mt-10 text-6xl font-serif text-black">
          Insights & Perspectives
        </h1>
        <div className="w-16 h-[2px] bg-[#b9974d] mx-auto mt-8" />
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-8 grid lg:grid-cols-12 gap-20 mb-40 items-center">

        <div className="lg:col-span-7">
          <p className="uppercase tracking-[0.4em] text-[11px] text-[#b9974d]">
            Featured Story
          </p>

          <h2 className="mt-8 text-5xl font-serif leading-[1.1] text-[#111]">
            {truncate(featured?.title, 100)}
          </h2>

          <div className="w-12 h-[2px] bg-[#b9974d] mt-6" />

          <p className="mt-10 text-xl italic text-black/70 leading-relaxed max-w-2xl">
            {truncate(featured?.excerpt, 200)}
          </p>
          <button
            onClick={() => window.open(`/blogs/${featured?.slug}`, "_blank")}
            className="mt-12 px-10 py-3 bg-[#111] text-white text-sm uppercase tracking-widest rounded-full hover:opacity-80 transition"
          >
            Read More
          </button>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.img
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
            src={getImage(featured)}
            className="relative shadow-[0_40px_100px_rgba(0,0,0,0.2)] rounded-2xl w-full h-[500px] object-cover"
          />
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-20">

        {others.map((blog, index) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <a href={`/blogs/${blog.slug}`}>
            <div className="relative overflow-hidden h-[360px] rounded-2xl">
              <img
                src={getImage(blog)}
                className="transition duration-700 group-hover:scale-105 h-full w-full object-cover"
              />
            </div>

            <div className="mt-8">
              <p className="uppercase tracking-widest text-[11px] text-black/50">
                {blog?.category?.name || "General"} •{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>

              <h3 className="mt-4 text-2xl font-serif leading-snug group-hover:text-[#b9974d] transition">
                {truncate(blog?.title, 30)}
              </h3>

              <p className="mt-6 text-black/70 leading-relaxed">
                {truncate(blog?.excerpt, 100)}
              </p>
            </div>
            </a>
          </motion.article>
        ))}

      </section>

    </main>
  )
}