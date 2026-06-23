import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { CMSInventoryItem } from '../data/cms';

interface CarsCardProps {
  item: CMSInventoryItem;
}

const MotionLink = motion.create(Link);

export default function CarsCard({ item }: CarsCardProps) {
  const { slug, fieldData } = item;
  const { 
    yhmUaSJgn: image,
    i251F_cLI: name,
    AsGqvZIRE: year,
    ieALPznS3: price,
    FixYCUMxe: mileage,
    XKcYqdDj3: fuel,
    DUdYPJIP0: transmission,
    oBzwmlvOK: badge
  } = fieldData;

  return (
    <MotionLink 
      to={`/inventory/${slug}`} 
      className="group flex flex-col w-full bg-white border border-grey-main rounded-[20px] overflow-hidden relative block h-full"
      whileHover="hover"
      initial="initial"
      variants={{
        initial: { y: 0, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0)" },
        hover: { y: -8, boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.08)" }
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Image Container */}
      <div className="w-full aspect-[4/3] bg-background-mid relative overflow-hidden">
        {image?.value ? (
          <motion.img 
            src={image.value} 
            alt={name.value} 
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
        
        {/* Badge */}
        {badge?.value && badge.value.trim() !== "" && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full z-10">
            <span className="text-[12px] font-bold uppercase tracking-wider text-black">{badge.value}</span>
          </div>
        )}
        
        {/* Year Label */}
        <div className="absolute bottom-4 right-4 bg-black-50 backdrop-blur-md px-3 py-1.5 rounded-full z-10 text-white font-medium text-sm">
          {year?.value}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-6 gap-6 flex-grow bg-white z-20">
        <div className="flex flex-col gap-1">
          <h3 className="text-[24px] font-bold leading-tight tracking-[-0.03em] text-text-black transition-colors line-clamp-1">{name?.value}</h3>
          <p className="text-[20px] font-medium text-text-black-muted">${price?.value}</p>
        </div>

        {/* Specs */}
        <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-grey-main">
          <div className="flex items-center justify-between text-sm text-text-black-muted">
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              {mileage?.value?.toLocaleString() || "0"} mi
            </span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>
              {transmission?.value?.split('-')[0] || "Auto"}
            </span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5-5-5 5M12 4v12"></path></svg>
              {fuel?.value || "Petrol"}
            </span>
          </div>
        </div>
      </div>
    </MotionLink>
  );
}
