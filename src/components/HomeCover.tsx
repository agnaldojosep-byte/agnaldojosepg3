import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Heart, 
  Wand2, 
  Star, 
  Music, 
  Moon, 
  Compass, 
  Lock, 
  ChevronRight, 
  ChevronLeft, 
  Gift, 
  Mail, 
  Volume2, 
  VolumeX, 
  Crown,
  Play,
  Ticket,
  MapPin,
  Check,
  User,
  Coffee,
  ShoppingBag,
  Tv,
  Info
} from 'lucide-react';
import { Language, Story } from '../types';
import { APP_TRANSLATIONS, STORIES } from '../data/stories';
import { STORY_COVERS } from '../data/storyImages';
import { audio } from './AudioEngine';

interface HomeCoverProps {
  lang: Language;
  isPremiumCurrentUser?: boolean;
  onEnterApp: () => void;
  onEnterWithStory?: (story: Story) => void;
  onSelectLanguage?: (code: Language) => void;
  onUpgradeSuccess?: () => void;
  onOpenAuth?: () => void;
  currentUser?: any;
}

// Side category keys precisely matching the mockup's sidebar under ATRAÇÕES:
type SidebarCategory = 
  | 'ATRAÇÕES'
  | 'PRINCESAS'
  | 'FADAS'
  | 'UNICÓRNIOS'
  | 'DUENDES'
  | 'PIRATAS'
  | 'SHOWS'
  | 'GASTRONOMIA'
  | 'LOJINHA';

