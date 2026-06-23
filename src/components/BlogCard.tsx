import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { CMSBlogItem } from '../data/cms';

interface BlogCardProps {
  item: CMSBlogItem;
}

const MotionLink = motion.create(Link);

export default function BlogCard({ item }: BlogCardProps) {
  const { slug, fieldData } = item;
  const { 
    ems8fj_dg: image,
    vE5dzHwR_: title,
    Kbtb6KX_T: excerpt
  } = fieldData;

  return (
    <MotionLink 
      to={`/blog/${slug}`} 
      className="group flex flex-col w-full bg-white border border-grey-main rounded-[20px] overflow-hidden relative h-full block"
      whileHover="hover"
      initial="initial"
      variants={{
        initial: { y: 0, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0)" },
        hover: { y: -8, boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.08)" }
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="w-full aspect-video bg-background-mid relative overflow-hidden">
        {image?.value ? (
          <motion.img 
            src={image.value} 
            alt={title.value} 
            className="w-full h-full object-cover"
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-extra-muted">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-col p-6 gap-4 flex-grow bg-white z-20">
        <h3 className="text-[24px] font-bold leading-tight tracking-[-0.03em] text-text-black transition-colors line-clamp-2">
          {title?.value}
        </h3>
        <p className="text-[16px] leading-relaxed text-text-black-muted line-clamp-3">
          {excerpt?.value}
        </p>

        <div className="mt-auto pt-4 flex items-center text-black font-medium gap-2">
          Read Article
          <motion.svg 
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            variants={{
              initial: { x: 0 },
              hover: { x: 4 }
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </motion.svg>
        </div>
      </div>
    </MotionLink>
  );
}
