import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables (.env / secrets)
dotenv.config();

// Simple in-memory cache for dynamic TTS to optimize response times and save API quota
interface CachedTts {
  buffer: Buffer;
  translatedText: string;
}
const ttsCache = new Map<string, CachedTts>();
const MAX_CACHE_SIZE = 150;

// ElevenLabs premium, expressive premade voice character mapping for children's stories
const ELEVENLABS_VOICES: Record<string, Record<string, string>> = {
  feminino: {
    adulto: "21m00Tcm4TlvDq8ikWAM",   // Rachel (Warm, maternal, protective - Mother 👩)
    idoso: "z9fAnlkpzJDm6447833m",    // Glinda (Sweet fairytale teller - Grandma 👵)
    infantil: "jBpfY8vAt77hs3v61GvE"  // Gigi (High pitch, enthusiastic, cute style - Kid 👶)
  },
  masculino: {
    adulto: "ErXwobaYiN019atkyvjV",   // Antoni (Deep, cozy narrative tone - Father 👨)
    idoso: "IKne3meq5aSn9XLyUdCD",    // Charlie (Cozy grandfatherly narrator - Grandpa 👴)
    infantil: "VR6A4UBqILPyAnCYCgsh"  // Arnold (Warm youth narration - Boy 👦)
  }
};

