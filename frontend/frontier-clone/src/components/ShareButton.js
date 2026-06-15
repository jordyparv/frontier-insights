"use client"

import { useState } from "react"

export default function ShareButton({ title }) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        })
      } catch (err) {
      }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleShare}
      className="relative px-6 py-3 border border-black/30 hover:border-black transition text-sm tracking-wide group"
    >
      <span className="group-hover:opacity-70 transition text-lg">
        {copied ? "Link Copied ✓" : "Share Article"}
      </span>

      {/* Subtle underline animation */}
      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
    </button>
  )
}