import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Sparkles, 
  Music, 
  Sliders, 
  Activity, 
  Check, 
  AlertTriangle,
  User,
  Wand2,
  Info
} from 'lucide-react';
import { audio } from './AudioEngine';
import { Language } from '../types';

interface SoundTestModalProps {
  lang: Language;
  onClose: () => void;
}

const SENTENCES: Record<Language, { text: string; label: string }[]> = {
  pt: [
    { text: "As estrelas azuis brilham alegremente no céu da noite secreta.", label: "Céu Estrelado 🌟" },
    { text: "O pequeno unicórnio correu feliz entre os cogumelos mágicos do jardim.", label: "Unicórnio Feliz 🦄" },
    { text: "O peixinho luminoso nada dando piruetas no fundo do oceano brilhante.", label: "Peixe Cósmico 🐟" },
    { text: "É hora de fechar os olhinhos, se cobrir bem quentinho e dormir bem.", label: "Hora de Dormir 🌙" }
  ],
  en: [
    { text: "The magic wand sparkles with golden dust in the beautiful wizard school.", label: "Sparks 🪄" },
    { text: "Rest your sleepy head, little explorer, and dream of friendly space dragons.", label: "Bedtime 🐉" },
    { text: "The happy little whale sings a gentle melody under the soft ocean waves.", label: "Singing Whale 🐋" }
  ],
  es: [
    { text: "La tierna ardilla vuela con globos de colores sobre el arcoíris.", label: "Ardilla Voladora 🐿️" },
    { text: "El dragón dorado guarda el cofre de cuentos alegres.", label: "Cofre de Cuentos 🐉" }
  ],
  fr: [
    { text: "Le petit lapin blanc danse sous la lumière douce de la lune.", label: "Lapin de Lune 🐇" },
    { text: "Ferme les yeux, petit aventurier, la fée des songes arrive.", label: "Rêve Douce 🧚‍♀️" }
  ],
  it: [
    { text: "La simpatica stellina fa l'occhiolino a tutti i bambini della Terra.", label: "Stellina ⭐️" }
  ],
  de: [
    { text: "Der kleine schlaue Fuchs liest ein spannendes Buch im Abenteuerwald.", label: "Schlauer Fuchs 🦊" }
  ],
  zh: [
    { text: "神奇的小恐龙在云朵城堡里和小星星捉迷藏。", label: "捉迷藏 🦖" }
  ]
};

