"use client";

import React, { useEffect, useState } from "react";
import { getStrapiData } from "@/utils/utils";


export default function TrendingSection({sectionData}) {
  const [posts, setPosts] = useState([]);
  const {content} = sectionData || {}
  const {title, description} = content || {}
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getStrapiData(
          "/posts?category=business-trends&page=1&pageSize=5"
        );

        const formatted = data.map((post) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          image: post.cover_image?.url
            ?  post.cover_image.url
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

  if (!posts.length) return null;

  return (
    <section className="py-32 bg-[#f5f3ee]">
      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}
        <div className="mb-20 max-w-3xl">
          <h2 className="text-4xl font-serif tracking-wide text-[#1d1d1f] font-bold">
            {title}
          </h2>

          <div className="w-16 h-[1px] bg-gray-400 mt-6" />

          <p className="mt-8 text-gray-600 leading-relaxed text-lg italic font-serif">
           {description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* FEATURED */}
          <a
            href={posts[0]?.link}
            className="group block transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-lg">

              <div className="relative h-[500px]">
                <img
                  src={posts[0]?.image}
                  alt={posts[0]?.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-105 w-full h-full"
                />
              </div>

            </div>

            <h3 className="mt-8 text-2xl font-semibold text-[#1d1d1f] leading-snug">
              {posts[0]?.title}
            </h3>

            <div className="mt-3 text-sm text-gray-500 tracking-wide">
              Featured Insight
            </div>
          </a>

          {/* RIGHT STACK */}
          <div className="space-y-16">

            {posts.slice(1).map((post) => (
              <a
                key={post.id}
                href={post.link}
                className="group flex gap-8 items-start transition-transform duration-300 hover:-translate-y-1"
              >

                <div className="relative w-[200px] h-[140px] overflow-hidden rounded-xl shadow-md flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105 h-full w-full"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1d1d1f] leading-snug group-hover:text-black transition">
                    {post.title}
                  </h3>

                  <div className="mt-3 h-[1px] w-14 bg-gray-300 group-hover:w-20 transition-all duration-300" />

                  <p className="mt-3 text-sm text-gray-500 tracking-wide">
                    Read Article →
                  </p>
                </div>

              </a>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}