'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import * as React from 'react';

export function GradualSpacing({
  text,
  textClassname = 'text-center font-bold tracking-tighter text-2xl sm:text-4xl md:text-[70px] md:leading-16 text-black'
}) {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true });

  // Safety fallback
  const safeText = typeof text === 'string' ? text : '';

  const characters = React.useMemo(() => safeText.split(''), [safeText]);

  if (!safeText) return null;

  return (
    <div ref={containerRef} className="flex space-x-1 justify-center">
      <AnimatePresence>
        {characters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={textClassname}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}