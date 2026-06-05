import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Printer, Download, X, Star, Sparkles, Award, Edit2, Check } from 'lucide-react';
import { Story, Language } from '../types';
import { audio } from './AudioEngine';

interface CertificateProps {
  story: Story;
  lang: Language;
  childName: string;
  onClose: () => void;
}

export const CertificateOfAchievement: React.FC<CertificateProps> = ({
  story,
  lang,
  childName: initialChildName,
  onClose,
}) => {
  const [childName, setChildName] = useState(initialChildName || 'Amiguinho');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(childName);
  const [isStamped, setIsStamped] = useState(false);
  const [awardCode, setAwardCode] = useState('');

  // Localized certificates strings
  const text = {
    pt: {
      certTitle: 'Certificado de Conquista',
      thisCertifies: 'Este certificado confere com orgulho ao pequeno leitor',
      hasCompleted: 'o título de desbravador do reino das estorinhas, após concluir com sucesso a leitura e audição do livro mágico:',
      signedBy: 'Vovó Digital do Reino',
      dateLabel: 'Data de Concluido',
      serialCode: 'Código do Prêmio',
      stampAction: 'Toque para carimbar!',
      stamped: 'Carimbado com Magia!',
      back: 'Voltar',
      print: 'Imprimir Certificado 🖨️',
      editName: 'Editar nome do leitor',
      save: 'Salvar',
      placeholder: 'Nome do pequeno leitor...',
    },
    en: {
      certTitle: 'Certificate of Achievement',
      thisCertifies: 'This award is proudly presented to the starry reader',
      hasCompleted: 'for successfully journeying through the magical forest and completing the spellbinding storybook:',
      signedBy: 'Digital Story Grandma',
      dateLabel: 'Completion Date',
      serialCode: 'Award Serial No.',
      stampAction: 'Tap to stamp!',
      stamped: 'Stamped with Magic!',
      back: 'Go Back',
      print: 'Print Certificate 🖨️',
      editName: 'Edit reader name',
      save: 'Save',
      placeholder: 'Starry reader\'s name...',
    },
    es: {
      certTitle: 'Certificado de Logro',
      thisCertifies: 'Este diploma se otorga con orgullo al pequeño lector',
      hasCompleted: 'por adentrarse en el reino de los sueños y leer con éxito el libro mágico:',
      signedBy: 'Abuelita Digital',
      dateLabel: 'Fecha de lectura',
      serialCode: 'Código del Premio',
      stampAction: '¡Toca para sellar!',
      stamped: '¡Sellado con Magia!',
      back: 'Volver',
      print: 'Imprimir Certificado 🖨️',
      editName: 'Editar nombre del lector',
      save: 'Guardar',
      placeholder: 'Nombre del pequeño lector...',
    },
    fr: {
      certTitle: 'Certificat de Réussite',
      thisCertifies: 'Ce certificat est fièrement décerné au jeune lecteur',
      hasCompleted: 'pour son incroyable voyage dans le monde imaginaire après avoir lu le livre magique :',
      signedBy: 'Grand-mère Digitale',
      dateLabel: 'Date d\'achèvement',
      serialCode: 'Numéro de Prix',
      stampAction: 'Tapez pour sceller !',
      stamped: 'Scellé magiquement !',
      back: 'Retour',
      print: 'Imprimer Certificat 🖨️',
      editName: 'Modifier le nom du lecteur',
      save: 'Enregistrer',
      placeholder: 'Nom du jeune lecteur...',
    }
  };

  const activeT = text[lang as keyof typeof text] || text['en'];

  useEffect(() => {
    // Generate a beautiful, unique serial code for child pride
    const code = `EST-${story.idString.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setAwardCode(code);
    
    // Play sound on mount
    audio.playMagicChime();
  }, [story]);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setChildName(tempName.trim());
      setIsEditing(false);
      audio.playSystemPop();
    }
  };

  const handleStamp = () => {
    if (!isStamped) {
      setIsStamped(true);
      audio.playMagicChime();
    }
  };

  const handlePrint = () => {
    audio.playSystemPop();
    window.print();
  };

  const formattedDate = new Date().toLocaleDateString(lang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-900/90 overflow-y-auto print:p-0 print:bg-white popup-overlay">
      {/* Dynamic print-optimized style sheets */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-cert, .printable-cert * {
            visibility: visible;
          }
          .printable-cert {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            height: auto !important;
            border: none !important;
            background: white !important;
            box-shadow: none !important;
            transform: none !important;
            margin: 0 !important;
            padding: 2.5rem !important;
          }
          .print-hide {
            display: none !important;
          }
        }
      `}</style>

      {/* Floating Sparkles & confetti particles around the frame */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden print-hide z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300 opacity-60 text-xl"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              rotate: [null, Math.random() * 180 + 180],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 4,
              ease: "linear"
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>

      {/* Controls Header Panel */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 print-hide z-10 px-2">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-fredoka font-bold transition-colors select-none"
        >
          <X className="w-4 h-4" />
          <span>{activeT.back}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Print button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#CEE94F] via-[#9FCE25] to-[#699E10] text-[#1A2F01] hover:brightness-110 rounded-xl text-xs font-fredoka font-black tracking-wider transition-all scale-105 hover:scale-110 shadow-[0_4px_14px_rgba(159,206,37,0.4)] active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>{activeT.print}</span>
          </button>
        </div>
      </div>

      {/* Main Beautiful Printable Card Certificate */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="printable-cert relative w-full max-w-3xl aspect-[1.414/1] bg-gradient-to-br from-[#FCFBF4] via-[#FDFCE7] to-[#F5FCD3] text-slate-900 border-8 border-double border-[#A2C76A] rounded-2.5xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.45)] select-none z-10 overflow-hidden flex flex-col justify-between"
      >
        {/* Magic Green & Golden border details inside */}
        <div className="absolute inset-3 border border-[#CEE94F]/40 rounded-xl pointer-events-none" />
        <div className="absolute inset-5 border-2 border-dashed border-[#A2C76A]/40 rounded-xl pointer-events-none" />

        {/* Vintage Whimsical Corners */}
        <span className="absolute top-6 left-6 text-2xl text-[#9FCE25]/70 pointer-events-none">✨</span>
        <span className="absolute top-6 right-6 text-2xl text-[#9FCE25]/70 pointer-events-none">✨</span>
        <span className="absolute bottom-6 left-6 text-2xl text-[#9FCE25]/70 pointer-events-none">✨</span>
        <span className="absolute bottom-6 right-6 text-2xl text-[#9FCE25]/70 pointer-events-none">✨</span>

        {/* Dynamic Light Green Vector Clouds in Background */}
        <div className="absolute -left-16 -top-16 w-48 h-48 rounded-full bg-[#CEE94F]/10 blur-3xl pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#9FCE25]/15 blur-3xl pointer-events-none" />

        {/* Certificate Content - Header */}
        <div className="text-center space-y-1.5 relative">
          <div className="flex justify-center items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <Award className="w-10 h-10 text-amber-500 fill-amber-300 filter drop-shadow" />
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
          </div>

          <h2 className="text-2xl md:text-4xl font-fredoka font-black tracking-wide bg-gradient-to-r from-amber-600 via-[#8A9E19] to-amber-700 text-transparent bg-clip-text uppercase mt-1">
            {activeT.certTitle}
          </h2>
          <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-[#9FCE25] to-transparent mx-auto mt-2" />
        </div>

        {/* Certificate Content - Middle Body */}
        <div className="text-center my-6 space-y-4 flex-1 flex flex-col justify-center">
          <p className="text-[12px] md:text-[14px] font-fredoka font-semibold text-slate-500 italic max-w-lg mx-auto">
            {activeT.thisCertifies}:
          </p>

          {/* Child Name Spot with Custom In-Place Editor */}
          <div className="flex items-center justify-center gap-2 group print-hide">
            {isEditing ? (
              <div className="flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-xl border-2 border-[#9FCE25] shadow-inner">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  maxLength={25}
                  placeholder={activeT.placeholder}
                  className="bg-transparent border-none outline-none font-fredoka font-bold text-center text-xl md:text-3xl text-slate-800 w-52 md:w-80"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                />
                <button
                  onClick={handleSaveName}
                  className="p-1 px-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg cursor-pointer transition-colors"
                  title={activeT.save}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <h3 className="text-2xl md:text-[2.6rem] font-fredoka font-black text-amber-950 underline decoration-double decoration-[#A2C76A]/80 tracking-wide">
                  {childName}
                </h3>
                <button
                  onClick={() => {
                    setTempName(childName);
                    setIsEditing(true);
                    audio.playSystemPop();
                  }}
                  className="p-1 text-slate-400 hover:text-[#9FCE25] hover:scale-110 active:scale-95 transition-all text-xs"
                  title={activeT.editName}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Locked Version for Physical Printable Render */}
          <h3 className="hidden print:block text-[2.5rem] font-fredoka font-black text-amber-950 text-center tracking-wide leading-none pb-2">
            {childName}
          </h3>

          <p className="text-[10px] md:text-xs text-slate-600 font-semibold max-w-xl mx-auto leading-relaxed pt-2">
            {activeT.hasCompleted}
          </p>

          {/* Magical book visual capsule */}
          <div className="bg-[#1A2312] border border-[#445B2B]/40 text-[#DCEEC1] py-2 px-6 rounded-2xl inline-flex items-center gap-3 mx-auto shadow-sm max-w-md">
            <span className="text-xl md:text-2xl filter drop-shadow">{story.coverEmoji}</span>
            <span className="text-xs md:text-sm font-fredoka font-bold tracking-wide">
              {story.title[lang] || story.title['pt']}
            </span>
            <span className="text-amber-400 text-xs font-bold font-mono">★ ★ ★ ★ ★</span>
          </div>
        </div>

        {/* Certificate Content - Footer (Signature + Stamp + Info Date) */}
        <div className="grid grid-cols-3 gap-4 items-end pt-4 border-t border-[#CEE94F]/30 h-28 relative">
          
          {/* Left Footer portion: Local Completion Date */}
          <div className="text-left space-y-1">
            <span className="text-[8px] md:text-[9px] uppercase tracking-wider font-extrabold text-[#748D1D]">
              {activeT.dateLabel}
            </span>
            <p className="text-[10px] md:text-[11px] font-fredoka font-bold text-slate-800">
              {formattedDate}
            </p>
          </div>

          {/* Middle Footer portion: Magic Clickable Golden Seal */}
          <div className="flex flex-col items-center justify-center relative">
            <motion.div
              id="certificate-magical-stamp"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStamp}
              className={`relative z-20 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                isStamped 
                  ? 'bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-500 shadow-md rotate-12 border-3 border-amber-200' 
                  : 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 border-2 border-dashed border-slate-400'
              }`}
            >
              {isStamped ? (
                <div className="text-center select-none">
                  {/* Outer ribbon spike wings */}
                  <div className="absolute -bottom-3 left-2 w-4 h-8 bg-red-500 -rotate-12 rounded-b-sm border-r-2 border-red-700 z-[-1]" />
                  <div className="absolute -bottom-3 right-2 w-4 h-8 bg-red-500 rotate-12 rounded-b-sm border-l-2 border-red-700 z-[-1]" />
                  <span className="text-2xl filter drop-shadow">👑</span>
                  <span className="text-[7px] md:text-[8px] font-fredoka font-black block text-slate-900 tracking-tighter leading-none mt-0.5 uppercase">
                    MAGIA
                  </span>
                </div>
              ) : (
                <div className="text-center print-hide">
                  <span className="text-xs font-mono text-slate-400 block animate-bounce">⚡</span>
                  <span className="text-[7px] font-sans font-extrabold text-slate-400 tracking-tighter leading-none block uppercase">
                    {activeT.stampAction}
                  </span>
                </div>
              )}
            </motion.div>
            
            {/* Visual indicator for printed copy seal */}
            <span className="hidden print:block text-[8px] font-bold text-slate-400 capitalize mt-1">
              {isStamped ? activeT.stamped : ''}
            </span>
          </div>

          {/* Right Footer portion: Official Signature */}
          <div className="text-right space-y-1 relative">
            <div className="relative inline-block">
              {/* Cute cursive-like signature stamp */}
              <span className="absolute -top-7 right-4 font-serif text-lg md:text-xl italic text-amber-600 font-bold opacity-80 select-none pointer-events-none transform -rotate-6">
                Vovó Digital ✨
              </span>
              <div className="h-0.5 w-24 bg-slate-400 ml-auto" />
            </div>
            <p className="text-[8px] md:text-[9px] uppercase tracking-wider font-extrabold text-[#748D1D] pt-0.5">
              {activeT.signedBy}
            </p>
          </div>

          {/* Absolute floating Serial reward serial number */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-center text-[7px] text-slate-400 font-mono tracking-widest leading-none">
            {activeT.serialCode}: <span className="font-bold text-slate-600">{awardCode}</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
