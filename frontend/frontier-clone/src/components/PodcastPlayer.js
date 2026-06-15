"use client"

import { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js"
import { motion } from "framer-motion"

export default function PodcastPlayer({ audioUrl, title }) {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#e5e5e5",
      progressColor: "#c8a85d",
      cursorColor: "#c8a85d",
      height: 80,
      responsive: true,
      barWidth: 2,
      barGap: 2,
    })

    wavesurfer.current.load(audioUrl)

    wavesurfer.current.on("ready", () => {
      setDuration(wavesurfer.current.getDuration())
    })

    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current.getCurrentTime())
    })

    wavesurfer.current.on("finish", () => {
      setIsPlaying(false)
    })

    return () => wavesurfer.current.destroy()
  }, [audioUrl])

  const togglePlay = () => {
    wavesurfer.current.playPause()
    setIsPlaying(!isPlaying)
  }

  const skipForward = () => {
    wavesurfer.current.setTime(currentTime + 15)
  }

  const skipBackward = () => {
    wavesurfer.current.setTime(currentTime - 15)
  }

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60)
    const seconds = Math.floor(sec % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 w-full bg-white/70 backdrop-blur-xl border-t border-black/10 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-50"
    >
      <div className="max-w-6xl mx-auto px-8 py-6">

        {/* Title */}
        <h4 className="font-serif text-black mb-4">{title}</h4>

        {/* Waveform */}
        <div ref={waveformRef} />

        {/* Controls */}
        <div className="flex items-center justify-between mt-4">

          <div className="flex items-center gap-4">

            <button
              onClick={skipBackward}
              className="px-3 py-1 border rounded-full text-sm"
            >
              -15s
            </button>

            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>

            <button
              onClick={skipForward}
              className="px-3 py-1 border rounded-full text-sm"
            >
              +15s
            </button>

          </div>

          {/* Time */}
          <div className="text-sm text-black/70">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

        </div>
      </div>
    </motion.div>
  )
}