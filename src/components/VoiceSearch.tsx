import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Search, X, Sparkles, Volume2 } from 'lucide-react';
import { Language } from '../types';
import { audio } from './AudioEngine';

interface VoiceSearchProps {
  lang: Language;
  onSearch: (query: string) => void;
  currentSearchQuery: string;
}

const REGCOGNITION_LOCALES: Record<Language, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  it: 'it-IT',
  de: 'de-DE',
  zh: 'zh-CN'
};

const SUGGESTIONS: Record<Language, { label: string; query: string; emoji: string }[]> = {
  pt: [
    { label: 'Animais', query: 'animais', emoji: '🦄' },
    { label: 'Espacial', query: 'espacial', emoji: '🚀' },
    { label: 'Sereia', query: 'sereia', emoji: '🧜‍♀️' },
    { label: 'Gatos', query: 'gatos', emoji: '🐈' },
    { label: 'Dormir', query: 'dormir', emoji: '🌙' },
    { label: 'Aventura', query: 'aventura', emoji: '🧭' }
  ],
  en: [
    { label: 'Animals', query: 'animals', emoji: '🦄' },
    { label: 'Space', query: 'space', emoji: '🚀' },
    { label: 'Mermaid', query: 'mermaid', emoji: '🧜‍♀️' },
    { label: 'Cats', query: 'cats', emoji: '🐈' },
    { label: 'Bedtime', query: 'bedtime', emoji: '🌙' },
    { label: 'Adventures', query: 'ventures', emoji: '🧭' }
  ],
  es: [
    { label: 'Animales', query: 'animales', emoji: '🦄' },
    { label: 'Espacial', query: 'espacial', emoji: '🚀' },
    { label: 'Sirena', query: 'sirena', emoji: '🧜‍♀️' },
    { label: 'Gatos', query: 'gatos', emoji: '🐈' },
    { label: 'Dormir', query: 'dormir', emoji: '🌙' },
    { label: 'Aventura', query: 'aventura', emoji: '🧭' }
  ],
  fr: [
    { label: 'Animaux', query: 'animaux', emoji: '🦄' },
    { label: 'Espace', query: 'espace', emoji: '🚀' },
    { label: 'Sirène', query: 'sirène', emoji: '🧜‍♀️' },
    { label: 'Chats', query: 'chats', emoji: '🐈' },
    { label: 'Sommeil', query: 'bedtime', emoji: '🌙' },
    { label: 'Aventures', query: 'ventures', emoji: '🧭' }
  ],
  it: [
    { label: 'Animali', query: 'animali', emoji: '🦄' },
    { label: 'Spazio', query: 'spazio', emoji: '🚀' },
    { label: 'Sirena', query: 'sirena', emoji: '🧜‍♀️' },
    { label: 'Gatti', query: 'gatti', emoji: '🐈' },
    { label: 'Nanna', query: 'bedtime', emoji: '🌙' },
    { label: 'Avventure', query: 'ventures', emoji: '🧭' }
  ],
  de: [
    { label: 'Zaubertiere', query: 'animals', emoji: '🦄' },
    { label: 'Weltraum', query: 'space', emoji: '🚀' },
    { label: 'Meerjungfrau', query: 'mermaid', emoji: '🧜‍♀️' },
    { label: 'Katzen', query: 'cats', emoji: '🐈' },
    { label: 'Gute Nacht', query: 'bedtime', emoji: '🌙' },
    { label: 'Abenteuer', query: 'ventures', emoji: '🧭' }
  ],
  zh: [
    { label: '动物', query: 'animals', emoji: '🦄' },
    { label: '太空', query: 'space', emoji: '🚀' },
    { label: '美人鱼', query: 'mermaid', emoji: '🧜‍♀️' },
    { label: '小猫', query: 'cats', emoji: '🐈' },
    { label: '午夜故事', query: 'bedtime', emoji: '🌙' },
    { label: '冒险故事', query: 'ventures', emoji: '🧭' }
  ]
};

