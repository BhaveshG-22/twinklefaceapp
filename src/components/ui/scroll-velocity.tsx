"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface ScrollVelocityProps {
  velocity: number; // px/sec, positive = left, negative = right
  children: React.ReactNode;
  className?: string;
}

export function ScrollVelocity({ velocity, children, className }: ScrollVelocityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [setWidth, setSetWidth] = useState(0);

  // Ensure children is an array
  const childArray = React.Children.toArray(children);

  // On mount and when children change, measure width of one set
  useEffect(() => {
    if (setRef.current) {
      setSetWidth(setRef.current.offsetWidth);
    }
  }, [children]);

  useEffect(() => {
    if (!setWidth || !velocity) return;
    const duration = Math.abs(setWidth / velocity);
    const from = 0;
    const to = velocity > 0 ? -setWidth : setWidth;

    controls.set({ x: from });
    controls.start({
      x: to,
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [setWidth, velocity, controls]);

  return (
    <div className={`overflow-hidden w-full ${className || ""}`} ref={containerRef}>
      <motion.div
        className="flex w-max gap-4"
        animate={controls}
        style={{ willChange: "transform" }}
      >
        {/* First set to measure width */}
        <div ref={setRef} className="flex gap-4">
          {childArray.map((child, idx) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { key: `set0-child${idx}-${child.key ?? ''}` })
              : child
          )}
        </div>
        {/* Second set for seamless scroll */}
        <div className="flex gap-4">
          {childArray.map((child, idx) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { key: `set1-child${idx}-${child.key ?? ''}` })
              : child
          )}
        </div>
      </motion.div>
    </div>
  );
} 