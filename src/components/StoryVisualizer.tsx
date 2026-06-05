import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  RefreshCw,
  Speech,
  Gamepad2,
  Volume1,
  Loader2,
  Check,
} from 'lucide-react';
import { Story, Language } from '../types';
import { APP_TRANSLATIONS, CATEGORY_ICONS } from '../data/stories';
import { STORY_COVERS } from '../data/storyImages';
import { audio } from './AudioEngine';
import { CertificateOfAchievement } from './CertificateOfAchievement';
import { logReadingSession } from '../utils/statsLogger';

interface StoryVisualizerProps {
  story: Story;
  lang: Language;
  onBack: () => void;
  isPremiumUser: boolean;
  onOpenParents: () => void;
  initialPageIdx?: number;
}

export const StoryVisualizer: React.FC<StoryVisualizerProps> = ({
  story,
  lang,
  onBack,
  isPremiumUser,
  onOpenParents,
  initialPageIdx = 0,
}) => {
  const t = APP_TRANSLATIONS[lang];
  const [currentPageIdx, setCurrentPageIdx] = useState(initialPageIdx);
  const [autoNarrate, setAutoNarrate] = useState(true);
  const [voiceGender, setVoiceGender] = useState<'masculino' | 'feminino'>('feminino');
  const [voiceAge, setVoiceAge] = useState<'adulto' | 'infantil' | 'idoso'>('adulto');
  const [voiceLang, setVoiceLang] = useState<Language>(lang);
  const [translatedPages, setTranslatedPages] = useState<Record<number, string>>({});
  const [isVoicePanelOpen, setIsVoicePanelOpen] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timerDuration, setTimerDuration] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [volume, setVolume] = useState(0.60);
  const [highlightRange, setHighlightRange] = useState<[number, number]>([0, 0]);
  const [isReadingComplete, setIsReadingComplete] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [ttsProvider, setTtsProvider] = useState<'gemini' | 'elevenlabs' | 'browser'>(() => audio.getTtsProvider());
  const [showDiagnosticPanel, setShowDiagnosticPanel] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);
  const [elevenLabsAvailable, setElevenLabsAvailable] = useState(false);

  // Check ElevenLabs API Key availability on startup to conditionally present premium options
  useEffect(() => {
    fetch("/api/tts-status")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.elevenlabs) {
          setElevenLabsAvailable(true);
        }
      })
      .catch((err) => console.warn("Failed to check TTS ElevenLabs configuration status:", err));
  }, []);
  const [childName, setChildName] = useState(() => {
    try {
      const saved = localStorage.getItem('estorinhas_child_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) return parsed.name;
      }
    } catch (e) {}
    return 'Amiguinho';
  });
  const activePage = story.pages[currentPageIdx];

  // Voice narration loading progress states
  const [voiceLoadProgress, setVoiceLoadProgress] = useState<number | null>(null);
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);

  const autoNextTimerRef = useRef<any>(null);
  const lastActiveTimeRef = useRef<number>(Date.now());

  // Stop everything on unmount and cleanup audio references
  useEffect(() => {
    audio.setVolume(volume);
    return () => {
      audio.stopSpeech();
      if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
      
      // Save last reading session duration on unmount
      const elapsedMs = Date.now() - lastActiveTimeRef.current;
      const elapsedSec = Math.min(300, Math.floor(elapsedMs / 1000)); // Cap single page visit at 5 mins
      if (elapsedSec > 2) {
        logReadingSession(story.category, elapsedSec);
      }
    };
  }, []);

  // Update volume in sound controller
  useEffect(() => {
    audio.setVolume(volume);
  }, [volume]);;

  // Sync voiceLanguage and reset translated cache when app interface language changes
  useEffect(() => {
    setVoiceLang(lang);
    setTranslatedPages({});
    setHighlightRange([0, 0]);
    audio.stopSpeech();
    setIsSpeaking(false);
  }, [lang]);

  // Restart speech trigger whenever page or voice settings change
  useEffect(() => {
    setHighlightRange([0, 0]);
    setIsSpeaking(false);
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);

    if (autoNarrate && activePage) {
      triggerTTSForPage();
    }

    // Smoothly scroll the visualizer viewport to the top, keeping children focused on the narration
    const viewerElement = document.getElementById('story-viewer-layout');
    if (viewerElement) {
      viewerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPageIdx, voiceLang, autoNarrate, voiceGender, voiceAge, ttsProvider]);

  // On-the-fly background translation cache helper: fetches translations in advance so clicking "Ouvir" is instant!
  useEffect(() => {
    if (activePage) {
      const isMissingRealTranslation = !activePage.text[voiceLang] || activePage.text[voiceLang] === activePage.text['pt'];
      const hasNoRealTranslationCache = !translatedPages[currentPageIdx];
      if (voiceLang !== 'pt' && isMissingRealTranslation && hasNoRealTranslationCache) {
        const textToTranslate = activePage.text['pt'];
        fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: textToTranslate,
            targetLang: voiceLang,
            sourceLang: 'pt'
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data && data.translatedText) {
            setTranslatedPages(prev => ({
              ...prev,
              [currentPageIdx]: data.translatedText
            }));
          }
        })
        .catch(err => {
          console.warn("Background text translation failed:", err);
        });
      }
    }
  }, [currentPageIdx, voiceLang, activePage, translatedPages]);

  // Save page state to local storage when activePage or currentPageIdx shifts
  useEffect(() => {
    if (activePage) {
      const totalPages = story.pages.length;
      const progressPercent = Math.round(((currentPageIdx + 1) / totalPages) * 100);
      const progressObj = {
        currentPageIdx,
        totalPages,
        percent: progressPercent,
        updatedAt: Date.now(),
        storyTitle: story.title,
        coverEmoji: story.coverEmoji,
        category: story.category,
        coverImage: story.coverImage,
      };
      localStorage.setItem(`story_progress_${story.idString}`, JSON.stringify(progressObj));
      
      // Calculate and record reading time for previous page
      const now = Date.now();
      const elapsedMs = now - lastActiveTimeRef.current;
      const elapsedSec = Math.min(300, Math.floor(elapsedMs / 1000)); // Cap single page visit at 5 mins
      if (elapsedSec > 2) {
        logReadingSession(story.category, elapsedSec);
      }
      lastActiveTimeRef.current = now; // reset pointer for next page/visit
      
      try {
        const recentsStr = localStorage.getItem('estorinhas_recent_stories') || '[]';
        const recents: string[] = JSON.parse(recentsStr);
        const filtered = recents.filter(id => id !== story.idString);
        filtered.unshift(story.idString);
        localStorage.setItem('estorinhas_recent_stories', JSON.stringify(filtered.slice(0, 12)));
      } catch (e) {
        console.error("Local storage error:", e);
      }
    }
  }, [currentPageIdx, story, activePage]);

  useEffect(() => {
    if (isReadingComplete) {
      const totalPages = story.pages.length;
      const progressObj = {
        currentPageIdx: totalPages - 1,
        totalPages,
        percent: 100,
        updatedAt: Date.now(),
        storyTitle: story.title,
        coverEmoji: story.coverEmoji,
        category: story.category,
        coverImage: story.coverImage,
      };
      localStorage.setItem(`story_progress_${story.idString}`, JSON.stringify(progressObj));
    }
  }, [isReadingComplete, story]);

  // Handle autoPlay / autoScroll timing and progression
  useEffect(() => {
    if (autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
    }
    setIsTimerActive(false);
    setTimerDuration(0);

    if (!autoScroll || !activePage) return;

    if (isSpeaking) {
      // In storytelling mode, while the narrator is speaking, do not advance pages automatically.
      return;
    }

    // Determine page pause duration. If we autoNarrate, use a lovely comfortable 3.5s pause.
    // Otherwise, calculate standard kid reading speed based on word count.
    const textToRead = translatedPages[currentPageIdx] || activePage.text[voiceLang] || activePage.text['pt'] || "";
    const wordCount = textToRead.split(/\s+/).filter(Boolean).length;
    const delay = autoNarrate
      ? 3500 // Comfortable breathing time between pages in narration mode
      : Math.max(6500, Math.floor((wordCount / 2.16) * 1000 + 3000)); // Silent reading delay

    setTimerDuration(delay);
    setIsTimerActive(true);

    autoNextTimerRef.current = setTimeout(() => {
      setIsTimerActive(false);
      if (currentPageIdx === story.pages.length - 1) {
        setIsReadingComplete(true);
      } else {
        handlePageNext();
      }
    }, delay);

    return () => {
      if (autoNextTimerRef.current) {
        clearTimeout(autoNextTimerRef.current);
      }
    };
  }, [autoScroll, isSpeaking, currentPageIdx, autoNarrate, voiceLang, translatedPages]);

  const triggerTTSForPage = () => {
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    audio.stopSpeech();

    const hasStaticTranslation = !!activePage.text[voiceLang] && activePage.text[voiceLang].trim() !== "" && activePage.text[voiceLang] !== activePage.text['pt'];
    const hasCachedTranslation = !!translatedPages[currentPageIdx];
    
    let textToSpeak = '';
    let sourceLang = '';
    
    if (hasStaticTranslation) {
      textToSpeak = activePage.text[voiceLang]!;
      sourceLang = voiceLang;
    } else if (hasCachedTranslation) {
      textToSpeak = translatedPages[currentPageIdx];
      sourceLang = voiceLang;
    } else {
      textToSpeak = activePage.text['pt'];
      sourceLang = 'pt';
    }

    setIsVoiceLoading(true);
    setVoiceLoadProgress(5);
    setIsSpeaking(false);
    
    audio.speakText(
      textToSpeak,
      voiceLang,
      voiceGender,
      voiceAge,
      (charIndex, wordLength) => {
        setHighlightRange([charIndex, charIndex + wordLength]);
      },
      () => {
        setIsSpeaking(false);
        setIsVoiceLoading(false);
        setVoiceLoadProgress(null);
        setHighlightRange([0, 0]);
      },
      (progress) => {
        setVoiceLoadProgress(progress);
        if (progress === 100) {
          setIsSpeaking(true);
          // Keep the green 100% loading complete badge visible for a short duration for satisfying confirmation
          setTimeout(() => {
            setIsVoiceLoading(false);
            setVoiceLoadProgress(null);
          }, 1500);
        }
      },
      (translatedText) => {
        setTranslatedPages(prev => ({
          ...prev,
          [currentPageIdx]: translatedText
        }));
      },
      sourceLang
    );
  };

  const handlePageNext = () => {
    if (currentPageIdx < story.pages.length - 1) {
      audio.playPageFlip();
      audio.playMagicChime();
      setCurrentPageIdx(prev => prev + 1);
    }
  };

  const handlePagePrev = () => {
    if (currentPageIdx > 0) {
      audio.playPageFlip();
      audio.playSystemPop();
      setCurrentPageIdx(prev => prev - 1);
    }
  };

  const toggleAutoScroll = () => {
    audio.playSystemPop();
    const newScroll = !autoScroll;
    setAutoScroll(newScroll);
    if (!newScroll && autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
    }
  };

  const renderVisualText = () => {
    const textContent = translatedPages[currentPageIdx] || activePage.text[voiceLang] || activePage.text['pt'] || "";
    const [start, end] = highlightRange;

    if (start === end) {
      return (
        <p className="text-[#1A1A1A] leading-relaxed text-base md:text-xl font-serif font-medium tracking-wide">
          {textContent}
        </p>
      );
    }

    let cumulativeCharIndex = 0;
    // Split text keeping whitespace spans intact
    const parts = textContent.split(/(\s+)/);

    return (
      <p className="text-[#1A1A1A] leading-relaxed text-base md:text-xl font-serif font-medium tracking-wide">
        {parts.map((part, idx) => {
          const partStart = cumulativeCharIndex;
          const partEnd = cumulativeCharIndex + part.length;
          cumulativeCharIndex = partEnd;

          // Whitespaces should not be highlighted to avoid weird highlight layout shifts
          const isHighlighted = !/^\s+$/.test(part) && 
                                (partStart >= start && partStart < end);

          if (isHighlighted) {
            return (
              <span
                key={idx}
                className="bg-yellow-300 text-slate-950 font-black px-1 py-0.5 rounded border-b-2 border-amber-500 inline transition-all duration-150 shadow-sm"
              >
                {part}
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </p>
    );
  };

  return (
    <div
      id="story-viewer-layout"
      className="min-h-screen bg-[#12170D] text-[#E8EFE6] flex flex-col justify-between relative overflow-x-hidden"
    >
      {/* Animated Magic Background Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-emerald-500/10 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-lime-600/10 blur-[160px] rounded-full"></div>
      </div>

      {/* Top Reading Navigation Bar */}
      <header className="relative z-20 bg-[#111A07]/90 backdrop-blur-md border-b-4 border-[#608C2B] p-4 sticky top-0 flex items-center justify-between shadow-xl">
        <button
          onClick={() => {
            audio.stopSpeech();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-extrabold text-[#D6F59C] rounded-full cursor-pointer transition-all border border-slate-700 shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>

        <div className="text-center hidden sm:block">
          <span className="text-[10px] text-yellow-300 font-bold tracking-widest uppercase block">Lendo Agora</span>
          <h2 className="text-sm font-sans font-black text-white px-2 tracking-tight">
            {story.title[lang] || story.title['pt']}
          </h2>
        </div>

        {/* Volume & Audio Mode Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
            <Volume1 className="w-3.5 h-3.5 text-indigo-300" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 md:w-24 h-1 bg-indigo-950 rounded-lg appearance-none cursor-pointer accent-indigo-400"
            />
          </div>
        </div>
      </header>

      {/* Main Double-Page Kids Book Viewer Frame */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col justify-center items-center z-10 relative">
        
        {/* Book Container with Left/Right visual spread pages */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 bg-[#3B2518] p-3 md:p-4 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] border-[12px] border-[#2C1A10] relative min-h-[500px] overflow-hidden">
          
          {/* Automatic Page Scroll Glowing Progress Bar */}
          {isTimerActive && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-950 z-30 pointer-events-none">
              <motion.div
                key={`${currentPageIdx}-${autoNarrate}-${timerDuration}`}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: timerDuration / 1000, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 shadow-none"
              />
            </div>
          )}
          
          {/* Centered book middle spine indentation divider */}
          <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-black z-20 pointer-events-none"></div>

          {/* Left Page: Stunning Animated 3D cartoon scenography */}
          <div className="relative min-h-[280px] lg:min-h-0 bg-slate-950 rounded-2xl lg:rounded-l-2xl lg:rounded-r-none overflow-hidden flex flex-col items-center justify-center border-4 border-[#2C1A10] shadow-inner">
            {/* Ambient matching Pixar illustration background */}
            {(() => {
              const pageImg = activePage.pageImage;
              const storyImg = STORY_COVERS[story.coverImage] || (story.coverImage && (story.coverImage.startsWith('http') || story.coverImage.startsWith('/src/assets/'))) ? (STORY_COVERS[story.coverImage] || story.coverImage) : undefined;
              const activeImgSrc = pageImg || storyImg;

              if (activeImgSrc) {
                return (
                  <img
                    src={activeImgSrc}
                    alt={story.title[lang] || story.title['pt']}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-105 animate-fade-in"
                    referrerPolicy="no-referrer"
                  />
                );
              }

              return (
                <div className={`absolute inset-0 bg-gradient-to-b ${activePage.visualScene.background} z-0`} />
              );
            })()}
            
            {/* Float Elements from the Story Page Scene */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPageIdx}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="absolute inset-0 flex items-center justify-center z-10 w-full h-full"
              >
                {activePage.visualScene.elements.map((elem, idx) => (
                  <motion.div
                    key={idx}
                    className={`absolute text-5xl md:text-6xl ${elem.animation} ${elem.positionClass} select-none filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]`}
                    initial={{ scale: 0, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{
                      delay: idx * 0.15,
                      type: 'spring',
                      stiffness: 80,
                      damping: 10,
                    }}
                    whileHover={{ scale: 1.3, rotate: 15 }}
                  >
                    {elem.emoji}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Left Page is always fully visible so kids can enjoy the live visual scene. We only show progress on the Right Page alongside text. */}
            
            {/* Screen Caption box */}
            <div className="absolute bottom-3 left-4 right-4 z-20 bg-black backdrop-blur-none p-3 rounded-xl border border-white/20">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-yellow-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                Prompt de Ilustração Mágica 3D Pixar
              </span>
              <p className="text-[10px] text-zinc-100 font-sans italic mt-1 leading-snug">
                "{activePage.visualPrompt[lang] || activePage.visualPrompt['pt']}"
              </p>
            </div>
          </div>

          {/* Right Page: Text display and reading control parameters */}
          <div className="bg-cream-paper p-6 md:p-8 lg:p-10 rounded-2xl lg:rounded-r-2xl lg:rounded-l-none text-slate-950 flex flex-col justify-between border-4 border-[#E2DCC2] min-h-[250px] lg:min-h-0 relative shadow-inner">
            
            {/* Cute flower / butterfly ornament corner icons */}
            <div className="absolute top-4 right-4 text-slate-300 select-none text-xl">🦋</div>
            <div className="absolute bottom-4 left-4 text-slate-300 select-none text-xl">🌸</div>

            {/* Reading header summary */}
            <div className="flex justify-between items-center pb-3 border-b border-[#E2DCC2] mb-4 z-10">
              <span className="text-xs font-black text-amber-800 uppercase tracking-widest">
                👑 {t.pageOf} {currentPageIdx + 1}/{story.pages.length}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>{story.categoryLabel[lang] || story.categoryLabel['pt']}</span>
              </div>
            </div>

            {/* Live Text with Word Highlight */}
            <div className="flex-1 flex items-center justify-center py-4 min-h-[140px] px-2 z-10">
              <div className="w-full text-center lg:text-left">
                {/* Real-time Voice Loading Progress Indicator */}
                {voiceLoadProgress !== null && (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    className={`mb-4 p-3.5 rounded-2.5xl border flex flex-col gap-2 transition-all duration-300 shadow-sm text-left ${
                      voiceLoadProgress === 100
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-sm'
                        : 'bg-indigo-50 border-indigo-300 text-indigo-950'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-black">
                      <div className="flex items-center gap-2">
                        {voiceLoadProgress === 100 ? (
                          <div className="h-5 w-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-sans font-bold shadow-xs">✓</div>
                        ) : (
                          <div className="h-5 w-5 bg-indigo-500 text-white rounded-full flex items-center justify-center text-[10px] font-sans font-bold animate-spin">🔮</div>
                        )}
                        <span>
                          {voiceLoadProgress === 100
                            ? (lang === 'pt' ? 'Estória 100% Carregada!' : 'Story 100% Loaded!')
                            : (lang === 'pt' ? 'Carregando a voz da estorinha...' : 'Loading story voice...')}
                        </span>
                      </div>
                      <span className={`text-[12px] font-black tracking-wider ${voiceLoadProgress === 100 ? 'text-emerald-600' : 'text-indigo-600'}`}>
                        {voiceLoadProgress}%
                      </span>
                    </div>

                    {/* Progress track */}
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-350">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: `${voiceLoadProgress}%` }}
                        transition={{ duration: 0.1, ease: 'easeOut' }}
                        className={`h-full rounded-full transition-all duration-300 ${
                          voiceLoadProgress === 100
                            ? 'bg-emerald-500'
                            : 'bg-indigo-600'
                        }`}
                      />
                    </div>
                  </motion.div>
                )}

                {renderVisualText()}
              </div>
            </div>

            {/* Narração de Áudio Real de Ultra Qualidade */}
            <div className="my-5 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-3 border-amber-200 rounded-[2rem] flex flex-col gap-4 relative overflow-hidden z-10 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-black text-amber-950 uppercase tracking-widest flex items-center gap-2">
                  <span className="text-lg font-normal mb-0.5">🎙️</span>
                  {lang === 'pt' ? 'Ouça com Voz Sincronizada!' : 'Listen with Slipped Voice!'}
                </span>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-black border border-indigo-200 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  {lang === 'pt' ? 'Voz Mágica Ativa' : 'Magic Voice Active'}
                </span>
              </div>

              {/* Highly optimized playful larger narration playback option button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  audio.playSystemPop();
                  if (isSpeaking) {
                    audio.stopSpeech();
                    setIsSpeaking(false);
                  } else if (isVoiceLoading) {
                    audio.stopSpeech();
                    setIsVoiceLoading(false);
                    setVoiceLoadProgress(null);
                    setIsSpeaking(false);
                  } else {
                    triggerTTSForPage();
                  }
                }}
                className={`w-full flex items-center justify-center gap-3.5 px-6 py-5 font-black text-base rounded-2xl cursor-pointer transition-all border-b-4 shadow-lg outline-none select-none ${
                  isVoiceLoading
                    ? 'bg-gradient-to-r from-rose-450 via-pink-500 to-red-400 text-white border-rose-700 shadow-md animate-pulse'
                    : isSpeaking 
                      ? 'bg-gradient-to-r from-[#FF9800] to-[#E65100] text-white border-orange-900 shadow-md ring-4 ring-orange-500/30 font-black animate-none'
                      : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white border-indigo-700 shadow-[0_4px_15px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.6)]'
                }`}
              >
                {isVoiceLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                    <span className="tracking-wide">{lang === 'pt' ? `Carregando Áudio Mágico (${voiceLoadProgress || 5}%)` : `Loading Magic Audio (${voiceLoadProgress || 5}%)`}</span>
                  </>
                ) : isSpeaking ? (
                  <>
                    <Pause className="w-6 h-6 text-white animate-pulse" />
                    <span className="tracking-wide">{lang === 'pt' ? 'Pausar Narrador Mágico ⏸' : 'Pause Magic Narrator ⏸'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 text-white fill-current animate-bounce" />
                    <span className="tracking-wide">{lang === 'pt' ? 'Ouvir Agora! (Áudio Real) 🔊' : 'Listen Now! (Real Audio) 🔊'}</span>
                  </>
                )}
              </motion.button>

              {/* Real-time jumping voice equalizer sound wave visualization when speaking */}
              {isSpeaking && (
                <div id="equalizer-waveform" className="flex items-center justify-center gap-1.5 py-1">
                  <span className="text-[10px] text-indigo-600 font-extrabold uppercase mr-1.5">{lang === 'pt' ? 'Lendo em voz alta:' : 'Reading aloud:'}</span>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((barIdx) => {
                    const animationDelay = (barIdx * 0.1).toFixed(2);
                    const randomHeightClass = barIdx % 3 === 0 ? 'h-5' : barIdx % 2 === 0 ? 'h-3' : 'h-4';
                    return (
                      <motion.div
                        key={barIdx}
                        animate={{ scaleY: [0.4, 1.4, 0.4] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5 + (barIdx % 3) * 0.12,
                          delay: parseFloat(animationDelay),
                        }}
                        className={`w-1 rounded-full bg-indigo-500 origin-bottom ${randomHeightClass}`}
                      />
                    );
                  })}
                </div>
              )}

              <p className="text-[11px] text-amber-900 font-medium bg-amber-100/40 p-3.5 rounded-2xl leading-relaxed text-center">
                {lang === 'pt' ? 'Toque no botão de ouvir para escutar cada palavra acendendo suavemente de forma mágica!' : 'Tap the listen-now button to hear each word illuminate dynamically as we narrate!'}
              </p>
            </div>

            {/* Sincronia de Voz e Escrita + Rolagem Automática Control Center */}
            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2.5xl flex flex-col gap-3.5 z-10 text-slate-800 text-xs">
              <span className="text-[10px] font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1">
                ⚙️ {lang === 'pt' ? 'Sincronia e Controles de Leitura' : 'Synchrony & Reading Controls'}
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Switch 1: AutoNarrate */}
                <button
                  type="button"
                  onClick={() => {
                    audio.playSystemPop();
                    const nextVal = !autoNarrate;
                    setAutoNarrate(nextVal);
                    if (nextVal) {
                      triggerTTSForPage();
                    } else {
                      audio.stopSpeech();
                      setIsSpeaking(false);
                      setHighlightRange([0, 0]);
                    }
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-left ${
                    autoNarrate
                      ? 'bg-indigo-600 border-indigo-700 text-white shadow-xs font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col gap-0.5 max-w-[80%]">
                    <span className="text-[11px] font-black">
                      {lang === 'pt' ? '🗣 Sincronia de Voz' : '🗣 Voice Synchrony'}
                    </span>
                    <span className={`text-[9px] ${autoNarrate ? 'text-indigo-100' : 'text-slate-500'} leading-tight`}>
                      {lang === 'pt' ? 'Destaque e voz automática ao abrir' : 'Speak & highlight words on page open'}
                    </span>
                  </div>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 ${autoNarrate ? 'bg-amber-400' : 'bg-slate-305 bg-slate-300'}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-200 transform ${autoNarrate ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>

                {/* Switch 2: AutoScroll */}
                <button
                  type="button"
                  onClick={() => {
                    audio.playSystemPop();
                    const nextVal = !autoScroll;
                    setAutoScroll(nextVal);
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-left ${
                    autoScroll
                      ? 'bg-indigo-600 border-indigo-700 text-white shadow-xs font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col gap-0.5 max-w-[80%]">
                    <span className="text-[11px] font-black">
                      {lang === 'pt' ? '⏱ Rolagem Automática' : '⏱ Auto Page Turn'}
                    </span>
                    <span className={`text-[9px] ${autoScroll ? 'text-indigo-100' : 'text-slate-500'} leading-tight`}>
                      {lang === 'pt' ? 'Mudar página sozinho no fim do som' : 'Flip page automatically after voice ends'}
                    </span>
                  </div>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 ${autoScroll ? 'bg-amber-400' : 'bg-slate-305 bg-slate-300'}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-200 transform ${autoScroll ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>
              </div>

              {/* Combined Sync State Active status */}
              {autoNarrate && autoScroll && (
                <div className="p-2.5 bg-gradient-to-r from-amber-405 from-amber-200/20 to-orange-400/20 border border-amber-300/30 text-amber-900 text-[10px] font-black rounded-lg flex items-center gap-2 animate-pulse leading-snug">
                  <span>✨🚀</span>
                  <span>
                    {lang === 'pt' 
                      ? 'Modo Piloto Automático Ativo! As páginas mudam sozinhas assim que a voz termina!' 
                      : 'Autoplay Synchrony Active! Pages advance automatically once narration completes!'}
                  </span>
                </div>
              )}

              {/* Custom Selector for Voice Style and Tone */}
              <div className="flex flex-col gap-3 border-t border-slate-200 pt-3 mt-1.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] uppercase tracking-wide font-extrabold text-slate-500 flex items-center gap-1 select-none">
                    <span>👤</span>
                    {lang === 'pt' ? 'Estilo de Voz:' : 'Narrator Tone:'}
                  </span>

                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      { key: 'feminino', label: 'Marina 👧' },
                      { key: 'masculino', label: 'Gabriel 👦' },
                    ].map((v) => {
                      const isS = voiceGender === v.key;
                      return (
                        <button
                          type="button"
                          key={v.key}
                          onClick={() => {
                            audio.playSystemPop();
                            // @ts-ignore
                            setVoiceGender(v.key);
                          }}
                          className={`px-3 py-1 text-[10px] rounded-lg border font-black cursor-pointer transition-all ${
                            isS 
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {v.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      { key: 'adulto', label: lang === 'pt' ? 'Mãe 👩' : 'Mother 👩' },
                      { key: 'idoso', label: lang === 'pt' ? 'Vovó 👵' : 'Grandma 👵' },
                      { key: 'infantil', label: lang === 'pt' ? 'Kid 👶' : 'Kid 👶' },
                    ].map((v) => {
                      const isS = voiceAge === v.key;
                      return (
                        <button
                          type="button"
                          key={v.key}
                          onClick={() => {
                            audio.playSystemPop();
                            // @ts-ignore
                            setVoiceAge(v.key);
                          }}
                          className={`px-3 py-1 text-[10px] rounded-lg border font-black cursor-pointer transition-all ${
                            isS 
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {v.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Motor/Provedor de Voz Selector */}
                <div className="flex items-center justify-between gap-2 border-t border-dashed border-slate-205 pt-3 flex-wrap">
                  <span className="text-[10px] uppercase tracking-wide font-extrabold text-slate-500 flex items-center gap-1 select-none">
                    <span>🔮</span>
                    {lang === 'pt' ? 'Motor de Voz (Tecnologia):' : 'Voice Engine (Tech):'}
                  </span>

                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      { key: 'gemini', label: 'Nuvem Gemini AI (HD) ✨' },
                      { 
                        key: 'elevenlabs', 
                        label: elevenLabsAvailable 
                          ? 'ElevenLabs Premium 🚀' 
                          : (lang === 'pt' ? 'ElevenLabs Premium 🔒' : 'ElevenLabs Premium 🔒') 
                      },
                      { key: 'browser', label: lang === 'pt' ? 'Voz do Sistema (Local) 💻' : 'System Voice (Local) 💻' },
                    ].map((providerOption) => {
                      const isS = ttsProvider === providerOption.key;
                      return (
                        <button
                          type="button"
                          key={providerOption.key}
                          onClick={() => {
                            audio.playSystemPop();
                            if (providerOption.key === 'elevenlabs' && !elevenLabsAvailable) {
                              setDiagnosticResult(
                                lang === 'pt'
                                  ? 'Para usar os narradores ultra-realistas ElevenLabs Premium, configure a variável de ambiente ELEVENLABS_API_KEY com sua chave nos Secrets do AI Studio!'
                                  : 'To use ElevenLabs Premium ultra-realistic voices, configure the ELEVENLABS_API_KEY secret in your AI Studio settings panel!'
                              );
                              setShowDiagnosticPanel(true);
                              return;
                            }
                            // @ts-ignore
                            audio.setTtsProvider(providerOption.key);
                            // @ts-ignore
                            setTtsProvider(providerOption.key);
                          }}
                          className={`px-3 py-1 text-[10px] rounded-lg border font-black cursor-pointer transition-all ${
                            isS 
                              ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {providerOption.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Som Diagnostics helper center */}
                <div className="border-t border-dashed border-slate-205 pt-2 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      audio.playSystemPop();
                      setShowDiagnosticPanel(!showDiagnosticPanel);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 text-[10px] font-black text-[#5C8A1D] hover:text-[#456914] bg-[#F2FBE5] border border-[#D6F59C] py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>🛠️</span>
                    <span>
                      {showDiagnosticPanel 
                        ? (lang === 'pt' ? 'Ocultar Auxiliar de Som' : 'Hide Sound Diagnostics')
                        : (lang === 'pt' ? 'Sem Áudio? Testar & Ajustar Som 🔊' : 'No Sound? Test & Adjust Audio 🔊')}
                    </span>
                  </button>

                  {showDiagnosticPanel && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col gap-2.5 text-[10px] text-slate-600"
                    >
                      <span className="font-extrabold text-slate-800 flex items-center gap-1 text-[11px] select-none">
                        📢 {lang === 'pt' ? 'Central de Diagnóstico de Som' : 'Sound Diagnostic Console'}
                      </span>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {/* 1. Play musical test arpeggio */}
                        <button
                          type="button"
                          onClick={() => {
                            const played = audio.playDiagnosticTestSound();
                            setDiagnosticResult(
                              played 
                                ? (lang === 'pt' ? 'Som de teste tocado! Se não ouviu, verifique o volume geral ou mudo.' : 'Test sound played! If silent, check volume slider or physically silent switch.')
                                : (lang === 'pt' ? 'Incompatibilidade com o navegador!' : 'Could not play test sound!')
                            );
                          }}
                          className="py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl font-bold text-center cursor-pointer transition-colors"
                        >
                          🎵 {lang === 'pt' ? 'Testar Alto-falante' : 'Test Sound Output'}
                        </button>

                        {/* 2. Force reset browser speech synthesis */}
                        <button
                          type="button"
                          onClick={() => {
                            audio.forceResetSpeechSynthesis();
                            setDiagnosticResult(
                              lang === 'pt' 
                                ? 'Fila de Voz do Navegador Destravada!' 
                                : 'Browser SpeechSynthesis reset completed!'
                            );
                          }}
                          className="py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl font-bold text-center cursor-pointer transition-colors"
                        >
                          ⚙️ {lang === 'pt' ? 'Destravar Voz Local' : 'Unlock Local Voice'}
                        </button>
                      </div>

                      {diagnosticResult && (
                        <div className="p-2.5 bg-slate-50 border border-slate-200 text-[10px] text-indigo-950 font-bold rounded-lg text-center leading-snug">
                          {diagnosticResult}
                        </div>
                      )}

                      <div className="flex flex-col gap-1 p-3 bg-amber-50 rounded-xl leading-relaxed mt-1 text-slate-700 select-none">
                        <p className="font-extrabold text-amber-900 flex items-center gap-1 text-[11px]">
                          <span>💡</span>
                          <span>{lang === 'pt' ? 'Dica rápida se ainda estiver sem som:' : 'Quick checklist for zero audio:'}</span>
                        </p>
                        <ul className="list-disc pl-3.5 space-y-1 text-slate-600">
                          <li><strong>Apple (iPad/iPhone):</strong> {lang === 'pt' ? 'Geralmente a chavinha lateral física ou central de silencioso (botão de mudo) está ligada. DesATIVE ela para o som tocar!' : 'Usually, the physical slide-switch or Control Center silent button is active. Turn mute off!'}</li>
                          <li><strong>{lang === 'pt' ? 'Volume do Player' : 'Player Volume'}:</strong> {lang === 'pt' ? 'Mova a barra deslizante de volume no topo da tela!' : 'Slide up the horizontal slider inside the top-right header!'}</li>
                          <li><strong>{lang === 'pt' ? 'Modo de Som' : 'Sound Mode'}:</strong> {lang === 'pt' ? 'Se a voz da Nuvem Gemini falhar de forma temporária, selecione "Voz do Sistema (Local)" acima!' : 'Try selecting "System Voice (Local)" above if Gemini Cloud is timing out.'}</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Big Large Left/Right Page Flip control arrows */}
        <div id="visualizer-page-flipper" className="flex items-center gap-6 justify-center mt-6 w-full max-w-sm">
          <button
            onClick={handlePagePrev}
            disabled={currentPageIdx === 0}
            className="p-4 bg-indigo-600 hover:bg-indigo-700 disabled:brightness-50 disabled:cursor-not-allowed rounded-full shadow-lg border-3 border-white cursor-pointer active:scale-95 transition-transform"
            aria-label={t.prevPage}
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>

          <span className="text-sm font-sans font-black tracking-widest text-indigo-200">
            {currentPageIdx + 1} / {story.pages.length}
          </span>

          <button
            onClick={() => {
              if (currentPageIdx === story.pages.length - 1) {
                setIsReadingComplete(true);
              } else {
                handlePageNext();
              }
            }}
            className="p-4 bg-gradient-to-r from-[#CEE94F] to-[#9FCE25] hover:brightness-110 rounded-full shadow-lg border-3 border-white cursor-pointer active:scale-95 transition-transform flex items-center justify-center animate-pulse"
            aria-label={currentPageIdx === story.pages.length - 1 ? "Concluir Estória e Ganhar Certificado" : t.nextPage}
            title={currentPageIdx === story.pages.length - 1 ? "Concluir Estória & Ver Certificado" : undefined}
          >
            {currentPageIdx === story.pages.length - 1 ? (
              <span className="text-lg leading-none filter drop-shadow font-bold">🏆</span>
            ) : (
              <ArrowRight className="w-6 h-6 text-[#1A2F01]" />
            )}
          </button>
        </div>
      </main>

      {/* Completion Modal Celebration */}
      <AnimatePresence>
        {isReadingComplete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white text-slate-800 p-8 rounded-[2rem] border-4 border-[#A2C76A] max-w-md text-center shadow-2xl relative"
            >
              <div className="text-7xl mb-4 animate-bounce">🏆🌟💖</div>
              <h3 className="text-2xl font-fredoka font-black text-amber-900 mb-2">
                {lang === 'pt' ? 'História Concluída!' : 'Story Completed!'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-semibold mb-6 px-2">
                {t.completedStoryMessage || (lang === 'pt' ? 'Você é um leitor incrível! Acaba de concluir mais uma estorinha mágica do nosso reino!' : 'You are an amazing reader! You just completed another magical storybook!')}
              </p>

              <div className="flex flex-col gap-3">
                {/* View/Print Certificate Call to Action */}
                <button
                  onClick={() => {
                    audio.playMagicChime();
                    setShowCertificate(true);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-[#CEE94F] via-[#9FCE25] to-[#699E10] text-[#1A2F01] font-fredoka font-black text-base rounded-2xl cursor-pointer hover:scale-105 transition-transform shadow-[0_4px_15px_rgba(159,206,37,0.4)] border-none"
                >
                  {lang === 'pt' ? 'Gerar Meu Certificado! 🎓📜' : 'Get My Certificate! 🎓📜'}
                </button>

                {/* Back to main home */}
                <button
                  onClick={() => {
                    audio.playMagicChime();
                    setIsReadingComplete(false);
                    setCurrentPageIdx(0);
                    audio.stopSpeech();
                    onBack();
                  }}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-fredoka font-bold text-sm rounded-2xl cursor-pointer transition-colors border-none"
                >
                  {lang === 'pt' ? 'Obter Estrelinha e Voltar! 👑' : 'Claim Star and Go Back! 👑'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Printable Certificate overlay screen */}
      <AnimatePresence>
        {showCertificate && (
          <CertificateOfAchievement
            story={story}
            lang={lang}
            childName={childName}
            onClose={() => {
              setShowCertificate(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
