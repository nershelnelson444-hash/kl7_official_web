import React from 'react';
import Button from './Button';
import RangeSlider from './RangeSlider';

export const BRANDS = ['Honda', 'Suzuki', 'Yamaha', 'KTM', 'Royal Enfield', 'Triumph', 'Kawasaki'];
export const BODY_TYPES = ['Cruiser', 'Sports', 'Adventure', 'Naked', 'Scooter'];
export const COLORS: { name: string; hex: string }[] = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Orange', hex: '#EA580C' },
];
export const SEGMENTS = ['Luxury', 'Normal'];

export const PRICE_MIN = 0;
export const PRICE_MAX = 2_000_000;
export const YEAR_MIN = 2010;
export const YEAR_MAX = 2025;
export const KM_MIN = 0;
export const KM_MAX = 100_000;

export interface FilterState {
  brands: string[];
  priceRange: [number, number];
  yearRange: [number, number];
  bodyTypes: string[];
  colors: string[];
  kmRange: [number, number];
  segments: string[];
}

export const defaultFilters: FilterState = {
  brands: [],
  priceRange: [PRICE_MIN, PRICE_MAX],
  yearRange: [YEAR_MIN, YEAR_MAX],
  bodyTypes: [],
  colors: [],
  kmRange: [KM_MIN, KM_MAX],
  segments: [],
};

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xs font-bold uppercase tracking-wider text-text-extra-muted mb-4">{children}</h3>;
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer py-1.5 select-none">
      <span
        className={`flex items-center justify-center w-[18px] h-[18px] rounded-[5px] border shrink-0 transition-colors ${
          checked ? 'bg-black-main border-black-main' : 'bg-white border-grey-main'
        }`}
      >
        {checked && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="text-sm font-medium text-text-black">{label}</span>
    </label>
  );
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-2xl text-sm font-medium border transition-colors ${
        active ? 'bg-black-main text-white border-black-main' : 'bg-white text-text-black border-grey-main hover:border-black-main'
      }`}
    >
      {label}
    </button>
  );
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onApply: () => void;
  onReset: () => void;
}

export default function FilterSidebar({ filters, onChange, onApply, onReset }: FilterSidebarProps) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-col gap-8">
      {/* Brands */}
      <div>
        <SectionLabel>Brands</SectionLabel>
        <div className="flex flex-col">
          {BRANDS.map((b) => (
            <Checkbox key={b} label={b} checked={filters.brands.includes(b)} onChange={() => set('brands', toggle(filters.brands, b))} />
          ))}
        </div>
      </div>

      <div className="h-px bg-grey-main" />

      {/* Price Range */}
      <div>
        <SectionLabel>Price Range</SectionLabel>
        <RangeSlider
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={10000}
          value={filters.priceRange}
          onChange={(v) => set('priceRange', v)}
          formatValue={(v) => `₹${v.toLocaleString('en-IN')}`}
        />
      </div>

      <div className="h-px bg-grey-main" />

      {/* Year Range */}
      <div>
        <SectionLabel>Year Range</SectionLabel>
        <RangeSlider min={YEAR_MIN} max={YEAR_MAX} step={1} value={filters.yearRange} onChange={(v) => set('yearRange', v)} />
      </div>

      <div className="h-px bg-grey-main" />

      {/* Body Type */}
      <div>
        <SectionLabel>Body Type</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {BODY_TYPES.map((t) => (
            <Pill key={t} label={t} active={filters.bodyTypes.includes(t)} onClick={() => set('bodyTypes', toggle(filters.bodyTypes, t))} />
          ))}
        </div>
      </div>

      <div className="h-px bg-grey-main" />

      {/* Color */}
      <div>
        <SectionLabel>Color</SectionLabel>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => {
            const active = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                title={c.name}
                onClick={() => set('colors', toggle(filters.colors, c.name))}
                className={`w-8 h-8 rounded-full border-2 transition-transform ${active ? 'border-black-main scale-110' : 'border-grey-main'}`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </div>

      <div className="h-px bg-grey-main" />

      {/* Kilometer Driven */}
      <div>
        <SectionLabel>Kilometer Driven</SectionLabel>
        <RangeSlider
          min={KM_MIN}
          max={KM_MAX}
          step={1000}
          value={filters.kmRange}
          onChange={(v) => set('kmRange', v)}
          formatValue={(v) => `${v.toLocaleString('en-IN')} km`}
        />
      </div>

      <div className="h-px bg-grey-main" />

      {/* Segment */}
      <div>
        <SectionLabel>Segment</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {SEGMENTS.map((s) => (
            <Pill key={s} label={s} active={filters.segments.includes(s)} onClick={() => set('segments', toggle(filters.segments, s))} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <Button variant="primary" onClick={onApply} className="w-full justify-center">
          Apply Filters
        </Button>
        <Button variant="inverse" onClick={onReset} hideIcon className="w-full justify-center">
          Reset
        </Button>
      </div>
    </div>
  );
}