import React from 'react';
import { Search, Heart, Sparkles, X } from 'lucide-react';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  showAiOnly: boolean;
  onToggleAiOnly: () => void;
  totalCount: number;
}

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  showAiOnly,
  onToggleAiOnly,
  totalCount,
}: SearchAndFiltersProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-10 my-6" id="search-filters-container">
      <div className="flex flex-col md:flex-row items-center gap-3 bg-white/[0.03] border border-white/10 p-3 rounded-[24px] backdrop-blur-md">
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search moods, categories, or poets... (e.g. Ghalib, Ishq)"
            className="w-full h-11 pl-12 pr-10 rounded-full bg-white/5 border border-white/10 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Action Toggle Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          {/* Favorites Filter */}
          <button
            onClick={onToggleFavoritesOnly}
            className={`flex-1 md:flex-initial h-11 px-5 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer select-none ${
              showFavoritesOnly
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Heart size={14} className={showFavoritesOnly ? 'fill-current' : ''} />
            <span>Favorites</span>
          </button>

          {/* AI Created Filter */}
          <button
            onClick={onToggleAiOnly}
            className={`flex-1 md:flex-initial h-11 px-5 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer select-none ${
              showAiOnly
                ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300 shadow-sm shadow-indigo-500/5'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles size={14} />
            <span>AI Written</span>
          </button>
        </div>
      </div>

      {/* Result Metrics Info */}
      <div className="flex items-center justify-between px-3 mt-2.5">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">
          {searchQuery || showFavoritesOnly || showAiOnly ? (
            <span>Filtering • Found {totalCount} matching verses</span>
          ) : (
            <span>Total • {totalCount} curated verses</span>
          )}
        </span>
      </div>
    </div>
  );
}
