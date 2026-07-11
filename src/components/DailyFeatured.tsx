import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Quote, Copy, Check, Share2, Heart, MessageSquare } from 'lucide-react';
import { Shayari } from '../types';

interface DailyFeaturedProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function DailyFeatured({ favorites, onToggleFavorite }: DailyFeaturedProps) {
  const [dailyShayari, setDailyShayari] = useState<Shayari | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchDaily() {
      try {
        const response = await fetch('/api/shayaris/daily');
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setDailyShayari(result.data);
          }
        }
      } catch (error) {
        console.error('Error fetching daily shayari:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDaily();
  }, []);

  const handleCopy = async () => {
    if (!dailyShayari) return;
    const textToCopy = `✍️ *${dailyShayari.author}*\n\n${dailyShayari.hindi}\n\n_${dailyShayari.englishTranslit}_\n\n*English:* ${dailyShayari.translation}\n\nShared via ✨ Anuraag Shayari Portal ✨`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleWhatsAppStatusShare = () => {
    if (!dailyShayari) return;
    const shareText = `✨ *Shayari of the Day* ✨\n\n"${dailyShayari.hindi}"\n\n— *${dailyShayari.author}*\n\nRead more curated verses at ${window.location.origin}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isFavorite = dailyShayari ? favorites.includes(dailyShayari.id) : false;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-10 mt-2 mb-8" id="daily-featured-container">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white/[0.03] border border-white/10 rounded-[40px]">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mb-4" />
          <p className="text-xs text-slate-400 font-mono tracking-widest animate-pulse">
            GETTING FRESH HINDI SHAYARI DAILY...
          </p>
        </div>
      ) : dailyShayari ? (
        <div className="relative bg-white/[0.03] border border-white/10 rounded-[40px] p-8 md:p-12 flex flex-col justify-center min-h-[400px] overflow-hidden shadow-2xl group">
          {/* Subtle glow inside card */}
          <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />
          
          {/* Large decorative quotation mark from mock */}
          <div className="absolute top-8 left-12 text-indigo-400 opacity-15 pointer-events-none">
            <Quote size={80} className="fill-current" />
          </div>

          <div className="relative z-10 text-center space-y-8 max-w-3xl mx-auto">
            {/* Category tag and Date badge */}
            <div className="flex flex-col items-center space-y-2">
              <p className="text-indigo-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">
                Featured Pick • {dailyShayari.category === 'love' ? 'Ishq-Mohabbat' : dailyShayari.category.toUpperCase()}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                <Calendar size={12} className="text-indigo-400/70" />
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Verse & Author Info */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl leading-relaxed md:leading-loose font-hindi font-medium text-white px-4 md:px-8 max-w-3xl mx-auto">
                "{dailyShayari.hindi}"
              </h2>
              <div className="space-y-1.5">
                <p className="text-slate-300 italic text-sm md:text-base font-serif px-6">
                  {dailyShayari.englishTranslit}
                </p>
                <p className="text-slate-400 text-xs md:text-sm font-light">
                  — {dailyShayari.author}
                </p>
              </div>
            </div>

            {/* Actions: Copy, WhatsApp Status, and Favorite Toggle */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-full transition-all active:scale-95 shadow-lg shadow-indigo-600/30 font-semibold text-xs md:text-sm cursor-pointer"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy Verse'}</span>
              </button>
              
              <button
                onClick={handleWhatsAppStatusShare}
                className="flex items-center space-x-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] px-6 py-2.5 rounded-full border border-[#25D366]/30 transition-all font-semibold text-xs md:text-sm cursor-pointer"
              >
                <Share2 size={16} />
                <span>Share Status</span>
              </button>

              <button
                onClick={() => onToggleFavorite(dailyShayari.id)}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-full border transition-all font-semibold text-xs md:text-sm cursor-pointer ${
                  isFavorite
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
                <span>{isFavorite ? 'Favorited' : 'Bookmark'}</span>
              </button>
            </div>
          </div>

          {/* Card Footer Indicators from mock */}
          <div className="absolute bottom-6 left-6 md:left-12 hidden sm:flex items-center space-x-4 opacity-40">
            <span className="text-[10px] tracking-widest uppercase font-bold text-slate-400">Selected for You</span>
            <div className="w-12 h-[1px] bg-slate-500" />
            <span className="text-xs font-mono">Today's Spotlight</span>
          </div>
          
          <div className="absolute bottom-6 right-6 md:right-12 hidden sm:flex items-center space-x-2 opacity-40 font-mono text-xs">
            <span>01 / 01</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 bg-white/[0.03] border border-white/10 rounded-[40px] text-slate-400 text-sm">
          Could not retrieve the daily shayari. Browse the category grid below.
        </div>
      )}
    </div>
  );
}
