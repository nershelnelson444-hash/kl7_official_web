import React, { useCallback, useRef } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (v: number) => string;
}

export default function RangeSlider({ min, max, step = 1, value, onChange, formatValue }: RangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [low, high] = value;
  const fmt = formatValue ?? ((v: number) => String(v));

  const pct = useCallback((v: number) => ((v - min) / (max - min)) * 100, [min, max]);

  const handleLow = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.min(Number(e.target.value), high - step);
    onChange([next, high]);
  };

  const handleHigh = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.max(Number(e.target.value), low + step);
    onChange([low, next]);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-text-black">{fmt(low)}</span>
        <span className="text-sm font-bold text-text-black">{fmt(high)}</span>
      </div>

      <div ref={trackRef} className="relative h-[4px] w-full rounded-full bg-grey-main">
        <div
          className="absolute h-full rounded-full bg-black-main"
          style={{ left: `${pct(low)}%`, right: `${100 - pct(high)}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={handleLow}
          className="range-thumb"
          aria-label="Minimum"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={handleHigh}
          className="range-thumb"
          aria-label="Maximum"
        />
      </div>
    </div>
  );
}