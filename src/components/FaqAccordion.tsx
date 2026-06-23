import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easings } from '../utils/motionTokens';

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItemProps[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col w-full border-t border-grey-main">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="flex flex-col border-b border-grey-main py-6 cursor-pointer overflow-hidden" onClick={() => toggle(index)}>
            <div className="flex flex-row justify-between items-center w-full">
              <h3 className="text-text-black font-medium text-xl">{item.question}</h3>
              <motion.div 
                className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-black"
                animate={{ rotate: isOpen ? -90 : 0 }}
                transition={{ duration: 0.35, ease: easings.springSoft }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </motion.div>
            </div>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.35, ease: easings.springSoft }}
                >
                  <p className="text-text-black-muted text-base leading-relaxed max-w-[80%]">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
