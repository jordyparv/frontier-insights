"use client";

import { STRAPI_URL } from "@/utils/constraints";
import Image from "next/image";
import { useMemo } from "react";



export default function BlogDetail({ post, related }) {
  if (!post) return null;

  const readingTime = useMemo(() => {
    const words = post.content?.split(" ").length || 0;
    return Math.ceil(words / 200);
  }, [post.content]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const paragraphs = post.content?.split("\n") || [];

  return (
    <main className="bg-[#f6f3ed]  text-black  transition-colors duration-500 px-6">
      {/* HERO */}
      <section className="relative max-w-5xl mx-auto px-6 pt-32 text-center">
        <p className="uppercase tracking-[0.5em] text-xs text-[#b9974d]">
          {post.category?.name}
        </p>

        <h1 className="mt-8 text-4xl md:text-6xl font-serif leading-[1.1]">
          {post.title}
        </h1>

        <p className="mt-6 text-sm opacity-60">
          {new Date(post.createdAt).toDateString()} • {readingTime} min read
        </p>

        {post.cover_image?.url && (
          <div className="mt-14 rounded-2xl overflow-hidden shadow-2xl w-[800px] h-[500px] mx-auto ">
            <img
              src={post.cover_image.url}
              alt={post.title}
              className="w-full h-full object-cover"
              // priority
            />
          </div>
        )}
      </section>

      {/* STICKY SHARE SIDEBAR */}
      <div className="hidden lg:flex fixed left-8 top-1/3 flex-col gap-6">
        <button
          onClick={() =>
            navigator.share
              ? navigator.share({ title: post.title, url: shareUrl })
              : navigator.clipboard.writeText(shareUrl)
          }
          className="px-4 py-2 text-xs border border-[#b9974d] text-[#b9974d]"
        >
          Share
        </button>
      </div>

      {/* ARTICLE CONTENT */}
      <section className="max-w-3xl mx-auto px-6 mt-24 space-y-8 leading-relaxed text-lg">
        {paragraphs.map((para, index) => (
          <div key={index}>
            <p>{para}</p>

            {/* Inline gallery injection after 3rd paragraph */}
            {index === 2 && post.gallery?.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6 my-16">
                {post.gallery.slice(0, 2).map((img) => (
                  <img
                    key={img.id}
                    src={img.url}
                    alt=""
                    className="rounded-xl object-cover w-[600px] h-[400px]"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* MASONRY GALLERY */}
      {post.gallery?.length > 2 && (
        <section className="max-w-6xl mx-auto px-6 mt-32 columns-1 md:columns-3 gap-6 space-y-6">
          {post.gallery.slice(2).map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt=""
              className="rounded-xl object-cover w-[600px] h-[400px]"
            />
          ))}
        </section>
      )}

      {/* TAGS */}
      {post.tags?.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 mt-20 flex flex-wrap gap-4 pb-40">
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-4 py-2 border border-[#b9974d] text-[#b9974d] text-xs"
            >
              {tag.name}
            </span>
          ))}
        </section>
      )}

      {/* RELATED POSTS */}
      {related?.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 mt-40">
          <h3 className="text-3xl font-serif mb-12">Related Articles</h3>

          <div className="grid md:grid-cols-3 gap-10">
            {related.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                {item.cover_image?.url && (
                  <img
                    src={item.cover_image.url}
                    width={600}
                    height={400}
                    alt={item.title}
                    className="rounded-xl group-hover:scale-105 transition w-[600px] h-[400px] object-cover"
                  />
                )}

                <h4 className="mt-6 text-xl font-serif group-hover:text-[#b9974d]">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
