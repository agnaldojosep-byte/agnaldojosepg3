/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Trophy,
  Moon,
  Heart,
  Compass,
  Crown,
  Lock,
  Wand2,
  GraduationCap,
  Rocket,
  Music,
  User,
  Star,
  Flame,
  BookOpen,
} from 'lucide-react';
import { STORIES, APP_TRANSLATIONS } from './data/stories';
import { Story, Language, Category } from './types';
import { HomeCover } from './components/HomeCover';
import { StoryCard } from './components/StoryCard';
import { StoryVisualizer } from './components/StoryVisualizer';
import { ParentsPortal } from './components/ParentsPortal';
import { GuideChar } from './components/GuideChar';
import { audio } from './components/AudioEngine';
import { VoiceSearch } from './components/VoiceSearch';
import { auth, onAuthStateChanged, signOut } from './lib/firebase';
import { AuthModal } from './components/AuthModal';
import { SoundTestModal } from './components/SoundTestModal';

// Flags definition
const FLAG_LANGS: { code: Language; flag: string; label: string }[] = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
];

const CATEGORY_KEYS: { key: Category | 'all'; emoji: string; bg: string; text: string; label: Record<Language, string> }[] = [
  { key: 'all', emoji: '🏰', bg: 'bg-indigo-100', text: 'text-indigo-800', label: { pt: 'Todos os Reinos', en: 'All Kingdoms', es: 'Todos los Reinos', fr: 'Tous les contes', it: 'Tutti i mondi', de: 'Alle Welten', zh: '所有王国' } },
  { key: 'bedtime', emoji: '🌙', bg: 'bg-purple-100', text: 'text-purple-800', label: { pt: 'Dormir', en: 'Bedtime', es: 'Dormir', fr: 'Soir', it: 'Nanna', de: 'Gute Nacht', zh: '晚安故事' } },
  { key: 'animals', emoji: '🦄', bg: 'bg-emerald-100', text: 'text-emerald-800', label: { pt: 'Animais Mágicos', en: 'Animals', es: 'Animales', fr: 'Animaux', it: 'Animali', de: 'Zaubertiere', zh: '神奇动物' } },
  { key: 'ventures', emoji: '🧭', bg: 'bg-cyan-100', text: 'text-cyan-800', label: { pt: 'Aventuras', en: 'Adventures', es: 'Aventuras', fr: 'Aventures', it: 'Avventure', de: 'Abenteuer', zh: '冒险故事' } },
  { key: 'education', emoji: '🎓', bg: 'bg-teal-100', text: 'text-teal-800', label: { pt: 'Educação', en: 'Learning', es: 'Saber', fr: 'Savoir', it: 'Saper', de: 'Lernen', zh: '科普教育' } },
  { key: 'fantasy', emoji: '🪄', bg: 'bg-pink-100', text: 'text-pink-800', label: { pt: 'Fantasia', en: 'Fantasy', es: 'Fantasía', fr: 'Merveille', it: 'Rarità', de: 'Fantasie', zh: '童话幻想' } },
  { key: 'space', emoji: '🚀', bg: 'bg-amber-100', text: 'text-amber-800', label: { pt: 'Espaço', en: 'Outer Space', es: 'Cosmos', fr: 'Espace', it: 'Spazio', de: 'Weltraum', zh: '太空宇宙' } },
];

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const [isEnterCover, setIsEnterCover] = useState(false);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [initialPageIdx, setInitialPageIdx] = useState<number>(0);
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isParentsOpen, setIsParentsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSoundTestOpen, setIsSoundTestOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        if (user.displayName) {
          setChildProfile(prev => ({
            ...prev,
            name: user.displayName || prev.name
          }));
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  const [isPremium, setIsPremium] = useState(() => {
    return localStorage.getItem('mundo_estorinhas_premium_new') === 'true';
  });
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [streakCount, setStreakCount] = useState(() => {
    return Number(localStorage.getItem('estorinhas_streak_count') || '3');
  });

  // Custom child profile synced values
  const [childProfile, setChildProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('estorinhas_child_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { name: 'Amiguinho', avatar: '🦄', age: '4-6' };
  });

  const [bedtimeMinutes, setBedtimeMinutes] = useState(() => {
    return Number(localStorage.getItem('estorinhas_bedtime_minutes') || '0');
  });

  const [isBedtimeLocked, setIsBedtimeLocked] = useState(false);

  // Monitor sleep/bedtime end timestamp every 2 seconds
  useEffect(() => {
    const checkBedtime = () => {
      const activeEndTime = localStorage.getItem('estorinhas_bedtime_end_time');
      if (activeEndTime) {
        const timeRemaining = Number(activeEndTime) - Date.now();
        if (timeRemaining <= 0) {
          setIsBedtimeLocked(true);
          audio.stopSpeech();
        } else {
          setIsBedtimeLocked(false);
        }
      } else {
        setIsBedtimeLocked(false);
      }
    };
    checkBedtime();
    const interval = setInterval(checkBedtime, 3000);
    return () => clearInterval(interval);
  }, [bedtimeMinutes]);

  const [recentStoriesProgress, setRecentStoriesProgress] = useState<{ story: Story; progress: any }[]>([]);

  useEffect(() => {
    if (!activeStory) {
      try {
        const savedIdsStr = localStorage.getItem('estorinhas_recent_stories') || '[]';
        const savedIds: string[] = JSON.parse(savedIdsStr);
        
        const loaded: { story: Story; progress: any }[] = [];
        savedIds.forEach(idString => {
          const progressSaved = localStorage.getItem(`story_progress_${idString}`);
          if (progressSaved) {
            const pObj = JSON.parse(progressSaved);
            const originalStory = STORIES.find(s => s.idString === idString);
            if (originalStory) {
              loaded.push({
                story: originalStory,
                progress: pObj
              });
            }
          }
        });
        
        const activeRecents = loaded.filter(item => item.progress && item.progress.percent > 0);
        setRecentStoriesProgress(activeRecents);
      } catch (e) {
        console.error("Error reloading stories progress:", e);
      }
    }
  }, [activeStory]);

  const t = APP_TRANSLATIONS[lang];

  // Enable/Disable background gentle fairy ambient music chord loops
  useEffect(() => {
    audio.toggleMusic(musicPlaying);
    return () => {
      audio.toggleMusic(false);
    };
  }, [musicPlaying]);

  const handleSelectLanguage = (code: Language) => {
    audio.playSystemPop();
    setLang(code);
  };

  const handleOpenStory = (story: Story) => {
    if (!currentUser) {
      audio.playMagicChime();
      setIsAuthOpen(true);
      return;
    }
    if (story.premium && !isPremium) {
      // Trigger parent gateway modal automatically to purchase
      audio.playMagicChime();
      setIsParentsOpen(true);
    } else {
      let resumePage = 0;
      try {
        const saved = localStorage.getItem(`story_progress_${story.idString}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.currentPageIdx && parsed.percent < 100) {
            resumePage = parsed.currentPageIdx;
          }
        }
      } catch (e) {}

      setInitialPageIdx(resumePage);
      setActiveStory(story);
    }
  };

  const handleUpgradeSuccess = () => {
    setIsPremium(true);
    localStorage.setItem('mundo_estorinhas_premium_new', 'true');
    audio.playMagicChime();
  };

  const handleDowngrade = () => {
    setIsPremium(false);
    audio.playSystemPop();
  };

  const handleEnterApp = () => {
    setIsEnterCover(true);
    // Auto initiate ambient pad music
    setMusicPlaying(true);
    audio.toggleMusic(true);
  };

  const filteredStories = STORIES.filter((s) => {
    // 1. Filter by category if we are not in 'all' view
    const matchesCategory = filterCategory === 'all' ? true : s.category === filterCategory;
    if (!matchesCategory) return false;

    // If query is empty, return true
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();

    // Check title in current language and Portuguese
    const titleText = (s.title[lang] || s.title['pt'] || '').toLowerCase();
    if (titleText.includes(query)) return true;

    // Check category/categoryLabel in current language and Portuguese
    const categoryText = (s.category || '').toLowerCase();
    const categoryLabelText = (s.categoryLabel[lang] || s.categoryLabel['pt'] || '').toLowerCase();
    if (categoryText.includes(query) || categoryLabelText.includes(query)) return true;

    // Check list of characters for current language and Portuguese
    const charList = (s.characters[lang] || s.characters['pt'] || []);
    if (charList.some(c => c.toLowerCase().includes(query))) return true;

    // Check introduction text
    const introText = (s.introduction[lang] || s.introduction['pt'] || '').toLowerCase();
    if (introText.includes(query)) return true;

    // Kids spoken Portuguese keyword mapping
    const childFriendlyMappers: Record<string, string[]> = {
      animals: ['animal', 'animais', 'bicho', 'bichos', 'bichinho', 'leão', 'urso', 'lobo', 'raposa', 'gato', 'gatos', 'cachorro', 'sereia', 'peixe', 'marinho', 'tartaruga', 'papagaio', 'passarinho', 'unicornio', 'unicórnio', 'borboleta'],
      space: ['espaço', 'espacial', 'planeta', 'foguete', 'estrela', 'estrelas', 'luna', 'sol', 'astronauta', 'meteoro', 'cometa', 'galáxia', 'cosmos'],
      bedtime: ['dormir', 'sono', 'noite', 'nana', 'descansar', 'cama', 'travesseiro', 'sossego', 'sonho', 'sonhos'],
      ventures: ['aventura', 'aventuras', 'pirata', 'mapa', 'tesouro', 'mar', 'baú', 'navio', 'oceano', 'barco', 'viagem'],
      education: ['aprender', 'escola', 'estudar', 'educação', 'ciência', 'saber', 'alfabeto', 'história', 'professor'],
      fantasy: ['fantasia', 'magia', 'mágico', 'mágica', 'fada', 'fadas', 'bruxo', 'bruxa', 'dragão', 'dragões', 'duendes', 'duende', 'elfo']
    };

    const matchedCats = Object.entries(childFriendlyMappers)
      .filter(([_, keywords]) => keywords.some(k => query.includes(k) || k.includes(query)))
      .map(([cat, _]) => cat);

    if (matchedCats.includes(s.category)) {
      return true;
    }

    return false;
  });

  if (!isEnterCover) {
    return (
      <HomeCover 
        lang={lang} 
        isPremiumCurrentUser={isPremium}
        currentUser={currentUser}
        onEnterApp={handleEnterApp} 
        onEnterWithStory={(story: Story) => {
          handleEnterApp();
          handleOpenStory(story);
        }}
        onSelectLanguage={handleSelectLanguage} 
        onUpgradeSuccess={handleUpgradeSuccess}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
    );
  }

  return (
    <div
      id="main-app-viewport"
      className="min-h-screen bg-[#000E1A] text-[#D4F6FF] flex flex-col justify-between relative overflow-x-hidden font-sans animate-fade-in"
    >
      {/* Background is solid dark pitch neon blue */}

      {/* Top Main Dashboard Header */}
      <header className="relative z-20 bg-[#03152B]/95 border-b-4 border-[#00BFFF] shadow-lg sticky top-0 py-4 px-4 md:px-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00FFFF] via-[#00BFFF] to-[#013564] rounded-xl shadow-md flex items-center justify-center transform rotate-3 shrink-0">
            <span className="text-xl">📖</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-fredoka font-bold tracking-tight uppercase bg-gradient-to-r from-[#D4F6FF] via-[#00F0FF] to-[#015CBE] text-transparent bg-clip-text">
                {t.title}
              </span>
              <span className="text-[10px] bg-[#022549] text-[#00FFFF] border border-[#00BFFF] font-bold px-2.5 py-0.5 rounded-full select-none flex items-center gap-0.5">
                👑 3D Pixar
              </span>
            </div>
            <span className="text-[10px] text-[#00FFFF] font-fredoka font-semibold block tracking-wider uppercase">
              Alfabetização & Imaginação
            </span>
          </div>
        </div>

        {/* Action Controls Side: Streak counters / Flag linguagens */}
        <div className="flex flex-wrap items-center justify-center gap-3 relative z-30">
          
          {/* Kids supportive streak counter */}
          <div className="flex items-center gap-1.5 bg-[#1F1E16] border border-amber-500 text-amber-350 font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md select-none">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse fill-current" />
            <span>{streakCount} {lang === 'pt' ? 'Dias de Streak!' : 'Day Streak!'}</span>
          </div>

          {/* Parents Hidden Section Lock */}
          <button
            onClick={() => {
              audio.playMagicChime();
              setIsParentsOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#16122F] hover:bg-[#201B42] text-[#A297FF] font-bold text-xs rounded-full border border-[#3E328A] cursor-pointer transition-all shadow-md"
          >
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.parentsArea}</span>
          </button>

          {/* Authentication System */}
          {currentUser ? (
            <button
              onClick={() => {
                audio.playSystemPop();
                signOut(auth);
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-red-950/45 hover:bg-red-900 border border-red-800 text-red-300 font-bold text-xs rounded-full cursor-pointer transition-all shadow-md"
              title={lang === 'pt' ? 'Clique para Sair da Conta' : 'Click to Log Out'}
              id="header-logout-btn"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Sair ({currentUser.displayName || currentUser.email?.split('@')[0]})</span>
            </button>
          ) : (
            <button
              onClick={() => {
                audio.playMagicChime();
                setIsAuthOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-white font-black text-xs rounded-full cursor-pointer transition-all shadow-md hover:scale-105 active:scale-95"
              id="header-login-btn"
            >
              <User className="w-3.5 h-3.5 text-white" />
              <span>{lang === 'pt' ? 'Entrar / Cadastrar' : 'Sign In / Register'}</span>
            </button>
          )}

          {/* Interactive flag linguagens seletor */}
          <div className="flex items-center gap-1 p-1 bg-[#022549] rounded-full border border-[#00BFFF] shadow-inner">
            {FLAG_LANGS.map((f) => (
              <button
                key={f.code}
                onClick={() => handleSelectLanguage(f.code)}
                title={f.label}
                className={`text-base h-7 w-7 rounded-full flex items-center justify-center hover:scale-125 hover:rotate-6 transition-all cursor-pointer ${
                  lang === f.code
                    ? 'bg-gradient-to-br from-[#00FFFF] to-[#015CBE] text-[#001730] shadow-md border border-[#D4F6FF] scale-110'
                    : 'border border-[#00BFFF]'
                }`}
              >
                {f.flag}
              </button>
            ))}
          </div>

          {/* Magical Word Sound Test Diagnostics */}
          <button
            id="header-sound-test-btn"
            onClick={() => {
              audio.playMagicChime();
              setIsSoundTestOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#022549] hover:bg-[#05417A] text-[#00FFFF] border border-[#00BFFF] rounded-full cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-md shrink-0"
            title={lang === 'pt' ? 'Laboratório de Som e Voz 🔊' : 'Voice & Sound Laboratory 🔊'}
          >
            <span className="text-sm leading-none">🔊</span>
            <span className="hidden md:inline leading-none font-fredoka font-bold text-[10px] uppercase tracking-wider">
              {lang === 'pt' ? 'Teste de Som' : 'Sound Test'}
            </span>
          </button>

          {/* Ambient Music Toggle button */}
          <button
            onClick={() => {
              audio.playSystemPop();
              setMusicPlaying(!musicPlaying);
            }}
            className={`p-2 rounded-full cursor-pointer transition-all border ${
              musicPlaying
                ? 'bg-amber-950 border-amber-500 text-amber-400 shadow-md'
                : 'bg-[#022549] border-[#00BFFF] text-slate-100'
            }`}
            title="Music"
          >
            <Music className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main core router views */}
      {activeStory ? (
        <StoryVisualizer
          story={activeStory}
          lang={lang}
          onBack={() => {
            setActiveStory(null);
            // Re-enable background loop gently
            audio.toggleMusic(musicPlaying);
          }}
          isPremiumUser={isPremium}
          onOpenParents={() => setIsParentsOpen(true)}
          initialPageIdx={initialPageIdx}
        />
      ) : (
        /* The Netflix styled kids dashboard list */
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:px-8 md:py-12 space-y-10 relative z-10">
          
          {/* Welcome guide balloon box */}
          <div className="relative bg-[#021832]/95 text-slate-100 rounded-[2.25rem] p-6 md:p-8 overflow-hidden shadow-2xl border-2 border-[#00BFFF] flex flex-col md:flex-row items-center gap-6 justify-between">
            
            <div className="space-y-2 text-center md:text-left z-10">
              <h1 className="text-xl md:text-3xl font-fredoka font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] via-[#00BFFF] to-[#D4F6FF] flex items-center justify-center md:justify-start gap-2">
                <span>
                  {lang === 'pt' 
                    ? `Olá, ${childProfile.avatar} ${childProfile.name}! 📖✨` 
                    : `Hello, ${childProfile.avatar} ${childProfile.name}! ⭐📖`}
                </span>
              </h1>
              <p className="text-xs md:text-sm text-[#A9EDFF] max-w-xl font-semibold leading-relaxed">
                {lang === 'pt' 
                  ? 'Bem-vindo ao reino dos sonhos e fantasia! Clique em qualquer livro abaixo para abrir as ilustrações mágicas e ouvir lindas histórias com nossa vovozinha digital sincronizada!' 
                  : 'Welcome to the kingdom of dreams and fantasy! Click any book below to open magical illustrations and listen to beautiful stories sync\'ed word-by-word!'}
              </p>
            </div>

            {/* Showcase action statistics */}
            <div className="flex items-center gap-3 bg-[#022549] border border-[#00BFFF] p-4 rounded-2xl select-none text-center md:text-left shrink-0 z-10 w-full md:w-auto justify-center">
              <div className="text-3xl">👑</div>
              <div>
                <span className="text-[9px] text-[#FFCC00] font-extrabold uppercase block tracking-wider">Membro Oficial</span>
                <p className="text-xs font-sans font-black text-lime-300">
                  {isPremium ? t.proPlan : t.freePlan}
                </p>
              </div>
            </div>
          </div>

          {/* Voice Search with AI kids Speech Recognition */}
          <VoiceSearch
            lang={lang}
            onSearch={(query) => setSearchQuery(query)}
            currentSearchQuery={searchQuery}
          />

          {/* Continue Reading Section for Stories in Progress */}
          {recentStoriesProgress.length > 0 && (
            <div className="space-y-4 animate-fade-in bg-[#021832]/70 border-2 border-[#00BFFF]/40 p-5 md:p-6 rounded-[2.25rem] shadow-md">
              <div className="flex items-center justify-between border-b border-[#00BFFF]/40 pb-2.5">
                <div className="flex items-center gap-3">
                  <span className="text-xl animate-pulse">✨📖</span>
                  <h3 className="text-base font-fredoka font-bold text-white uppercase tracking-wider">
                    {lang === 'pt' ? 'Continuar Lendo e Ouvindo' : 'Continue Reading & Listening'}
                  </h3>
                </div>
                <button 
                  onClick={() => {
                    audio.playSystemPop();
                    try {
                      localStorage.removeItem('estorinhas_recent_stories');
                      STORIES.forEach(s => localStorage.removeItem(`story_progress_${s.idString}`));
                      setRecentStoriesProgress([]);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className="text-[9px] font-fredoka font-black text-[#00FFFF] hover:text-[#00BFFF] cursor-pointer transition-colors uppercase tracking-widest bg-[#000d1e]/50 hover:bg-[#000d1e]/95 px-3 py-1.5 rounded-xl border border-[#00BFFF]/30"
                >
                  {lang === 'pt' ? 'Limpar Progresso 🧹' : 'Clear Progress 🧹'}
                </button>
              </div>

              {/* Grid with cards in progress */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recentStoriesProgress.map(({ story, progress }) => (
                  <div key={`continue-${story.idString}`} className="relative h-full group">
                    {/* Floating mini status badge helper */}
                    <div className="absolute -top-2 -right-2 z-20 bg-gradient-to-r from-[#FFCC00] to-orange-500 font-sans font-black text-[9px] uppercase px-3 py-1 rounded-full text-slate-950 border border-[#FFFDD9] flex items-center gap-1 shadow-[0_4px_12px_rgba(255,204,0,0.4)] transition-all group-hover:scale-105 select-none font-bold">
                      <span>⚡</span>
                      <span>{progress.percent < 100 ? (lang === 'pt' ? 'Parei Aqui' : 'Resume') : (lang === 'pt' ? 'Lido!' : 'Read!')}</span>
                    </div>

                    <StoryCard
                      story={story}
                      lang={lang}
                      isUnlocked={isPremium}
                      isLoggedIn={!!currentUser}
                      onSelect={() => {
                        setInitialPageIdx(progress.currentPageIdx || 0);
                        setActiveStory(story);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grid Category Ribbons */}
          <div className="space-y-4">
            <h3 className="text-base font-fredoka font-bold text-[#00FFFF] flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '25s' }} />
              <span className="uppercase tracking-wider text-xs font-bold text-[#00FFFF]">{t.exploreCategories}</span>
            </h3>
            
            <div className="flex flex-wrap gap-3 items-center">
              {CATEGORY_KEYS.map((cat) => {
                const isActive = filterCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => {
                       audio.playSystemPop();
                       setFilterCategory(cat.key);
                    }}
                    className={`px-5 py-3 rounded-2xl text-xs font-fredoka font-bold cursor-pointer flex items-center gap-2.5 transform active:scale-95 transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#00FFFF] via-[#00BFFF] to-[#015CBE] text-[#001730] shadow-lg ring-2 ring-[#00FFFF]'
                        : 'bg-[#021832] hover:bg-[#052C59] hover:text-white border border-[#00BFFF] text-[#A9EDFF] hover:scale-105'
                    }`}
                  >
                    <span className="text-sm">{cat.emoji}</span>
                    <span>{cat.label[lang] || cat.key}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Organized Storybooks list grouped by categories */}
          <div className="space-y-12">
            {filteredStories.length === 0 ? (
              <div className="text-center bg-[#021832]/70 border-2 border-dashed border-[#00BFFF] p-10 md:p-16 rounded-[2.25rem] max-w-xl mx-auto space-y-6">
                <span className="text-6xl animate-bounce inline-block">🧚‍♀️✨</span>
                <h4 className="text-xl font-fredoka font-bold text-white uppercase tracking-wider">
                  {lang === 'pt' ? 'O Reino está em silêncio...' : 'The Kingdom is quiet...'}
                </h4>
                <p className="text-sm text-[#A9EDFF] leading-relaxed font-semibold">
                  {lang === 'pt' 
                    ? 'Nenhum livro mágico foi encontrado com a palavra que você disse ou digitou. Toque em uma sugestão rápida no campo de busca para tentar novamente!' 
                    : 'We couldn\'t find any magical books with that keyword. Try one of our quick topics above!'}
                </p>
                <button
                  onClick={() => {
                    audio.playSystemPop();
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#00FFFF] via-[#00BFFF] to-[#015CBE] hover:scale-105 active:scale-95 text-[#001730] font-fredoka font-bold text-xs rounded-full uppercase tracking-widest cursor-pointer shadow-md transition-transform"
                >
                  {lang === 'pt' ? 'Ver Todas as Histórias' : 'Show All Stories'}
                </button>
              </div>
            ) : filterCategory === 'all' ? (
              CATEGORY_KEYS.filter(cat => cat.key !== 'all').map((cat) => {
                const categoryStories = filteredStories.filter(s => s.category === cat.key);
                if (categoryStories.length === 0) return null;
                
                const categoryLabel = cat.label[lang] || cat.label['pt'] || cat.key;
                
                return (
                  <div key={cat.key} className="space-y-5">
                    <div className="flex items-center justify-between border-b-2 border-[#00BFFF] pb-2.5">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl filter drop-shadow">{cat.emoji}</span>
                        <h4 className="text-lg font-fredoka font-bold text-slate-100 uppercase tracking-widest">
                          {categoryLabel}
                        </h4>
                      </div>
                      <span className="text-[10px] bg-[#022549] text-[#00FFFF] border border-[#00BFFF] font-black px-3 py-1 rounded-xl uppercase tracking-widest">
                        {categoryStories.length} {lang === 'pt' ? 'Histórias Mágicas' : 'Magic Stories'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {categoryStories.map((story) => (
                        <div key={story.id} className="h-full">
                          <StoryCard
                            story={story}
                            lang={lang}
                            isUnlocked={isPremium}
                            isLoggedIn={!!currentUser}
                            onSelect={() => handleOpenStory(story)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="space-y-5">
                {(() => {
                  const activeCat = CATEGORY_KEYS.find(c => c.key === filterCategory);
                  const activeCatLabel = activeCat ? (activeCat.label[lang] || activeCat.label['pt']) : '';
                  const activeCatEmoji = activeCat ? activeCat.emoji : '';
                  return (
                    <div className="flex items-center justify-between border-b-2 border-[#00BFFF] pb-2.5">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl filter drop-shadow">{activeCatEmoji}</span>
                        <h4 className="text-lg font-fredoka font-bold text-slate-100 uppercase tracking-widest">
                          {activeCatLabel}
                        </h4>
                      </div>
                      <span className="text-[10px] bg-[#022549] text-[#00FFFF] border border-[#00BFFF] font-black px-3 py-1 rounded-xl uppercase tracking-widest">
                        {filteredStories.length} {lang === 'pt' ? 'Histórias Encontradas' : 'Stories Found'}
                      </span>
                    </div>
                  );
                })()}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredStories.map((story) => (
                    <div key={story.id} className="h-full">
                      <StoryCard
                        story={story}
                        lang={lang}
                        isUnlocked={isPremium}
                        isLoggedIn={!!currentUser}
                        onSelect={() => handleOpenStory(story)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>



        </div>
      )}

      {/* Persistent Star guide helper balloon floating */}
      <GuideChar
        lang={lang}
        onTalkClick={() => {
          // Play a nice sparkle scale
          audio.playMagicChime();
        }}
      />

      {/* Parents Secure Area Checkout Modal Drawer */}
      <AnimatePresence>
        {isParentsOpen && (
          <ParentsPortal
            lang={lang}
            isPremium={isPremium}
            onClose={() => {
              audio.playSystemPop();
              setIsParentsOpen(false);
            }}
            onUpgradeSuccess={() => {
              handleUpgradeSuccess();
            }}
            onDowngrade={() => {
              handleDowngrade();
            }}
            childProfile={childProfile}
            onUpdateProfile={(profile) => {
              setChildProfile(profile);
            }}
            bedtimeMinutes={bedtimeMinutes}
            onUpdateBedtimeMinutes={(mins) => {
              setBedtimeMinutes(mins);
            }}
          />
        )}
      </AnimatePresence>

      {/* Registration & Login Portal Gate */}
      <AnimatePresence>
        {isAuthOpen && (
          <AuthModal
            lang={lang}
            onClose={() => setIsAuthOpen(false)}
            onAuthSuccess={(user) => {
              setIsAuthOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Sound & Word Test Laboratory */}
      <AnimatePresence>
        {isSoundTestOpen && (
          <SoundTestModal
            lang={lang}
            onClose={() => setIsSoundTestOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Bedtime / Sleep limit lock screen */}
      <AnimatePresence>
        {isBedtimeLocked && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#040611] text-center select-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md space-y-6"
            >
              <div className="text-7xl animate-pulse">🌙💤</div>
              <h2 className="text-4xl font-fredoka font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFCC00] to-orange-400">
                {lang === 'pt' ? 'Hora de Descansar!' : 'Bedtime for Stars!'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-semibold">
                {lang === 'pt' 
                  ? 'A Estrelinha Guia e todos os animaizinhos da floresta secreta já foram descansar. Desligue a telinha e marque um belo sonho também!' 
                  : 'Little Star and all the friendly forest companions have closed their eyes. Shut down your screen and have sweet dreams, little adventurer!'}
              </p>

              {/* Parents bypass lock widget to override/reset time limit */}
              <div className="pt-8 border-t border-[#1C203E]/50">
                <button
                  onClick={() => {
                    audio.playMagicChime();
                    localStorage.removeItem('estorinhas_bedtime_end_time');
                    localStorage.setItem('estorinhas_bedtime_minutes', '0');
                    setBedtimeMinutes(0);
                    setIsBedtimeLocked(false);
                  }}
                  className="px-6 py-3 bg-[#131735] hover:bg-[#1E2554] border border-[#2D387A] text-slate-400 hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{lang === 'pt' ? 'Acesso dos Pais / Desbloquear' : 'Parents Bypass / Override'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Magical warm child-friendly footer layout */}
      <footer className="bg-[#020914] text-slate-400 text-[11px] font-sans text-center py-6 border-t-4 border-[#00BFFF] mt-12 space-y-1">
        <p className="font-extrabold text-[#00FFFF]">Mundo das Estorinhas — Livro de Contos Moderno 3D</p>
        <p className="text-[10px]">Coded with care using React, Framer Motion & Web Audio API (Chimes, swooshes, dynamic highlights)</p>
      </footer>

    </div>
  );
}