// Lazy-initialized Gemini client to prevent startup errors if key is missing initially
let aiClient: any = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Google Gemini Translation proxy for Alone/Read mode
  app.post("/api/translate", async (req: express.Request, res: express.Response) => {
    try {
      const { text, targetLang, sourceLang } = req.body;
      if (!text || !targetLang) {
        return res.status(400).json({ error: "Text and targetLang are required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(403).json({ error: "API_KEY_NOT_CONFIGURED" });
      }

      if (targetLang === "pt" || targetLang === sourceLang) {
        return res.json({ translatedText: text });
      }

      // Check cache first
      const cacheKey = `trans:${targetLang}:${sourceLang}:${text}`;
      if (ttsCache.has(cacheKey)) {
        const cached = ttsCache.get(cacheKey)!;
        return res.json({ translatedText: cached.translatedText });
      }

      let targetLangName = "English";
      if (targetLang === "de") targetLangName = "German";
      else if (targetLang === "zh") targetLangName = "Chinese (Simplified Mandarin written script, natural for kids)";
      else if (targetLang === "es") targetLangName = "Spanish";
      else if (targetLang === "fr") targetLangName = "French";
      else if (targetLang === "it") targetLangName = "Italian";
      else if (targetLang === "en") targetLangName = "English";

      console.log(`[Translation API] Translating to ${targetLangName}: "${text.substring(0, 30)}..."`);
      const ai = getGeminiClient();
      const translationResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [{ parts: [{ text: `You are an expert children's fairy tale book translator. Translate this children's picture book page text into magical, sweet, child-friendly, fluent, and beautiful ${targetLangName}. Preserve the emotion, character dialogue tone, and magical charm. Do NOT add any notes, intros, or explanations. Translate ONLY this exact portion and output the translation exactly: "${text}"` }] }]
      });

      const translated = translationResponse.candidates?.[0]?.content?.parts?.[0]?.text;
      const finalTranslated = translated ? translated.trim() : text;

      // Save to cache
      if (ttsCache.size >= MAX_CACHE_SIZE) {
        const oldestKey = ttsCache.keys().next().value;
        if (oldestKey !== undefined) ttsCache.delete(oldestKey);
      }
      ttsCache.set(cacheKey, { buffer: Buffer.alloc(0), translatedText: finalTranslated });

      return res.json({ translatedText: finalTranslated });
    } catch (err: any) {
      console.error("Translate Endpoint Error:", err);
      return res.status(500).json({ error: "Translation failed", message: err.message });
    }
  });

  // API Route: Check TTS Providers availability
  app.get("/api/tts-status", (req, res) => {
    res.json({
      gemini: !!process.env.GEMINI_API_KEY,
      elevenlabs: !!process.env.ELEVENLABS_API_KEY,
    });
  });

  // API Route: Google Gemini / ElevenLabs TTS Proxy
  app.post("/api/tts", async (req: express.Request, res: express.Response) => {
    try {
      const { text, voice, lang, gender, age, sourceLang, provider } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
      if (!apiKey && !elevenLabsKey) {
        console.warn("Neither GEMINI_API_KEY nor ELEVENLABS_API_KEY is configured in backend.");
        return res.status(403).json({ error: "API_KEY_NOT_CONFIGURED" });
      }

      const activeProvider = provider || "gemini";

      // Check cache first to avoid slow, expensive, or credit-consuming API calls
      const cacheKey = `${activeProvider}:${lang || ""}:${gender || ""}:${age || ""}:${sourceLang || ""}:${text}`;
      if (ttsCache.has(cacheKey)) {
        const cached = ttsCache.get(cacheKey)!;
        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("X-Translated-Text", encodeURIComponent(cached.translatedText));
        res.setHeader("Access-Control-Expose-Headers", "X-Translated-Text");
        console.log(`[TTS Cache] [HIT] [${activeProvider}] Instant delivery for: "${text.substring(0, 30)}..."`);
        return res.send(cached.buffer);
      }

      // Target language name for dynamic translation
      let targetLangName = "";
      const wantsTranslation = (lang !== sourceLang) ||
                               (lang !== "pt" && sourceLang === "pt") || 
                               (lang === "de") || 
                               (lang === "zh") || 
                               (lang === "es" && !text.match(/[áéíóúñÁÉÍÓÚÑ]/) && text.match(/[ãõçêâã]/)) ||
                               (lang === "fr" && !text.match(/[éèàùçâêîôûëïü]/) && text.match(/[ãõçêâã]/)) ||
                               (lang === "it" && !text.match(/[àèìòù]/) && text.match(/[ãõçêâã]/)) ||
                               (lang === "en" && text.match(/[ãõçêâã]/));

      if (wantsTranslation) {
        if (lang === "de") targetLangName = "German";
        else if (lang === "zh") targetLangName = "Chinese (Simplified Mandarin written script, natural for kids)";
        else if (lang === "es") targetLangName = "Spanish";
        else if (lang === "fr") targetLangName = "French";
        else if (lang === "it") targetLangName = "Italian";
        else if (lang === "en") targetLangName = "English";
      }

      let finalSpokenText = text;
      if (targetLangName) {
        try {
          console.log(`[Translation] Translating children story on-the-fly to requested: ${targetLangName}`);
          const ai = getGeminiClient();
          const translationResponse = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: [{ parts: [{ text: `You are an expert children's fairy tale book translator. Translate this children's picture book page text into magical, sweet, child-friendly, fluent, and beautiful ${targetLangName}. Preserve the emotion, character dialogue tone, and magical charm. Do NOT add any notes, intros, or explanations. Translate ONLY this exact portion and output the translation exactly: "${text}"` }] }]
          });
          const translated = translationResponse.candidates?.[0]?.content?.parts?.[0]?.text;
          if (translated) {
            finalSpokenText = translated.trim();
            console.log(`[Translation] Done: "${finalSpokenText.substring(0, 40)}..."`);
          }
        } catch (transErr) {
          console.error("Gemini automatic on-the-fly translation error:", transErr);
        }
      }

      const genderValue = gender || (voice === "onyx" || voice === "male" ? "masculino" : "feminino");
      const ageValue = age || "adulto";

      // ----------------------------------------------------
      // OPTION A: ELEVENLABS TTS PROVIDER WITH GERMINI FALLBACK
      // ----------------------------------------------------
      if (activeProvider === "elevenlabs" && elevenLabsKey) {
        try {
          const genderKey = genderValue === "masculino" ? "masculino" : "feminino";
          const ageKey = ageValue === "idoso" ? "idoso" : ageValue === "infantil" ? "infantil" : "adulto";
          
          // Map to custom pre-mapped voice character IDs
          const voiceId = ELEVENLABS_VOICES[genderKey]?.[ageKey] || "21m00Tcm4TlvDq8ikWAM"; // default Rachel
          
          console.log(`[ElevenLabs TTS] Generating voice: ${voiceId} using eleven_flash_v2_5 (Highly Optimized) for text: "${finalSpokenText.substring(0, 35)}..."`);
          
          // Use modern, hyper-realistic, cost-optimized voice flash model
          const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "xi-api-key": elevenLabsKey
            },
            body: JSON.stringify({
              text: finalSpokenText,
              model_id: "eleven_flash_v2_5", // Optimized Flash model: incredible ultra-speed and 75% savings in character tokens!
              voice_settings: {
                stability: 0.55,
                similarity_boost: 0.75,
                style: 0.0,
                use_speaker_boost: true
              }
            })
          });

          if (!response.ok) {
            const bodyErrText = await response.text();
            throw new Error(`ElevenLabs API returned response ${response.status}: ${bodyErrText}`);
          }

          const audioBuffer = Buffer.from(await response.arrayBuffer());

          // Save to local cache
          if (ttsCache.size >= MAX_CACHE_SIZE) {
            const oldestKey = ttsCache.keys().next().value;
            if (oldestKey !== undefined) ttsCache.delete(oldestKey);
          }
          ttsCache.set(cacheKey, { buffer: audioBuffer, translatedText: finalSpokenText });

          res.setHeader("Content-Type", "audio/mpeg");
          res.setHeader("X-Translated-Text", encodeURIComponent(finalSpokenText));
          res.setHeader("Access-Control-Expose-Headers", "X-Translated-Text");
          return res.send(audioBuffer);

        } catch (elevenErr: any) {
          console.warn("[ElevenLabs Failure] Gracefully falling back to high quality Gemini Free TTS proxy:", elevenErr.message || elevenErr);
        }
      }

      // ----------------------------------------------------
      // OPTION B: GOOGLE GEMINI NATIVE TTS (DEFAULT / FALLBACK)
      // ----------------------------------------------------
      let voiceName = "Kore"; // standard sweet female
      if (genderValue === "masculino") {
        if (ageValue === "infantil") {
          voiceName = "Puck"; // standard male high/youthful
        } else if (ageValue === "idoso") {
          voiceName = "Charon"; // deeper warmer male
        } else {
          voiceName = "Zephyr"; // conversational friendly male
        }
      } else { // feminino
        if (ageValue === "infantil") {
          voiceName = "Aoede"; // very high pitch sweet female child
        } else if (ageValue === "idoso") {
          voiceName = "Kore"; // mature female
        } else {
          voiceName = "Kore"; // standard female (Kore)
        }
      }

      console.log(`[TTS] Language: ${lang || 'default'}. Style: ${genderValue}/${ageValue}. Gemini Voice Selected: ${voiceName}. Text: "${finalSpokenText.substring(0, 30)}..."`);
      const ai = getGeminiClient();

      let ttsResponse;
      try {
        ttsResponse = await ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ parts: [{ text: finalSpokenText }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: voiceName },
              },
            },
          },
        });
      } catch (geminiError: any) {
        const errMsg = geminiError.message || String(geminiError);
        const isQuota = errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("429") || geminiError.status === 429;
        if (isQuota) {
          console.warn("[TTS] Gemini TTS free quota limit reached (429). Instructing browser to fallback smoothly to SpeechSynthesis.");
          return res.status(429).json({ error: "QUOTA_EXCEEDED", message: "Gemini TTS quota limits exceeded." });
        }
        console.error("Primary Gemini generation failed:", geminiError);
        throw geminiError;
      }

      const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        console.error("Gemini TTS returned empty audio candidates data:", JSON.stringify(ttsResponse));
        return res.status(500).json({ error: "No audio data returned from Gemini TTS" });
      }

      // Buffer audio stream as a beautiful binary output
      const audioBuffer = Buffer.from(base64Audio, "base64");

      // Save to cache (evicting oldest if max capacity is reached)
      if (ttsCache.size >= MAX_CACHE_SIZE) {
        const oldestKey = ttsCache.keys().next().value;
        if (oldestKey !== undefined) {
          ttsCache.delete(oldestKey);
        }
      }
      ttsCache.set(cacheKey, { buffer: audioBuffer, translatedText: finalSpokenText });

      res.setHeader("Content-Type", "audio/mpeg");
      // Send translated text in header to let the UI update text matching narration on-the-fly!
      res.setHeader("X-Translated-Text", encodeURIComponent(finalSpokenText));
      res.setHeader("Access-Control-Expose-Headers", "X-Translated-Text");
      res.send(audioBuffer);

    } catch (e: any) {
      if (res.headersSent) return;
      const errMsg = e.message || String(e);
      const isQuota = errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("429") || e.status === 429;
      if (isQuota) {
        console.warn("[TTS Endpoint] Gemini API rate limit reached (429). Server gracefully guiding browser to offline voice engines.");
        return res.status(429).json({ error: "QUOTA_EXCEEDED", message: "Gemini TTS quota limits exceeded." });
      }
      console.error("Gemini TTS Endpoint Error:", e);
      res.status(500).json({ error: "Voice synthesis failed", message: e.message });
    }
  });

  // Healthcheck endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV });
  });

  // Serve static assets / Vite
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
