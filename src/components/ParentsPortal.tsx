import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Check, 
  ShieldCheck, 
  X, 
  Sparkles, 
  Trophy, 
  Clock, 
  User, 
  BarChart2, 
  Volume2, 
  Lock, 
  RefreshCw, 
  Moon, 
  Award,
  BookOpen,
  FlaskConical,
  Flame,
  Heart
} from 'lucide-react';
import { Language } from '../types';
import { APP_TRANSLATIONS } from '../data/stories';
import { audio } from './AudioEngine';
import { PaypalSubscribeButton } from './PaypalSubscribeButton';
import { ReadingActivityChart } from './ReadingActivityChart';

interface ParentsPortalProps {
  lang: Language;
  onClose: () => void;
  isPremium: boolean;
  onUpgradeSuccess: () => void;
  onDowngrade?: () => void; // Support sandbox testing revert
  childProfile?: { name: string; avatar: string; age?: string };
  onUpdateProfile?: (profile: { name: string; avatar: string; age?: string }) => void;
  bedtimeMinutes?: number;
  onUpdateBedtimeMinutes?: (mins: number) => void;
}

type TabType = 'subscription' | 'bedtime' | 'stats' | 'profile' | 'soundscapes';

export const ParentsPortal: React.FC<ParentsPortalProps> = ({
  lang,
  onClose,
  isPremium: initialIsPremium,
  onUpgradeSuccess,
  onDowngrade,
  childProfile: propChildProfile,
  onUpdateProfile,
  bedtimeMinutes: propBedtimeMinutes,
  onUpdateBedtimeMinutes,
}) => {
  const t = APP_TRANSLATIONS[lang];

  // Kids guard state (math puzzle)
  const [numA] = useState(() => Math.floor(Math.random() * 8) + 3); // 3 to 10
  const [numB] = useState(() => Math.floor(Math.random() * 7) + 3); // 3 to 9
  const correctAnswer = numA * numB;
  const [parentAnswer, setParentAnswer] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');

  // Active tabs
  const [activeTab, setActiveTab] = useState<TabType>('subscription');

  // Checkout states
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // States synchronized to localStorage
  const [isPremium, setIsPremiumState] = useState(initialIsPremium);
  const [childProfile, setLocalChildProfile] = useState(() => {
    if (propChildProfile) return propChildProfile;
    try {
      const saved = localStorage.getItem('estorinhas_child_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { name: 'Amiguinho', avatar: '🦄', age: '4-6' };
  });

  const [bedtimeMinutes, setLocalBedtimeMinutes] = useState(() => {
    if (propBedtimeMinutes !== undefined) return propBedtimeMinutes;
    return Number(localStorage.getItem('estorinhas_bedtime_minutes') || '0');
  });

  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('estorinhas_kids_stats');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Simulated realistic default stats
    return {
      totalStoriesRead: 4,
      totalStars: 4,
      totalMinutes: 28,
      lastReadDate: new Date().toLocaleDateString('pt-BR')
    };
  });

  const [activeSoundscape, setActiveSoundscape] = useState(() => {
    return localStorage.getItem('estorinhas_soundscape_style') || 'celestial';
  });

  // Verify core gate puzzle response
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const ans = parseInt(parentAnswer.trim());
    if (ans === correctAnswer) {
      audio.playMagicChime();
      setIsUnlocked(true);
      setErrorText('');
      setSuccessText(t.correctAnswer);
    } else {
      audio.stopSpeech();
      setIsUnlocked(false);
      setErrorText(t.incorrectAnswer);
    }
  };

  // Simulate premium CC checkout sequence
  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !cardExpiry || !cardCVV) {
      setErrorText(lang === 'pt' ? 'Por favor, preencha todos os campos do cartão mágico!' : 'Please fill all magic card fields!');
      return;
    }

    setIsPaying(true);
    setErrorText('');
    audio.playSystemPop();

    setTimeout(() => {
      setIsPaying(false);
      setIsPremiumState(true);
      audio.playMagicChime();
      onUpgradeSuccess();
      setSuccessText(t.premiumUnlockSuccess);
      setActiveTab('profile'); // guide them to make child profile
    }, 1800);
  };

  // Quick sandbox activate bypass for developer review
  const handleQuickBypassPremium = (activate: boolean) => {
    audio.playMagicChime();
    if (activate) {
      setIsPremiumState(true);
      onUpgradeSuccess();
      setSuccessText(lang === 'pt' ? 'Membro Premium Ativado via Painel de Testes!' : 'Premium mode activated via testing sandbox!');
    } else {
      setIsPremiumState(false);
      localStorage.setItem('mundo_estorinhas_premium_new', 'false');
      onDowngrade?.();
      setSuccessText(lang === 'pt' ? 'Modo Premium desativado para testes de bloqueio.' : 'Premium mode disabled for locking checks.');
    }
  };

  // Save localized profile updates
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('estorinhas_child_profile', JSON.stringify(childProfile));
      if (onUpdateProfile) onUpdateProfile(childProfile);
      audio.playMagicChime();
      setSuccessText(lang === 'pt' ? 'Perfil do pequeno leitor atualizado com sucesso!' : 'Little reader profile updated successfully!');
    } catch (e) {
      setErrorText('Error saving profile');
    }
  };

  // Save sleeping time limit configuration
  const handleSaveBedtime = (minutes: number) => {
    try {
      audio.playSystemPop();
      setLocalBedtimeMinutes(minutes);
      localStorage.setItem('estorinhas_bedtime_minutes', String(minutes));
      
      if (minutes > 0) {
        const endTime = Date.now() + minutes * 60 * 1000;
        localStorage.setItem('estorinhas_bedtime_end_time', String(endTime));
      } else {
        localStorage.removeItem('estorinhas_bedtime_end_time');
      }

      if (onUpdateBedtimeMinutes) onUpdateBedtimeMinutes(minutes);
      setSuccessText(
        minutes > 0 
          ? (lang === 'pt' ? `Cronômetro do sono ativo para parar em ${minutes} minutos 💤` : `Sleep timer active for automatic sleep in ${minutes} minutes 💤`)
          : (lang === 'pt' ? 'Limite de leitura desativado.' : 'Reading bedtime limit disabled.')
      );
    } catch (e) {}
  };

  // Soundscape style updates
  const handleSelectSoundscape = (style: string) => {
    audio.playSystemPop();
    setActiveSoundscape(style);
    localStorage.setItem('estorinhas_soundscape_style', style);
    setSuccessText(lang === 'pt' ? `Ambiente sonoro alterado para: ${style === 'celestial' ? 'Celestial Chords' : style === 'floresta' ? 'Floresta Secreta' : style === 'chuva' ? 'Nuvem de Chuva' : 'Espaço Sideral'}!` : `Soundscape altered to: ${style}!`);
  };

  return (
    <div id="parents-portal-container" className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-[#0B0D0A]/90 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        className="relative w-full max-w-3xl bg-[#141A10] border-2 border-[#34422F] text-white rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)] flex flex-col"
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-[#8FA88B] via-[#5D7A58] to-[#45573E] p-5 text-white font-bold flex justify-between items-center border-b border-[#34422F] md:p-6 select-none">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-white" />
            <div>
              <h2 className="text-lg md:text-xl font-sans tracking-tight font-black uppercase text-white">{t.parentsArea}</h2>
              <span className="text-[10px] md:text-xs text-white/85 font-extrabold tracking-wide block">Configurações Avançadas e Portal Premium</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 cursor-pointer hover:bg-white/10 rounded-full transition-all text-white"
            aria-label={t.close}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Portal core contents container */}
        <div className="p-4 md:p-8 overflow-y-auto max-h-[80vh] min-h-[460px] bg-[#1D271A]">
          
          {errorText && (
            <div className="mb-4 p-3 bg-red-950/80 border border-red-800 text-red-150 text-xs font-bold rounded-2xl flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorText}</span>
            </div>
          )}

          {successText && (
            <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-100 text-xs font-bold rounded-2xl flex items-center gap-2">
              <span>🌟✨</span>
              <span>{successText}</span>
            </div>
          )}

          {!isUnlocked ? (
            /* Portal Guardian Math Challenge for kids safety */
            <div className="text-center py-8 text-slate-100 max-w-md mx-auto">
              <div className="text-5xl mb-4 animate-bounce">🔮</div>
              <h3 className="text-lg font-fredoka font-bold text-white mb-2">{t.safetyMathTitle}</h3>
              <p className="text-xs md:text-sm text-[#C2D9C2] leading-relaxed mb-6 font-semibold">
                {t.safetyMathDesc}
              </p>

              <form onSubmit={handleVerify} className="space-y-4">
                <div className="bg-[#141A10] p-6 rounded-2xl border border-[#34422F] shadow-inner">
                  <span className="text-[9px] font-black text-[#8FA88B] block tracking-widest uppercase mb-1">Cálculo de Verificação de Adultos</span>
                  <p className="text-3xl font-mono text-[#FFCC00] font-black tracking-widest">
                    {numA} × {numB} = ?
                  </p>
                </div>

                <div>
                  <input
                    type="number"
                    value={parentAnswer}
                    onChange={(e) => setParentAnswer(e.target.value)}
                    placeholder={lang === 'pt' ? "Digite o resultado" : "Enter correct answer"}
                    required
                    autoFocus
                    className="w-full text-center px-4 py-3 border-2 border-[#8FA88B] bg-[#141A10] rounded-2xl text-lg font-bold text-white focus:outline-none focus:ring-4 focus:ring-[#8FA88B]/30 placeholder-slate-600 block"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#8FA88B] via-[#5D7A58] to-[#45573E] font-extrabold text-white text-xs rounded-2xl shadow-[0_6px_0_#2B3527] hover:translate-y-0.5 hover:shadow-[0_4px_0_#2B3527] active:translate-y-1.5 active:shadow-none transition-all tracking-widest border-b-4 border-b-[#2B3527] uppercase cursor-pointer"
                >
                  Entrar no Portal de Controle 🚀
                </button>
              </form>
            </div>
          ) : (
            /* Fully custom tab navigation layout of the parents portal */
            <div className="flex flex-col gap-6 md:flex-row items-stretch">
              {/* Left sidebar responsive list tabs */}
              <div className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-[#34422F]/30 pr-0 md:pr-4 select-none scrollbar-none">
                <button
                  onClick={() => { audio.playSystemPop(); setActiveTab('subscription'); }}
                  className={`px-4 py-3 rounded-xl text-xs font-bold cursor-pointer text-left flex items-center gap-2 w-full whitespace-nowrap transition-all shrink-0 ${
                    activeTab === 'subscription'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 font-black text-white shadow-md'
                      : 'bg-[#1D271A]/40 hover:bg-[#283624] border border-[#34422F] text-slate-300'
                  }`}
                >
                  <Trophy className="w-4 h-4 text-yellow-400 animate-pulse shrink-0" />
                  <span>👑 Plano celestial</span>
                </button>

                <button
                  onClick={() => { 
                    audio.playSystemPop(); 
                    if (!isPremium) {
                      setSuccessText(lang === 'pt' ? 'Recurso Premium! Por favor, assine o Plano Celestial abaixo ou use o botão de testes.' : 'Premium Feature! Please unlock subscription below or use demo button.');
                      setActiveTab('subscription');
                    } else {
                      setActiveTab('bedtime'); 
                    }
                  }}
                  className={`px-4 py-3 rounded-xl text-xs font-bold cursor-pointer text-left flex items-center gap-2 justify-between w-full whitespace-nowrap transition-all shrink-0 ${
                    activeTab === 'bedtime'
                      ? 'bg-gradient-to-r from-[#8FA88B] to-[#5D7A58] font-black text-white shadow-md'
                      : 'bg-[#141A10]/45 hover:bg-[#1C2517] border border-[#34422F] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-lime-400 shrink-0" />
                    <span>⏰ Limite de Sono</span>
                  </div>
                  {!isPremium && <Lock className="w-3 h-3 text-amber-500 shrink-0" />}
                </button>

                <button
                  onClick={() => { 
                    audio.playSystemPop(); 
                    if (!isPremium) {
                      setSuccessText(lang === 'pt' ? 'Relatório Premium de Leitura! Assine o plano celestial para abrir.' : 'Premium Reading Report! Subscribe to Celestial access to unlock.');
                      setActiveTab('subscription');
                    } else {
                      setActiveTab('stats'); 
                    }
                  }}
                  className={`px-4 py-3 rounded-xl text-xs font-bold cursor-pointer text-left flex items-center gap-2 justify-between w-full whitespace-nowrap transition-all shrink-0 ${
                    activeTab === 'stats'
                      ? 'bg-gradient-to-r from-[#8FA88B] to-[#5D7A58] font-black text-white shadow-md'
                      : 'bg-[#141A10]/45 hover:bg-[#1C2517] border border-[#34422F] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-lime-400 shrink-0" />
                    <span>📊 Relatório Leitor</span>
                  </div>
                  {!isPremium && <Lock className="w-3 h-3 text-amber-500 shrink-0" />}
                </button>

                <button
                  onClick={() => { 
                    audio.playSystemPop(); 
                    if (!isPremium) {
                      setSuccessText(lang === 'pt' ? 'Gerenciador de Perfil do Pequeno Leitor é Premium!' : 'Little Reader Profile customization is Premium!');
                      setActiveTab('subscription');
                    } else {
                      setActiveTab('profile'); 
                    }
                  }}
                  className={`px-4 py-3 rounded-xl text-xs font-bold cursor-pointer text-left flex items-center gap-2 justify-between w-full whitespace-nowrap transition-all shrink-0 ${
                    activeTab === 'profile'
                      ? 'bg-gradient-to-r from-[#8FA88B] to-[#5D7A58] font-black text-white shadow-md'
                      : 'bg-[#141A10]/45 hover:bg-[#1C2517] border border-[#34422F] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#8FA88B] shrink-0" />
                    <span>👦 Perfil Infantil</span>
                  </div>
                  {!isPremium && <Lock className="w-3 h-3 text-amber-500 shrink-0" />}
                </button>

                <button
                  onClick={() => { 
                    audio.playSystemPop(); 
                    if (!isPremium) {
                      setSuccessText(lang === 'pt' ? 'Som Mágico e Sonoplastia é Premium!' : 'Fairy Soundboard is Premium!');
                      setActiveTab('subscription');
                    } else {
                      setActiveTab('soundscapes'); 
                    }
                  }}
                  className={`px-4 py-3 rounded-xl text-xs font-bold cursor-pointer text-left flex items-center gap-2 justify-between w-full whitespace-nowrap transition-all shrink-0 ${
                    activeTab === 'soundscapes'
                      ? 'bg-gradient-to-r from-[#8FA88B] to-[#5D7A58] font-black text-white shadow-md'
                      : 'bg-[#141A10]/45 hover:bg-[#1C2517] border border-[#34422F] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>🎵 Sons Mágicos</span>
                  </div>
                  {!isPremium && <Lock className="w-3 h-3 text-amber-500 shrink-0" />}
                </button>
              </div>

              {/* Right content viewpane */}
              <div className="flex-1 bg-[#1D271A] p-5 rounded-2xl border border-[#34422F] min-h-[360px] flex flex-col justify-between">
                
                {/* 1. Tab - Subscriptions / Status */}
                {activeTab === 'subscription' && (
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <h3 className="text-base font-fredoka font-bold text-[#FFCC00] flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} /> 
                        {lang === 'pt' ? "Painel de Assinatura" : "Subscription Hub"}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        {lang === 'pt' ? "Controle de ativação celestial. Desbloqueie todas as historinhas e destaque automatizado de palavras." : "Unlock the complete kid literature database with automated vocal highlights and audio effects."}
                      </p>
                    </div>

                    {isPremium ? (
                      /* Active Member Banner */
                      <div className="bg-[#241B03] border-2 border-[#E5A93C] p-5 rounded-2xl flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">👑</div>
                          <div>
                            <span className="text-[9px] font-black uppercase text-amber-400 tracking-widest block">Membro Ativo</span>
                            <h4 className="text-sm font-sans font-black text-amber-300">{lang === 'pt' ? 'ASSINATURA PREMIUM CELESTIAL ATIVA!' : 'CELESTIAL PREMIUM ACTIVE!'}</h4>
                            <p className="text-[10px] text-slate-300 mt-1">{lang === 'pt' ? 'Cobrança Mensal Estrelada • Renovará em 30 Dias' : 'Starry Monthly Billing • Renews in 30 Days'}</p>
                          </div>
                        </div>

                        {/* Invoice Log */}
                        <div className="bg-[#141A10]/45 border border-[#34422F]/30 p-3 rounded-xl font-mono text-[9px] text-[#C2D9C2]">
                          <p className="font-bold text-white mb-1">📃 FATURAMENTO SIMULADO RECENTE</p>
                          <p>• Transação: #EST-894723-SEC</p>
                          <p>• Produto: Clube Encantado Mensal Mundo das Estorinhas</p>
                          <p>• Valor: {t.monthlyPlanPrice}</p>
                          <p>• Status: APROVADO COM MAGIA (Simulado)</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleQuickBypassPremium(false)}
                            className="bg-red-950/40 hover:bg-red-900/60 border border-red-800 text-red-300 text-[10px] font-bold px-3 py-2 rounded-xl cursor-pointer transition-all"
                          >
                            ❌ Simular Desativação / Bloqueio
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Checkout / Benefits layout */
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                        <div className="bg-[#141A10] p-4 rounded-xl border border-[#34422F] space-y-3.5 flex flex-col justify-between">
                          <h4 className="text-xs font-black text-[#FFCC00] flex items-center gap-1">
                            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" /> 
                            {lang === 'pt' ? "Benefícios inclusos:" : "Included benefits:"}
                          </h4>
                          <ul className="space-y-2 text-[10px] text-slate-300 leading-tight">
                            <li className="flex items-start gap-1.5 font-semibold">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>Todas as 30+ historinhas desbloqueadas.</span>
                            </li>
                            <li className="flex items-start gap-1.5 font-semibold">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>Palavras em destaque com sincronização de IA.</span>
                            </li>
                            <li className="flex items-start gap-1.5 font-semibold">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>Sons mágicos e ambientações de altíssima fidelidade.</span>
                            </li>
                            <li className="flex items-start gap-1.5 font-semibold">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>Modulação personalizada de idade das vozerias.</span>
                            </li>
                          </ul>

                          <div className="text-center pt-2 border-t border-[#34422F]">
                            <p className="text-lg font-black text-[#E5A93C]">{t.monthlyPlanPrice}</p>
                            <span className="text-[8px] text-slate-400 text-center block">Bancele quando desejar, sem custos adicionais.</span>
                          </div>
                        </div>

                        {/* Real PayPal Subscription Checkout button */}
                        <div className="bg-[#141A10] p-5 rounded-xl border border-[#34422F] space-y-4 flex flex-col justify-between">
                          <div className="space-y-1">
                            <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest block">💳 Pagamento Seguro</span>
                            <h4 className="text-xs font-bold text-white">{lang === 'pt' ? 'Checkout Oficial PayPal' : 'Official PayPal Checkout'}</h4>
                            <p className="text-[10px] text-slate-400 leading-snug">
                              {lang === 'pt' 
                                ? 'Finalize de forma rápida e segura usando sua carteira ou cartão no PayPal:' 
                                : 'Complete your transaction securely via PayPal using credit card or wallet:'}
                            </p>
                          </div>

                          <PaypalSubscribeButton 
                            onSuccess={(subscriptionID) => {
                              audio.playMagicChime();
                              setIsPremiumState(true);
                              onUpgradeSuccess();
                              setSuccessText(
                                lang === 'pt' 
                                  ? `Incrível! Assinatura Celestial confirmada pelo PayPal (ID: ${subscriptionID})! Todo o Reino está liberado! 🌟` 
                                  : `Success! Celestial subscription confirmed with PayPal (ID: ${subscriptionID})! The entire Kingdom is unlocked! 🌟`
                              );
                              setActiveTab('profile'); // Send them to kids profile setup
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Developer Review Sandbox Controls */}
                    <div className="bg-[#10193E] p-4 rounded-xl border border-[#2C3E82]/40 flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-1">
                        <FlaskConical className="w-4 h-4 text-indigo-400" />
                        <h4 className="text-[10px] font-black text-[#A6D5FF] uppercase tracking-wider">{lang === 'pt' ? '⚙️ SANDBOX DE TESTES RÁPIDOS (AVALIAÇÃO)' : '⚙️ RAPID EVALUATION SANDBOX'}</h4>
                      </div>
                      <p className="text-[9px] text-[#A6D5FF]/80 leading-snug">
                        {lang === 'pt' ? 'Como este é um ambiente de desenvolvimento privado, disponibilizamos este atalho para que você possa ligar e desligar a modalidade Premium inteira instantaneamente, testando ambos os modos de imediato.' : 'Since this is a development environment, we provide this diagnostic shortcut to let you toggle premium mechanics on-the-fly.'}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <button
                          onClick={() => handleQuickBypassPremium(true)}
                          className="bg-emerald-600 hover:bg-emerald-750 text-white text-[9px] font-black px-4 py-2 rounded-lg cursor-pointer transition-all uppercase animate-pulse"
                        >
                          🧪 Ativar Premium (Gratuito)
                        </button>
                        <button
                          onClick={() => handleQuickBypassPremium(false)}
                          className="bg-[#1D271A] hover:bg-[#283624] border border-[#34422F] text-slate-300 text-[9px] font-black px-4 py-2 rounded-lg cursor-pointer transition-all uppercase"
                        >
                          🧪 Bloquear / Reverter Grátis
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Tab - Bedtime Limits */}
                {activeTab === 'bedtime' && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h3 className="text-base font-fredoka font-bold text-sky-305 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-indigo-300 animate-pulse" /> 
                        {lang === 'pt' ? 'Cronômetro de Sono Inteligente 🌙' : 'Intelligent Bedtime sleep timer 🌙'}
                      </h3>
                      <p className="text-xs text-[#A6D5FF] leading-relaxed">
                        {lang === 'pt' ? 'Mantenha um sono perfeito para o seu garoto! Escolha quantos minutos de leitura ele tem disponível hoje. Quando o tempo acabar, a tela adormecerá de forma doce e tranquila!' : 'Help children sleep on schedule. Choose active reading minutes. When time completes, the screen sleeps sweetly.'}
                      </p>
                    </div>

                    <div className="bg-[#1D271A]/60 p-5 rounded-xl border border-[#34422F] space-y-4">
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Escolha o Limite de Leitura Diária:</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { min: 0, label: lang === 'pt' ? 'Sem Limite' : 'No Limit' },
                          { min: 5, label: lang === 'pt' ? '5 Minutos' : '5 Minutes' },
                          { min: 10, label: lang === 'pt' ? '10 Minutos' : '10 Minutes' },
                          { min: 15, label: lang === 'pt' ? '15 Minutos' : '15 Minutes' },
                          { min: 20, label: lang === 'pt' ? '20 Minutos' : '20 Minutes' },
                          { min: 30, label: lang === 'pt' ? '30 Minutos' : '30 Minutes' },
                        ].map((item) => {
                          const isAct = bedtimeMinutes === item.min;
                          return (
                            <button
                              key={item.min}
                              onClick={() => handleSaveBedtime(item.min)}
                              className={`py-2 px-1 text-[10px] font-black rounded-lg cursor-pointer transition-all text-center border ${
                                isAct 
                                  ? 'bg-amber-500 border-amber-600 text-white font-extrabold shadow-md transform scale-102 scale-y-105'
                                  : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800'
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>

                      {bedtimeMinutes > 0 && (
                        <div className="p-3 bg-amber-950/20 rounded-xl border border-amber-550/30 text-[10px] text-amber-300 leading-normal flex items-center gap-2">
                          <Moon className="w-4 h-4 text-amber-400 animate-bounce shrink-0" />
                          <span>{lang === 'pt' ? `O cronômetro do sono está contando! Fim das historinhas programado para os próximos minutos de uso.` : `The sleep clock is ticking! Rest screen triggers soon.`}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. Tab - Kids Reading Statistics Report */}
                {activeTab === 'stats' && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h3 className="text-base font-fredoka font-bold text-[#E283FF] flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-purple-400 animate-pulse" /> 
                        {lang === 'pt' ? 'Relatório de Atividade do Leitor' : 'Reader Progress Activity Report'}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {lang === 'pt' ? 'Acompanhe as habilidades, minutos lidos e o tempo gasto em cada categoria ao longo dos últimos 7 dias!' : 'Check weekly reading minutes, skills growth progress, and minutes spent per category details.'}
                      </p>
                    </div>

                    {/* D3 Stacked Reading Activity Chart Component */}
                    <ReadingActivityChart lang={lang} />

                    {/* Cute pedagogy metrics chart of children traits */}
                    <div className="bg-[#141A10]/50 p-4 border border-[#34422F] rounded-xl space-y-2">
                      <h4 className="text-[10px] font-black text-[#A6D5FF] uppercase tracking-wider">{lang === 'pt' ? 'Habilidades Desenvolvidas:' : 'Developed Skills & Traits:'}</h4>
                      <div className="space-y-1.5 text-[10px] font-semibold text-slate-300">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[8px] uppercase font-black text-[#FFCC00]">
                            <span>{lang === 'pt' ? 'Foco Linguístico (Destaque de Palavras)' : 'Linguistic Focus (Word Highlighting)'}</span>
                            <span>92%</span>
                          </div>
                          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-400 h-full rounded-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[8px] uppercase font-black text-emerald-400">
                            <span>{lang === 'pt' ? 'Percepção Sonora e Imaginação' : 'Phonetic Soundscapes & Imagination'}</span>
                            <span>86%</span>
                          </div>
                          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-400 h-full rounded-full" style={{ width: '86%' }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[8px] uppercase font-black text-[#E283FF]">
                            <span>{lang === 'pt' ? 'Rotina e Calma de Sono (Geral)' : 'Bedtime Routine & Relaxation Harmony'}</span>
                            <span>95%</span>
                          </div>
                          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#E283FF] h-full rounded-full" style={{ width: '95%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[9px] text-indigo-200 leading-relaxed italic text-center">
                      ⏱️ {lang === 'pt' ? 'Dica: use a Estrela Guia na página principal para incentivar vozes de fada.' : 'Hint: use the Guide Star on home screens to reward voice styles.'}
                    </p>
                  </div>
                )}

                {/* 4. Tab - Kid Profile Customize options */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleSaveProfile} className="space-y-4 animate-fade-in">
                    <div>
                      <h3 className="text-base font-fredoka font-bold text-emerald-400 flex items-center gap-2">
                        <User className="w-5 h-5 text-emerald-300 animate-pulse" /> 
                        {lang === 'pt' ? 'Perfil do Amiguinho Leitor' : 'Little Reader Profile'}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        {lang === 'pt' ? 'Escreva o nome e escolha o bichinho guia preferido do seu filho para personalizar todos os menus e histórias mágica!' : 'Write child parameters to customized names dynamically in story greetings.'}
                      </p>
                    </div>

                    <div className="space-y-3.5 bg-[#1D271A]/60 p-4 rounded-xl border border-[#34422F]">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-[#C2D9C2] uppercase block tracking-wider mb-1">Como devemos chamar o amiguinho?</label>
                          <input
                            type="text"
                            required
                            value={childProfile.name}
                            onChange={(e) => setLocalChildProfile({ ...childProfile, name: e.target.value })}
                            placeholder="Ex: Enzo / Cecília / Luiza"
                            className="w-full text-xs font-bold border border-[#34422F] bg-[#141A10] rounded-lg px-2.5 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-[#8FA88B]"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-bold text-[#C2D9C2] uppercase block tracking-wider mb-1">Idade do Leitor</label>
                          <select
                            value={childProfile.age}
                            onChange={(e) => setLocalChildProfile({ ...childProfile, age: e.target.value })}
                            className="w-full text-xs font-bold border border-[#34422F] bg-[#141A10] rounded-lg px-2 text-white h-9 focus:outline-none"
                          >
                            <option value="2-3">2-3 Anos</option>
                            <option value="4-6">4-6 Anos</option>
                            <option value="7-9">7-9 Anos</option>
                            <option value="10+">10+ Anos</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold text-[#A6D5FF] uppercase block tracking-wider mb-2">Selecione o Mascote Encantado Guia do Filho:</span>
                        <div className="flex gap-2 justify-center py-1">
                          {['🦄', '🦖', '🧚', '🚀', '🐼', '🦁', '🦉', '🧸', '🍭'].map((em) => {
                            const isSelect = childProfile.avatar === em;
                            return (
                              <button
                                type="button"
                                key={em}
                                onClick={() => { audio.playSystemPop(); setLocalChildProfile({ ...childProfile, avatar: em }); }}
                                className={`h-10 w-10 text-2xl flex items-center justify-center rounded-xl cursor-pointer transition-all ${
                                  isSelect ? 'bg-[#FFCC00] border-2 border-slate-105 scale-115' : 'bg-slate-950 hover:bg-slate-800'
                                }`}
                              >
                                {em}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 font-extrabold text-white text-xs rounded-xl shadow-md uppercase tracking-wider cursor-pointer"
                    >
                      Salvar Configurações de Perfil ✨
                    </button>
                  </form>
                )}

                {/* 5. Tab - Soundscapes & Sound effect controllers */}
                {activeTab === 'soundscapes' && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h3 className="text-base font-fredoka font-bold text-amber-400 flex items-center gap-2">
                        <Volume2 className="w-5 h-5 text-amber-400" />
                        {lang === 'pt' ? 'Orquestração e Sons Mágicos 🎹' : 'Enchanted Instruments & Sound Effects 🎹'}
                      </h3>
                      <p className="text-xs text-slate-300">
                        {lang === 'pt' ? 'Mude o estilo das harmônicas de fundo ou clique para tocar efeitos fofos em tempo real!' : 'Alter active ambient themes or click below to play synthesized sounds instantly.'}
                      </p>
                    </div>

                    {/* Ambient Select list */}
                    <div className="bg-[#1D271A]/40 p-3.5 border border-[#34422F] rounded-xl space-y-2">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#A6D5FF] block">Fundo Musical de Sono:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { key: 'celestial', em: '⭐', t: 'Celestial Chords' },
                          { key: 'floresta', em: '🌳', t: 'Floresta Sussurrante' },
                          { key: 'chuva', em: '🌧️', t: 'Chuva Suave' },
                          { key: 'espaco', em: '🪐', t: 'Eco Cósmico' },
                        ].map((m) => {
                          const isSel = activeSoundscape === m.key;
                          return (
                            <button
                              key={m.key}
                              onClick={() => handleSelectSoundscape(m.key)}
                              className={`py-2 px-1 text-[9px] font-black rounded-lg cursor-pointer transition-all border text-left pl-3 flex items-center gap-2 ${
                                isSel 
                                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-600 text-white font-extrabold shadow-md'
                                  : 'bg-slate-950/60 border-slate-900 text-slate-300 hover:bg-slate-800'
                              }`}
                            >
                              <span>{m.em}</span>
                              <span>{m.t}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Fun Interactive sound FX trigger pads */}
                    <div className="bg-[#141A10]/40 border border-[#34422F]/60 p-4 rounded-xl space-y-3">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#C2D9C2] block">Gatilhos Sonoros de Brincadeira:</span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => { audio.playMagicChime(); }}
                          className="bg-slate-950 hover:bg-slate-900/80 p-3 border-2 border-indigo-950 rounded-xl text-center flex flex-col items-center justify-center gap-1 active:scale-95 transition-all text-xs font-black text-indigo-200 cursor-pointer"
                        >
                          <span className="text-lg">✨</span>
                          <span>Chime Estelares</span>
                        </button>

                        <button
                          onClick={() => { audio.playFairySpell(); }}
                          className="bg-slate-950 hover:bg-slate-900/80 p-3 border-2 border-emerald-950 rounded-xl text-center flex flex-col items-center justify-center gap-1 active:scale-95 transition-all text-xs font-black text-emerald-200 cursor-pointer"
                        >
                          <span className="text-lg">🪄</span>
                          <span>Varinha Encanto</span>
                        </button>

                        <button
                          onClick={() => { audio.playDragonRoar(); }}
                          className="bg-slate-950 hover:bg-slate-900/80 p-3 border-2 border-red-950 rounded-xl text-center flex flex-col items-center justify-center gap-1 active:scale-95 transition-all text-xs font-black text-red-200 cursor-pointer"
                        >
                          <span className="text-lg">🦖</span>
                          <span>Rugido Bebê</span>
                        </button>

                        <button
                          onClick={() => { audio.playStarGiggle(); }}
                          className="bg-slate-950 hover:bg-slate-900/80 p-3 border-2 border-amber-950 rounded-xl text-center flex flex-col items-center justify-center gap-1 active:scale-95 transition-all text-xs font-black text-amber-200 cursor-pointer"
                        >
                          <span className="text-lg">🌟</span>
                          <span>Estrela Risada</span>
                        </button>

                        <button
                          onClick={() => { audio.playPageFlip(); }}
                          className="bg-slate-950 hover:bg-slate-900/80 p-3 border-2 border-pink-950 rounded-xl text-center flex flex-col items-center justify-center gap-1 active:scale-95 transition-all text-xs font-black text-pink-200 cursor-pointer"
                        >
                          <span className="text-lg">📖</span>
                          <span>Sopro de Folha</span>
                        </button>

                        <button
                          onClick={() => { audio.playSystemPop(); }}
                          className="bg-slate-950 hover:bg-slate-900/80 p-3 border-2 border-sky-950 rounded-xl text-center flex flex-col items-center justify-center gap-1 active:scale-95 transition-all text-xs font-black text-sky-200 cursor-pointer"
                        >
                          <span className="text-lg">🧼</span>
                          <span>Pop Bolha</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Secure state indicator */}
                <span className="text-[8px] tracking-wider text-center text-slate-500 uppercase mt-4 block">
                  🛡️ Configurações Encriptadas localmente. Nenhum dado é repassado a servidores externos.
                </span>

              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
