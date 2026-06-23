import React from 'react';
import { motion } from 'framer-motion';

interface TeamMemberCardProps {
  name: string;
  role: string;
  image?: string;
  height?: string;
}

export default function TeamMemberCard({ name, role, image, height = "400px" }: TeamMemberCardProps) {
  return (
    <motion.div 
      className="relative rounded-2xl overflow-hidden bg-black-main cursor-pointer"
      style={{ height }}
      whileHover="hover"
      initial="initial"
    >
      <div className="absolute inset-0 z-0">
        {image ? (
          <motion.img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover" 
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <motion.div 
            className="w-full h-full bg-grey-main"
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          ></motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>
      <motion.div 
        className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col"
        variants={{
          initial: { y: 0 },
          hover: { y: -8 }
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <h3 className="text-white font-medium text-2xl">{name}</h3>
        <span className="text-white/80 font-medium text-base">{role}</span>
      </motion.div>
    </motion.div>
  );
}
