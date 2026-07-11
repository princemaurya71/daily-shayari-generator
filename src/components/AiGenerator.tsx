import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Feather, Send, HelpCircle, RefreshCw } from 'lucide-react';
import { Shayari, MoodCategory } from '../types';
import { MOODS } from '../data/shayariData';
import ShayariCard from './ShayariCard';

interface AiGeneratorProps {
  activeCategory: MoodCategory;
  onNewShayariGenerated: (shayari: Shayari) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const CREATIVE_SUGGESTIONS = [
  'बारिश और चाय (Rain and Tea)',
  'आधी रात की यादें (Midnight recollections)',
  'सफलता और संघर्ष (Success after struggle)',
  'अधूरी प्रेम कहानी (Unfinished love story)',
  'चाय की चुस्की और पुरानी दोस्ती',
  'खुद से एक मुलाकात (Meeting oneself)',
];

const LOADING_STATUSES = [
  '✍️ Shair is dipping the quill in ink...',
  '✨ Awakening ancient Urdu and Sanskrit metaphors...',
  '🎻 Strumming the emotional chords of your prompt...',
  '📝 Rhyming deep couplets in Devanagari...',
  '🌟 Polishing the transliteration and translation...',
];

export default function AiGenerator({
  activeCategory,
  onNewShayariGenerated,
  favorites,
  onToggleFavorite,
}: AiGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MoodCategory>(activeCategory);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStatusIndex, setLoadingStatusIndex] = useState(0);
  const [generatedShayari, setGeneratedShayari] = useState<Shayari | null>(null);
  const [error, setError] = useState('');

  // Periodically rotate through loading text to engage the user
  const startStatusRotation = () => {
    setLoadingStatusIndex(0);
    const interval = setInterval(() => {
      setLoadingStatusIndex((prev) => (prev + 1) % LOADING_STATUSES.length);
    }, 2500);
    return interval;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating) return;

    setIsGenerating(true);
    setError('');
    setGeneratedShayari(null);

    const statusInterval = startStatusRotation();

    try {
      const response = await fetch('/api/shayaris/generate', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           category: selectedCategory,
           prompt: prompt.trim(),
         }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate poetry from server.');
      }

      const result = await response.json();
      if (result.success && result.data) {
        setGeneratedShayari(result.data);
        onNewShayariGenerated(result.data);
        setPrompt(''); // Clear input after successful creation
      } else {
        throw new Error(result.error || 'Server returned an error.');
      }
    } catch (err: any) {
      console.error(err);
      setError('किन्हीं कारणों से शशिर उपलब्ध नहीं है। Please try again or use another cue.');
    } finally {
      clearInterval(statusInterval);
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-10 my-8" id="ai-generator-section">
      <div className="relative p-6 md:p-8 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden">
        {/* Glow accent */}
        <span className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Feather size={18} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold block">
              Gemini AI Studio Co-Writer
            </span>
            <h3 className="text-lg font-serif font-semibold text-white flex items-center gap-1">
              <span>लिखें अपनी शायरी</span>
              <span className="text-slate-400 font-sans text-xs font-light">| Co-write with Gemini AI</span>
            </h3>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Vibe Selection dropdown */}
            <div className="col-span-1">
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Set Poetic Vibe
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as MoodCategory)}
                disabled={isGenerating}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 outline-none transition-all duration-300"
              >
                {MOODS.map((m) => (
                  <option key={m.category} value={m.category} className="bg-[#0a0a0c] text-white">
                    {m.emoji} {m.label} ({m.hindiLabel})
                  </option>
                ))}
              </select>
            </div>

            {/* Custom cue prompt input */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Your Feeling or Topic (Optional)</span>
                <span className="text-[10px] text-slate-500 lowercase font-normal italic">Hindi/English ok</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Broken promises, heavy rain, self confidence..."
                  disabled={isGenerating}
                  maxLength={100}
                  className="w-full h-12 pl-4 pr-12 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 outline-none transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-indigo-400 hover:text-white hover:bg-indigo-500/20 disabled:text-slate-700 disabled:bg-transparent transition-all duration-300 cursor-pointer"
                >
                  {isGenerating ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Suggestions list */}
          <div className="pt-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">
              Click a suggestion to try:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CREATIVE_SUGGESTIONS.map((sug, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(sug)}
                  disabled={isGenerating}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-slate-400 hover:text-indigo-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 select-none"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Loading and Results state display */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div
                key="loading-box"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 border-t border-white/5"
              >
                <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white/[0.01] border border-white/5 text-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 mb-3 animate-pulse">
                    <Feather className="w-5 h-5 animate-bounce" />
                  </div>
                  <p className="text-sm text-indigo-400 font-serif tracking-wide italic">
                    {LOADING_STATUSES[loadingStatusIndex]}
                  </p>
                  <p className="text-xs text-slate-500 font-sans mt-2">
                    Creating a masterpiece requires selecting the exact rhyming syllables...
                  </p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error-box"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 border-t border-white/5 text-indigo-400 text-center text-xs font-mono"
              >
                {error}
              </motion.div>
            )}

            {generatedShayari && (
              <motion.div
                key="result-box"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="pt-6 border-t border-indigo-500/20"
              >
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-emerald-400 font-bold justify-center bg-emerald-500/10 py-1.5 rounded-xl border border-emerald-500/20 max-w-xs mx-auto">
                  <Sparkles size={14} className="animate-spin" />
                  <span>Fresh AI Masterpiece Written!</span>
                </div>
                <ShayariCard
                  shayari={generatedShayari}
                  isFavorite={favorites.includes(generatedShayari.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
