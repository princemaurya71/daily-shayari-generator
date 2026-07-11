import React from 'react';
import { motion } from 'motion/react';
import { MoodConfig } from '../types';
import { MOODS } from '../data/shayariData';

interface MoodSelectorProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function MoodSelector({ activeCategory, onSelectCategory }: MoodSelectorProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-10 my-8" id="mood-selector-container">
      <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 md:p-8">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-indigo-400 mb-2">
            Select Your Atmosphere
          </span>
          <h2 className="text-xl md:text-2xl font-serif font-medium tracking-wide text-white flex items-center gap-2">
            <span>चुनिए अपना मिज़ाज</span>
            <span className="text-slate-400 font-sans text-sm font-light">| Choose Your Mood</span>
          </h2>
          <div className="w-12 h-[1px] bg-indigo-500/30 mt-3" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {MOODS.map((mood) => {
            const isActive = activeCategory === mood.category;
            return (
              <motion.button
                key={mood.category}
                id={`mood-btn-${mood.category}`}
                onClick={() => onSelectCategory(mood.category)}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border text-center transition-all duration-300 cursor-pointer overflow-hidden group select-none ${
                  isActive
                    ? 'bg-indigo-600/20 border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                    : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'
                }`}
              >
                {/* Active ambient aura */}
                {isActive && (
                  <span className="absolute inset-0 bg-radial from-indigo-500/10 to-transparent pointer-events-none animate-pulse" />
                )}

                {/* Emoji element with motion */}
                <span className="text-2xl md:text-3xl mb-2 filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                  {mood.emoji}
                </span>

                {/* Hindi Title */}
                <span className={`font-hindi text-sm md:text-base font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-white font-semibold' : 'text-slate-200'}`}>
                  {mood.hindiLabel}
                </span>

                {/* English Label */}
                <span className={`text-xs font-sans tracking-tight mt-1 transition-colors duration-300 ${isActive ? 'text-indigo-300 font-medium' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {mood.label}
                </span>

                {/* Subtle active underline indicator */}
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] transition-all duration-300 ${
                    isActive ? 'bg-indigo-400 opacity-100' : 'bg-transparent opacity-0'
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
