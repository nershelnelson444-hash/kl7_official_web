import React from 'react';
import { motion } from 'framer-motion';
import { springs } from '../utils/motionTokens';

interface StretchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export default function StretchButton({ children, onClick, className = '', href }: StretchButtonProps) {
  const content = (
    <motion.div 
      className={`relative inline-flex items-center bg-black-main text-white rounded-full pl-6 pr-[52px] py-3 cursor-pointer select-none ${className}`}
      whileHover="hover"
      whileTap="tap"
      variants={{
        tap: { scale: 0.98 }
      }}
    >
      <span className="font-medium text-sm z-10 relative pointer-events-none">
        {children}
      </span>
      
      {/* Expanding White Inner Pill */}
      <motion.div
        className="absolute right-[4px] top-[4px] bottom-[4px] bg-white rounded-full flex items-center justify-center overflow-hidden z-0"
        variants={{
          initial: { width: "38px" },
          hover: { width: "calc(100% - 8px)" } // Stretches leftwards across the full button width minus padding
        }}
        initial="initial"
        transition={springs.hover}
      >
        <motion.svg 
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="absolute right-[11px]" // Keeps arrow aligned to the right side of the pill
          variants={{
            initial: { x: 0 },
            hover: { x: 4 }
          }}
          transition={springs.hover}
        >
          <path d="M5 12h14"></path>
          <path d="M12 5l7 7-7 7"></path>
        </motion.svg>
      </motion.div>
      
      {/* Mask to re-render black text over the white expanding pill on hover */}
      <motion.span 
        className="absolute left-6 font-medium text-sm z-20 text-black pointer-events-none"
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.div>
  );

  if (href) {
    return <a href={href} className="inline-block">{content}</a>;
  }

  return (
    <button onClick={onClick} className="inline-block outline-none">
      {content}
    </button>
  );
}
