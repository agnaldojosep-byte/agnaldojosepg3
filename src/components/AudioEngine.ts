// Web Audio Engine & Web Speech Synthesis wrapper
// Provides gorgeous synthesized sound effects (Swooshes, Chimes, Pops) and natural Speech-to-Text with boundaries

type WordBoundaryCallback = (charIndex: number, wordLength: number) => void;

class AudioEngine {
  private ctx: AudioContext | null = null;
  private musicInterval: any = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isMusicPlaying: boolean = false;
  private volume: number = 0.5;
  private currentAudio: HTMLAudioElement | null = null;
  private currentInterval: any = null;
  private currentObjectUrl: string | null = null;
  private ttsRequestCount = 0;
  private synthesisKeepAliveInterval: any = null;
  private ttsProvider: 'gemini' | 'elevenlabs' | 'browser' = 'gemini';
  private persistentAudio: HTMLAudioElement | null = null;
  private currentSourceNode: AudioBufferSourceNode | null = null;
  private currentGainNode: GainNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.persistentAudio = new Audio();
        this.persistentAudio.preload = 'auto';
      } catch (e) {
        console.warn("Could not create persistent Audio element:", e);
      }

      if ('speechSynthesis' in window) {
        try {
          // Trigger asynchronous loading of voices active on early load
          window.speechSynthesis.getVoices();
          window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
          };
        } catch (e) {}
      }

      // Elegant interactive audio un-muting gateway:
      // Activates/unlocks the AudioContext and speechSynthesis during first user interaction!
      const unlock = () => {
        this.initCtx();
        if (this.persistentAudio) {
          try {
            // Prime with a silent 1-second base64 empty WAV file to unlock iOS/Safari
            this.persistentAudio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            this.persistentAudio.volume = 0;
            this.persistentAudio.play().then(() => {
              this.persistentAudio?.pause();
            }).catch(e => {
              console.warn("Persistent audio priming failed:", e);
            });
          } catch (e) {}
        }
        if ('speechSynthesis' in window) {
          try {
            window.speechSynthesis.resume();
          } catch (e) {}
        }
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
      window.addEventListener('touchstart', unlock, { passive: true });
    }
  }

  private clearOpenAiAudio() {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
    if (this.currentSourceNode) {
      try {
        this.currentSourceNode.onended = null;
        this.currentSourceNode.stop();
      } catch (err) {}
      this.currentSourceNode = null;
    }
    this.currentGainNode = null;
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
      } catch (err) {}
      this.currentAudio = null;
    }
    if (this.currentObjectUrl) {
      try {
        URL.revokeObjectURL(this.currentObjectUrl);
      } catch (err) {}
      this.currentObjectUrl = null;
    }
  }

  private initCtx() {
    if (!this.ctx) {
      // @ts-ignore
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(vol: number) {
    this.volume = vol;
    if (this.persistentAudio) {
      this.persistentAudio.volume = vol;
    }
    if (this.currentGainNode) {
      try {
        if (this.ctx) {
          this.currentGainNode.gain.setValueAtTime(vol, this.ctx.currentTime);
        } else {
          this.currentGainNode.gain.value = vol;
        }
      } catch (e) {}
    }
  }

  getTtsProvider(): 'gemini' | 'elevenlabs' | 'browser' {
    return this.ttsProvider;
  }

  setTtsProvider(provider: 'gemini' | 'elevenlabs' | 'browser') {
    this.ttsProvider = provider;
  }

  forceResetSpeechSynthesis() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel();
      } catch (err) {
        console.warn("Could not force reset speech synthesis:", err);
      }
    }
  }

  playDiagnosticTestSound() {
    try {
      this.initCtx();
      if (!this.ctx) return false;
      const now = this.ctx.currentTime;
      
      // Play a short sweet arpeggio to test physical audio outputs
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.connect(g);
        g.connect(this.ctx.destination);
        
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + i * 0.12);
        
        g.gain.setValueAtTime(0.0001, now + i * 0.12);
        g.gain.linearRampToValueAtTime(this.volume * 0.2, now + i * 0.12 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 0.3);
        
        o.start(now + i * 0.12);
        o.stop(now + i * 0.12 + 0.35);
      });
      return true;
    } catch (e) {
      console.warn("Diagnostic Sound Failed:", e);
      return false;
    }
  }

  // Synthesizes a cute warm "bubble pop" sound for button clicks
  playSystemPop() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      // Exponential transition avoids digital frequency staircase jumps
      osc.frequency.exponentialRampToValueAtTime(360, now + 0.12);

      // Begin silent, swell rapidly to reduce initial pops, slide exponentially to zero
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(this.volume * 0.18, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.start(now);
      // Let it play until the volume is completely silent
      osc.stop(now + 0.13);
    } catch (e) {
      console.warn('Audio Pop Error:', e);
    }
  }

  // Synthesizes a beautiful cascade of sparkly fairy chimes
  playMagicChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Synthesize 5 sparkling crystal bell notes in rapid sequence
      const frequencies = [880, 1046, 1318, 1568, 2093]; // Beautiful A-minor sweet pentatonic chords
      
      // Resonant filter simulates an acoustic physical sound block
      const resonantFilter = this.ctx.createBiquadFilter();
      resonantFilter.type = 'lowpass';
      resonantFilter.frequency.setValueAtTime(3200, now);
      resonantFilter.Q.setValueAtTime(1.8, now);
      resonantFilter.connect(this.ctx.destination);

      frequencies.forEach((freq, idx) => {
        if (!this.ctx) return;
        const oNode = this.ctx.createOscillator();
        const gNode = this.ctx.createGain();

        oNode.connect(gNode);
        gNode.connect(resonantFilter);

        oNode.type = 'triangle';
        oNode.frequency.setValueAtTime(freq, now + idx * 0.05);

        // Gentle volume fade-in and exponential decay to perfectly prevent clicking
        gNode.gain.setValueAtTime(0.0001, now + idx * 0.05);
        gNode.gain.exponentialRampToValueAtTime(this.volume * 0.10, now + idx * 0.05 + 0.015);
        gNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.45);

        oNode.start(now + idx * 0.05);
        oNode.stop(now + idx * 0.05 + 0.48);
      });
    } catch (e) {
      console.warn('Audio Chime Error:', e);
    }
  }

  // Synthesizes a "shhhhh-swoosh" of paper leaves fluttering
  playPageFlip() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const duration = 0.4;
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate soft pinkish-brown noise for fluttering page
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Lowpass filter noise slightly
        lastOut = 0.9 * lastOut + 0.1 * white;
        data[i] = lastOut;
      }

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + duration * 0.5);
      filter.frequency.exponentialRampToValueAtTime(300, now + duration);
      filter.Q.setValueAtTime(3.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.35, now + 0.08);
      // Linear ramp to absolute zero prevents abrupt click at buffer stop
      gain.gain.linearRampToValueAtTime(0, now + duration);

      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noiseNode.start(now);
      noiseNode.stop(now + duration);
    } catch (e) {
      console.warn('Page Flip Sound Error:', e);
    }
  }

  // Soft magical celestial music synth loop
  toggleMusic(play: boolean) {
    this.isMusicPlaying = play;
    if (!play) {
      if (this.musicInterval) {
        clearInterval(this.musicInterval);
        this.musicInterval = null;
      }
      return;
    }

    this.initCtx();
    if (!this.ctx) return;

    if (this.musicInterval) return;

    // Plays a rich celestial chord pad every 3.3 seconds to keep a beautiful kids vibe
    const playChord = () => {
      if (!this.isMusicPlaying || !this.ctx) return;
      
      const now = this.ctx.currentTime;
      // Gentle major chords (Cmaj7, Fmaj7, G6)
      const loops = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [349.23, 440.00, 523.25, 659.25], // Fmaj7
        [392.00, 493.88, 587.33, 783.99], // G6
      ];

      const chord = loops[Math.floor(Math.random() * loops.length)];

      chord.forEach(freq => {
        if (!this.ctx) return;
        // Play dual detuned oscillators (spaced by -8 and +8 cents) for a deep, cinematic chorus pad!
        const detuneOffsets = [-8, 8];
        
        detuneOffsets.forEach(detuneVal => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.type = 'sine'; // very soft ambient sine harmonic
          osc.frequency.setValueAtTime(freq, now);
          osc.detune.setValueAtTime(detuneVal, now);

          gain.gain.setValueAtTime(0, now);
          // Very slow, dreamy attack and decay for atmospheric depth
          gain.gain.linearRampToValueAtTime(this.volume * 0.012, now + 1.2); 
          gain.gain.linearRampToValueAtTime(0, now + 3.2);

          osc.start(now);
          osc.stop(now + 3.3);
        });
      });
    };

    playChord();
    this.musicInterval = setInterval(playChord, 3300);
  }

  // TTS speech system with Gemini integration + seamless fallback
  async speakText(
    text: string,
    langCode: string,
    gender: 'masculino' | 'feminino',
    age: 'adulto' | 'infantil' | 'idoso',
    onWordBoundary: WordBoundaryCallback,
    onEnd: () => void,
    onProgress?: (progress: number) => void,
    onTranslationCompleted?: (translated: string) => void,
    sourceLang?: string
  ) {
    this.ttsRequestCount++;
    const currentRequestId = this.ttsRequestCount;

    onProgress?.(5);
    // 1. Cancel any active local synthesis, ensuring to resume first to avoid locking
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel();
      } catch (err) {}
    }
    this.currentUtterance = null;

    // UNLOCK AUDIO FOR SAFARI/WEBKIT/IOS: Synchronously prime/unlock the persistent audio element during a trusted user gesture
    if (!this.persistentAudio) {
      try {
        this.persistentAudio = new Audio();
      } catch (e) {}
    }
    if (this.persistentAudio) {
      try {
        this.persistentAudio.play().then(() => {
          this.persistentAudio?.pause();
        }).catch(() => {});
      } catch (e) {}
    }

    // Use SpeechSynthesis directly if browser-only is explicitly selected
    if (this.ttsProvider === 'browser') {
      console.log("[AudioEngine] Using selected browser-side Web Speech fallback engine.");
      onProgress?.(100);
      this.speakTextFallback(text, langCode, gender, age, onWordBoundary, onEnd, currentRequestId);
      return;
    }

    // 2. Clear any active playback
    this.clearOpenAiAudio();
    onProgress?.(15);

    try {
      this.initCtx();
      onProgress?.(30);
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang: langCode, gender, age, sourceLang, provider: this.ttsProvider }),
      });

      // If a newer speak request has been initiated, abort this stale stream immediately
      if (currentRequestId !== this.ttsRequestCount) {
        return;
      }

      if (!response.ok) {
        throw new Error("Gemini TTS limit or Server Error");
      }
      onProgress?.(60);

      // Read translated text from header if returned by Gemini on the fly!
      const translatedHeader = response.headers.get("X-Translated-Text");
      let spokenText = text;
      if (translatedHeader) {
        try {
          spokenText = decodeURIComponent(translatedHeader);
          if (currentRequestId === this.ttsRequestCount && onTranslationCompleted) {
            onTranslationCompleted(spokenText);
          }
        } catch (decErr) {
          console.warn("Failed to decode dynamic translation header", decErr);
        }
      }

      const arrayBuffer = await response.arrayBuffer();
      if (currentRequestId !== this.ttsRequestCount) {
        return;
      }

      onProgress?.(80);
      if (!this.ctx) {
        throw new Error("AudioContext not supported or uninitialized");
      }

      // Decode the audio binary data using the standard and highly robust AudioContext API
      let audioBuffer: AudioBuffer;
      try {
        audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
      } catch (decodeErr) {
        // Compatibility wrapper for older iOS Safari which requires standard callback format
        audioBuffer = await new Promise<AudioBuffer>((resolve, reject) => {
          this.ctx!.decodeAudioData(arrayBuffer, resolve, reject);
        });
      }

      if (currentRequestId !== this.ttsRequestCount) {
        return;
      }

      onProgress?.(95);

      // Set up standard AudioBufferSourceNode and GainNode for playback
      const sourceNode = this.ctx.createBufferSource();
      sourceNode.buffer = audioBuffer;

      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      sourceNode.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      this.currentSourceNode = sourceNode;
      this.currentGainNode = gainNode;

      // Find word indices in the text
      const wordsList: { word: string; startCharIdx: number; length: number }[] = [];
      const regex = /\S+/g;
      let match;
      while ((match = regex.exec(spokenText)) !== null) {
        wordsList.push({
          word: match[0],
          startCharIdx: match.index,
          length: match[0].length,
        });
      }

      const duration = audioBuffer.duration;
      const startPadding = 0.12;
      const usableDuration = Math.max(0.5, duration - startPadding - 0.12);
      const totalWeight = wordsList.reduce((sum, w) => sum + w.length, 0);

      const timedWords = wordsList.map((w, idx) => {
        const precedingWeight = wordsList.slice(0, idx).reduce((sum, item) => sum + item.length, 0);
        const wordStart = startPadding + (precedingWeight / totalWeight) * usableDuration;
        const wordDur = (w.length / totalWeight) * usableDuration;
        return {
          ...w,
          startTime: wordStart,
          endTime: wordStart + wordDur,
        };
      });

      const startTime = this.ctx.currentTime;

      sourceNode.onended = () => {
        if (currentRequestId === this.ttsRequestCount) {
          this.clearOpenAiAudio();
          onEnd();
        }
      };

      // Play buffer back instantly
      sourceNode.start(0);
      onProgress?.(100);

      // Track and sync active word highlights during dynamic playback
      this.currentInterval = setInterval(() => {
        if (currentRequestId !== this.ttsRequestCount) {
          clearInterval(this.currentInterval);
          return;
        }
        if (!this.ctx) return;
        const t = this.ctx.currentTime - startTime;
        const active = timedWords.find(w => t >= w.startTime && t <= w.endTime);
        if (active) {
          onWordBoundary(active.startCharIdx, active.length);
        }
      }, 30);

    } catch (e) {
      if (currentRequestId === this.ttsRequestCount) {
        console.warn("Gemini voice WebAudio streaming failed on-the-fly. Seamlessly using browser SpeechSynthesis fallback.", e);
        this.clearOpenAiAudio();
        onProgress?.(100);
        this.speakTextFallback(text, langCode, gender, age, onWordBoundary, onEnd, currentRequestId);
      }
    }
  }

  // Backup Speech system using built-in browser Web Speech API
  private speakTextFallback(
    text: string,
    langCode: string,
    gender: 'masculino' | 'feminino',
    age: 'adulto' | 'infantil' | 'idoso',
    onWordBoundary: WordBoundaryCallback,
    onEnd: () => void,
    requestId?: number
  ) {
    const currentRequestId = requestId || this.ttsRequestCount;
    if (currentRequestId !== this.ttsRequestCount) {
      return;
    }

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel(); // Stop anything playing immediately
      } catch (err) {}

      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      // Select proper language voice
      const voices = window.speechSynthesis.getVoices();
      
      // Map standard languages
      let langTag = 'pt-BR';
      if (langCode === 'en') langTag = 'en-US';
      if (langCode === 'es') langTag = 'es-ES';
      if (langCode === 'fr') langTag = 'fr-FR';
      if (langCode === 'it') langTag = 'it-IT';
      if (langCode === 'de') langTag = 'de-DE';
      if (langCode === 'zh') langTag = 'zh-CN';

      utterance.lang = langTag;

      // Rate: Slowly & story-friendly based on age
      if (age === 'idoso') {
        utterance.rate = 0.76; // warm grandfather pace
      } else if (age === 'infantil') {
        utterance.rate = 0.90; // playful kid speed
      } else {
        utterance.rate = 0.86; // standard adult narrator
      }

      // Pitch: adjust for cute/magical or old-timer feeling!
      if (age === 'infantil') {
        utterance.pitch = 1.35; // high adorable voice
      } else if (age === 'idoso') {
        utterance.pitch = 0.88; // low wise elder voice
      } else {
        utterance.pitch = 1.10; // slightly magical lift
      }

      // Select best voice candidate based on gender / language tag
      const langVoices = voices.filter(v => v.lang.replace('_', '-').toLowerCase().startsWith(langCode.toLowerCase()));
      let selectedVoice = langVoices.find(v => {
        const name = v.name.toLowerCase();
        if (gender === 'masculino') {
          return name.includes('male') || name.includes('david') || name.includes('google') || name.includes('microsoft') || name.includes('daniel') || name.includes('stefan') || name.includes('huihui') || name.includes('kangkang');
        } else {
          return name.includes('female') || name.includes('zira') || name.includes('helena') || name.includes('google') || name.includes('microsoft') || name.includes('yaoyao') || name.includes('xiaoxiao');
        }
      });

      if (!selectedVoice && langVoices.length > 0) {
        selectedVoice = langVoices[0];
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Sincronize word highlight
      utterance.onboundary = (event) => {
        if (currentRequestId !== this.ttsRequestCount) {
          return;
        }
        if (event.name === 'word') {
          // Speak boundary provides character index relative to the text
          const charIndex = event.charIndex;
          // Approximate length of word (search for next space or punctuation)
          const sub = text.substring(charIndex);
          const nextSpace = sub.search(/[\s,.:;!?]/);
          const wordLength = nextSpace !== -1 ? nextSpace : sub.length;
          onWordBoundary(charIndex, wordLength);
        }
      };

      utterance.onend = () => {
        if (this.synthesisKeepAliveInterval) {
          clearInterval(this.synthesisKeepAliveInterval);
          this.synthesisKeepAliveInterval = null;
        }
        if (currentRequestId === this.ttsRequestCount) {
          onEnd();
        }
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error: ' + e.error);
        if (this.synthesisKeepAliveInterval) {
          clearInterval(this.synthesisKeepAliveInterval);
          this.synthesisKeepAliveInterval = null;
        }
        if (currentRequestId === this.ttsRequestCount) {
          onEnd();
        }
      };

      try {
        window.speechSynthesis.resume();
      } catch (e) {}

      // A small timeout helps browsers reliably trigger speaking if synthesis was locked
      setTimeout(() => {
        if (currentRequestId === this.ttsRequestCount) {
          if (this.synthesisKeepAliveInterval) {
            clearInterval(this.synthesisKeepAliveInterval);
          }
          // Resume keepalive to prevent browser SpeechSynthesis silent cutoff (especially Chrome's 15s limit)
          const isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          if (!isSafari) {
            this.synthesisKeepAliveInterval = setInterval(() => {
              if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
                try {
                  window.speechSynthesis.pause();
                  window.speechSynthesis.resume();
                } catch (e) {}
              }
            }, 8000);
          }

          window.speechSynthesis.speak(utterance);
        }
      }, 50);
    } else {
      console.warn('SpeechSynthesis API not supported in this browser.');
      // Fallback timer simulation for narrating to prevent blocking
      const words = text.split(' ');
      let currentWordIdx = 0;
      const simulateSpeech = () => {
        if (currentRequestId !== this.ttsRequestCount) {
          return;
        }
        if (currentWordIdx < words.length) {
          const charIndex = text.indexOf(words[currentWordIdx]);
          onWordBoundary(charIndex, words[currentWordIdx].length);
          currentWordIdx++;
          setTimeout(simulateSpeech, 350);
        } else {
          onEnd();
        }
      };
      simulateSpeech();
    }
  }

  stopSpeech() {
    if (this.synthesisKeepAliveInterval) {
      clearInterval(this.synthesisKeepAliveInterval);
      this.synthesisKeepAliveInterval = null;
    }
    this.clearOpenAiAudio();
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel();
      } catch (err) {}
    }
    this.currentUtterance = null;
  }

  // Synthesize a majestic sparkling magic sweep
  playFairySpell() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const steps = 8;
      
      for (let i = 0; i < steps; i++) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.type = 'sine';
        const startFreq = 400 + i * 200;
        const endFreq = 1200 + i * 150;
        
        osc.frequency.setValueAtTime(startFreq, now + i * 0.04);
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + i * 0.04 + 0.15);
        
        gain.gain.setValueAtTime(0.0001, now + i * 0.04);
        gain.gain.linearRampToValueAtTime(this.volume * 0.12, now + i * 0.04 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.15);
        
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.16);
      }
    } catch (e) {
      console.warn("Fairy Spell error:", e);
    }
  }

  // Synthesize a playful low rumble dragon growl
  playDragonRoar() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.Q.setValueAtTime(5, now);
      filter.connect(this.ctx.destination);
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(filter);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65, now);
      // Create a growl vibration using low frequency oscillation
      osc.frequency.linearRampToValueAtTime(50, now + 0.4);
      osc.frequency.linearRampToValueAtTime(75, now + 0.8);
      
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.35, now + 0.1);
      // Gentle rumble vibration
      gain.gain.setValueAtTime(this.volume * 0.35, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
      
      osc.start(now);
      osc.stop(now + 1.25);
    } catch (e) {
      console.warn("Dragon Roar error:", e);
    }
  }

  // Synthesize a high pitched bubbly star giggle
  playStarGiggle() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      for (let i = 0; i < 6; i++) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.type = 'triangle';
        const startFreq = 1100 + (i % 2 === 0 ? 300 : -100);
        osc.frequency.setValueAtTime(startFreq, now + i * 0.08);
        osc.frequency.exponentialRampToValueAtTime(2400, now + i * 0.08 + 0.08);
        
        gain.gain.setValueAtTime(0.0001, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(this.volume * 0.15, now + i * 0.08 + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.08);
        
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.09);
      }
    } catch (e) {
      console.warn("Star Giggle error:", e);
    }
  }
}

export const audio = new AudioEngine();
