import React from 'react';
import { motion } from 'framer-motion';
import { variants } from '../utils/motionTokens';

interface ServiceCardProps {
  title: string;
  image: string;
  className?: string;
}

export default function ServiceCard({ title, image, className = '' }: ServiceCardProps) {
  return (
    <motion.div 
      className={`relative rounded-[20px] overflow-hidden bg-black-main ${className}`}
      variants={variants.itemFadeSlideUp}
      whileHover="hover"
      initial="rest"
      // ensure we apply height/width properly via className
    >
      <motion.img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover absolute inset-0"
        variants={variants.imageZoomHover}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0 pointer-events-none"></div>
      <div className="absolute bottom-6 left-6 text-white font-bold text-[24px] tracking-[-0.03em] z-10">
        {title}
      </div>
    </motion.div>
  );
}
