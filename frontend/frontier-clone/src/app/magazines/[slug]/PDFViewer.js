"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
});


export default function PDFViewer({ file, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const bookRef = useRef();
 
  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const nextPage = () => {
    bookRef.current?.pageFlip().flipNext();
  };

  const prevPage = () => {
    bookRef.current?.pageFlip().flipPrev();
  };

  const visiblePages = useMemo(() => {
    if (!numPages) return [];
    const start = Math.max(0, currentPage - 2);
    const end = Math.min(numPages - 1, currentPage + 5);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, numPages]);

  const pdfOptions = useMemo(() => ({
      disableStream: false,
      disableAutoFetch: false
    }), [])

    useEffect(() => {
  pdfjs.GlobalWorkerOptions.workerSrc =
    `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
}, [])
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center">

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-white text-2xl hover:opacity-70 transition"
      >
        ✕
      </button>

      {/* Nav */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2">
        <button
          onClick={prevPage}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition"
        >
          ‹
        </button>
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2">
        <button
          onClick={nextPage}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition"
        >
          ›
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-xl shadow-[0_60px_140px_rgba(0,0,0,0.8)]" />

        {loading && (
          <div className="text-white text-lg">Loading Magazine...</div>
        )}

        {file && (
          <Document
            file={file}
            onLoadSuccess={onLoadSuccess}
              options={pdfOptions}
          >
            {numPages && (
              <HTMLFlipBook
                width={550}
                height={700}
                showCover
                flippingTime={600}
                ref={bookRef}
                onFlip={(e) => setCurrentPage(e.data)}
                usePortrait={false}
              >
                {Array.from({ length: numPages }, (_, index) => {
                  if (!visiblePages.includes(index)) {
                    return <div key={index} />;
                  }

                  return (
                    <div key={index} className="relative">
                      <Page
                        pageNumber={index + 1}
                        width={550}
                        devicePixelRatio={1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </div>
                  );
                })}
              </HTMLFlipBook>
            )}
          </Document>
        )}
      </motion.div>

      {numPages && (
        <div className="w-[550px] absolute bottom-6 left-1/2 -translate-x-1/2 px-4">
          <input
            type="range"
            min="0"
            max={numPages - 1}
            value={currentPage}
            onChange={(e) =>
              bookRef.current?.pageFlip().flip(Number(e.target.value))
            }
            className="w-full accent-[#b9974d]"
          />
        </div>
      )}
    </div>
  );
}