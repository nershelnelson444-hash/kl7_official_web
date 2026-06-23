import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  offsetStart?: string;
  offsetEnd?: string;
  distance?: number;
  className?: string;
  staggerIndex?: number;
}

export default function ScrollReveal({ 
  children, 
  offsetStart = "start 90%", 
  offsetEnd = "start 60%", 
  distance = 40,
  className = '',
  staggerIndex = 0
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Create directional velocity sensitivity with useScroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [offsetStart as any, offsetEnd as any]
  });

  // Apply a spring to the scroll progress to ensure smoothness matching framer
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5
  });

  // Stagger is tied to scroll progress by shifting the input range based on index
  const staggerOffset = staggerIndex * 0.1;
  
  const opacity = useTransform(
    smoothProgress,
    [0 + staggerOffset, 1],
    [0, 1]
  );
  
  const y = useTransform(
    smoothProgress,
    [0 + staggerOffset, 1],
    [distance, 0]
  );

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}