const VOICE_SEARCH_TRANSLATIONS = {
  pt: {
    placeholder: 'Digite ou diga palavras mágicas como "animais"...',
    listening: 'Estou ouvindo... Fale agora! 🎙️🌟',
    notSupported: 'Reconhecimento de voz não suportado neste navegador. Digite abaixo!',
    micError: 'Não consegui te ouvir ou microfone bloqueado 💖',
    suggestionsLabel: 'Diga ou toque uma palavra mágica:',
    noMatchTitle: 'História não encontrada',
    noMatchText: 'Nenhum livro combina perfeitamente com esse termo mágico. Escolha um tema abaixo para pesquisar:',
    clearSearch: 'Limpar busca',
    searchingFor: 'Pesquisando: '
  },
  en: {
    placeholder: 'Type or say magical words like "animals"...',
    listening: 'I\'m listening... Speak now! 🎙️🌟',
    notSupported: 'Voice recognition is not supported in this browser. Type below!',
    micError: 'Couldn\'t hear you or microphone access blocked 💖',
    suggestionsLabel: 'Say or tap a magical keyword:',
    noMatchTitle: 'No stories found',
    noMatchText: 'No magical stories match this keyword. Tap a keyword below to explore:',
    clearSearch: 'Clear search',
    searchingFor: 'Searching for: '
  },
  es: {
    placeholder: 'Escribe o di palabras mágicas como "animales"...',
    listening: 'Te estoy escuchando... ¡Habla ahora! 🎙️🌟',
    notSupported: 'El reconocimiento de voz no es compatible. ¡Escribe abajo!',
    micError: 'No pude escucharte o micrófono bloqueado 💖',
    suggestionsLabel: 'Di o toca una palabra mágica:',
    noMatchTitle: 'Historia no encontrada',
    noMatchText: 'Ningún libro coincide con este término mágico. Elige un tema abajo:',
    clearSearch: 'Limpiar búsqueda',
    searchingFor: 'Buscando: '
  },
  fr: {
    placeholder: 'Écrivez ou dites des mots magiques comme "animaux"...',
    listening: 'J\'écoute... Parlez maintenant ! 🎙️🌟',
    notSupported: 'Reconnaissance vocale non supportée. Écrivez ci-dessous !',
    micError: 'Je ne vous ai pas entendu ou micro bloqué 💖',
    suggestionsLabel: 'Dites ou touchez un mot magique :',
    noMatchTitle: 'Histoire introuvable',
    noMatchText: 'Aucun livre ne correspond à ce mot magique. Essayez un mot ci-dessous :',
    clearSearch: 'Effacer la recherche',
    searchingFor: 'Recherche de : '
  },
  it: {
    placeholder: 'Digita o pronuncia parole magiche come "animali"...',
    listening: 'Sto ascoltando... Parla ora! 🎙️🌟',
    notSupported: 'Riconoscimento vocale non supportato. Digita qui sotto!',
    micError: 'Non ho sentito nulla o accesso al microfono bloccato 💖',
    suggestionsLabel: 'Pronuncia o tocca una parola magica:',
    noMatchTitle: 'Nessuna storia trovata',
    noMatchText: 'Nessun libro si adatta a questa parola magica. Prova uno dei seguenti:',
    clearSearch: 'Svuota ricerca',
    searchingFor: 'Ricerca di: '
  },
  de: {
    placeholder: 'Tippe oder sprich Zauberworte wie „Tiere“...',
    listening: 'Ich höre zu... Sprich jetzt! 🎙️🌟',
    notSupported: 'Spracherkennung wird nicht unterstützt. Tippe einfach unten!',
    micError: 'Konntest dich nicht hören oder Mikrofon blockiert 💖',
    suggestionsLabel: 'Sprich oder tippe ein Zauberwort:',
    noMatchTitle: 'Keine Geschichten gefunden',
    noMatchText: 'Kein magisches Buch passt zu diesem Begriff. Tippe auf ein Zauberwort:',
    clearSearch: 'Suche löschen',
    searchingFor: 'Suche nach: '
  },
  zh: {
    placeholder: '输入或说出“动物”这样的魔法词语...',
    listening: '正在倾听... 请说话！🎙️🌟',
    notSupported: '当前浏览器不支持语音识别。请在下方输入！',
    micError: '听不清或麦克风已被禁用 💖',
    suggestionsLabel: '大声说出或点击魔法关键词：',
    noMatchTitle: '找不到故事',
    noMatchText: '没有找到匹配的奇幻故事。请点击下方的主题探索：',
    clearSearch: '清除搜索',
    searchingFor: '正在搜索：'
  }
};

