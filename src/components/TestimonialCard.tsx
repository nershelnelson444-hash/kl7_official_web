import React from 'react';

interface TestimonialCardProps {
  name: string;
  quote: string;
  vehicle: string;
}

export default function TestimonialCard({ name, quote, vehicle }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-6 shadow-sm border border-grey-main/50">
      <p className="text-text-black font-medium text-lg leading-relaxed">"{quote}"</p>
      <div className="flex flex-col">
        <span className="font-bold text-base text-text-black">{name}</span>
        <span className="text-text-extra-muted text-sm">{vehicle}</span>
      </div>
    </div>
  );
}
