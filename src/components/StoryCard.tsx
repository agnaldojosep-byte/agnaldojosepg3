import React from 'react';
import { motion } from 'motion/react';
import { Clock, Lock, Sparkles, BookOpen } from 'lucide-react';
import { Story, Language } from '../types';
import { APP_TRANSLATIONS } from '../data/stories';
import { STORY_COVERS } from '../data/storyImages';
import { audio } from './AudioEngine';

interface StoryCardProps {
  story: Story;
  lang: Language;
  isUnlocked: boolean;
  onSelect: () => void;
  isLoggedIn?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  lang,
  isUnlocked,
  onSelect,
  isLoggedIn = false,
}) => {
  const t = APP_TRANSLATIONS[lang];
  const [progress, setProgress] = React.useState<{ currentPageIdx: number; totalPages: number; percent: number } | null>(null);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(`story_progress_${story.idString}`);
      if (saved) {
        setProgress(JSON.parse(saved));
      } else {
        setProgress(null);
      }
    } catch (e) {
      console.error(e);
    }
  }, [story.idString]);

  const handleChoose = () => {
    audio.playSystemPop();
    onSelect();
  };

  return (
    <motion.div
      id={`story-card-${story.idString}`}
      className="group relative flex flex-col justify-between bg-[#021832] hover:bg-[#052C59] text-white rounded-3xl overflow-hidden border-2 border-[#00BFFF] hover:border-[#00FFFF] shadow-[0_12px_36px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_50px_rgba(0,191,255,0.18)] transition-all cursor-pointer h-full"
      onClick={handleChoose}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Visual Header / Cover representative block */}
      <div className="relative h-44 bg-slate-900 p-4 flex flex-col justify-between overflow-hidden">
        {/* Actual 3D Pixar Cover Image element */}
        {STORY_COVERS[story.coverImage] || (story.coverImage && (story.coverImage.startsWith('http') || story.coverImage.startsWith('/src/assets/'))) ? (
          <img
            src={STORY_COVERS[story.coverImage] || story.coverImage}
            alt={story.title[lang] || story.title['pt']}
            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-115 transition-transform duration-700 ease-out z-0 select-none"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${story.cardGradient} z-0`} />
        )}

        {/* Dynamic lock overlay if user is not logged in */}
        {!isLoggedIn && (
          <div className="absolute inset-0 bg-slate-950/30 flex flex-col items-center justify-center p-3 text-center z-10 select-none">
            <div className="w-9 h-9 bg-amber-500/90 border border-amber-305 rounded-full flex items-center justify-center text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.7)] animate-pulse mb-1">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2c-2.76 0-5 2.24-5 5v3H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-1v-3c0-2.76-2.24-5-5-5zm-3 8V7c0-1.66 1.34-3 3-3s3 1.34 3 3v3H9zm3 6c-.83 0-1.5-.67-1.5-1.5S11.17 13 12 13s1.5.67 1.5 1.5S12.83 16 12 16z" />
              </svg>
            </div>
            <span className="text-[10px] font-fredoka font-black tracking-widest text-[#FFFDCD] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {lang === 'pt' ? 'Requer Conta 🔒' : 'Account Required 🔒'}
            </span>
          </div>
        )}

        {/* Category Badge & Premium Crown */}
        <div className="flex justify-between items-center z-10 w-full relative">
          <span className="text-[10px] font-extrabold px-3 py-1 bg-slate-950 rounded-full text-white uppercase tracking-wider border border-slate-700">
            {story.categoryLabel[lang] || story.category}
          </span>

          {story.premium && isLoggedIn && (
            <span className={`p-1.5 rounded-full ${isUnlocked ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.6)]' : 'bg-slate-950 text-amber-200'} shadow-lg border border-slate-700`}>
               <Lock className="w-3.5 h-3.5" />
             </span>
          )}
        </div>

        {/* Small floating indicator in center with the core emoji to bring extra charm */}
        <div className="flex justify-center items-center h-20 relative z-10">
          <div className="h-12 w-12 bg-[#000d1e]/95 rounded-full flex items-center justify-center border-2 border-[#00BFFF] select-none transform group-hover:scale-110 transition-transform duration-300 shadow-md">
            <span className="text-2.5xl leading-none filter drop-shadow">{story.coverEmoji}</span>
          </div>
        </div>

        {/* Age group pill and length */}
        <div className="flex justify-between items-center z-10 w-full relative">
          <span className="text-[10px] font-sans font-extrabold bg-indigo-950 border border-slate-700 text-rose-100 px-2.5 py-0.5 rounded-full">
            👦 {story.ageRange} {lang === 'pt' ? 'Anos' : 'Years'}
          </span>
          <span className="text-[10px] font-sans font-bold text-white flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-700">
            <Clock className="w-3 h-3 text-amber-300 animate-pulse" /> {story.durationMin} min
          </span>
        </div>
      </div>

      {/* Playful & interactive kids learning progress bar with custom bright-light green gradient */}
      {progress && progress.percent > 0 && (
        <div className="relative h-6.5 bg-[#000d1e] border-b-2 border-[#00BFFF] flex items-center justify-between px-4 select-none shrink-0">
          <div className="flex-1 bg-[#022549] h-2 rounded-full overflow-hidden border border-[#015CBE]">
            <div 
              className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                progress.percent >= 100 
                  ? 'from-cyan-400 to-[#00BFFF]' 
                  : 'from-[#00FFFF] via-[#00BFFF] to-[#015CBE]'
              }`}
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          <span className="text-[9px] font-fredoka font-black tracking-wider text-slate-200 ml-3 shrink-0 flex items-center gap-1">
            {progress.percent >= 100 ? (
              <span className="text-[#00FFFF] font-extrabold flex items-center gap-0.5">
                <span>🌟</span> {lang === 'pt' ? 'Lido!' : 'Read!'}
              </span>
            ) : (
              <span>{progress.percent}%</span>
            )}
          </span>
        </div>
      )}

      {/* Title & Description side */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-transparent text-slate-100">
        <div>
          <h3 className="text-base font-fredoka font-bold text-slate-100 leading-tight group-hover:text-[#00FFFF] transition-colors">
            {story.title[lang] || story.title['pt']}
          </h3>
          <p className="text-xs text-[#A9EDFF] font-semibold leading-relaxed mt-2.5 line-clamp-3">
            {story.introduction[lang] || story.introduction['pt']}
          </p>
        </div>

        {/* Bottom select indicators */}
        <div className="mt-4 pt-3 border-t border-[#00BFFF]/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {!isLoggedIn ? (
              <span className="text-[10px] font-bold text-amber-400 uppercase flex items-center gap-1">
                🔒 Requer Conta
              </span>
            ) : story.premium && !isUnlocked ? (
              <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                🔒 Premium
              </span>
            ) : (
              <span className="text-[10px] font-bold text-[#00FFFF] uppercase flex items-center gap-1">
                🟢 Grátis
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleChoose();
            }}
            className="text-xs font-fredoka font-bold text-[#001730] flex items-center gap-1 group-hover:translate-x-1 transition-all bg-gradient-to-r from-[#00FFFF] via-[#00BFFF] to-[#015CBE] px-3.5 py-1.5 rounded-xl shadow-md font-extrabold cursor-pointer hover:brightness-110 active:scale-95 border-none"
          >
            {!isLoggedIn ? (
              <span>Entrar 🔓</span>
            ) : (
              <>
                <BookOpen className="w-3.5 h-3.5 text-[#141A10]" />
                <span>Ler 📖</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