export function VoiceSearch({ lang, onSearch, currentSearchQuery }: VoiceSearchProps) {
  const [inputText, setInputText] = useState(currentSearchQuery);
  const [isListening, setIsListening] = useState(false);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const strings = VOICE_SEARCH_TRANSLATIONS[lang] || VOICE_SEARCH_TRANSLATIONS.pt;

  // Track outer changes to query
  useEffect(() => {
    setInputText(currentSearchQuery);
  }, [currentSearchQuery]);

  // Speech Recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = REGCOGNITION_LOCALES[lang] || 'pt-BR';

        rec.onstart = () => {
          setIsListening(true);
          setRecognitionError(null);
        };

        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            audio.playMagicChime();
            onSearch(transcript);
            setInputText(transcript);
          }
          setIsListening(false);
        };

        rec.onerror = (event: any) => {
          console.error('Speech Recognition Error', event.error);
          if (event.error === 'not-allowed') {
            setRecognitionError(strings.micError);
          } else {
            setRecognitionError(strings.micError);
          }
          setIsListening(false);
        };

        rec.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = rec;
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, [lang, strings.micError]);

  const toggleListening = () => {
    audio.playSystemPop();
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      setRecognitionError(null);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = REGCOGNITION_LOCALES[lang] || 'pt-BR';
          recognitionRef.current.start();
        } catch (e) {
          console.error(e);
          // Retry
          try {
            recognitionRef.current.abort();
            recognitionRef.current.start();
          } catch (err) {
            setRecognitionError(strings.micError);
          }
        }
      } else {
        setRecognitionError(strings.notSupported);
      }
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    onSearch(text);
  };

  const clearSearch = () => {
    audio.playSystemPop();
    setInputText('');
    onSearch('');
    setRecognitionError(null);
  };

  const handleSuggestionClick = (query: string) => {
    audio.playMagicChime();
    setInputText(query);
    onSearch(query);
  };

  const langSuggestions = SUGGESTIONS[lang] || SUGGESTIONS.pt;

  return (
    <div id="voice-search-card" className="bg-[#1D271A] border-2 border-[#34422F] hover:border-[#8FA88B]/80 rounded-[2.25rem] p-5 shadow-xl relative overflow-hidden transition-all duration-300">
      
      {/* Sparkles background décor */}
      <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-10">
        <Sparkles className="w-12 h-12 text-yellow-300 animate-spin" style={{ animationDuration: '30s' }} />
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        
        {/* Search bar input with Mic Button and Search indicator */}
        <div className="flex items-center gap-3 w-full bg-[#141A10]/95 border border-[#34422F] focus-within:border-[#8FA88B] rounded-2xl md:rounded-3xl p-1.5 px-3 md:px-4 shadow-inner transition-all">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          
          <input
            id="story-voice-search-input"
            type="text"
            value={inputText}
            onChange={handleTextChange}
            placeholder={strings.placeholder}
            className="flex-1 bg-transparent text-sm md:text-base text-slate-100 placeholder-[#8FA88B]/50 border-none outline-none focus:ring-0 min-h-[44px] font-fredoka py-1"
          />

          {inputText && (
            <button
              onClick={clearSearch}
              className="p-1 px-2.5 text-xs text-[#C2D9C2] bg-[#34422F] hover:bg-red-950/20 hover:text-red-300 rounded-xl cursor-pointer transition-colors font-fredoka flex items-center gap-1 shrink-0"
              title={strings.clearSearch}
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[10px] uppercase font-black tracking-wider">{strings.clearSearch}</span>
            </button>
          )}

          {/* Voice Search Mic Action Button */}
          <button
            id="mic-voice-search-btn"
            onClick={toggleListening}
            className={`cursor-pointer w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all relative shrink-0 border-b-2 ${
              isListening
                ? 'bg-gradient-to-r from-red-500 to-pink-600 border-red-800 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-bounce'
                : 'bg-gradient-to-r from-indigo-500 via-[#8A7CFF] to-sky-400 hover:from-indigo-400 hover:to-sky-300 border-indigo-700 hover:border-indigo-500 text-[#090E26] shadow-md hover:scale-105 active:scale-95'
            }`}
            title="Clique para falar"
          >
            {isListening ? (
              <span className="relative flex h-5 h-5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                <Mic className="w-4 h-4 text-white relative z-10" />
              </span>
            ) : (
              <Mic className="w-5 h-5" />
            )}
            
            {/* Visual Listening Sound Waves Orbit when active */}
            {isListening && (
              <span className="absolute -inset-1.5 border-2 border-red-400 rounded-full animate-ping opacity-25"></span>
            )}
          </button>
        </div>

        {/* Listening waveforms + helpful prompts */}
        <AnimatePresence mode="wait">
          {isListening && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex items-center justify-center gap-3.5 py-1 bg-indigo-950/40 border border-indigo-900/50 rounded-2xl text-[#AFE2FF]"
            >
              {/* Pulse Lines Waveform */}
              <div className="flex items-end gap-1 h-5 shrink-0">
                <span className="w-1 bg-[#8A7CFF] rounded-full animate-bounce" style={{ height: '60%', animationDuration: '0.4s' }}></span>
                <span className="w-1 bg-sky-400 rounded-full animate-bounce" style={{ height: '100%', animationDuration: '0.6s' }}></span>
                <span className="w-1 bg-pink-400 rounded-full animate-bounce" style={{ height: '40%', animationDuration: '0.3s' }}></span>
                <span className="w-1 bg-purple-400 rounded-full animate-bounce" style={{ height: '80%', animationDuration: '0.5s' }}></span>
                <span className="w-1 bg-yellow-400 rounded-full animate-bounce" style={{ height: '50%', animationDuration: '0.4s' }}></span>
              </div>
              <span className="text-xs md:text-sm font-fredoka font-black tracking-wide uppercase pulse-scale">
                {strings.listening}
              </span>
            </motion.div>
          )}

          {recognitionError && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex items-center gap-2 py-2 px-3 bg-red-950/20 border border-red-900/50 rounded-xl text-red-300 font-fredoka font-semibold text-xs"
            >
              <MicOff className="w-4 h-4 text-red-400 inline shrink-0" />
              <span>{recognitionError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggestions Quick Buttons Shelf */}
        <div className="space-y-2 mt-1">
          <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-fredoka font-extrabold text-[#A6D5FF]/85 uppercase tracking-wider">
            <Volume2 className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>{strings.suggestionsLabel}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {langSuggestions.map((sug) => (
              <button
                key={sug.label}
                onClick={() => handleSuggestionClick(sug.query)}
                className={`px-3 py-1.5 rounded-full text-xs font-fredoka font-bold cursor-pointer border hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 ${
                  inputText.toLowerCase() === sug.query.toLowerCase()
                    ? 'bg-indigo-600 border-[#8A7CFF] text-white shadow-md'
                    : 'bg-[#182654]/80 hover:bg-[#20316E] border-[#2C3E82]/75 text-sky-200'
                }`}
              >
                <span>{sug.emoji}</span>
                <span>{sug.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