export function SoundTestModal({ lang, onClose }: SoundTestModalProps) {
  const [inputText, setInputText] = useState(() => {
    const list = SENTENCES[lang] || SENTENCES.pt;
    return list[0]?.text || "Mundo Mágico das Estorinhas!";
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [activeWordIndices, setActiveWordIndices] = useState<number[]>([]);
  const [currentVolume, setCurrentVolume] = useState(50);
  const [voiceProvider, setVoiceProvider] = useState<'gemini' | 'browser'>(() => {
    const active = audio.getTtsProvider();
    return active === 'browser' ? 'browser' : 'gemini';
  });
  
  const [voiceGender, setVoiceGender] = useState<'masculino' | 'feminino'>('feminino');
  const [voiceAge, setVoiceAge] = useState<'adulto' | 'infantil' | 'idoso'>('infantil');

  // Diagnostic checklist states
  const [diagnosed, setDiagnosed] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [hasAudioContext, setHasAudioContext] = useState<boolean>(false);
  const [hasSpeechSynthesis, setHasSpeechSynthesis] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasAudioContext(!!(window.AudioContext || (window as any).webkitAudioContext));
      setHasSpeechSynthesis('speechSynthesis' in window);
      
      // Look for interaction unfreeze flags
      const testCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setIsUnlocked(testCtx.state !== 'suspended');
      testCtx.close();
    }
  }, []);

  // Split input into words for highlighting
  const [wordTokens, setWordTokens] = useState<{ word: string; start: number; end: number }[]>([]);

  useEffect(() => {
    const tokens: { word: string; start: number; end: number }[] = [];
    let currentPos = 0;
    // Split keeping spacing to correctly map indexes
    const parts = inputText.split(/(\s+)/);
    parts.forEach(part => {
      if (/\S+/.test(part)) {
        tokens.push({
          word: part,
          start: currentPos,
          end: currentPos + part.length
        });
      }
      currentPos += part.length;
    });
    setWordTokens(tokens);
    setActiveWordIndices([]);
  }, [inputText]);

  const handleStop = () => {
    audio.stopSpeech();
    setIsPlaying(false);
    setActiveWordIndices([]);
    setPlaybackProgress(0);
  };

  const handleSpeak = () => {
    audio.playSystemPop();
    handleStop();

    if (!inputText.trim()) return;

    setIsPlaying(true);
    setPlaybackProgress(5);
    audio.setTtsProvider(voiceProvider);

    audio.speakText(
      inputText,
      lang,
      voiceGender,
      voiceAge,
      (charIndex, length) => {
        // Map char index to word token
        const matchIdxs: number[] = [];
        wordTokens.forEach((token, idx) => {
          // Word falls within or overlaps boundary
          const isOverlap = (charIndex >= token.start && charIndex < token.end) || 
                            (token.start >= charIndex && token.start < charIndex + length);
          if (isOverlap) {
            matchIdxs.push(idx);
          }
        });
        if (matchIdxs.length > 0) {
          setActiveWordIndices(matchIdxs);
        }
      },
      () => {
        setIsPlaying(false);
        setActiveWordIndices([]);
        setPlaybackProgress(100);
      },
      (prog) => {
        setPlaybackProgress(prog);
      }
    );
  };

  const handleVolumeChange = (val: number) => {
    setCurrentVolume(val);
    audio.setVolume(val / 100);
  };

  const handlePlayDiagnostic = () => {
    setDiagnosed('running');
    audio.playDiagnosticTestSound();
    
    // Simulate brief processing check
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const synthOk = 'speechSynthesis' in window;
        // @ts-ignore
        const audioContextClass = window.AudioContext || window.webkitAudioContext;
        if (synthOk && audioContextClass) {
          setDiagnosed('success');
        } else {
          setDiagnosed('failed');
        }
      }
    }, 1200);
  };

  return (
    <div 
      id="sound-test-modal-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        className="w-full max-w-2xl bg-[#03152B]/95 border-4 border-[#00BFFF] rounded-[2rem] p-6 md:p-8 text-[#D4F6FF] shadow-[0_20px_50px_rgba(0,191,255,0.4)] relative"
      >
        {/* Close Button */}
        <button
          id="sound-test-close-btn"
          onClick={() => {
            handleStop();
            audio.playSystemPop();
            onClose();
          }}
          className="absolute top-5 right-5 h-9 w-9 bg-[#022549] hover:bg-[#05417A] text-[#00FFFF] border border-[#00BFFF] rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Accent */}
        <div className="flex items-center gap-3 border-b-2 border-[#00BFFF]/30 pb-4 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#00FFFF] to-[#015CBE] flex items-center justify-center text-xl shrink-0">
            🔊
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-fredoka font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFFF] to-[#00BFFF]">
              {lang === 'pt' ? 'Laboratório de Som Mágico' : 'Magical Sound Laboratory'}
            </h2>
            <p className="text-[10px] md:text-xs text-[#A9EDFF] font-semibold tracking-wider uppercase">
              {lang === 'pt' ? 'Ajuste, teste e diagnostique seu áudio no tablet ou PC!' : 'Configure, test, and diagnose your tablet or PC sound!'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick instructions alert */}
          <div className="p-3.5 bg-[#011428] rounded-xl border border-[#00BFFF]/40 text-[11px] leading-relaxed text-[#A9EDFF] flex gap-2.5 items-start">
            <Info className="w-4 h-4 text-[#00FFFF] shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-white">
                {lang === 'pt' ? 'Dica de Ouro:' : 'Golden Tip:'}
              </span>{' '}
              {lang === 'pt' 
                ? 'Se não conseguir ouvir nada, verifique se seu aparelho está no modo silencioso, se o controle físico de volume está alto e se permitiu som clicando no botão diagnóstico abaixo.'
                : 'If you can hear nothing, check if your device is set to silent/vibrate, verify your physical volume key, and tap the diagnostic check below.'}
            </div>
          </div>

          {/* SECTION 1: DYNAMIC WORD SPEAKER */}
          <div id="sound-test-speaker-section" className="bg-[#021832] rounded-2xl p-5 border border-[#00BFFF]/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                {lang === 'pt' ? 'Teste de Pronúncia e Palavras' : 'Word & Pronunciation Test'}
              </span>
              <span className="text-[9px] bg-indigo-900 border border-indigo-500 font-bold px-2 py-0.5 rounded-full select-none text-indigo-100">
                {lang === 'pt' ? 'Efeito Letrinhas Sincronizadas' : 'Synced Words'}
              </span>
            </div>

            {/* Suggested quick sentences tabs */}
            <div className="flex flex-wrap gap-1.5">
              {(SENTENCES[lang] || SENTENCES.pt).map((sent, index) => (
                <button
                  key={index}
                  onClick={() => {
                    audio.playSystemPop();
                    setInputText(sent.text);
                    handleStop();
                  }}
                  className={`text-[10px] px-3 py-1.5 rounded-lg border font-bold cursor-pointer transition-all ${
                    inputText === sent.text
                      ? 'bg-[#00FFFF] text-[#001730] border-[#00FFFF] scale-102'
                      : 'bg-[#022549] hover:bg-[#053768] text-slate-200 border-[#00BFFF]/40'
                  }`}
                >
                  {sent.label}
                </button>
              ))}
            </div>

            {/* Input field to write custom sentences */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-semibold block uppercase">
                {lang === 'pt' ? 'Digite qualquer frase que desejar:' : 'Or type any magic sentence:'}
              </label>
              <textarea
                id="sound-test-sentence-input"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  handleStop();
                }}
                maxLength={140}
                placeholder={lang === 'pt' ? 'Escreva alguma coisa pra ouvir...' : 'Type some magical words to hear...'}
                className="w-full bg-[#011428] border-2 border-[#00BFFF]/40 focus:border-[#00FFFF] text-xs font-medium text-white px-3 py-2 rounded-xl focus:outline-none resize-none h-14 transition-colors"
              />
            </div>

            {/* Word Highlight Board */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-[#00BFFF]/20 min-h-[4.5rem] flex flex-wrap gap-x-2 gap-y-3 items-center justify-center">
              {wordTokens.length === 0 ? (
                <span className="text-xs text-slate-500 font-medium italic">
                  {lang === 'pt' ? 'Digite palavras acima para testar...' : 'Type words above to test...'}
                </span>
              ) : (
                wordTokens.map((t, idx) => {
                  const isHighlighted = activeWordIndices.includes(idx);
                  return (
                    <motion.span
                      key={idx}
                      id={`test-word-item-${idx}`}
                      animate={isHighlighted ? { scale: 1.15 } : { scale: 1 }}
                      className={`text-xs md:text-sm font-fredoka font-bold rounded-lg px-1.5 py-0.5 transition-all scroll-mt-2 duration-100 ${
                        isHighlighted
                          ? 'bg-gradient-to-r from-yellow-300 to-amber-400 text-slate-950 font-black shadow-[0_0_12px_rgba(253,224,71,0.6)] border-2 border-amber-300'
                          : isPlaying 
                            ? 'text-slate-400 border border-transparent' 
                            : 'text-slate-200 border-b border-dashed border-[#00BFFF]/35'
                      }`}
                    >
                      {t.word}
                    </motion.span>
                  );
                })
              )}
            </div>

            {/* Playing Status and Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {!isPlaying ? (
                  <button
                    id="sound-test-play-voice-btn"
                    onClick={handleSpeak}
                    disabled={!inputText.trim()}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-fredoka font-bold text-xs rounded-xl flex items-center gap-1.5 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer shadow-md transition-all uppercase tracking-wider"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{lang === 'pt' ? 'Ouvir Frase 🔊' : 'Speak Text 🔊'}</span>
                  </button>
                ) : (
                  <button
                    id="sound-test-stop-voice-btn"
                    onClick={handleStop}
                    className="px-5 py-2.5 bg-red-500 hover:bg-red-400 text-white font-fredoka font-extrabold text-xs rounded-xl flex items-center gap-1.5 hover:scale-105 active:scale-95 cursor-pointer shadow-md transition-all uppercase tracking-wider"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>{lang === 'pt' ? 'Parar Som 🛑' : 'Stop Sound 🛑'}</span>
                  </button>
                )}
              </div>

              {/* Progress ribbon */}
              {isPlaying && (
                <div className="w-full sm:flex-1 h-2 bg-[#011428] rounded-full overflow-hidden border border-[#00BFFF]/20">
                  <motion.div 
                    className="h-full bg-[#00FFFF]"
                    animate={{ width: `${playbackProgress}%` }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* SECTION 2: AUDIO ADJUSTMENTS */}
          <div id="sound-test-adjust-section" className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tuning Controls */}
            <div className="bg-[#021832] rounded-2xl p-4 border border-[#00BFFF]/20 space-y-3.5">
              <span className="text-xs font-black text-[#00FFFF] uppercase tracking-widest flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#00FFFF]" />
                {lang === 'pt' ? 'Configurar Voz' : 'Voice Tuning'}
              </span>

              {/* Engine Toggle */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">
                  {lang === 'pt' ? 'Motor Narrador:' : 'Voice Engine:'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="sound-test-engine-gemini"
                    onClick={() => {
                      audio.playSystemPop();
                      setVoiceProvider('gemini');
                      handleStop();
                    }}
                    className={`px-3 py-2 rounded-xl text-[10px] font-bold border cursor-pointer transition-all ${
                      voiceProvider === 'gemini'
                        ? 'bg-indigo-900 border-[#00FFFF] text-[#00FFFF] font-extrabold shadow-[inner]'
                        : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ✨ Gemini Cloud (HD)
                  </button>
                  <button
                    id="sound-test-engine-browser"
                    onClick={() => {
                      audio.playSystemPop();
                      setVoiceProvider('browser');
                      handleStop();
                    }}
                    className={`px-3 py-2 rounded-xl text-[10px] font-bold border cursor-pointer transition-all ${
                      voiceProvider === 'browser'
                        ? 'bg-indigo-900 border-[#00FFFF] text-[#00FFFF] font-extrabold shadow-[inner]'
                        : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    💻 {lang === 'pt' ? 'Nativo do Aparelho' : 'Device Speech'}
                  </button>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    {lang === 'pt' ? 'Volume do Aplicativo:' : 'Application Volume:'}
                  </span>
                  <span className="text-[10px] text-[#00FFFF] font-bold">{currentVolume}%</span>
                </div>
                <div className="flex items-center gap-3">
                  {currentVolume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400 shrink-0" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#00FFFF] shrink-0" />
                  )}
                  <input
                    id="sound-test-volume-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={currentVolume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="flex-1 accent-[#00FFFF] cursor-pointer bg-[#011428] h-1.5 rounded-lg appearance-none"
                  />
                </div>
              </div>

              {/* Age / Gender simulation test */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">
                    {lang === 'pt' ? 'Gênero:' : 'Gender:'}
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(['feminino', 'masculino'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => {
                          audio.playSystemPop();
                          setVoiceGender(g);
                        }}
                        className={`py-1 rounded text-[9px] font-bold border cursor-pointer transition-all ${
                          voiceGender === g
                            ? 'bg-[#022549] text-white border-[#00BFFF]'
                            : 'bg-slate-900/50 border-transparent text-slate-400 text-center'
                        }`}
                      >
                        {g === 'feminino' ? '🧚‍♀️ F' : '🧙‍♂️ M'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">
                    {lang === 'pt' ? 'Personagem / Tom:' : 'Avatar Voice:'}
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {(['infantil', 'adulto', 'idoso'] as const).map((a) => (
                      <button
                        key={a}
                        onClick={() => {
                          audio.playSystemPop();
                          setVoiceAge(a);
                        }}
                        className={`py-1 rounded text-[8px] font-fredoka font-bold border cursor-pointer transition-all ${
                          voiceAge === a
                            ? 'bg-[#022549] text-yellow-300 border-[#00BFFF]'
                            : 'bg-slate-900/50 border-transparent text-slate-400'
                        }`}
                      >
                        {a === 'infantil' ? '🧒 Criança' : a === 'adulto' ? '👩 Adulto' : '👵 Idoso'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Soundboard sound effects synthesizer tests */}
            <div id="sound-test-soundboard" className="bg-[#021832] rounded-2xl p-4 border border-[#00BFFF]/20 space-y-3">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-amber-400" />
                {lang === 'pt' ? 'Efeitos Especiais (WebAudio)' : 'Sound FX Board'}
              </span>
              <p className="text-[10px] text-slate-400 leading-normal font-semibold">
                {lang === 'pt' 
                  ? 'Estes barulhinhos são gerados na hora usando ondas senoidais pela placa física para confirmar que o falante funciona!'
                  : 'These cute alerts are synthesized live using physical sine waves to verify your physical card outputs.'}
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  id="soundboard-chime-btn"
                  onClick={() => audio.playMagicChime()}
                  className="px-3 py-2.5 bg-slate-900/60 hover:bg-slate-900 border border-[#00BFFF]/30 rounded-xl text-[10px] font-fredoka font-bold text-cyan-300 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all text-left cursor-pointer"
                >
                  <span>🪄</span>
                  <div>
                    <span className="block text-white font-extrabold">{lang === 'pt' ? 'Chapeuzinho Fada' : 'Fairy Chimes'}</span>
                    <span className="text-[8px] text-slate-500 font-sans font-medium">Pentatonic sweeps</span>
                  </div>
                </button>

                <button
                  id="soundboard-pop-btn"
                  onClick={() => audio.playSystemPop()}
                  className="px-3 py-2.5 bg-slate-900/60 hover:bg-slate-900 border border-[#00BFFF]/30 rounded-xl text-[10px] font-fredoka font-bold text-amber-300 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all text-left cursor-pointer"
                >
                  <span>🫧</span>
                  <div>
                    <span className="block text-white font-extrabold">{lang === 'pt' ? 'Plop Bolha' : 'Bubble Pop'}</span>
                    <span className="text-[8px] text-slate-500 font-sans font-medium">Bouncy click synth</span>
                  </div>
                </button>

                <button
                  id="soundboard-flip-btn"
                  onClick={() => audio.playPageFlip()}
                  className="px-3 py-2.5 bg-slate-900/60 hover:bg-slate-900 border border-[#00BFFF]/30 rounded-xl text-[10px] font-fredoka font-bold text-emerald-350 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all text-left cursor-pointer"
                >
                  <span>📄</span>
                  <div>
                    <span className="block text-white font-extrabold">{lang === 'pt' ? 'Folha de Papel' : 'Page Swoosh'}</span>
                    <span className="text-[8px] text-slate-500 font-sans font-medium">Pink noise flutter</span>
                  </div>
                </button>

                <button
                  id="soundboard-spell-btn"
                  onClick={() => {
                    // Try to play majestic spell sound
                    try {
                      (audio as any).playFairySpell();
                    } catch (e) {
                      audio.playMagicChime();
                    }
                  }}
                  className="px-3 py-2.5 bg-slate-900/60 hover:bg-slate-900 border border-[#00BFFF]/30 rounded-xl text-[10px] font-fredoka font-bold text-purple-350 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all text-left cursor-pointer"
                >
                  <span>🔮</span>
                  <div>
                    <span className="block text-white font-extrabold">{lang === 'pt' ? 'Canto Celestial' : 'Star Sweep'}</span>
                    <span className="text-[8px] text-slate-500 font-sans font-medium">High frequency roll</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 3: HARWARE DIAGNOSTICS & PERMISSIONS COMPLIANCE */}
          <div id="sound-test-diagnostic-checker" className="bg-[#021832] rounded-2xl p-4 border border-[#00BFFF]/20 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <span className="text-xs font-black text-rose-300 uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-rose-300" />
                {lang === 'pt' ? 'Auto-Diagnóstico de Hardware' : 'Audio Hardware Diagnostics'}
              </span>

              <button
                id="sound-test-run-diag"
                onClick={handlePlayDiagnostic}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-950 text-rose-300 hover:text-white border border-rose-500/40 text-[10px] font-black rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer uppercase tracking-wider"
              >
                <span>⚡</span>
                <span>{lang === 'pt' ? 'Iniciar Verificação Rápida' : 'Run Self Assessment'}</span>
              </button>
            </div>

            {/* Diagnostic parameters grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 text-center space-y-1">
                <span className="text-[8px] text-slate-500 font-extrabold uppercase block leading-none">Web Audio API</span>
                <span className={`text-[10px] font-bold block ${hasAudioContext ? 'text-emerald-450' : 'text-red-400'}`}>
                  {hasAudioContext ? (lang === 'pt' ? '✅ Disponível' : '✅ Active') : (lang === 'pt' ? '❌ Indisponível' : '❌ Unsupported')}
                </span>
              </div>

              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 text-center space-y-1">
                <span className="text-[8px] text-slate-500 font-extrabold uppercase block leading-none">Local Synthesis</span>
                <span className={`text-[10px] font-bold block ${hasSpeechSynthesis ? 'text-emerald-450' : 'text-red-400'}`}>
                  {hasSpeechSynthesis ? (lang === 'pt' ? '✅ Ativado' : '✅ Active') : (lang === 'pt' ? '❌ Bloqueado' : '❌ Blocked')}
                </span>
              </div>

              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 text-center space-y-1">
                <span className="text-[8px] text-slate-500 font-extrabold uppercase block leading-none">Safari Safe Interaction</span>
                <span className={`text-[10px] font-bold block ${isUnlocked ? 'text-emerald-450' : 'text-amber-450'}`}>
                  {isUnlocked ? (lang === 'pt' ? '✅ Desbloqueado' : '✅ Unlocked') : (lang === 'pt' ? '⚠️ Aguardando Clique' : '⚠️ Awaiting Click')}
                </span>
              </div>

              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 text-center space-y-1">
                <span className="text-[8px] text-slate-500 font-extrabold uppercase block leading-none">Nível de Volume</span>
                <span className={`text-[10px] font-bold block ${currentVolume > 0 ? 'text-emerald-450' : 'text-rose-400'}`}>
                  {currentVolume > 0 ? `🔊 ${currentVolume}%` : (lang === 'pt' ? '🔇 Silenciado' : '🔇 Muted')}
                </span>
              </div>
            </div>

            {diagnosed === 'running' && (
              <div className="text-center text-[10px] text-rose-300 font-black animate-pulse py-1">
                🎶 {lang === 'pt' ? 'Tocando melodia de teste físico de alto-falante...' : 'Playing hardware frequency test arpeggio...'}
              </div>
            )}

            {diagnosed === 'success' && (
              <div className="p-3 bg-emerald-950/40 text-emerald-350 border border-emerald-800/60 rounded-xl text-[10px] font-bold flex gap-1.5 items-center">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'pt' 
                    ? 'Excelente! Seu navegador suporta todo o sistema de som. Se ainda assim não ouvir nada, verifique o volume físico lateral de seu aparelho.' 
                    : 'Success! Your host browser fully supports the audio stack. If silent, verify physical slide sliders.'}
                </span>
              </div>
            )}

            {diagnosed === 'failed' && (
              <div className="p-3 bg-red-950/40 text-red-300 border border-red-900/60 rounded-xl text-[10px] font-bold flex gap-1.5 items-center">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>
                  {lang === 'pt' 
                    ? 'Identificamos restrições no recurso de síntese do aparelho. Recomendamos alternar o motor acima para "Gemini Cloud (HD)".' 
                    : 'Some synthesis locks found. We recommend using Cloud-based Gemini voices.'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer info lock block */}
        <div className="mt-6 flex items-center justify-between text-[9px] text-[#00BFFF]/60 font-semibold border-t border-[#00BFFF]/20 pt-4">
          <span>{lang === 'pt' ? 'Mundo das Estorinhas 3D' : 'Magic Stories Sound Diagnostic'}</span>
          <span>Web Audio Context: {audio ? "Initialized" : "Suspended"}</span>
        </div>
      </motion.div>
    </div>
  );
}
