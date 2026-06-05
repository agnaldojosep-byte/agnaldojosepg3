import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { APP_TRANSLATIONS } from '../data/stories';
import { Sparkles, Volume2 } from 'lucide-react';
import { audio } from './AudioEngine';

interface GuideCharProps {
  lang: Language;
  onTalkClick?: () => void;
}

export const GuideChar: React.FC<GuideCharProps> = ({ lang, onTalkClick }) => {
  const [showSpeech, setShowSpeech] = useState(true);
  const [speechText, setSpeechText] = useState('');
  const t = APP_TRANSLATIONS[lang];

  // Random cute greetings
  const greetings: Record<Language, string[]> = {
    pt: [
      'Que historinha linda! Vamos ler juntinhos? 🌟',
      'Minhas asas brilham quando você lê! ✨',
      'Você é uma criancinha muito inteligente! 🐰',
      'Abra um livro para fazer mágica acontecer! 📖',
      'Precisa de ajuda? Clique em mim para soltar brilhos! ✨',
    ],
    en: [
      'What a wonderful story! Shall we read together? 🌟',
      'My star wings shine when you read books! ✨',
      'You are such a smart kid! Great job! 🐰',
      'Open any magical book to unleash the colors! 📖',
      'Need help? Tap me to release fairy sparkles! ✨',
    ],
    es: [
      '¡Qué cuento tan bonito! ¿Leemos juntos hoy? 🌟',
      '¡Mis alitas brillan cuando abres un libro! ✨',
      '¡Eres un niño o niña super sabio! ¡Genial! 🐰',
      '¡Abre el libro mágico para ver florecer las llaves! 📖',
      '¿Quieres ayuda? ¡Tócame para esparcir polvillo mágico! ✨',
    ],
    fr: [
      'Quel merveilleux conte ! On lit ensemble aujourd’hui ? 🌟',
      'Mes jolies ailes brillent quand tu ouvres un grimoire ! ✨',
      'Tu es un enfant vraiment extraordinaire ! 🐰',
      'Ouvre ce livre magique et laisse agir le charme ! 📖',
      'Besoin d’aide ? Clique sur moi pour libérer des paillettes ! ✨',
    ],
    it: [
      'Che fantastica faba! Ti va di leggerla insieme? 🌟',
      'Le mie ali scintillano quando sfogli le pagine! ✨',
      'Sei un bimbo davvero speciale e intelligente! 🐰',
      'Apri un libro fatato per far brillare i castelli! 📖',
      'Hai bisogno di me? Tocca per creare una melodia stellare! ✨'
    ],
    de: [
      'Was für eine schöne Geschichte! Wollen wir zusammen lesen? 🌟',
      'Meine Flügel glänzen, wenn du liest! ✨',
      'Du bist ein sehr schlaues Kind! 🐰',
      'Öffne ein Buch, um Magie wahr werden zu lassen! 📖',
      'Brauchst du Hilfe? Klicke auf mich für Sternenstaub! ✨'
    ],
    zh: [
      '好美妙的小故事呀！我们一起读吧？🌟',
      '你读书的时候，我的小翅膀都在发光呢！✨',
      '你真是一个聪明智慧的小宝贝！🐰',
      '打开一本魔法书，让奇迹发生吧！📖',
      '需要帮助吗？点一下我可以洒下小仙女的魔法星光哦！✨'
    ]
  };

  useEffect(() => {
    // Pick initial greeting from translations or custom array
    const list = greetings[lang] || greetings['pt'];
    setSpeechText(list[0]);

    // Alternate greetings every 9 seconds
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * list.length);
      setSpeechText(list[idx]);
      setShowSpeech(true);
    }, 9500);

    return () => clearInterval(interval);
  }, [lang]);

  const handleInteract = () => {
    audio.playMagicChime();
    const list = greetings[lang] || greetings['pt'];
    const idx = Math.floor(Math.random() * list.length);
    setSpeechText(list[idx]);
    setShowSpeech(true);
    if (onTalkClick) onTalkClick();
  };

  return (
    <div id="guide-char-section" className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none select-none">
      <AnimatePresence>
        {showSpeech && (
          <motion.div
            initial={{ y: 15, scale: 0.9 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 5 }}
            className="mb-3 max-w-[220px] bg-[#1D271A] border border-[#34422F] p-3 rounded-2xl rounded-br-none shadow-[0_15px_30px_rgba(0,0,0,0.4)] pointer-events-auto cursor-pointer relative"
            onClick={() => setShowSpeech(false)}
          >
            <div className="absolute top-1.5 right-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            </div>
            <p className="text-xs font-sans font-semibold text-slate-100 leading-relaxed pr-2">
              {speechText}
            </p>
            <div className="text-[9px] text-[#C2D9C2] mt-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1"><Volume2 className="w-3 h-3 text-amber-400 animate-pulse" /> Click to hear</span>
              <span className="font-black text-[#FFCC00]">X</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
 
      <motion.div
        className="pointer-events-auto cursor-pointer flex items-center justify-center relative bg-gradient-to-tr from-amber-300 via-yellow-400 to-orange-400 p-3 rounded-full shadow-lg border-2 border-yellow-350 h-16 w-16 group"
        onClick={handleInteract}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.15, rotate: [0, 10, -10, 0] }}
      >
        {/* Smiling 3D yellow star guide face */}
        <div className="text-3xl filter drop-shadow">⭐</div>
        
        {/* Tiny blushing cheeks */}
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
      </motion.div>
    </div>
  );
};
