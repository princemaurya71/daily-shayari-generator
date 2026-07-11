import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, MessageCircle, Instagram, Share2, BookOpen, Heart } from 'lucide-react';
import { Shayari } from '../types';

interface ShayariCardProps {
  key?: string | number;
  shayari: Shayari;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function ShayariCard({ shayari, isFavorite, onToggleFavorite }: ShayariCardProps) {
  const [copied, setCopied] = useState(false);
  const [copiedInsta, setCopiedInsta] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);

  // Copy standard text
  const handleCopy = async () => {
    const textToCopy = `✍️ *${shayari.author}*\n\n${shayari.hindi}\n\n_${shayari.englishTranslit}_\n\n*English:* ${shayari.translation}\n\nShared via ✨ Hindi Shayari Portal ✨`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Copy customized Instagram Caption layout
  const handleInstagramCaption = async () => {
    const caption = `✨ ॥ शायरी ॥ ✨\n\n${shayari.hindi}\n\n~\n${shayari.englishTranslit}\n\n🎨 Meaning:\n${shayari.translation}\n\n✍️ Poet: ${shayari.author}\n.\n.\n#shayari #hindi #poetry #love #life #aesthetic #quotes`;
    try {
      await navigator.clipboard.writeText(caption);
      setCopiedInsta(true);
      setTimeout(() => setCopiedInsta(false), 2000);
    } catch (err) {
      console.error('Failed to copy Instagram caption: ', err);
    }
  };

  // WhatsApp Share URL trigger
  const handleWhatsAppShare = () => {
    const shareText = `✍️ *${shayari.author}*\n\n${shayari.hindi}\n\n_${shayari.englishTranslit}_\n\n📖 *Translation:* ${shayari.translation}\n\nFind more curated poetry at ${window.location.origin}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Standard Web Share API trigger
  const handleWebShare = async () => {
    const shareData = {
      title: `Shayari by ${shayari.author}`,
      text: `${shayari.hindi}\n\n${shayari.englishTranslit}\n\n- ${shayari.author}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleCopy();
      }
    } catch (err) {
      console.log('Web share aborted or unsupported, fallback to copy', err);
    }
  };

  return (
    <motion.div
      layout
      id={`shayari-card-${shayari.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col justify-between w-full p-6 md:p-8 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-black/20 group transition-all duration-300 overflow-hidden"
    >
      {/* Decorative background grid and AI chip */}
      <span className="absolute top-0 right-0 w-24 h-24 bg-radial from-white/3 to-transparent rounded-full pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6">
        {/* Mood Category Indicator */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-white/5 text-indigo-300 border border-white/10">
          {shayari.category === 'love' && '💖 प्यार'}
          {shayari.category === 'sad' && '💔 दर्द'}
          {shayari.category === 'attitude' && '😎 तेवर'}
          {shayari.category === 'friendship' && '🤗 दोस्ती'}
          {shayari.category === 'life' && '🍃 ज़िंदगी'}
          {shayari.category === 'inspiration' && '✨ हौसला'}
        </span>

        {/* AI Tag & Actions */}
        <div className="flex items-center gap-2">
          {shayari.isAiGenerated && (
            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold">
              AI Curated
            </span>
          )}
          {/* Favorite Button */}
          <button
            onClick={() => onToggleFavorite(shayari.id)}
            className={`p-2 rounded-xl transition-all duration-300 border cursor-pointer ${
              isFavorite
                ? 'bg-rose-500/15 border-rose-500/30 text-rose-400 hover:bg-rose-500/25'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
          </button>
        </div>
      </div>

      {/* Main Couplet / Verse */}
      <div className="flex-1 my-2">
        <blockquote className="font-hindi text-xl md:text-2xl font-medium text-white leading-relaxed text-center whitespace-pre-line tracking-wide">
          “{shayari.hindi}”
        </blockquote>

        {/* Roman English Script */}
        <p className="mt-5 text-sm md:text-base font-serif italic text-slate-300 leading-relaxed text-center whitespace-pre-line px-4">
          {shayari.englishTranslit}
        </p>

        {/* Poetic English Translation */}
        <div className="mt-6 pt-5 border-t border-white/5 text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-1">English Translation</p>
          <p className="text-sm md:text-base font-sans text-slate-400 leading-relaxed italic max-w-xl mx-auto">
            {shayari.translation}
          </p>
        </div>
      </div>

      {/* Meaning & Actions Container */}
      <div className="mt-6 pt-4 border-t border-white/5">
        {/* Poet Author Stamp */}
        <div className="text-center mb-4">
          <span className="text-xs text-slate-600 font-mono">―</span>{' '}
          <span className="text-xs md:text-sm font-serif font-medium tracking-wide text-slate-300 hover:text-indigo-400 transition-colors duration-200">
            {shayari.author}
          </span>
        </div>

        {/* Meaning Toggle Panel */}
        <AnimatePresence>
          {showMeaning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-4"
            >
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs md:text-sm text-slate-400 leading-relaxed">
                <span className="font-semibold text-indigo-400 flex items-center gap-1.5 mb-1">
                  <BookOpen size={14} />
                  भावार्थ | Deep Meaning:
                </span>
                {shayari.meaning}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-4 md:grid-cols-5 gap-2 mt-2">
          {/* Toggle Meaning */}
          <button
            onClick={() => setShowMeaning(!showMeaning)}
            className={`col-span-1 md:col-span-1 py-2.5 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
              showMeaning
                ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title="Read Poetic Meaning"
          >
            <BookOpen size={16} />
            <span className="hidden sm:inline">भाव</span>
          </button>

          {/* Copy Verse */}
          <button
            onClick={handleCopy}
            className="col-span-1 md:col-span-1 py-2.5 px-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
            title="Copy Shayari"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Copy Instagram Template */}
          <button
            onClick={handleInstagramCaption}
            className="col-span-1 md:col-span-1 py-2.5 px-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
            title="Copy Instagram Post Caption"
          >
            {copiedInsta ? <Check size={16} className="text-emerald-400" /> : <Instagram size={16} />}
            <span className="hidden sm:inline">Insta</span>
          </button>

          {/* WhatsApp Share */}
          <button
            onClick={handleWhatsAppShare}
            className="col-span-1 md:col-span-1 py-2.5 px-2 rounded-xl text-xs font-semibold bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
            title="Share on WhatsApp"
          >
            <MessageCircle size={16} />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          {/* Native Web Share */}
          <button
            onClick={handleWebShare}
            className="hidden md:flex py-2.5 px-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
            title="Share Native"
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
