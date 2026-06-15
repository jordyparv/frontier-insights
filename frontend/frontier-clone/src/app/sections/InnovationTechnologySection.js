"use client"

import { STRAPI_URL } from "@/utils/constraints";
import { getStrapiData } from "@/utils/utils";
import { motion } from "framer-motion"
import { useEffect, useState } from "react";

export default function InnovationTechnologySection({ sectionData }) {
    const { content, media_items } = sectionData || {};
    const headline = content?.title || "";
    const description = content?.subtitle || "";
    if (!headline && !description) return null;
    
    const [articles, setArticles] = useState([]);
 
   useEffect(() => {
     const fetchPosts = async () => {
       try {
         const data = await getStrapiData(
           "/posts?category=innovation-and-technology&page=1&pageSize=5"
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
 
         setArticles(formatted);
       } catch (error) {
         console.error("Trending fetch error:", error);
       }
     };
 
     fetchPosts();
   }, []);
 
  return (
    <section className="relative py-36 bg-[#f5f3ee] overflow-hidden">

      {/* Vertical editorial line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300/40 hidden lg:block"></div>

      <div className="max-w-6xl mx-auto px-8">

        {/* Heading */}
        <div className="text-center mb-28">
          <h2 className="text-4xl font-bold font-serif tracking-widest text-[#1d1d1f]">
            {headline}
          </h2>

          <div className="w-24 h-[2px] bg-[#443730] mx-auto mt-6"></div>

          <p className="mt-10 text-gray-700 max-w-3xl mx-auto leading-relaxed font-serif italic text-lg">
           {description}
          </p>
        </div>

        {/* Articles */}
        <div className="space-y-36">

          {articles.map((article, i) => {
            const isEven = i % 2 === 0

            return (
              <motion.a
                key={i}
                href={article.link}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-16 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >

                {/* IMAGE */}
                <div
                  className={`relative group overflow-hidden rounded-3xl ${
                    !isEven ? "lg:order-2" : ""
                  }`}
                >
                  <div className="relative h-[420px] overflow-hidden">

                    <img
                      src={article.image}
                      className="w-full h-full object-cover transition duration-[1200ms] group-hover:scale-110"
                    />

                    {/* Parallax overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                </div>

                {/* TEXT */}
                <div className={`${!isEven ? "lg:order-1" : ""} relative`}>

                  {/* Floating Index */}
                  <span className="absolute -top-16 -left-6 text-[120px] font-serif text-gray-300/30 pointer-events-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="relative text-2xl font-semibold leading-snug text-[#1d1d1f] group-hover:text-[#443730] transition">

                    {/* Shimmer underline */}
                    <span className="relative inline-block">
                      {article.title}
                      <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-gradient-to-r from-[#443730] to-[#443730] group-hover:w-full transition-all duration-500"></span>
                    </span>

                  </h3>

                  <p className="mt-6 text-gray-600 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="mt-8 text-sm font-medium text-[#443730] tracking-wide group-hover:tracking-wider transition">
                    Read More →
                  </div>

                </div>

              </motion.a>
            )
          })}
        </div>

      </div>
    </section>
  )
}