export const HomeCover: React.FC<HomeCoverProps> = ({ 
  lang, 
  isPremiumCurrentUser = false,
  onEnterApp,
  onEnterWithStory,
  onSelectLanguage,
  onUpgradeSuccess,
  onOpenAuth,
  currentUser
}) => {
  const t = APP_TRANSLATIONS[lang];

  // Primary states of the landing page
  const [activeSidebarFilter, setActiveSidebarFilter] = useState<SidebarCategory>('ATRAÇÕES');
  const [ambientActive, setAmbientActive] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  // Magic Ticket / Ingressos modal states
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [purchasingTicketsCount, setPurchasingTicketsCount] = useState(2);
  const [childVisitorName, setChildVisitorName] = useState('');
  const [paymentStep, setPaymentStep] = useState<'idle' | 'linking' | 'processing' | 'success'>('idle');
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(isPremiumCurrentUser);

  // Carousel slider state for story selections
  const [selectedAtractionDetail, setSelectedAtractionDetail] = useState<string | null>(null);

  // Culinary / Gastronomia mini-game state
  const [candyPotIngredients, setCandyPotIngredients] = useState<string[]>([]);
  const [isCookingBaking, setIsCookingBaking] = useState(false);
  const [bakingResult, setBakingResult] = useState<string | null>(null);

  // Shop / Lojinha select state
  const [unlockedLojinhaToys, setUnlockedLojinhaToys] = useState<string[]>([]);

  // Sync premium status
  useEffect(() => {
    setIsPremiumUnlocked(isPremiumCurrentUser);
  }, [isPremiumCurrentUser]);

  // Handle ambient background music toggle
  const handleToggleSoundLoop = () => {
    audio.playSystemPop();
    const targetState = !ambientActive;
    setAmbientActive(targetState);
    audio.toggleMusic(targetState);
    
    showNotification(
      targetState 
        ? (lang === 'pt' ? 'Música relaxante ligada! 🎵' : 'Relaxing music on! 🎵')
        : (lang === 'pt' ? 'Música desligada.' : 'Music muted.')
    );
  };

  const showNotification = (msg: string) => {
    setActiveNotification(msg);
    setTimeout(() => {
      setActiveNotification(null);
    }, 4500);
  };

  // Launch the corresponding story when clicking 'CONHECER', 'EXPLORAR', 'VER MAIS' or 'AVENTURAR-SE'
  const handleLaunchTargetStory = (storyIdString: string) => {
    audio.playMagicChime();
    
    // Find story in global collection
    const storyItem = STORIES.find(s => s.idString === storyIdString);
    if (storyItem && onEnterWithStory) {
      onEnterWithStory(storyItem);
    } else {
      // Fallback
      onEnterApp();
    }
  };

  // Validate and submit email for receipt of newsletters
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      audio.playSystemPop();
      setErrorMessage(lang === 'pt' ? 'Por favor, insira um e-mail válido! ✉️' : 'Please insert a valid email address!');
      return;
    }

    audio.playMagicChime();
    setErrorMessage('');
    setIsEmailSubmitted(true);
    
    try {
      localStorage.setItem('mundo_magico_newsletter_email', newsletterEmail);
    } catch (err) {}

    showNotification(
      lang === 'pt' 
        ? 'Cadastro realizado! Você ganhou 3 Estrelas de Bônus 🌟' 
        : 'Subscribed! You’ve earned 3 Bonus Stars! 🌟'
    );
  };

  // Simulated purchase action
  const handleBuyTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childVisitorName.trim()) {
      audio.playSystemPop();
      setErrorMessage(lang === 'pt' ? 'Por favor, insira o nome do(a) aventureiro(a)!' : 'Please insert the adventurer’s name!');
      return;
    }

    setErrorMessage('');
    audio.playSystemPop();
    setPaymentStep('linking');

    setTimeout(() => {
      setPaymentStep('processing');
      setTimeout(() => {
        setPaymentStep('success');
        audio.playMagicChime();
        setIsPremiumUnlocked(true);
        if (onUpgradeSuccess) {
          onUpgradeSuccess();
        }
      }, 2000);
    }, 1500);
  };

  // Gastronomy Mixing
  const handleAddGastronomyIngredient = (ing: string) => {
    audio.playSystemPop();
    if (candyPotIngredients.includes(ing)) return;
    if (candyPotIngredients.length >= 3) {
      // Rotate out oldest
      setCandyPotIngredients([...candyPotIngredients.slice(1), ing]);
    } else {
      setCandyPotIngredients([...candyPotIngredients, ing]);
    }
  };

  const handleBakeGastronomyDish = () => {
    if (candyPotIngredients.length === 0) return;
    audio.playMagicChime();
    setIsCookingBaking(true);
    setBakingResult(null);

    setTimeout(() => {
      setIsCookingBaking(false);
      let result = 'Algodão Doce Colorido 🍭';
      const joined = candyPotIngredients.join('+');
      if (joined.includes('🍎') && joined.includes('🧪')) result = 'Maçã do Amor Enfeitiçada 🍎✨';
      else if (joined.includes('🍿') && joined.includes('🧪')) result = 'Pipoca Cintilante de Dragão 🍿🔥';
      else if (joined.includes('🍿') && joined.includes('🍎')) result = 'Popcorn de Caramelo do Castelo 🍿🍯';
      else if (joined.includes('🧪')) result = 'Poção Borbulhante do Elfo 🧪🫧';
      
      setBakingResult(result);
      audio.playMagicChime();
    }, 1500);
  };

  const handleBuyVirtualToy = (toyName: string, cost: number) => {
    audio.playMagicChime();
    if (unlockedLojinhaToys.includes(toyName)) {
      showNotification(`Você já possui o brinquedo ${toyName}!`);
      return;
    }
    setUnlockedLojinhaToys([...unlockedLojinhaToys, toyName]);
    showNotification(`Brinquedo ${toyName} resgatado com estrelas de leitura! ✨🧸`);
  };

  const FLAG_OPTIONS: { code: Language; flag: string; label: string }[] = [
    { code: 'pt', flag: '🇧🇷', label: 'Português' },
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
  ];

  return (
    <div 
      id="sales-landing-page" 
      className="relative min-h-screen w-full bg-[#0a001a] text-slate-100 flex flex-col overflow-x-hidden font-sans select-none"
    >
      
      {/* 🌌 GLOWING ATMOSPHERIC STARFIELD BACKDROP */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#03010b]">
        {/* Neon blur shapes */}
        <div className="absolute top-[10%] left-[20%] w-[380px] h-[380px] rounded-full bg-pink-600/10 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[420px] h-[420px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[40%] right-[30%] w-[250px] h-[250px] rounded-full bg-green-500/5 blur-[100px]"></div>

        {/* Twinkling mini stars */}
        {Array.from({ length: 40 }).map((_, i) => {
          const topRandom = (i * 13.7) % 96;
          const leftRandom = (i * 7.9) % 96;
          const delay = (i * 0.3) % 4;
          return (
            <div
              key={i}
              style={{ 
                top: `${topRandom}%`, 
                left: `${leftRandom}%`, 
                animationDelay: `${delay}s`,
                animationDuration: `${2 + (i % 3)}s`
              }}
              className="absolute text-xs pointer-events-none select-none animate-pulse text-yellow-300/40"
            >
              ✦
            </div>
          );
        })}
      </div>

      {/* 🔊 PERSISTENT ACTIVE NOTIFICATION ALERTS */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 border border-pink-400 text-white font-fredoka font-bold text-xs px-6 py-3 rounded-full shadow-[0_10px_25px_rgba(219,39,119,0.4)] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span>{activeNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎟️ MAGICAL TICKET / INGRESSO CHECKOUT MODAL */}
      <AnimatePresence>
        {isTicketModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 40 }}
              className="relative bg-gradient-to-b from-[#1b003a] via-[#09001b] to-black border-2 border-pink-500 rounded-[2.5rem] shadow-[0_20px_60px_rgba(236,72,153,0.3)] w-full max-w-lg overflow-hidden p-8"
              id="magical-ticket-modal"
            >
              {/* Star details decor */}
              <div className="absolute top-4 right-4 text-pink-400/30 text-3xl">★</div>
              <div className="absolute bottom-4 left-4 text-blue-400/30 text-3xl">★</div>

              <div className="flex items-center justify-between border-b border-pink-500/20 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 bg-pink-600 rounded-full flex items-center justify-center text-white">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-fredoka font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-300">
                      BILHETERIA MÁGICA
                    </h3>
                    <p className="text-[10px] text-pink-300/80 font-bold tracking-wider uppercase">Portal de Ingressos do Parque</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    audio.playSystemPop();
                    setIsTicketModalOpen(false);
                    setPaymentStep('idle');
                    setChildVisitorName('');
                  }}
                  className="p-1 px-2.5 rounded-full bg-pink-950 hover:bg-pink-900 border border-pink-500/50 text-pink-300 font-extrabold text-xs cursor-pointer"
                >
                  X
                </button>
              </div>

              {paymentStep === 'idle' && (
                <form onSubmit={handleBuyTicketSubmit} className="space-y-6 pt-5">
                  <div className="text-center space-y-1">
                    <p className="text-[10px] text-pink-400 font-black tracking-widest uppercase">Passaporte Premium Celestial</p>
                    <h4 className="text-2xl font-fredoka font-black text-white">REINO INDIVIDUAL VITALÍCIO</h4>
                    <span className="inline-block px-3 py-1 bg-pink-950/60 border border-pink-500/40 text-[11px] text-[#00FFFF] font-bold rounded-full">
                      Acesso Ilimitado a Todas as Estorinhas por apenas R$ 14,90
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-fredoka text-pink-300 uppercase font-bold tracking-wider">
                        Nome do(a) Pequeno(a) Aventureiro(a):
                      </label>
                      <input 
                        type="text" 
                        value={childVisitorName}
                        onChange={(e) => setChildVisitorName(e.target.value)}
                        placeholder="Ex: Pedro, Alice, Júlia..."
                        className="w-full bg-slate-900/90 border border-pink-500/50 px-4 py-3 rounded-2xl text-slate-100 placeholder-slate-500 font-fredoka text-sm focus:outline-none focus:border-pink-400 shadow-inner"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-fredoka text-pink-300 uppercase font-bold tracking-wider flex justify-between">
                        <span>Quantidade de Ingressos:</span>
                        <span className="text-yellow-300">{purchasingTicketsCount} {purchasingTicketsCount > 1 ? 'Viajantes' : 'Viajante'}</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            audio.playSystemPop();
                            if (purchasingTicketsCount > 1) setPurchasingTicketsCount(purchasingTicketsCount - 1);
                          }}
                          className="flex-1 py-2 rounded-xl bg-pink-950/70 border border-pink-500/40 hover:bg-pink-900 text-pink-300 font-black text-sm cursor-pointer"
                        >
                          - Reduzir
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            audio.playSystemPop();
                            if (purchasingTicketsCount < 8) setPurchasingTicketsCount(purchasingTicketsCount + 1);
                          }}
                          className="flex-1 py-2 rounded-xl bg-pink-950/70 border border-pink-500/40 hover:bg-pink-900 text-pink-300 font-black text-sm cursor-pointer"
                        >
                          + Adicionar
                        </button>
                      </div>
                    </div>
                  </div>

                  {errorMessage && <p className="text-xs text-red-400 font-bold bg-red-950/50 p-2.5 rounded-xl border border-red-900 text-center">{errorMessage}</p>}

                  <button
                    type="submit"
                    className="w-full py-4.5 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 hover:brightness-110 active:scale-97 text-white font-fredoka font-black rounded-2xl shadow-lg border border-pink-400 cursor-pointer uppercase text-xs tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Comprar Ingresso com PayPal</span>
                    <Sparkles className="w-4.5 h-4.5 text-yellow-300 fill-yellow-300" />
                  </button>
                </form>
              )}

              {paymentStep === 'linking' && (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-4 border-pink-950 border-t-pink-500 animate-spin"></div>
                  <h4 className="text-base font-fredoka font-bold text-pink-300">Carregando formulário PayPal...</h4>
                  <p className="text-xs text-slate-400 font-medium max-w-xs">Estabelecendo túnel de transação segura de alta segurança contra dragões e piratas...</p>
                </div>
              )}

              {paymentStep === 'processing' && (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-4 border-blue-950 border-t-blue-400 animate-spin"></div>
                  <h4 className="text-base font-fredoka font-bold text-blue-300">Finalizando Assinatura Mágica...</h4>
                  <p className="text-xs text-slate-400 font-medium">Cadastrando no Clube dos Contadores de Histórias...</p>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="py-6 flex flex-col items-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-slate-950 text-2xl font-black shadow-[0_0_20px_rgba(52,211,153,0.5)] animate-bounce">
                    ✓
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-2xl font-fredoka font-black text-green-400">INGRESSO EMITIDO!</h4>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                      Sensacional, <strong>{childVisitorName}</strong>! Agora você tem o bilhete VIP para navegar livremente por todas as histórias deste e de outros reinos mágicos!
                    </p>
                  </div>

                  <div className="p-4.5 bg-slate-950/70 rounded-2.5xl border border-pink-500/30 text-left w-full space-y-1 text-xs text-pink-300/80 font-mono">
                    <p>🎟️ <strong>Ticket ID:</strong> TKT-Mágico-{Math.floor(Math.random()*90000+10000)}</p>
                    <p>👤 <strong>Viajante:</strong> {childVisitorName}</p>
                    <p>🎫 <strong>Quantidade:</strong> {purchasingTicketsCount} Passaportes</p>
                    <p>💰 <strong>Valor:</strong> Pago via PayPal (R$ 14,90)</p>
                  </div>

                  <button
                    onClick={() => {
                      setIsTicketModalOpen(false);
                      onEnterApp();
                    }}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-slate-950 font-fredoka font-black rounded-2xl cursor-pointer uppercase text-xs tracking-wider"
                  >
                    Entrar no Parque do Saber!
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🚀 1. HEADER MENU BAR preciesly matching the top of the mockup */}
      <nav className="relative z-30 bg-[#0d0124]/90 border-b border-pink-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] sticky top-0 px-4 md:px-8 py-4 flex items-center justify-between backdrop-blur-md">
        
        {/* Left Side Logo: Mundo das Estorinhas */}
        <div 
          onClick={() => {
            audio.playMagicChime();
            setActiveSidebarFilter('ATRAÇÕES');
          }}
          className="flex items-center gap-2.5 px-1 cursor-pointer group"
          id="header-logo-container"
        >
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.5)] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <span className="text-xl filter drop-shadow">📖</span>
          </div>
          <div className="flex flex-col text-left leading-none uppercase select-none font-fredoka">
            <span className="text-[11px] font-black tracking-normal text-slate-100 flex gap-[2px]">
              <span>MUNDO</span>
              <span className="text-orange-400">DAS</span>
            </span>
            <span className="text-[12px] font-black tracking-widest font-sans flex items-center mt-0.5 gap-[1px]">
              <span className="text-orange-400">E</span>
              <span className="text-pink-500">S</span>
              <span className="text-lime-400">T</span>
              <span className="text-yellow-300">O</span>
              <span className="text-sky-400">R</span>
              <span className="text-orange-400">I</span>
              <span className="text-yellow-300">N</span>
              <span className="text-sky-400">H</span>
              <span className="text-rose-400">A</span>
              <span className="text-yellow-300">S</span>
            </span>
          </div>
        </div>

        {/* Navigation links matching the mockup page exactly */}
        <div className="hidden lg:flex items-center gap-7 font-fredoka font-black text-[11px] text-slate-300 uppercase tracking-widest leading-none">
          <button 
            onClick={() => {
              audio.playSystemPop();
              setActiveSidebarFilter('ATRAÇÕES');
            }} 
            className="hover:text-pink-400 transition-colors cursor-pointer"
          >
            HOME
          </button>
          <button 
            onClick={() => {
              audio.playSystemPop();
              showNotification(lang === 'pt' ? 'Mundo das Estorinhas: Criatividade e fantasia sem limites!' : 'Mundo das Estorinhas: Unlimited creativity and fantasy!');
            }} 
            className="hover:text-pink-400 transition-colors cursor-pointer"
          >
            SOBRE NÓS
          </button>
          <button 
            onClick={() => {
              audio.playSystemPop();
              const el = document.getElementById('atracoes-interactive-shelf');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="hover:text-pink-400 transition-colors cursor-pointer text-pink-400 flex items-center gap-1"
          >
            ATRAÇÕES <span className="h-1.5 w-1.5 rounded-full bg-pink-500 inline-block animate-ping"></span>
          </button>
          <button 
            onClick={() => {
              audio.playSystemPop();
              showNotification(lang === 'pt' ? 'Galeria de fotos mágicas vindo aí! 🌟' : 'Magical photo gallery coming soon! 🌟');
            }} 
            className="hover:text-pink-400 transition-colors cursor-pointer"
          >
            GALERIA
          </button>
          <button 
            onClick={() => {
              audio.playSystemPop();
              setActiveSidebarFilter('SHOWS');
              const el = document.getElementById('atracoes-interactive-shelf');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="hover:text-pink-400 transition-colors cursor-pointer"
          >
            EVENTOS
          </button>
          <button 
            onClick={() => {
              audio.playSystemPop();
              const el = document.getElementById('sales-landing-footer');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="hover:text-pink-400 transition-colors cursor-pointer"
          >
            CONTATO
          </button>
        </div>

        {/* Action Controls & Green glowing NEON Ticket button & Social accounts */}
        <div className="flex items-center gap-3">
          
          {/* Active sound loop toggle */}
          <button
            onClick={handleToggleSoundLoop}
            className={`p-2 rounded-full cursor-pointer transition-all border ${
              ambientActive
                ? 'bg-gradient-to-tr from-pink-600 to-purple-600 border-pink-400 text-white shadow-[0_0_10px_rgba(219,39,119,0.3)]'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
            title={lang === 'pt' ? 'Música Mágica' : 'Magic Music'}
          >
            {ambientActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Languages Selector */}
          <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-full border border-pink-500/20">
            {FLAG_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                onClick={() => onSelectLanguage?.(opt.code)}
                title={opt.label}
                className={`text-xs h-6 w-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  lang === opt.code
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-slate-405 opacity-60 hover:opacity-100 hover:scale-110'
                }`}
              >
                {opt.flag}
              </button>
            ))}
          </div>

          {/* COMPRE SEU INGRESSO - High glowing green pill button precisely matching the mockup */}
          <button
            onClick={() => {
              audio.playMagicChime();
              setIsTicketModalOpen(true);
            }}
            id="cover-compre-ingresso-btn"
            className="px-5 py-2.5 bg-[#76c205] hover:bg-[#86dd07] text-white text-xs font-fredoka font-black rounded-full shadow-[0_0_15px_rgba(118,194,5,0.7)] hover:shadow-[0_0_25px_rgba(118,194,5,1)] border-2 border-[#a0f413] hover:scale-105 active:scale-95 transition-all text-center tracking-wide flex items-center gap-1.5 cursor-pointer uppercase select-none"
          >
            <Ticket className="w-4.5 h-4.5 text-yellow-300 animate-pulse fill-yellow-300" />
            <span>COMPRE SEU INGRESSO</span>
          </button>

          {/* Social Icons precisely matching the top-right decoration */}
          <div className="hidden sm:flex items-center gap-2 ml-1 text-pink-400">
            <a 
              href="#instagram" 
              onClick={(e) => { e.preventDefault(); audio.playSystemPop(); showNotification('Instagram: @MundoMagicoParque'); }}
              className="text-sm bg-pink-950/50 hover:bg-pink-900 h-7 w-7 rounded-full flex items-center justify-center border border-pink-500/30 hover:scale-110 active:scale-90 transition-transform"
            >
              📸
            </a>
            <a 
              href="#facebook" 
              onClick={(e) => { e.preventDefault(); audio.playSystemPop(); showNotification('Facebook: Mundo Mágico'); }}
              className="text-sm bg-pink-950/50 hover:bg-pink-900 h-7 w-7 rounded-full flex items-center justify-center border border-pink-500/30 hover:scale-110 active:scale-90 transition-transform"
            >
              👥
            </a>
            <a 
              href="#youtube" 
              onClick={(e) => { e.preventDefault(); audio.playSystemPop(); showNotification('Youtube: Canal Mundo Mágico'); }}
              className="text-sm bg-pink-950/50 hover:bg-pink-900 h-7 w-7 rounded-full flex items-center justify-center border border-pink-500/30 hover:scale-110 active:scale-90 transition-transform"
            >
              📺
            </a>
          </div>

        </div>
      </nav>

      {/* 🚀 2. HERO LANDING BANNER: Beautifully customized to represent Mundo das Estorinhas with children-dragon illustration */}
      <section 
        id="hero-landing-banner" 
        className="relative w-full overflow-hidden border-b-4 border-pink-500/40 min-h-[580px] lg:min-h-[600px] flex items-center justify-center pt-8 pb-16 bg-gradient-to-b from-[#1b0235] via-[#09001b] to-[#120023]"
      >
        {/* Dynamic graphics illustration backdrop simulated via stunning visual layered elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          {/* Glowing central castle halo */}
          <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-indigo-500/10 rounded-full blur-[110px] pointer-events-none"></div>

          {/* Magical unicorns, fairies, and stars float decor in standard emoticons with beautiful soft bounces */}
          <div className="absolute top-[12%] left-[45%] text-[48px] filter drop-shadow-[0_10px_20px_rgba(236,72,153,0.6)] animate-pulse pointer-events-none opacity-40">✨</div>
          <div className="absolute bottom-[20%] left-[4%] text-[58px] filter drop-shadow-[0_10px_20px_rgba(168,85,247,0.7)] pointer-events-none opacity-30">👑</div>
          <div className="absolute bottom-[10%] right-[4%] text-[64px] filter drop-shadow-[0_10px_25px_rgba(59,130,246,0.6)] animate-pulse pointer-events-none opacity-30">⭐</div>
        </div>

        {/* Content alignment using high-fidelity split layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Text, Ribbon, Title and Buttons precisely matching mockup styles */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Tagline ribbon badge: Bem-vindo ao */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-purple-800 to-indigo-900 border-2 border-purple-400 text-purple-100 font-fredoka font-extrabold text-[11px] md:text-xs tracking-wider rounded-full uppercase shadow-[0_4px_12px_rgba(168,85,247,0.3)] select-none">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Bem-vindo ao</span>
            </div>

            {/* Giant Colorful Playful Branding */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-2"
            >
              <h1 className="text-3xl md:text-5xl font-fredoka font-black tracking-normal leading-tight select-none">
                <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] block uppercase">MUNDO DAS</span>
                <span className="text-[34px] md:text-[56px] font-sans font-black tracking-widest uppercase flex flex-wrap gap-[3px] mt-2 justify-center lg:justify-start">
                  <span className="text-orange-400 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]">E</span>
                  <span className="text-pink-500 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]">S</span>
                  <span className="text-lime-400 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]">T</span>
                  <span className="text-yellow-300 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]">O</span>
                  <span className="text-[#60A5FA] drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]">R</span>
                  <span className="text-orange-400 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]">I</span>
                  <span className="text-yellow-300 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]">N</span>
                  <span className="text-sky-400 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]">H</span>
                  <span className="text-[#FF66B2] drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]">A</span>
                  <span className="text-yellow-300 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]">S</span>
                </span>
              </h1>
            </motion.div>

            {/* Subtitle Playful description */}
            <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-lg select-none">
              Um universo mágico de histórias para sonhar, aprender e se divertir!
            </p>

            {/* Interactive Action Buttons: Todas Estorinhas & Favoritos (exactly as in the mockup) */}
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={() => {
                  audio.playMagicChime();
                  const el = document.getElementById('atracoes-interactive-shelf');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  showNotification(lang === 'pt' ? 'Conhecendo as estorinhas fantásticas!' : 'Exploring the book shelf!');
                }}
                className="px-7 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-fredoka font-black rounded-full border border-purple-400 shadow-[0_4px_15px_rgba(168,85,247,0.4)] hover:shadow-[0_4px_22px_rgba(168,85,247,0.6)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer uppercase select-none tracking-wider"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Todas Estorinhas</span>
              </button>

              <button
                onClick={() => {
                  audio.playMagicChime();
                  onEnterApp();
                  showNotification(lang === 'pt' ? 'Abrindo portal de favoritos das estorinhas!' : 'Opening the favorites bookshelf!');
                }}
                className="px-7 py-3.5 bg-white hover:bg-slate-100 text-slate-950 active:scale-95 transition-all text-xs font-fredoka font-black rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.15)] border-2 border-slate-200 flex items-center gap-2 cursor-pointer uppercase select-none tracking-wider"
              >
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span>Favoritos</span>
              </button>
            </div>

            {/* Call to action helper to enter standard 3D panel */}
            <div className="pt-2">
              <button
                onClick={() => {
                  audio.playMagicChime();
                  onEnterApp();
                }}
                className="text-[10px] md:text-xs font-fredoka font-black tracking-widest text-[#00FFFF] hover:scale-105 active:scale-95 transition-all hover:text-white uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <span>Acessar Sala das Estorinhas 3D</span>
                <ChevronRight className="w-4 h-4 animate-ping" />
              </button>
            </div>

          </div>

          {/* Right Column: High Fidelity curved illustrated layout of character dragon reading */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="relative w-full max-w-sm md:max-w-md aspect-[4/3] rounded-[2.5rem] p-1.5 bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 shadow-[0_15px_40px_rgba(168,85,247,0.45)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.65)] hover:scale-[1.02] transition-all overflow-hidden"
            >
              <div className="w-full h-full rounded-[2.35rem] overflow-hidden bg-slate-950 relative">
                <img 
                  src="/src/assets/images/pixar_dragon_castle_1780533703396.png" 
                  alt="Amiguinhos lendo um livro mágico com dragãozinho fofo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-105 saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none"></div>

                {/* Illustrated floating badge tag matching mockup details */}
                <div className="absolute bottom-4 left-4 bg-slate-950/85 backdrop-blur-md border border-pink-500/30 px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-md">
                  <span className="text-base leading-none">🐉</span>
                  <div>
                    <span className="text-[9px] uppercase font-fredoka font-black tracking-widest text-[#00FFFF] block">Pixar Illustrated</span>
                    <span className="text-[8px] text-slate-300 font-medium font-sans">Reino das Estorinhas</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 🚀 3. ATRAÇÕES & DESTAQUES AREA (Exactly matching bottom section layout of mockup) */}
      <section 
        id="atracoes-interactive-shelf" 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-10"
      >
        
        {/* Main section wrapper holding sidebar grid layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR ON THE LEFT - matched to the neon ATRAÇÕES sidebar list */}
          <div className="xl:col-span-3 space-y-4">
            <div className="bg-slate-900/80 border-2 border-pink-500 rounded-3xl overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.2)]">
              
              {/* Title tag */}
              <div className="bg-pink-600/20 border-b border-pink-500/20 py-4 px-5 text-center">
                <h4 className="text-sm font-fredoka font-black tracking-widest text-pink-400 flex items-center justify-center gap-1.5 uppercase leading-none">
                  <span>★</span>
                  <span>ATRAÇÕES</span>
                  <span>★</span>
                </h4>
              </div>

              {/* Interactive side listing */}
              <div className="p-2 space-y-1">
                {(['PRINCESAS', 'FADAS', 'UNICÓRNIOS', 'DUENDES', 'PIRATAS', 'SHOWS', 'GASTRONOMIA', 'LOJINHA'] as SidebarCategory[]).map((category) => {
                  const isActive = activeSidebarFilter === category;
                  
                  // Icons corresponding to categories
                  const icons: Record<string, string> = {
                    PRINCESAS: '👑',
                    FADAS: '🦋',
                    UNICÓRNIOS: '🌈',
                    DUENDES: '🍀',
                    PIRATAS: '☠️',
                    SHOWS: '🎵',
                    GASTRONOMIA: '🍿',
                    LOJINHA: '🛍️'
                  };

                  return (
                    <button
                      key={category}
                      onClick={() => {
                        audio.playSystemPop();
                        setActiveSidebarFilter(category);
                      }}
                      className={`w-full text-left font-fredoka font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl cursor-pointer transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-400 text-pink-300 shadow-md'
                          : 'hover:bg-slate-800 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{icons[category] || '★'}</span>
                        <span>{category}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

          {/* MAIN CENTRE SHELF CONTAINER - displaying interactive content according to the active filter */}
          <div className="xl:col-span-6 space-y-6">
            
            <AnimatePresence mode="wait">
              {activeSidebarFilter === 'ATRAÇÕES' || 
               activeSidebarFilter === 'PRINCESAS' || 
               activeSidebarFilter === 'FADAS' || 
               activeSidebarFilter === 'UNICÓRNIOS' || 
               activeSidebarFilter === 'PIRATAS' ? (
                
                <motion.div
                  key="main-cards-grid"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* CARD 1: PRINCESAS */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-900/80 border-2 border-pink-500 rounded-3xl overflow-hidden shadow-[0_5px_15px_rgba(236,72,153,0.15)] flex flex-col justify-between h-[380px]"
                  >
                    <div className="relative aspect-[16/10] bg-slate-950">
                      <img 
                        src="/src/assets/images/pixar_sereia_diamantes_1780571919544.png" 
                        alt="Princesas e Sereias"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter brightness-95"
                      />
                      <span className="absolute top-3 left-3 bg-pink-600 text-white font-fredoka font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-wider">
                        PRINCESAS
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between text-center space-y-2">
                      <div className="space-y-1">
                        <h4 className="text-md font-fredoka font-extrabold text-white">REINO DAS PRINCESAS</h4>
                        <p className="text-[11px] text-[#FFC0CB] font-bold">Entre nas águas calmas e mágicas das princesas sereias!</p>
                      </div>
                      <button
                        onClick={() => handleLaunchTargetStory('sereia-diamantes')}
                        className="py-2.5 w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-fredoka font-semibold rounded-xl text-xs uppercase cursor-pointer hover:brightness-110 active:scale-95 transition-all shadow-md"
                      >
                        CONHECER 🌟
                      </button>
                    </div>
                  </motion.div>

                  {/* CARD 2: FADAS */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-900/80 border-2 border-green-500 rounded-3xl overflow-hidden shadow-[0_5px_15px_rgba(34,197,94,0.15)] flex flex-col justify-between h-[380px]"
                  >
                    <div className="relative aspect-[16/10] bg-slate-950">
                      <img 
                        src="/src/assets/images/pixar_fadinha_oculos_1780092955819.png" 
                        alt="Fadinhas"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter brightness-95"
                      />
                      <span className="absolute top-3 left-3 bg-green-600 text-white font-fredoka font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-wider">
                        FADAS
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between text-center space-y-2">
                      <div className="space-y-1">
                        <h4 className="text-md font-fredoka font-extrabold text-white">REINO DAS FADAS</h4>
                        <p className="text-[11px] text-green-300 font-bold">Entre no reino das fadinhas e descubra um mundo de pura magia!</p>
                      </div>
                      <button
                        onClick={() => handleLaunchTargetStory('fadinha-oculos')}
                        className="py-2.5 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-slate-950 font-fredoka font-black rounded-xl text-xs uppercase cursor-pointer hover:brightness-110 active:scale-95 transition-all shadow-md"
                      >
                        EXPLORAR 🦋
                      </button>
                    </div>
                  </motion.div>

                  {/* CARD 3: UNICÓRNIOS */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-900/80 border-2 border-blue-500 rounded-3xl overflow-hidden shadow-[0_5px_15px_rgba(59,130,246,0.15)] flex flex-col justify-between h-[380px]"
                  >
                    <div className="relative aspect-[16/10] bg-slate-950">
                      <img 
                        src="/src/assets/images/pixar_unicornio_pintor_1780571807742.png" 
                        alt="Unicórnios"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter brightness-95"
                      />
                      <span className="absolute top-3 left-3 bg-blue-600 text-white font-fredoka font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-wider">
                        UNICÓRNIOS
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between text-center space-y-2">
                      <div className="space-y-1">
                        <h4 className="text-md font-fredoka font-extrabold text-white">UNICÓRNIOS DE DESIGN</h4>
                        <p className="text-[11px] text-blue-300 font-bold">Conheça o unicórnio mais fofinho em um lugar cheio de encantos!</p>
                      </div>
                      <button
                        onClick={() => handleLaunchTargetStory('unicornio-pintor')}
                        className="py-2.5 w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white font-fredoka font-semibold rounded-xl text-xs uppercase cursor-pointer hover:brightness-110 active:scale-95 transition-all shadow-md"
                      >
                        VER MAIS 🌈
                      </button>
                    </div>
                  </motion.div>

                  {/* CARD 4: PIRATAS */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-900/80 border-2 border-teal-500 rounded-3xl overflow-hidden shadow-[0_5px_15px_rgba(20,184,166,0.15)] flex flex-col justify-between h-[380px]"
                  >
                    <div className="relative aspect-[16/10] bg-slate-950">
                      <img 
                        src="/src/assets/images/pixar_bau_flutuante_1780571906470.png" 
                        alt="Piratas e Tesouros"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter brightness-95"
                      />
                      <span className="absolute top-3 left-3 bg-teal-600 text-white font-fredoka font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-wider">
                        PIRATAS
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between text-center space-y-2">
                      <div className="space-y-1">
                        <h4 className="text-md font-fredoka font-extrabold text-white">REINO DOS PIRATAS</h4>
                        <p className="text-[11px] text-teal-300 font-bold">Embarque nessa aventura pirata e procure o tesouro precioso!</p>
                      </div>
                      <button
                        onClick={() => handleLaunchTargetStory('bau-flutuante')}
                        className="py-2.5 w-full bg-gradient-to-r from-teal-550 to-emerald-600 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-fredoka font-semibold rounded-xl text-xs uppercase cursor-pointer hover:brightness-110 active:scale-95 transition-all shadow-md"
                      >
                        AVENTURAR-SE ☠️
                      </button>
                    </div>
                  </motion.div>
                </motion.div>

              ) : activeSidebarFilter === 'DUENDES' ? (
                
                <motion.div
                  key="duendes-content"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-900/90 border-2 border-emerald-500 rounded-3xl p-6 text-center space-y-4"
                >
                  <div className="text-5xl">🍀🍄</div>
                  <h3 className="text-xl font-fredoka font-black text-emerald-400">VALE DOS DUENDES</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Nossos duendes ajudantes estão trabalhando na oficina de brinquedos para a festa das luzes! Venha conhecer essa historinha mágica de cochilo!
                  </p>
                  
                  <div className="inline-block relative rounded-2xl overflow-hidden aspect-video w-full max-w-sm border border-emerald-500/30">
                    <img 
                      src="/src/assets/images/pixar_elfo_brinquedos_1780571832051.png" 
                      alt="Oficina de Duendes"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <button
                      onClick={() => handleLaunchTargetStory('elfo-brinquedos')}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-fredoka font-black text-xs uppercase rounded-xl cursor-pointer"
                    >
                      Ouvir Elfo dos Brinquedos 🪐
                    </button>
                  </div>
                </motion.div>

              ) : activeSidebarFilter === 'SHOWS' ? (
                
                <motion.div
                  key="shows-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-900/90 border-2 border-pink-500 rounded-3xl p-6 space-y-4"
                >
                  <div className="text-5xl text-center">🎤🎟️</div>
                  <h3 className="text-xl font-fredoka font-black text-pink-400 text-center uppercase">CONCERTO DE DESTAQUES</h3>
                  <p className="text-xs text-slate-300 leading-relaxed text-center">
                    Venha cantar com os personagens! Adquira o passaporte e acompanhe os desfiles diários pelas ruas cintilantes do reino!
                  </p>

                  <div className="space-y-2 border-t border-slate-800 pt-4 font-fredoka">
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-pink-500/20 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-yellow-300 block">15:00 - DESFILE ENCANTADO</span>
                        <span className="text-slate-400 font-medium">Rotatória do Castelo</span>
                      </div>
                      <button 
                        onClick={() => { audio.playMagicChime(); showNotification('Lembrete de Alarme Definido! 🔔'); }}
                        className="p-1.5 px-3 bg-pink-600 text-white font-black rounded-lg text-[9px] hover:scale-105"
                      >
                        ALERTA 🔔
                      </button>
                    </div>

                    <div className="bg-slate-950/60 p-3 rounded-xl border border-pink-500/20 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-pink-400 block">18:30 - CONTO DOS ANIMAIS</span>
                        <span className="text-slate-400 font-medium">Palco do Lago Azul</span>
                      </div>
                      <button 
                        onClick={() => { audio.playMagicChime(); showNotification('Alarme do Concerto Ativado! 🌸'); }}
                        className="p-1.5 px-3 bg-pink-600 text-white font-black rounded-lg text-[9px] hover:scale-105"
                      >
                        ALERTA 🔔
                      </button>
                    </div>
                  </div>
                </motion.div>

              ) : activeSidebarFilter === 'GASTRONOMIA' ? (
                
                <motion.div
                  key="gastronomia-content"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-900/90 border-2 border-yellow-500 rounded-3xl p-6 space-y-4"
                >
                  <div className="text-5xl text-center">🍿🥞</div>
                  <h3 className="text-xl font-fredoka font-black text-yellow-400 text-center uppercase">CONFEITARIA UNICÓRNIO</h3>
                  <p className="text-xs text-slate-300 leading-relaxed text-center">
                    Crie virtualmente a sua receita favorita para lanchas e ganhe pontos adicionais de leitura saudável! Selecione até 3 ingredientes maravilhosos:
                  </p>

                  <div className="flex items-center justify-center gap-3 py-2">
                    {['🍎', '🍿', '🧪', '🐝', '🍯'].map((ing) => (
                      <button
                        key={ing}
                        onClick={() => handleAddGastronomyIngredient(ing)}
                        className={`text-2xl h-12 w-12 rounded-xl flex items-center justify-center transition-transform hover:scale-115 active:scale-90 border cursor-pointer ${
                          candyPotIngredients.includes(ing) ? 'bg-yellow-950 border-yellow-400' : 'bg-slate-950 border-slate-800'
                        }`}
                      >
                        {ing}
                      </button>
                    ))}
                  </div>

                  {candyPotIngredients.length > 0 && (
                    <div className="bg-slate-950/60 p-3.5 rounded-2xl text-center border border-yellow-500/20 text-xs">
                      <span className="block text-slate-400 font-bold uppercase text-[9px]">Ingredientes no Caldeirão:</span>
                      <span className="text-lg font-bold block mt-1">{candyPotIngredients.join(' + ')}</span>
                      
                      <button
                        onClick={handleBakeGastronomyDish}
                        disabled={isCookingBaking}
                        className="mt-3 px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 font-fredoka font-black text-xs uppercase rounded-xl disabled:opacity-50"
                      >
                        {isCookingBaking ? 'Misturando Magia...' : 'Cozinhar Prato! ✨'}
                      </button>
                    </div>
                  )}

                  {bakingResult && (
                    <div className="bg-yellow-950/40 p-3.5 rounded-2xl text-center border-2 border-yellow-400 text-xs font-semibold text-yellow-250 animate-bounce">
                      <span>🎉 Seu prato ficou pronto: <strong>{bakingResult}</strong> Let’s play!</span>
                    </div>
                  )}
                </motion.div>

              ) : (
                
                <motion.div
                  key="lojinha-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-900/90 border-2 border-blue-500 rounded-3xl p-6 space-y-4"
                >
                  <div className="text-5xl text-center">🛍️🧸</div>
                  <h3 className="text-xl font-fredoka font-black text-blue-400 text-center uppercase">LOJINHA DE BRINQUEDOS</h3>
                  <p className="text-xs text-slate-300 leading-relaxed text-center">
                    Use as estrelas virtuais que você acumulou lendo historinhas para desbloquear estes lindos mimos digitais:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-4">
                    {[
                      { name: 'Pelúcia Unicórnio 🦄', cost: 10, icon: '🦄' },
                      { name: 'Luneta do Pirata 🔭', cost: 15, icon: '🔭' },
                      { name: 'Coroa de Fada 👑', cost: 20, icon: '👑' }
                    ].map((toy) => {
                      const isBought = unlockedLojinhaToys.includes(toy.name);
                      return (
                        <div key={toy.name} className="bg-slate-950/60 p-3.5 rounded-2xl border border-blue-500/20 flex flex-col items-center text-center justify-between">
                          <span className="text-2xl">{toy.icon}</span>
                          <span className="text-[10px] font-fredoka block text-white font-bold mt-1 leading-tight">{toy.name}</span>
                          
                          <button
                            onClick={() => handleBuyVirtualToy(toy.name, toy.cost)}
                            className={`w-full mt-2.5 py-1.5 rounded-xl font-fredoka font-bold text-[9px] uppercase cursor-pointer transition-colors ${
                              isBought 
                                ? 'bg-slate-800 text-slate-500' 
                                : 'bg-blue-600 hover:bg-blue-500 text-white'
                            }`}
                          >
                            {isBought ? 'Adquirido ✓' : `Resgatar (${toy.cost} ★)`}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* DESTAQUES PANEL ON THE RIGHT - precisely representing the mockup's highlights side card */}
          <div className="xl:col-span-3 space-y-4">
            
            <div className="bg-[#0b031b] border-2 border-pink-500/80 rounded-3xl p-6 shadow-[0_0_20px_rgba(236,72,153,0.18)]" style={{ borderStyle: 'dotted' }}>
              
              {/* Star-paired title matching exactly */}
              <div className="text-center pb-5">
                <h4 className="text-md font-fredoka font-black text-pink-400 tracking-wider flex items-center justify-center gap-1.5 uppercase leading-none">
                  <span>★</span>
                  <span>DESTAQUES</span>
                  <span>★</span>
                </h4>
              </div>

              {/* Showcase items list precisely modeled */}
              <div className="space-y-4 font-fredoka">
                
                {/* Highlights item 1 */}
                <div 
                  onClick={() => {
                    audio.playMagicChime();
                    setSelectedAtractionDetail(lang === 'pt' ? 'Roda Gigante Mágica: Oferece a melhor vista de todo o castelo e as luzes!' : 'Magical Ferris Wheel: Offers the best view of the castle!');
                  }}
                  className="bg-slate-900/60 p-3 border border-pink-500/20 rounded-2xl hover:bg-slate-800/80 transition-all cursor-pointer flex gap-3 group items-center"
                >
                  <div className="h-10 w-10 bg-pink-950 rounded-xl flex items-center justify-center text-lg shrink-0 border border-pink-500/30 group-hover:rotate-12 transition-transform select-none">
                    🎡
                  </div>
                  <div className="text-left leading-tight">
                    <span className="text-xs font-extrabold text-white block uppercase">RODA GIGANTE</span>
                    <span className="text-[10px] text-pink-300 font-medium">A vista mais incrível do parque!</span>
                  </div>
                </div>

                {/* Highlights item 2 */}
                <div 
                  onClick={() => {
                    audio.playSystemPop();
                    // Spooky sound hint
                    showNotification('Uuuuuuhuhhhhh! Barulho fantasma ecoou! 👻🔊');
                    setSelectedAtractionDetail(lang === 'pt' ? 'Navio Fantasma: Um labirinto submarino com tesouros que flutuam' : 'Phantom Ship: A submarine maze with floating coins!');
                  }}
                  className="bg-slate-900/60 p-3 border border-pink-500/20 rounded-2xl hover:bg-slate-800/80 transition-all cursor-pointer flex gap-3 group items-center"
                >
                  <div className="h-10 w-10 bg-purple-950 rounded-xl flex items-center justify-center text-lg shrink-0 border border-purple-500/30 group-hover:scale-110 transition-transform select-none">
                    👻
                  </div>
                  <div className="text-left leading-tight">
                    <span className="text-xs font-extrabold text-white block uppercase">NAVIO FANTASMA</span>
                    <span className="text-[10px] text-purple-300 font-medium">Coragem para encarar essa aventura?</span>
                  </div>
                </div>

                {/* Highlights item 3 */}
                <div 
                  onClick={() => {
                    audio.playMagicChime();
                    showNotification('O desfile começará em instantes! ✨🌟');
                    setSelectedAtractionDetail(lang === 'pt' ? 'Desfile Mágico: Todas as fadas, bruxos e duendes dançando juntos!' : 'Magic Parade: Fairies and elves dancing together!');
                  }}
                  className="bg-slate-900/60 p-3 border border-pink-500/20 rounded-2xl hover:bg-slate-800/80 transition-all cursor-pointer flex gap-3 group items-center"
                >
                  <div className="h-10 w-10 bg-yellow-950 rounded-xl flex items-center justify-center text-lg shrink-0 border border-yellow-500/30 group-hover:rotate-45 transition-transform select-none">
                    ✨
                  </div>
                  <div className="text-left leading-tight">
                    <span className="text-xs font-extrabold text-white block uppercase">DESFILE MÁGICO</span>
                    <span className="text-[10px] text-yellow-300 font-medium">Um espetáculo inesquecível!</span>
                  </div>
                </div>

                {/* VER TODOS Lime green button matching precisely */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      audio.playMagicChime();
                      setSelectedAtractionDetail(
                        lang === 'pt' 
                          ? 'Mundo Mágico abriga a Roda Gigante, Navio Pirata Fantasma, Desfiles Noturnos com Sparkles de Luzes, Castelos Interativos e Floresta Encantada dos Sonhos!' 
                          : 'Magic World hosts the Ferris wheel, Submarine Ghost ship, Nightly neon coordinate parades, and enchanted fairy woods!'
                      );
                    }}
                    className="w-full py-3 bg-[#76c205] hover:bg-[#86dd07] text-white text-xs font-bold rounded-xl border border-[#a0f413] cursor-pointer shadow-md text-center uppercase tracking-wider"
                  >
                    VER TODOS
                  </button>
                </div>

              </div>

            </div>

            {/* Simulated modal detail block when clicking on highlights */}
            <AnimatePresence>
              {selectedAtractionDetail && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-slate-950 border border-pink-500/30 p-4.5 rounded-2xl space-y-3 font-fredoka relative shadow-lg"
                >
                  <h5 className="text-xs font-black text-pink-400 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                    <Info className="w-4 h-4 text-pink-400" />
                    <span>Detalhe da Atração</span>
                  </h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-semibold">{selectedAtractionDetail}</p>
                  <button
                    onClick={() => { audio.playSystemPop(); setSelectedAtractionDetail(null); }}
                    className="text-[9px] text-[#00FFFF] border border-[#00FFFF]/30 hover:border-[#00FFFF] px-2.5 py-1 rounded-md uppercase font-black"
                  >
                    Entendido
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* 🚀 4. SPECIAL BOTTOM PROMOTIONAL BANNERS precisely matching bottom section row of mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          
          {/* BANNER A: PROMOÇÃO ESPECIAL! with gift box */}
          <div className="bg-gradient-to-r from-purple-950/70 via-indigo-950/70 to-slate-900 border-2 border-pink-500/80 rounded-[2.25rem] p-6 flex flex-col sm:flex-row items-center gap-5 shadow-[0_5px_15px_rgba(236,72,153,0.15)] text-center sm:text-left">
            <div className="h-16 w-16 bg-pink-900/40 rounded-full flex items-center justify-center text-3.5xl border border-pink-500/30 shrink-0 select-none animate-bounce">
              🎁
            </div>
            <div className="space-y-3 flex-1">
              <div>
                <span className="text-[13px] font-fredoka font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300 uppercase block tracking-wider">
                  PROMOÇÃO ESPECIAL!
                </span>
                <p className="text-[11px] text-slate-300 font-semibold font-sans mt-0.5 leading-tight">
                  Garanta já seu ingresso com desconto e viva momentos mágicos!
                </p>
              </div>
              <button
                onClick={() => {
                  audio.playMagicChime();
                  setIsTicketModalOpen(true);
                }}
                className="px-6 py-2 bg-[#76c205] hover:bg-[#86dd07] text-white text-[10px] font-fredoka font-black rounded-lg uppercase tracking-wider cursor-pointer shadow border border-[#a0f413]"
              >
                APROVEITAR
              </button>
            </div>
          </div>

          {/* BANNER B: RECEBA NOVIDADES newsletter form preciesly matched */}
          <div className="bg-gradient-to-b from-slate-900 to-purple-950/40 border-2 border-pink-500/80 rounded-[2.25rem] p-6 flex flex-col justify-between shadow-[0_5px_15px_rgba(236,72,153,0.15)] text-center sm:text-left">
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="h-12 w-12 bg-pink-900/40 rounded-full flex items-center justify-center text-2xl border border-pink-500/30 shrink-0 select-none">
                ✉️
              </div>
              <div className="leading-tight">
                <span className="text-[13px] font-fredoka font-black text-pink-400 uppercase block tracking-wider">
                  RECEBA NOVIDADES
                </span>
                <p className="text-[11px] text-slate-300 font-semibold font-sans mt-0.5">
                  Cadastre seu e-mail e fique por dentro de todas as novidades e promoções!
                </p>
              </div>
            </div>

            {/* Real form */}
            <form onSubmit={handleNewsletterSubmit} className="mt-4 flex flex-col sm:flex-row items-center gap-2">
              <input 
                type="text"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={isEmailSubmitted ? "E-mail cadastrado!" : "Seu melhor e-mail"}
                disabled={isEmailSubmitted}
                className="w-full bg-slate-950 border border-pink-500/30 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                disabled={isEmailSubmitted}
                className="w-full sm:w-auto px-6 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-fredoka font-black text-xs uppercase rounded-xl cursor-pointer disabled:opacity-50 inline-block shrink-0"
              >
                ENVIAR
              </button>
            </form>

          </div>

        </div>

      </section>

      {/* 🚀 5. FOOTER FEATURES Precisely representing page footer features of mock */}
      <footer 
        id="sales-landing-footer" 
        className="relative z-10 w-full mt-10 border-t border-pink-500/20 bg-[#070114]/95 pt-8 pb-10"
      >
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          
          {/* Feature Badge List cleanly spaced */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-b border-pink-505 border-b border-pink-500/10 text-center font-fredoka">
            
            {/* Feature 1 */}
            <div className="flex items-center justify-center gap-2 px-3 py-2 border border-pink-500/10 rounded-2xl bg-slate-950/40">
              <span className="text-green-400">🛡️</span>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-200">AMBIENTE SEGURO</span>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center justify-center gap-2 px-3 py-2 border border-pink-500/10 rounded-2xl bg-slate-950/40">
              <span className="text-green-400">😊</span>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-200">DIVERSÃO GARANTIDA</span>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center justify-center gap-2 px-3 py-2 border border-pink-500/10 rounded-2xl bg-slate-950/40">
              <span className="text-green-400">📸</span>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-200">LUGARES INSTAGRAMÁVEIS</span>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center justify-center gap-2 px-3 py-2 border border-pink-500/10 rounded-2xl bg-slate-950/40">
              <span className="text-green-400">👥</span>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-200">PARA TODA A FAMÍLIA</span>
            </div>

          </div>

          {/* Copyright description */}
          <div className="text-center font-sans space-y-2">
            <p className="text-[11px] text-pink-300/60 leading-normal uppercase select-all font-bold">
              © 2026 MUNDO MÁGICO INC. - AVENTURA SEM FIM - Todos os direitos reservados.
            </p>
            <p className="text-[9px] text-[#A297FF] max-w-lg mx-auto font-medium">
              Desenvolvido com carinho para inspirar e divertir crianças no sono, no aprendizado precoce, e na alfabetização através dos sete mares da literatura 3D maravilhosa!
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};
