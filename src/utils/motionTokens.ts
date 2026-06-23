import type { Easing, Transition } from "framer-motion";

export const easings = {
  easeInMotion: [0.55, 0.085, 0.68, 0.53] as Easing,
  easeOutMotion: [0.25, 1, 0.5, 1] as Easing,
  easeHoverMotion: [0.22, 1, 0.36, 1] as Easing,
  easeScrollMotion: [0.16, 1, 0.3, 1] as Easing,
  springSoft: [0.4, 0, 0.2, 1] as Easing,
};

export const springs = {
  hover: { type: "spring", stiffness: 400, damping: 30 } as Transition,
  bouncy: { type: "spring", stiffness: 300, damping: 20 } as Transition,
  drift: { type: "spring", stiffness: 50, damping: 20, mass: 2 } as Transition, // Slow, heavy ambient drift
  shimmer: { type: "spring", stiffness: 100, damping: 10 } as Transition,
};

export const durations = {
  fast: 0.3,
  base: 0.6,
  slow: 0.8,
  countUp: 2.5,
  hoverExit: 0.22, // 220ms delayed exit
};

export const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  itemFadeSlideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.base,
        ease: easings.easeOutMotion,
      },
    },
  },
  microHover: {
    rest: { 
      scale: 1, 
      opacity: 1, 
      borderColor: "rgba(230, 230, 230, 0.1)",
      transition: { duration: durations.hoverExit, ease: easings.easeOutMotion }
    },
    hover: { 
      scale: 1.01, // 1px shift approximation 
      opacity: 0.98, // opacity shimmer
      borderColor: "rgba(230, 230, 230, 0.18)", // alpha breathing
      transition: { duration: durations.fast, ease: easings.easeHoverMotion } 
    },
  },
  imageZoomHover: {
    rest: { scale: 1, transition: { duration: durations.hoverExit, ease: easings.easeOutMotion } },
    hover: { 
      scale: 1.05, 
      transition: { duration: 0.4, ease: easings.easeHoverMotion } 
    },
  },
};
