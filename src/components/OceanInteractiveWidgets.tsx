import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Anchor, Compass, Waves, Gem, Map as MapIcon, RotateCcw, Sparkles, Star, ShieldCheck, Trophy, Volume2 } from 'lucide-react';
import { Language } from '../types';
import { audio } from './AudioEngine';

interface OceanWidgetsProps {
  lang: Language;
  onEnter: () => void;
  onSubscribe: () => void;
  isLoggedIn?: boolean;
  onOpenAuth?: () => void;
}

export const OceanInteractiveWidgets: React.FC<OceanWidgetsProps> = ({ 
  lang, 
  onEnter, 
  onSubscribe,
  isLoggedIn = false,
  onOpenAuth
}) => {
  const renderLockOverlay = () => {
    if (isLoggedIn) return null;
    return (
      <div className="absolute inset-0 bg-slate-950/40 flex flex-col items-center justify-center p-4 text-center z-20 select-none backdrop-blur-[2px]">
        <div className="w-10 h-10 bg-amber-500/95 border border-amber-305 rounded-full flex items-center justify-center text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-pulse mb-2">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2c-2.76 0-5 2.24-5 5v3H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-1v-3c0-2.76-2.24-5-5-5zm-3 8V7c0-1.66 1.34-3 3-3s3 1.34 3 3v3H9zm3 6c-.83 0-1.5-.67-1.5-1.5S11.17 13 12 13s1.5.67 1.5 1.5S12.83 16 12 16z" />
          </svg>
        </div>
        <span className="text-[11px] font-fredoka font-black tracking-widest text-[#FFFDCD] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] mb-2 leading-none">
          {lang === 'pt' ? 'Requer Conta 🔒' : 'Account Required 🔒'}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            audio.playMagicChime();
            if (onOpenAuth) onOpenAuth();
          }}
          className="px-4 py-1.5 bg-gradient-to-r from-[#8FA88B] via-[#5D7A58] to-[#45573E] text-white font-fredoka font-bold text-[9.5px] rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer border-none uppercase tracking-wide block"
        >
          {lang === 'pt' ? 'Fazer Login 🔓' : 'Login 🔓'}
        </button>
      </div>
    );
  };

  // 🧜‍♀️ Sereia Marina states
  const [mermaidTail, setMermaidTail] = useState<'sapphire' | 'ruby' | 'emerald' | 'gold'>('sapphire');
  const [mermaidMsg, setMermaidMsg] = useState('Clique nas barbatanas mágicas abaixo para mudar minha cauda de sereia! 🧜‍♀️');

  // 🔱 Tritão Poseidon states
  const [tritonCharge, setTritonCharge] = useState(30);

  // 🐬 Golfinho Kiko states
  const [dolphinJumps, setDolphinJumps] = useState(0);
  const [isDolphinJumping, setIsDolphinJumping] = useState(false);

  // 💎 Baú de Desejos states
  const [wishStage, setWishStage] = useState<'shake' | 'opened'>('shake');
  const [wishGem, setWishGem] = useState('💎 Diamante da Sorte');

  // 🗺️ Treasure Island map states
  const [selectedMapSpot, setSelectedMapSpot] = useState<'wreck' | 'cave' | 'bay' | 'palace'>('wreck');

  // 🦪 Coral Reef clams states
  const [openClams, setOpenClams] = useState<Record<number, string>>({});

  const handleScrollToId = (id: string) => {
    audio.playSystemPop();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMermaidTailChange = (tail: 'sapphire' | 'ruby' | 'emerald' | 'gold') => {
    setMermaidTail(tail);
    audio.playMagicChime();
    const quotes = {
      sapphire: 'Mergulhe fundo para encontrar o brilho azul da sua inteligência! 🌀✨',
      ruby: 'O amor à amizade pulsa forte como um rubi no meio do oceano! ❤🎈',
      emerald: 'A natureza submarina abriga recifes repletos de vida verdejante! 🪸🌱',
      gold: 'O brilho das estrelas se derrama como ouro sobre os segredinhos do sono! 💤🌟'
    };
    setMermaidMsg(quotes[tail]);
  };

  const chargeTritonTrident = () => {
    audio.playSystemPop();
    setTritonCharge(prev => {
      const next = prev + 10;
      if (next >= 100) {
        audio.playMagicChime();
        return 100;
      }
      return next;
    });
  };

  const jumpDolphin = () => {
    if (isDolphinJumping) return;
    audio.playMagicChime();
    setIsDolphinJumping(true);
    setDolphinJumps(p => p + 1);
    setTimeout(() => {
      setIsDolphinJumping(false);
    }, 850);
  };

  const openWishChest = () => {
    audio.playPageFlip();
    const gems = [
      '💎 Diamante de Atlântida',
      '⭐ Estrela do Amanhã',
      '👑 Tiara Real de Coral',
      '💚 Esmeralda Protetora',
      '🌺 Rubi Encantado',
      '🔮 Cristal do Horizonte'
    ];
    const roll = gems[Math.floor(Math.random() * gems.length)];
    setWishGem(roll);
    setWishStage('opened');
  };

  const openClamAtIndex = (idx: number) => {
    if (openClams[idx]) return;
    audio.playMagicChime();
    const rewards = ['🔮 Pérola Violeta', '🌟 Estrela do Mar Risonha', '🐚 Búzio Cantador', '🔑 Chave do Galeão', '💎 Turmalina Azul'];
    const chosen = rewards[Math.floor(Math.random() * rewards.length)];
    setOpenClams(prev => ({ ...prev, [idx]: chosen }));
  };

  const resetAllClams = () => {
    audio.playPageFlip();
    setOpenClams({});
  };

  return (
    <div className="w-full space-y-20 relative z-10">

      {/* 🔮 1. ADVENTURE SECTION: Interactive Ocean Cards */}
      <section id="adventure-section-anchor" className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] bg-amber-950 border border-amber-600 px-4 py-1.5 rounded-full inline-block">
            {lang === 'en' ? 'CHOOSE YOUR ADVENTURE' : 'ESCOLHA SUA AVENTURA'}
          </span>
          <h2 className="text-3xl md:text-5xl font-fredoka font-bold text-white uppercase leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            {lang === 'en' ? 'Enchanted Deep Sea Realms' : 'Reinos Encantados das Profundezas'}
          </h2>
          <p className="text-sm text-[#C2D9C2]/85 leading-relaxed font-semibold">
            {lang === 'en' 
              ? 'Interact with different ocean guardians & magical characters to see the sea come alive with sound effects and animations!' 
              : 'Toque nos personagens e guardiões do oceano para dar vida ao mar com lindas animações e efeitos especiais sincronizados!'}
          </p>
        </div>

        {/* 4 Interactive Columns Grid with custom colored outline buttons matching the Ocean Adventure mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-1">

          {/* Card 1: REINO DAS SEREIAS */}
          <div className="bg-[#021832]/90 border-2 md:border-3 border-[#00BFFF] hover:border-[#00FFFF] hover:scale-[1.02] rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between space-y-5 transition-all text-left relative overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-4.5xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform">🧜‍♀️</span>
                <span className="text-[9px] bg-[#021832]/50 border-2 border-[#00BFFF] text-[#A9EDFF] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  SEREIA
                </span>
              </div>
              <h3 className="text-lg font-display font-black text-[#00FFFF] uppercase tracking-wider">REINO DAS SEREIAS</h3>
              <p className="text-[12.5px] text-[#A9EDFF] mt-1.5 leading-relaxed font-semibold min-h-[55px]">
                Um mundo mágico cheio de cores e amizade! Descubra belas sereias e mude sua barbatana abaixo.
              </p>
            </div>

            <div className="pt-3 border-t border-[#00BFFF]/50 space-y-4">
              <div className="space-y-1.5">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#00FFFF] block">
                  {lang === 'en' ? 'Customize Tail' : 'Cor da Barbatana'}
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'sapphire', color: 'bg-cyan-500', label: 'Safira' },
                    { id: 'ruby', color: 'bg-rose-500', label: 'Rubi' },
                    { id: 'emerald', color: 'bg-emerald-500', label: 'Esmeralda' },
                    { id: 'gold', color: 'bg-amber-400', label: 'Ouro' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleMermaidTailChange(item.id as any)}
                      className={`h-7.5 rounded-lg border cursor-pointer flex items-center justify-center text-[10px] text-white font-extrabold transition-all hover:scale-110 ${
                        mermaidTail === item.id 
                          ? `${item.color} scale-108 border-white ring-2 ring-[#00FFFF] shadow-md` 
                          : `${item.color} border-[#00BFFF]`
                      }`}
                      title={item.label}
                    >
                      ✨
                    </button>
                  ))}
                </div>
              </div>

              {/* Purple Mockup Action Button matched to mockup */}
              <button 
                onClick={() => { audio.playMagicChime(); onEnter(); }} 
                className="w-full py-2.5 bg-gradient-to-r from-[#00FFFF] via-[#00BFFF] to-[#015CBE] hover:from-[#00FFFF] text-white font-fredoka font-black text-[11px] rounded-xl cursor-pointer uppercase transition-all shadow-[0_4px_14px_rgba(0,191,255,0.35)] active:translate-y-0.5 tracking-widest border-b-2 border-[#012549]"
              >
                EXPLORAR
              </button>
            </div>
            {renderLockOverlay()}
          </div>

          {/* Card 2: TRITÃO GUARDIÃO */}
          <div className="bg-[#021832]/90 border-2 md:border-3 border-[#00BFFF] hover:border-[#00FFFF] hover:scale-[1.02] rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between space-y-5 transition-all text-left relative overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-4.5xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform">🔱</span>
                <span className="text-[9px] bg-[#021832]/50 border-2 border-[#00FFFF] text-[#00FFFF] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  CORAGEM
                </span>
              </div>
              <h3 className="text-lg font-display font-black text-[#00FFFF] uppercase tracking-wider">TRITÃO GUARDIÃO</h3>
              <p className="text-[12.5px] text-[#A9EDFF] mt-1.5 leading-relaxed font-semibold min-h-[55px]">
                Sabedoria e coragem para proteger o oceano! Carregue a barra de energia supremo abaixo.
              </p>
            </div>

            <div className="space-y-4 pt-3 border-t border-[#00BFFF]/50">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-[#00FFFF] font-mono font-bold">
                  <span>{lang === 'en' ? 'Powercharge' : 'Canalizar Poder'}</span>
                  <span className={tritonCharge === 100 ? 'text-amber-400 font-extrabold animate-pulse' : ''}>
                    {tritonCharge === 100 ? '100% Supremo' : `${tritonCharge}%`}
                  </span>
                </div>
                <div className="w-full bg-[#000d1e] h-3.5 rounded-full border border-[#00BFFF] p-0.5 overflow-hidden">
                  <motion.div 
                    animate={{ width: `${tritonCharge}%` }}
                    className="h-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 rounded-full"
                  />
                </div>
              </div>

              {tritonCharge < 100 ? (
                <button
                  onClick={chargeTritonTrident}
                  className="w-full py-1.5 bg-[#022549] text-amber-305 hover:text-white border border-amber-600/50 font-sans font-bold text-[10px] rounded-lg cursor-pointer uppercase transition-all shadow-md active:translate-y-0.5"
                >
                  ⚡ {lang === 'en' ? 'Charge' : 'Canalizar'}
                </button>
              ) : (
                <button
                  onClick={() => {
                    audio.playPageFlip();
                    setTritonCharge(20);
                  }}
                  className="w-full py-1.5 bg-[#022549] text-[#A9EDFF] font-sans font-bold text-[10px] rounded-lg cursor-pointer uppercase transition-all"
                >
                  ♻️ Resetar
                </button>
              )}

              {/* Green Mockup Action Button matched to mockup */}
              <button 
                onClick={() => { audio.playMagicChime(); onEnter(); }} 
                className="w-full py-2.5 bg-gradient-to-r from-[#00FFFF] via-[#00BFFF] to-[#015CBE] hover:from-[#00FFFF]/80 text-white font-fredoka font-black text-[11px] rounded-xl cursor-pointer uppercase transition-all shadow-[0_4px_14px_rgba(0,191,255,0.35)] active:translate-y-0.5 tracking-widest border-b-2 border-[#012549]"
              >
                EXPLORAR
              </button>
            </div>
            {renderLockOverlay()}
          </div>

          {/* Card 3: AMIGOS DO MAR */}
          <div className="bg-[#021832]/90 border-2 md:border-3 border-[#00BFFF] hover:border-[#00FFFF] hover:scale-[1.02] rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between space-y-5 transition-all text-left relative overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="relative">
                  <span className="text-4.5xl block filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform">🐬</span>
                  {isDolphinJumping && (
                    <motion.span 
                      initial={{ y: 10 }}
                      animate={{ y: [-15, -45, -10] }}
                      transition={{ duration: 0.8 }}
                      className="absolute top-0 right-0 text-xl"
                    >
                      💦
                    </motion.span>
                  )}
                </div>
                <span className="text-[9px] bg-[#021832]/50 border-2 border-[#00BFFF] text-[#A9EDFF] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  DIVERSÃO
                </span>
              </div>
              <h3 className="text-lg font-display font-black text-[#00FFFF] uppercase tracking-wider">AMIGOS DO MAR</h3>
              <p className="text-[12.5px] text-[#A9EDFF] mt-1.5 leading-relaxed font-semibold min-h-[55px]">
                Conheça criaturas incríveis e divirta-se! Alimente o Kiko para vê-lo saltar com brilho marinho.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#00BFFF]/50">
              <div className="flex items-center justify-between bg-[#000d1e] border border-[#00BFFF]/65 py-1.5 px-3 rounded-xl">
                <span className="text-[9px] uppercase tracking-wide font-extrabold text-[#00FFFF]">Saltos do Kiko</span>
                <span className="text-xs font-mono font-black text-cyan-400">{dolphinJumps}</span>
              </div>

              <motion.button
                onClick={jumpDolphin}
                whileTap={{ scale: 0.95 }}
                className="w-full py-1.5 bg-[#022549] hover:bg-[#052C59] text-[#A9EDFF] font-sans font-bold text-[10px] rounded-lg cursor-pointer uppercase tracking-wider shadow-md"
              >
                🐟 Dar Peixinho
              </motion.button>

              {/* Blue Mockup Action Button matched to mockup */}
              <button 
                onClick={() => { audio.playMagicChime(); onEnter(); }} 
                className="w-full py-2.5 bg-gradient-to-r from-[#00FFFF] via-[#00BFFF] to-[#015CBE] hover:from-[#00FFFF]/80 text-white font-fredoka font-black text-[11px] rounded-xl cursor-pointer uppercase transition-all shadow-[0_4px_14px_rgba(0,191,255,0.35)] active:translate-y-0.5 tracking-widest border-b-2 border-[#012549]"
              >
                EXPLORAR
              </button>
            </div>
            {renderLockOverlay()}
          </div>

          {/* Card 4: ILHA DO TESOURO */}
          <div className="bg-[#021832]/90 border-2 md:border-3 border-[#00BFFF] hover:border-[#00FFFF] hover:scale-[1.02] rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between space-y-5 transition-all text-left relative overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-4.5xl animate-pulse filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">🪙💎</span>
                <span className="text-[9px] bg-pink-955 border border-[#E63946] text-[#E63946] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  MISTÉRIO
                </span>
              </div>
              <h3 className="text-lg font-display font-black text-[#D9C47E] uppercase tracking-wider">ILHA DO TESOURO</h3>
              <p className="text-[12.5px] text-[#A9EDFF] mt-1.5 leading-relaxed font-semibold min-h-[55px]">
                Desafios e recompensas esperam por você! Chacoalhe o baú mágico abaixo para sortear relíquias.
              </p>
            </div>

            <div className="pt-3 border-t border-[#00BFFF]/50 space-y-4">
              {wishStage === 'shake' ? (
                <button
                  onClick={openWishChest}
                  className="w-full py-1.5 bg-[#022549] text-[#00FFFF] hover:bg-[#052C59] font-sans font-bold text-[10px] rounded-lg cursor-pointer uppercase tracking-wider shadow-md"
                >
                  🗝️ Chacoalhar Baú
                </button>
              ) : (
                <div className="space-y-1.5 text-center animate-bounce">
                  <div className="p-1 px-1.5 bg-[#000d1e] border border-amber-500 rounded-xl text-[10px] font-bold text-yellow-300 block font-sans">
                    {wishGem}
                  </div>
                  <button
                    onClick={() => {
                      audio.playSystemPop();
                      setWishStage('shake');
                    }}
                    className="text-[9px] uppercase tracking-wider text-[#00FFFF] font-bold hover:underline cursor-pointer block mx-auto font-sans"
                  >
                    🔄 Sortear Outro
                  </button>
                </div>
              )}

              {/* Red-Orange Mockup Action Button matched to mockup */}
              <button 
                onClick={() => { audio.playMagicChime(); onEnter(); }} 
                className="w-full py-2.5 bg-gradient-to-r from-orange-600 via-[#E63946] to-rose-800 hover:from-orange-500 text-white font-fredoka font-black text-[11px] rounded-xl cursor-pointer uppercase transition-all shadow-[0_4px_14px_rgba(230,57,70,0.35)] active:translate-y-0.5 tracking-widest border-b-2 border-orange-900"
              >
                EXPLORAR
              </button>
            </div>
            {renderLockOverlay()}
          </div>

        </div>
      </section>

      {/* 🗺️ 2. TREASURE ISLAND SECTION: Ancient interactive Pirate Map */}
      <section id="treasure-island-anchor" className="space-y-12">
        
        {/* PARCHMENT BANNER MATCHED EXACTLY TO THE USER MOCKUP ILLUSTRATION */}
        <div className="bg-gradient-to-r from-[#F0DFB2] via-[#EAE1C8] to-[#D9C47E] border-4 border-amber-850 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-amber-950 relative overflow-hidden select-none">
          {/* Subtle grid lines background overlay simulating vintage maps */}
          <div className="absolute inset-x-0 top-0 h-full w-full pointer-events-none opacity-10 bg-[radial-gradient(#78350f_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Left illustration: Majestic Pirate Galleon Ship */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-3 relative group">
            <div className="absolute -top-4 -left-4 text-3xl animate-pulse">🛸</div>
            <motion.div 
              animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-7xl filter drop-shadow-[0_12px_15px_rgba(0,0,0,0.355)]"
            >
              🏴‍☠️⛵
            </motion.div>
            <div className="text-[10px] uppercase tracking-widest font-black text-amber-900 border border-amber-800 px-2.5 py-1 rounded-md mt-3.5 bg-amber-950/10 font-sans">
              {lang === 'en' ? 'The Galleon' : 'O Navio Real'}
            </div>
          </div>

          {/* Center Info Panel */}
          <div className="w-full md:w-1/3 text-center space-y-4 relative z-10 px-2 flex flex-col items-center font-sans">
            <div className="space-y-1">
              <h3 className="text-3xl md:text-4xl font-fredoka font-black tracking-widest text-[#5C2E0B] uppercase leading-none drop-shadow-sm">
                ILHA DO TESOURO
              </h3>
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-fredoka font-black text-amber-900 tracking-wider">
                <span>⭐</span>
                <span>CONQUISTAS & HISTÓRIAS!</span>
                <span>⭐</span>
              </div>
            </div>
            
            <p className="text-sm font-sans font-black leading-relaxed text-amber-950/90 max-w-sm mx-auto">
              Aventure-se e encontre recompensas incríveis!
            </p>

            <button
              onClick={() => handleScrollToId('pirate-map-interactive')}
              className="px-8 py-3.5 bg-[#2E2405] hover:bg-[#4E3906] hover:scale-105 active:scale-95 text-[#FFCC00] font-fredoka font-black text-xs rounded-full shadow-[0_8px_20px_rgba(78,57,6,0.35)] transition-all cursor-pointer uppercase tracking-widest border border-[#C99C53]"
            >
              VER MAPA
            </button>
          </div>

          {/* Right illustration: Island map & overflowing treasure chest */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-3 relative group">
            <div className="absolute -bottom-2 -right-2 text-3xl animate-bounce">🪙</div>
            <motion.div 
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-7xl filter drop-shadow-[0_12px_15px_rgba(0,0,0,0.355)]"
            >
              🗺️🏝️💎
            </motion.div>
            <div className="text-[10px] uppercase tracking-widest font-black text-amber-900 border border-amber-850 px-2.5 py-1 rounded-md mt-3.5 bg-amber-950/10 font-sans">
              {lang === 'en' ? 'Four Gems' : 'Ilha Secreta'}
            </div>
          </div>
        </div>

      {/* 🚀 2.5 APRENDA BRINCANDO SECTION matching the user mockup precisely */}
      <section id="apreenda-brincando-anchor" className="space-y-12 pt-4 scroll-mt-24">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00FFFF] bg-[#000d1e] border border-amber-500/30 px-4 py-1.5 rounded-full inline-block font-sans">
            {lang === 'en' ? 'PLAY & LEARN' : 'APRENDA BRINCANDO'}
          </span>
          <h2 className="text-3xl md:text-5xl font-fredoka font-bold text-white uppercase leading-tight drop-shadow-md">
            Módulos de Aprendizado Interativo
          </h2>
          <p className="text-sm text-[#A9EDFF] leading-relaxed font-semibold">
            Clique nas abas abaixo para de colar com jogos educativos, desafios interativos e os reinos das histórias!
          </p>
        </div>

        {/* 4 Cards Grid representation matching the mock-up exactly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
          
          {/* Card 1: JOGOS EDUCATIVOS with orange star */}
          <motion.div 
            whileHover={{ y: -8 }}
            onClick={() => { audio.playMagicChime(); onEnter(); }}
            className="cursor-pointer bg-[#021832]/95 border-2 md:border-3 border-[#00BFFF] hover:border-amber-400 rounded-3xl p-6 shadow-xl flex flex-col justify-between items-center text-center space-y-4 transition-all relative overflow-hidden group"
          >
            <div className="absolute top-2 right-2 text-xs opacity-20">⭐</div>
            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30 text-4xl group-hover:scale-110 transition-transform">
              ⭐
            </div>
            <div>
              <h3 className="font-fredoka font-black text-white text-base tracking-wide uppercase">JOGOS EDUCATIVOS</h3>
              <p className="text-xs text-[#A9EDFF] font-semibold leading-relaxed mt-2 min-h-[50px]">
                Divirta-se enquanto aprende coisas novas e explora os mistérios matemáticos submarinos!
              </p>
            </div>
            <button className="px-5 py-2 bg-amber-500 text-[#090E26] font-fredoka font-black text-[10px] rounded-full uppercase tracking-wider group-hover:scale-105 transition-transform cursor-pointer shadow-md">
              BRINCAR
            </button>
          </motion.div>

          {/* Card 2: ATIVIDADES with pink shell */}
          <motion.div 
            whileHover={{ y: -8 }}
            onClick={() => handleScrollToId('underwater-kingdom-anchor')}
            className="cursor-pointer bg-[#021832]/95 border-2 md:border-3 border-[#00BFFF] hover:border-pink-500 rounded-3xl p-6 shadow-xl flex flex-col justify-between items-center text-center space-y-4 transition-all relative overflow-hidden group"
          >
            <div className="absolute top-2 right-2 text-xs opacity-20">🐚</div>
            <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/30 text-4xl group-hover:scale-110 transition-transform">
              🐚
            </div>
            <div>
              <h3 className="font-fredoka font-black text-white text-base tracking-wide uppercase">ATIVIDADES</h3>
              <p className="text-xs text-[#A9EDFF] font-semibold leading-relaxed mt-2 min-h-[50px]">
                Desenhos, labirintos e muitas aventuras! Abra conchas cinzentas para encontrar tesouros.
              </p>
            </div>
            <button className="px-5 py-2 bg-pink-500 text-white font-fredoka font-black text-[10px] rounded-full uppercase tracking-wider group-hover:scale-105 transition-transform cursor-pointer shadow-md">
              ABRIR
            </button>
          </motion.div>

          {/* Card 3: HISTÓRIAS with golden book */}
          <motion.div 
            whileHover={{ y: -8 }}
            onClick={() => handleScrollToId('showcase-section-anchor')}
            className="cursor-pointer bg-[#021832]/95 border-2 md:border-3 border-[#00BFFF] hover:border-yellow-400 rounded-3xl p-6 shadow-xl flex flex-col justify-between items-center text-center space-y-4 transition-all relative overflow-hidden group"
          >
            <div className="absolute top-2 right-2 text-xs opacity-20">📖</div>
            <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center border border-yellow-400/30 text-4xl group-hover:scale-110 transition-transform">
              📖
            </div>
            <div>
              <h3 className="font-fredoka font-black text-white text-base tracking-wide uppercase">HISTÓRIAS</h3>
              <p className="text-xs text-[#A9EDFF] font-semibold leading-relaxed mt-2 min-h-[50px]">
                Contos mágicos para sonhar e imaginar! Relaxe sua mente com sons da vovó contadora de histórias.
              </p>
            </div>
            <button className="px-5 py-2 bg-yellow-400 text-[#090E26] font-fredoka font-black text-[10px] rounded-full uppercase tracking-wider group-hover:scale-105 transition-transform cursor-pointer shadow-md">
              SUSSURRAR
            </button>
          </motion.div>

          {/* Card 4: DESAFIOS with golden trophy */}
          <motion.div 
            whileHover={{ y: -8 }}
            onClick={() => handleScrollToId('pirate-map-interactive')}
            className="cursor-pointer bg-[#021832]/95 border-2 md:border-3 border-[#00BFFF] hover:border-purple-500 rounded-3xl p-6 shadow-xl flex flex-col justify-between items-center text-center space-y-4 transition-all relative overflow-hidden group"
          >
            <div className="absolute top-2 right-2 text-xs opacity-20">🏆</div>
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/30 text-4xl group-hover:scale-110 transition-transform">
              🏆
            </div>
            <div>
              <h3 className="font-fredoka font-black text-white text-base tracking-wide uppercase">DESAFIOS</h3>
              <p className="text-xs text-[#A9EDFF] font-semibold leading-relaxed mt-2 min-h-[50px]">
                Complete missões e ganhe recompensas! Descubra os nódulos secretos do pergaminho pirata.
              </p>
            </div>
            <button className="px-5 py-2 bg-purple-500 text-white font-fredoka font-black text-[10px] rounded-full uppercase tracking-wider group-hover:scale-105 transition-transform cursor-pointer shadow-md">
              VENCER
            </button>
          </motion.div>

        </div>
      </section>

        {/* INTERACTIVE MAP CONTAINER block */}
        <div id="pirate-map-interactive" className="pt-8 space-y-10 scroll-mt-24">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFCC00] bg-[#2E2405] px-4 py-1.5 rounded-full border border-amber-600 inline-block font-sans">
              {lang === 'en' ? 'PIRATE EXPEDITION MAP' : 'Expedição Literária Pirata'}
            </span>
            <h2 className="text-3xl md:text-5xl font-fredoka font-bold text-white uppercase leading-tight">
              {lang === 'en' ? 'Isle of The Four Gems Map' : 'Mapa da Ilha das Quatro Gemas'}
            </h2>
            <p className="text-sm text-[#C2D9C2]/80 leading-relaxed font-semibold">
              {lang === 'en' 
                ? 'Click on the vintage pirate nodes to uncover mysterious deep sea legends and unlock sleeping tales!' 
                : 'Clique nos selos do pergaminho pirata para desvendar as lendas misteriosas da ilha dos papagaios e libertar estórias adormecidas!'}
            </p>
          </div>

        {/* pergaminho Map Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto relative rounded-[2.5rem] overflow-hidden group">
          
          {/* Visual Parchment Left Column */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#E6C687] to-[#C99C53] rounded-[2.5rem] border-4 border-amber-800 shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-6 md:p-8 relative min-h-[380px] overflow-hidden flex flex-col justify-between">
            
            {/* Compass and grid markings overlay */}
            <div className="absolute top-4 right-4 text-amber-950/20">
              <Compass className="w-24 h-24 stroke-[1.5] rotate-12 animate-spin-slow" />
            </div>
            <div className="absolute bottom-4 left-4 text-amber-950/25">
              <Anchor className="w-16 h-16 stroke-[1.5]" />
            </div>

            {/* Title / Header */}
            <div className="relative z-10 border-b border-amber-950 pb-4 text-center">
              <span className="text-[9px] font-fredoka font-bold text-amber-950 uppercase tracking-widest block">
                {lang === 'en' ? 'ACADEMIC CARIBBEAN SEA' : 'MAR CARIBE ACADÊMICO'}
              </span>
              <h3 className="text-xl font-fredoka font-black text-amber-950 leading-none">
                {lang === 'en' ? 'MARITIME CHART OF ATLANTE' : 'CARTA MARÍTIMA DE ATLANTE'}
              </h3>
            </div>

            {/* Map Pins overlay with exact positions */}
            <div className="relative w-full h-[240px] border border-dashed border-amber-950 my-4 rounded-xl flex items-center justify-center bg-[#F3D9A1]">
              
              {/* Plot lines */}
              <svg className="absolute inset-0 w-full h-full stroke-amber-950 stroke-[1.5] stroke-dasharray-4 fill-none">
                <path d="M 50 50 Q 150 120 280 80 T 500 180" />
              </svg>

              {/* Spot 1: Shipwreck */}
              <button
                onClick={() => { audio.playMagicChime(); setSelectedMapSpot('wreck'); }}
                className={`absolute top-[18%] left-[15%] flex flex-col items-center gap-1 group cursor-pointer`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all ${
                  selectedMapSpot === 'wreck' ? 'bg-amber-950 text-[#FFCC00] border-[#FFCC00] scale-115 ring-4 ring-[#FFCC00]' : 'bg-amber-950 text-amber-100 border-amber-950 hover:bg-amber-950'
                }`}>
                  ⚓
                </div>
                <span className="text-[8px] font-black uppercase text-amber-950 font-sans tracking-wide">
                  {lang === 'en' ? 'Wreckage' : 'Naufrágio'}
                </span>
              </button>

              {/* Spot 2: Cave */}
              <button
                onClick={() => { audio.playMagicChime(); setSelectedMapSpot('cave'); }}
                className={`absolute top-[32%] right-[22%] flex flex-col items-center gap-1 group cursor-pointer`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all ${
                  selectedMapSpot === 'cave' ? 'bg-amber-950 text-[#FFCC00] border-[#FFCC00] scale-115 ring-4 ring-[#FFCC00]' : 'bg-amber-950 text-amber-100 border-amber-950 hover:bg-amber-950'
                }`}>
                  🛸
                </div>
                <span className="text-[8px] font-black uppercase text-amber-950 font-sans tracking-wide">
                  {lang === 'en' ? 'Great Dive' : 'Mergulho'}
                </span>
              </button>

              {/* Spot 3: Bay */}
              <button
                onClick={() => { audio.playMagicChime(); setSelectedMapSpot('bay'); }}
                className={`absolute bottom-[16%] left-[45%] flex flex-col items-center gap-1 group cursor-pointer`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all ${
                  selectedMapSpot === 'bay' ? 'bg-amber-950 text-[#FFCC00] border-[#FFCC00] scale-115 ring-4 ring-[#FFCC00]' : 'bg-amber-950 text-amber-105 border-amber-950 hover:bg-amber-950'
                }`}>
                  🦜
                </div>
                <span className="text-[8px] font-black uppercase text-amber-950 font-sans tracking-wide">
                  {lang === 'en' ? 'Sanctuary' : 'Refúgio'}
                </span>
              </button>

              {/* Spot 4: Palace */}
              <button
                onClick={() => { audio.playMagicChime(); setSelectedMapSpot('palace'); }}
                className={`absolute top-[60%] right-[48%] flex flex-col items-center gap-1 group cursor-pointer`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all ${
                  selectedMapSpot === 'palace' ? 'bg-amber-950 text-[#FFCC00] border-[#FFCC00] scale-115 ring-4 ring-[#FFCC00]' : 'bg-amber-950 text-amber-100 border-amber-950 hover:bg-amber-950'
                }`}>
                  🏰
                </div>
                <span className="text-[8px] font-black uppercase text-amber-950 font-sans tracking-wide">
                  {lang === 'en' ? 'Palace' : 'Palácio'}
                </span>
              </button>

              {/* Central Map Skull Mark */}
              <div className="text-3xl animate-pulse pointer-events-none select-none text-rose-950">
                ❌
              </div>
            </div>

            <div className="relative z-10 text-center font-serif text-[10px] text-amber-950 font-bold border-t border-amber-950 pt-3 flex items-center justify-center gap-1">
              <span>{lang === 'en' ? 'Use your virtual binoculars and elect a pirate spot! 🔭' : 'Arraste seu binóculo e selecione um marco pirata 🔭'}</span>
            </div>
          </div>

          {/* Lore/Fairytale Right Column */}
          <div className="lg:col-span-5 flex flex-col justify-between items-stretch">
            <div className="bg-[#021832] border-2 border-[#00BFFF] p-6.5 rounded-3xl space-y-5 h-full flex flex-col justify-between text-left shadow-lg">
              
              <AnimatePresence mode="wait">
                {selectedMapSpot === 'wreck' && (
                  <motion.div
                    key="wreck"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3.5xl p-2.5 bg-[#2E2405] border border-amber-400 rounded-2xl block text-[#FFCC00]">⚓</span>
                      <div>
                        <h4 className="text-base font-fredoka font-bold text-white uppercase leading-none">
                          {lang === 'en' ? 'The Sunken Golden Galleon' : 'O Galeão de Ouro Naufragado'}
                        </h4>
                        <span className="text-[10px] text-[#A9EDFF] font-bold uppercase tracking-wider">
                          {lang === 'en' ? 'Depth: 45 Meters' : 'Profundidades: 45 Metros'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#A9EDFF] leading-relaxed font-semibold">
                      {lang === 'en' 
                        ? 'Ancient sailors say that in 1617, Captain Iron Tooth hid over a hundred chests overflowing with magical sea-gems in the cargo hold of this very pirate ship.' 
                        : 'Dizem os antigos marujos que em mil seiscentos e dezessete, o capitão dente de ferro escondeu mais de cem baús transbordantes de pérolas mágicas no porão deste navio.'}
                    </p>

                    <div className="bg-[#000d1e] border border-[#00BFFF] p-3 rounded-2xl text-[11px] text-yellow-300 font-extrabold flex items-center gap-2">
                      <span>🔱 {lang === 'en' ? 'Sleep Challenge:' : 'Desafio do sono:'}</span> 
                      {lang === 'en' ? 'Read "O Galeão Submerso" tonight and dream of golden treasures!' : 'Leia "O Galeão Submerso" hoje à noite e sonhe com tesouros!'}
                    </div>
                  </motion.div>
                )}

                {selectedMapSpot === 'cave' && (
                  <motion.div
                    key="cave"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3.5xl p-2.5 bg-[#000d1e] border border-cyan-400/35 rounded-2xl block text-cyan-400">🧜‍♀️</span>
                      <div>
                        <h4 className="text-base font-fredoka font-bold text-white uppercase leading-none">
                          {lang === 'en' ? 'Blue Mermaid Grotto' : 'A Gruta Azul das Sereias'}
                        </h4>
                        <span className="text-[10px] text-[#A9EDFF] font-bold uppercase tracking-wider">
                          {lang === 'en' ? 'Biome: Luminescent Coral' : 'Bioma: Coral Luminescente'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#A9EDFF] leading-relaxed font-semibold">
                      {lang === 'en' 
                        ? 'Here, beautiful mermaids sing soft lullabies that calm the raging ocean waves and soothe the stormiest minds. The caves glow at night with magical blue starlight.' 
                        : 'Aqui, belas sereias cantam lindas canções de ninar que acalmam as águas e desfazem tempestades bravas. A caverna brilha à noite devido a milhares de mini algas azuis.'}
                    </p>

                    <div className="bg-[#000d1e] border border-[#00BFFF] p-3 rounded-2xl text-[11px] text-cyan-300 font-extrabold flex items-center gap-2">
                      <span>🎤 {lang === 'en' ? 'Breeze Melody:' : 'Canção de Brisa:'}</span> 
                      {lang === 'en' ? 'Symphonic audio elements are available with professional voices.' : 'Sons doces estão disponíveis com voz profissional na biblioteca.'}
                    </div>
                  </motion.div>
                )}

                {selectedMapSpot === 'bay' && (
                  <motion.div
                    key="bay"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3.5xl p-2.5 bg-[#000d1e] border border-rose-500/35 rounded-2xl block text-rose-400">🦜</span>
                      <div>
                        <h4 className="text-base font-fredoka font-bold text-white uppercase leading-none">
                          {lang === 'en' ? 'Safe Macaw Sanctuary' : 'A Baía Segura dos Papagaios'}
                        </h4>
                        <span className="text-[10px] text-[#A9EDFF] font-bold uppercase tracking-wider">
                          {lang === 'en' ? 'Terrain: Tropical Island' : 'Terreno: Ilha Tropical'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#A9EDFF] leading-relaxed font-semibold">
                      {lang === 'en' 
                        ? 'A quiet magical archipelago guarded by friendly red macaws and intelligent dolphins. Perfect for beachside storytelling and warm tropical bonfires.' 
                        : 'Um lindo arquipélago calmo livre de corsários, vigiado por adoráveis araras marinhas vermelhas e golfinhos brincantes de cauda colorida. Perfeito para piqueniques e fogueiras.'}
                    </p>

                    <div className="bg-[#000d1e] border border-[#00BFFF] p-3 rounded-2xl text-[11px] text-white flex items-center gap-2">
                      <span>📖 {lang === 'en' ? 'Adventure Alert:' : 'Descoberta:'}</span> 
                      {lang === 'en' ? 'Explore gorgeous stories and visual character cards on our application.' : 'Encontre histórias divertidas sobre animais silvestres no app.'}
                    </div>
                  </motion.div>
                )}

                {selectedMapSpot === 'palace' && (
                  <motion.div
                    key="palace"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3.5xl p-2.5 bg-[#2E2405] border border-[#FFCC00] rounded-2xl block text-purple-400">🏰</span>
                      <div>
                        <h4 className="text-base font-fredoka font-bold text-white uppercase leading-none">
                          {lang === 'en' ? "The King's Coral Palace" : 'O Castelo de Coral do Rei'}
                        </h4>
                        <span className="text-[10px] text-[#A9EDFF] font-bold uppercase tracking-wider">
                          {lang === 'en' ? 'Culture: Royal Atlantis' : 'Cultura: Atlântida Real'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#A9EDFF] leading-relaxed font-semibold">
                      {lang === 'en' 
                        ? 'Sculpted out of solid glowing deep-sea coral, this magnificent palace houses historical scroll libraries and sacred ocean collectibles.' 
                        : 'Esculpido a partir de uma muralha sólida de coral, as colunatas deste palácio abrigam o tribunal das baleias e o museu das conchas cintilantes sagradas do pacífico.'}
                    </p>

                    <div className="bg-[#000d1e] border border-[#00BFFF] p-3 rounded-2xl text-[11px] text-purple-300 font-extrabold flex items-center gap-2">
                      <span>👑 {lang === 'en' ? 'Comfort Mode:' : 'Aconchego:'}</span> 
                      {lang === 'en' ? 'Designed to calm down children and help parents transition to sweet rest.' : 'Destinado a acalmar os ânimos de pais e crianças antes de ir para cama.'}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => {
                  if (isLoggedIn) {
                    onEnter();
                  } else {
                    audio.playMagicChime();
                    if (onOpenAuth) onOpenAuth();
                  }
                }}
                className={`w-full mt-6 py-4 font-fredoka font-black text-xs rounded-2xl shadow-lg transition-all text-center uppercase tracking-wider flex items-center justify-center gap-2 border-b-4 ${
                  isLoggedIn 
                    ? 'bg-gradient-to-r from-yellow-300 via-amber-400 to-[#FFCC00] text-slate-900 border-amber-600 hover:shadow-xl cursor-pointer hover:scale-[1.01] active:border-b-0 animate-pulse' 
                    : 'bg-gradient-to-b from-[#021832] to-[#000d1e] text-[#00FFFF] border-[#012549] hover:scale-[1.01] hover:border-[#00BFFF] cursor-pointer shadow-[#0B0D0A]/50'
                }`}
              >
                {isLoggedIn ? (
                  <span>{lang === 'en' ? 'Sail to This Sea of Stories 📖' : 'Navegar para este Mar de Histórias 📖'}</span>
                ) : (
                  <span className="flex items-center gap-1.5 text-orange-200 saturate-110">
                    <span>{lang === 'en' ? 'Locked - Sign in Required 🔒' : 'Bloqueado - Fazer Login para Navegar 🔒'}</span>
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
      </section>

      {/* 🔮 3. UNDERWATER KINGDOM: Coral Clams Exploration */}
      <section id="underwater-kingdom-anchor" className="space-y-12">
        
        {/* UNDERWATER KINGDOM BANNER MATCHED EXACTLY TO THE USER MOCKUP ILLUSTRATION */}
        <div className="bg-gradient-to-r from-[#000d1e] via-[#021832] to-[#00040a] border-4 border-[#00BFFF] rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white relative overflow-hidden select-none">
          {/* Bubbles animation effect in background */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_bottom,#00BFFF_0,transparent_100%)]"></div>
          
          {/* Left illustration: Glowing Underwater Castle */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-3 relative group">
            <div className="absolute -top-2 left-6 text-2xl animate-bounce">🧜‍♀️</div>
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-7xl filter drop-shadow-[0_12px_20px_rgba(0,191,255,0.3)]"
            >
              🏰🫧
            </motion.div>
            <div className="text-[10px] uppercase tracking-widest font-black text-cyan-300 border border-[#00BFFF]/50 px-2.5 py-1 rounded-md mt-3.5 bg-[#000d1e]/20 font-sans">
              {lang === 'en' ? 'Coral Castle' : 'Castelo Real'}
            </div>
          </div>

          {/* Center Info Panel */}
          <div className="w-full md:w-1/3 text-center space-y-4 relative z-10 px-2 flex flex-col items-center">
            <div className="space-y-1">
              <h3 className="text-3xl md:text-3.5xl font-fredoka font-black tracking-widest text-[#00FFFF] uppercase leading-none drop-shadow-sm">
                UNDERWATER KINGDOM
              </h3>
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-fredoka font-black text-[#00BFFF] tracking-wider">
                <span>✨</span>
                <span>{lang === 'en' ? 'A WORLD OF WONDER' : 'UM MUNDO DE MARAVILHAS'}</span>
                <span>✨</span>
              </div>
            </div>
            
            <p className="text-xs font-sans font-bold leading-relaxed text-[#A9EDFF]/90 max-w-sm mx-auto">
              {lang === 'en' 
                ? 'Dive into a breathtaking underwater kingdom filled with colorful coral, magical creatures, and ancient secrets!' 
                : 'Mergulhe em um mundo de tirar o fôlego, repleto de lindos corais, criaturas exóticas, segredos guardados e sereias brincalhonas!'}
            </p>

            <button
              onClick={() => handleScrollToId('interactive-clams-widget')}
              className="px-6 py-3 bg-[#022549] hover:bg-[#052C59] hover:scale-105 active:scale-95 text-white font-fredoka font-bold text-[11px] rounded-full shadow-[0_8px_20px_rgba(0,191,255,0.35)] transition-all cursor-pointer uppercase tracking-widest border border-[#00FFFF]"
            >
              {lang === 'en' ? 'DIVE IN NOW' : 'MERGULHAR AGORA'}
            </button>
          </div>

          {/* Right illustration: Friendly turtle and tropical fishes */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-3 relative group">
            <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse">🐡</div>
            <motion.div 
              animate={{ rotate: [0, 4, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-7xl filter drop-shadow-[0_12px_20px_rgba(52,211,153,0.3)]"
            >
              🐢🐠🐚
            </motion.div>
            <div className="text-[10px] uppercase tracking-widest font-black text-cyan-300 border border-[#00BFFF]/50 px-2.5 py-1 rounded-md mt-3.5 bg-[#000d1e]/20 font-sans">
              {lang === 'en' ? 'Ocean Friends' : 'Amigos do Mar'}
            </div>
          </div>
        </div>

        {/* CLAMS GRID interactive widget segment */}
        <div id="interactive-clams-widget" className="p-8 bg-[#00040a] border-[#00BFFF] border-2 md:border-3 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group scroll-mt-24 w-full">
          <div className="text-center space-y-4 max-w-2xl mx-auto relative z-10 font-sans">
            <span className="text-xs font-display font-medium uppercase tracking-widest text-[#FFD700] bg-amber-955 border border-amber-500 px-4 py-1.5 rounded-full inline-block">
              {lang === 'en' ? 'UNDERWATER CLAMS' : 'CONCHAS INTERATIVAS'}
            </span>
            <h2 className="text-2xl md:text-4xl font-fredoka font-black text-white uppercase leading-tight tracking-wider">
              {lang === 'en' ? 'THE CORAL REEF CLAMS' : 'AS CONCHAS DE CRISTAL'}
            </h2>
            <p className="text-[13px] text-[#A9EDFF] leading-relaxed font-semibold">
              {lang === 'en' 
                ? 'Click on each mysterious ocean clam to watch it pop open and reveal a premium magical coral crystal or animal!' 
                : 'Clique em cada concha clam misteriosa para abri-la e revelar uma pérola premiada ou um bichinho risonho do recife do Atlântico!'}
            </p>
          </div>

        {/* 5 Oysters / Clams column row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 pt-4 relative z-10">
          {[1, 2, 3, 4, 5].map((num) => {
            const openedValue = openClams[num];
            return (
              <motion.div
                key={num}
                whileHover={{ scale: 1.04 }}
                onClick={() => openClamAtIndex(num)}
                className={`p-5 rounded-2.5xl cursor-pointer border transition-all text-center flex flex-col justify-between items-center min-h-[145px] ${
                  openedValue 
                    ? 'bg-gradient-to-b from-[#021832] to-[#000d1e] border-amber-400 shadow-[0_10px_20px_rgba(251,191,36,0.15)] scale-102' 
                    : 'bg-[#021832] border-[#00BFFF] hover:border-amber-400 hover:bg-[#022549] shadow-md'
                }`}
              >
                <div className="text-[10px] font-bold text-[#00FFFF] uppercase tracking-wide">
                  {lang === 'en' ? `Clam #${num}` : `Concha #${num}`}
                </div>

                <div className="my-3 transition-transform duration-500">
                  {openedValue ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="text-3xl"
                    >
                      🦪
                    </motion.div>
                  ) : (
                    <div className="text-3.5xl hover:scale-110 transition-transform duration-150 select-none animate-pulse">
                      🐚
                    </div>
                  )}
                </div>

                <div className="w-full text-center">
                  {openedValue ? (
                    <span className="text-[10px] font-fredoka font-extrabold text-amber-400 block break-words tracking-tight">
                      {openedValue}
                    </span>
                  ) : (
                    <span className="text-[9px] uppercase font-bold text-[#00FFFF] tracking-widest block animate-pulse">
                      {lang === 'en' ? 'Tap to Open' : 'Tocar para Abrir'}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reset / Controls bar */}
        <div className="flex items-center justify-center gap-4 pt-6 max-w-sm mx-auto relative z-10">
          <button
            onClick={resetAllClams}
            disabled={Object.keys(openClams).length === 0}
            className="px-5 py-2.5 rounded-xl border border-amber-600 hover:border-amber-400 bg-amber-950 hover:bg-[#4E3906] text-amber-300 font-fredoka font-bold text-[10px] uppercase tracking-wider cursor-pointer transition-colors shadow-sm disabled:brightness-50 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'en' ? 'Cultivate New Clams' : 'Cultivar Novas Conchas'}</span>
          </button>
        </div>

        {renderLockOverlay()}
        </div>
      </section>

      {/* 🔮 4. UNLOCK THE MAGIC: Great subscription footer banner */}
      <section className="space-y-8 bg-gradient-to-r from-[#000d1e] via-[#021832] to-[#00040a] border-4 border-[#00BFFF]/50 p-8 md:p-12 rounded-[3.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden group text-center select-none w-full">
        {/* Glowing lights background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,#00BFFF_0,transparent_100%)]"></div>
        
        {/* Content Layout */}
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center space-y-6 relative z-10">
          
          {/* Animated Centered Magic elements & dolphins side-by-side */}
          <div className="flex items-center justify-center gap-6 md:gap-12">
            <motion.span 
              animate={{ y: [0, -12, 0], scale: [1, 1.05, 1], rotate: [-5, 5, -5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl md:text-7.5xl filter drop-shadow-[0_12px_20px_rgba(0,191,255,0.3)] block select-none"
            >
              🐬
            </motion.span>
            
            <motion.div 
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-7xl md:text-8.5xl filter drop-shadow-[0_15px_30px_rgba(251,191,36,0.5)] block select-none relative"
            >
              <span className="absolute -top-3 -right-3 text-3xl animate-pulse">🌟</span>
              👑🪙💎
            </motion.div>
            
            <motion.span 
              animate={{ y: [0, -12, 0], scale: [1, 1.05, 1], rotate: [5, -5, 5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="text-5xl md:text-7.5xl filter drop-shadow-[0_12px_20px_rgba(0,191,255,0.3)] block select-none"
            >
              🐬
            </motion.span>
          </div>

          {/* Heading content matched precisely to the mockup */}
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-fredoka font-black tracking-widest text-[#FFD700] bg-clip-text uppercase leading-none drop-shadow-md">
              UNLOCK THE MAGIC!
            </h2>
            <div className="text-[10px] md:text-xs font-fredoka font-black tracking-widest text-[#FFDF79] uppercase">
              {lang === 'en' ? 'YOUR ADVENTURE. YOUR STORY. YOUR TREASURES!' : 'SUA AVENTURA. SEU CONTO. SEU TESOURO SUPREMO!'}
            </div>
          </div>

          <p className="text-xs md:text-sm font-sans font-bold leading-relaxed text-[#A9EDFF] max-w-lg mx-auto">
            {lang === 'en' 
              ? 'Join now and be part of the magical ocean world! Empower your child with immersive auditory literacy.' 
              : 'Faça parte hoje mesmo do universo literário marinho! Estimule a escuta ativa e o imaginário com um portal sem igual.'}
          </p>

          <button
            onClick={() => handleScrollToId('plans-section-anchor')}
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 via-amber-550 to-emerald-600 hover:from-yellow-450 hover:to-emerald-500 hover:scale-104 active:scale-95 text-white font-fredoka font-black text-xs md:text-sm rounded-full shadow-[0_12px_25px_rgba(245,158,11,0.45)] transition-all cursor-pointer uppercase tracking-widest border-2 border-amber-300 animate-pulse"
          >
            {lang === 'en' ? 'JOIN THE ADVENTURE NOW!' : 'ENTRAR NA AVENTURA AGORA!'}
          </button>
        </div>
      </section>

    </div>
  );
};
