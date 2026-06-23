import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from '../config/supabaseclient';
import CarsCard from '../components/CarsCard';
import FadeIn from '../components/FadeIn';
import StaggerContainer, { StaggerItem } from '../components/StaggerContainer';
import Button from '../components/Button';
import FilterSidebar, { type FilterState, defaultFilters } from '../components/FilterSidebar';
import type { CMSInventoryItem } from '../data/cms';

// ─── TYPE ────────────────────────────────────────────────────────────────────
export interface Bike {
  id: number;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  color?: string;
  owners?: number;
  body_type?: string;
  drivetrain?: string;
  interior?: string;
  reference_number?: string;
  vin?: string;
  vehicle_overview?: string;
  description?: string;
  engine?: string;
  power?: string;
  torque?: string;
  transmission?: string;
  mileage?: string;
  fuel_type?: string;
  price: number;
  original_price?: number;
  status?: string;
  showroom?: string;
  condition?: string;
  odometer?: number;
  registration_state?: string;
  insurance_valid_till?: string;
  key_features?: string[];
  images?: string[];      // array of Supabase Storage public URLs
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/**
 * Adapts a Bike row from Supabase into the shape CarsCard already
 * expects (the same shape it received from the old CMS inventory).
 *
 * If your CarsCard already accepts a `Bike` directly you can remove
 * this adapter and pass the bike straight to the card.
 */
export function bikeToCardItem(bike: Bike): CMSInventoryItem {
  return {
    id: String(bike.id),
    slug: `${bike.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${bike.model.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${bike.id}`,
    draft: false,
    fieldData: {
      i251F_cLI: { value: `${bike.brand} ${bike.model}` },
      yhmUaSJgn: { value: bike.images?.[0] ?? '' },
      HKJOw7KI7: { value: bike.description ?? '' },
      AsGqvZIRE: { value: String(bike.year) },
      FhhhIfKRq: { value: bike.brand },
      dWaufMx5m: { value: bike.model },
      YwnNt4bSJ: { value: bike.variant ?? '' },
      N5J_P9k5F: { value: bike.reference_number ?? '' },
      nbtxPVxMC: { value: bike.vin ?? '' },
      ieALPznS3: { value: String(bike.price) },
      quZuCOPdT: { value: [] },
      mRbkUObKn: { value: bike.featured ?? false },
      BGGrMCEzn: { value: bike.status === 'Sold' },
      oBzwmlvOK: { value: bike.status ?? '' },
      FixYCUMxe: { value: bike.odometer ?? 0 },
      b0EvjjHmu: { value: bike.engine ?? '' },
      aoQqPXyK7: { value: bike.power ?? '' },
      DUdYPJIP0: { value: bike.transmission ?? '' },
      VOiJF5nuX: { value: bike.drivetrain ?? '' },
      gCShDyGRg: { value: bike.body_type ?? '' },
      WeRM4zBli: { value: [] },
      XKcYqdDj3: { value: bike.fuel_type ?? '' },
      BpRFrjZwy: { value: bike.color ?? '' },
      BsutmQ78B: { value: bike.interior ?? '' },
      hNda28YpA: { value: 2 },
      R6wR_I_UP: { value: 0 },
      P8jIPIoSA: { value: bike.key_features?.join(', ') ?? '' },
      mwpOsOmon: { value: bike.condition ?? '' },
      i2W8PQvdS: { value: bike.owners ?? 1 },
      AVWSdqHPq: { value: '' },
      S3iwwd2B1: { value: '' },
      Vj1xGOKCN: { value: '' },
      cMANx2t9u: { value: false },
    },
  };
}

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
const categories = ["All", "Coupe", "SUV", "Estate", "Convertible"];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function Inventory() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // ── Fetch from Supabase ───────────────────────────────────────────────────
  useEffect(() => {
    async function fetchBikes() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('bikes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setBikes((data as Bike[]) ?? []);
      }

      setLoading(false);
    }

    fetchBikes();
  }, []);

  // ── Filter logic (same as before, now against real Bike fields) ───────────
  const filteredInventory = useMemo(() => {
    return bikes.filter((bike) => {
      const name = `${bike.brand} ${bike.model}`.toLowerCase();
      const model = bike.model.toLowerCase();
      const make = bike.brand;
      const price = Number(bike.price) || 0;
      const year = Number(bike.year) || 0;
      const mileage = Number(bike.odometer) || 0;
      const color = bike.color ?? '';
      const bodyType = bike.body_type ?? '';

      const matchSearch = name.includes(searchQuery.toLowerCase()) || model.includes(searchQuery.toLowerCase());
      const matchCategory = activeCategory === "All" || bodyType.toLowerCase() === activeCategory.toLowerCase();

      const matchBrand = appliedFilters.brands.length === 0 || appliedFilters.brands.includes(make);
      const matchPrice = price >= appliedFilters.priceRange[0] && price <= appliedFilters.priceRange[1];
      const matchYear = year >= appliedFilters.yearRange[0] && year <= appliedFilters.yearRange[1];
      const matchBodyType =
        appliedFilters.bodyTypes.length === 0 ||
        appliedFilters.bodyTypes.some((t) => bodyType.toLowerCase() === t.toLowerCase());
      const matchColor =
        appliedFilters.colors.length === 0 ||
        appliedFilters.colors.some((c) => color.toLowerCase().includes(c.toLowerCase()));
      const matchKm = mileage >= appliedFilters.kmRange[0] && mileage <= appliedFilters.kmRange[1];

      // Segment derived from price (same logic as before)
      const segment = price >= 150000 ? "Luxury" : "Normal";
      const matchSegment = appliedFilters.segments.length === 0 || appliedFilters.segments.includes(segment);

      return (
        matchSearch && matchCategory && matchBrand && matchPrice && matchYear &&
        matchBodyType && matchColor && matchKm && matchSegment
      );
    });
  }, [bikes, searchQuery, activeCategory, appliedFilters]);

  const applyFilters = () => {
    setAppliedFilters(filters);
    setMobileFiltersOpen(false);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setCurrentPage(1);
  };

  const activeFilterCount =
    appliedFilters.brands.length +
    appliedFilters.bodyTypes.length +
    appliedFilters.colors.length +
    appliedFilters.segments.length +
    (appliedFilters.priceRange[0] !== defaultFilters.priceRange[0] || appliedFilters.priceRange[1] !== defaultFilters.priceRange[1] ? 1 : 0) +
    (appliedFilters.yearRange[0] !== defaultFilters.yearRange[0] || appliedFilters.yearRange[1] !== defaultFilters.yearRange[1] ? 1 : 0) +
    (appliedFilters.kmRange[0] !== defaultFilters.kmRange[0] || appliedFilters.kmRange[1] !== defaultFilters.kmRange[1] ? 1 : 0);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="w-full min-h-screen bg-background-main flex flex-col">

      {/* ─── PAGE HERO ───────────────────────────────── */}
      <section className="w-full bg-background-main pt-[104px] pb-0 flex flex-col items-center">
        <div className="max-w-[1480px] w-full px-8 flex flex-col gap-20 py-20">
          <FadeIn direction="up">
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="flex flex-col gap-4">
                <span className="text-sm font-bold uppercase tracking-wider text-text-extra-muted">Our Collection</span>
                <h1 className="text-[56px] font-bold leading-none tracking-[-0.03em]">Browse Bikes</h1>
              </div>
              <div className="flex flex-col items-end gap-6 max-w-[480px]">
                <p className="text-text-black-muted font-medium text-base text-right">
                  Curated pre-owned motorcycles, rigorously inspected and ready for immediate delivery.
                </p>
                <div className="flex flex-row gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-[32px] font-bold leading-none">25+</span>
                    <span className="text-sm font-medium text-text-extra-muted uppercase tracking-wider mt-1">Brands</span>
                  </div>
                  <div className="w-px bg-grey-main" />
                  <div className="flex flex-col items-center">
                    <span className="text-[32px] font-bold leading-none">100+</span>
                    <span className="text-sm font-medium text-text-extra-muted uppercase tracking-wider mt-1">Bikes in Stock</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── SEARCH + FILTER TRIGGER ─────────────────── */}
      <section className="w-full bg-background-main border-t border-grey-main sticky top-[78px] z-30">
        <div className="max-w-[1480px] w-full px-8 mx-auto py-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Search */}
            <div className="hero-search-container w-full md:w-[320px] shrink-0 h-[60px] bg-white border border-grey-main px-5 flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-black-muted shrink-0">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search brands, models..."
                className="hero-search-bar bg-transparent outline-none text-text-black placeholder:text-text-extra-muted font-medium text-sm"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>

            {/* Categories + mobile filter trigger */}
            <div className="flex flex-row items-center gap-2 min-w-0 flex-1">
              <div className="flex flex-row gap-2 overflow-x-auto hide-scrollbar min-w-0">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? 'primary' : 'inverse'}
                    onClick={() => setActiveCategory(cat)}
                    hideIcon
                    className="whitespace-nowrap shrink-0"
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* Mobile-only Filter trigger */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden shrink-0 ml-auto flex items-center gap-2 rounded-2xl border border-grey-main bg-white px-4 py-2.5 text-sm font-medium text-text-black"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black-main text-white text-[11px] font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT: SIDEBAR (desktop) + GRID ───────── */}
      <section className="w-full bg-background-main py-12 pb-36 flex flex-col items-center">
        <div className="max-w-[1480px] w-full px-8 flex flex-col lg:flex-row gap-10">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-[280px] shrink-0">
            <div className="sticky top-[160px] bg-white border border-grey-main rounded-2xl p-6 max-h-[calc(100vh-180px)] overflow-y-auto">
              <FilterSidebar filters={filters} onChange={setFilters} onApply={applyFilters} onReset={resetFilters} />
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {/* Loading state */}
            {loading && (
              <div className="w-full py-32 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-8 h-8 rounded-full border-2 border-grey-main border-t-black-main animate-spin" />
                <p className="text-text-black-muted font-medium">Loading bikes...</p>
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="w-full py-32 flex flex-col items-center justify-center gap-4 text-center">
                <h3 className="text-[24px] font-bold text-text-black">Something went wrong</h3>
                <p className="text-text-black-muted">{error}</p>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && filteredInventory.length === 0 && (
              <div className="w-full py-32 flex flex-col items-center justify-center gap-4 text-center">
                <h3 className="text-[24px] font-bold text-text-black">No bikes found</h3>
                <p className="text-text-black-muted">Try adjusting your search or filter criteria.</p>
                <Button
                  variant="primary"
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); resetFilters(); }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Results */}
            {!loading && !error && filteredInventory.length > 0 && (() => {
              const totalPages = Math.ceil(filteredInventory.length / ITEMS_PER_PAGE);
              const paginated = filteredInventory.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

              const getPageNumbers = () => {
                const pages: (number | '...')[] = [];
                if (totalPages <= 5) {
                  for (let i = 1; i <= totalPages; i++) pages.push(i);
                } else {
                  pages.push(1);
                  if (currentPage > 3) pages.push('...');
                  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
                  if (currentPage < totalPages - 2) pages.push('...');
                  pages.push(totalPages);
                }
                return pages;
              };

              return (
                <>
                  <StaggerContainer delayChildren={0.1} staggerChildren={0.08} className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
                    {paginated.map((bike) => (
                      <StaggerItem key={bike.id}>
                        <CarsCard item={bikeToCardItem(bike)} />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-row items-center justify-center gap-1 mt-12 flex-wrap">
                      <button
                        onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-full border border-grey-main flex items-center justify-center text-sm font-medium disabled:opacity-30 hover:bg-black hover:text-white hover:border-black transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                      </button>

                      {getPageNumbers().map((page, i) =>
                        page === '...' ? (
                          <span key={`dots-${i}`} className="w-10 h-10 flex items-center justify-center text-text-black-muted text-sm">…</span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => { setCurrentPage(page as number); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className={`w-10 h-10 rounded-full border text-sm font-medium transition-colors ${currentPage === page ? 'bg-black text-white border-black' : 'border-grey-main hover:bg-black hover:text-white hover:border-black'}`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-full border border-grey-main flex items-center justify-center text-sm font-medium disabled:opacity-30 hover:bg-black hover:text-white hover:border-black transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ─── MOBILE FILTER DRAWER ─────────────────────── */}
      {mobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background-main flex flex-col">
          <div className="flex items-center gap-4 px-6 py-5 border-b border-grey-main shrink-0">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              aria-label="Back"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-grey-main"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-lg font-bold text-text-black">Filters</h2>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <FilterSidebar filters={filters} onChange={setFilters} onApply={applyFilters} onReset={resetFilters} />
          </div>
        </div>
      )}

    </div>
  );
}