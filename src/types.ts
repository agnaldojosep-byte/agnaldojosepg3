export type Language = 'pt' | 'es' | 'fr' | 'it' | 'en' | 'de' | 'zh';

export type Category = 'ventures' | 'animals' | 'bedtime' | 'education' | 'fantasy' | 'space' | 'royals';

export interface Translation {
  pt: string;
  es: string;
  fr: string;
  it: string;
  en: string;
  de?: string;
  zh?: string;
}

export interface ListTranslation {
  pt: string[];
  es: string[];
  fr: string[];
  it: string[];
  en: string[];
  de?: string[];
  zh?: string[];
}

export interface StoryPage {
  id: number;
  text: Translation;
  visualPrompt: Translation;
  pageImage?: string;
  visualScene: {
    background: string; // Tailwind gradient / color
    elements: {
      type: 'character' | 'cloud' | 'star' | 'balloon' | 'item';
      emoji: string;
      color?: string;
      positionClass: string;
      animation: string;
    }[];
  };
}

export interface Story {
  id: number;
  idString: string;
  title: Translation;
  category: Category;
  categoryLabel: Translation;
  ageRange: string;
  themeColor: string; // Accent color hex or Tailwind name
  cardGradient: string; // for Netflix-like grids
  premium: boolean;
  coverImage: string; // Pixaresque description or illustration representation details
  coverEmoji: string;
  durationMin: number;
  introduction: Translation;
  characters: ListTranslation;
  pages: StoryPage[];
}

export interface UserProfile {
  name: string;
  avatar: string;
  isPremium: boolean;
  streakCount: number;
  lastReadDate: string | null;
  language: Language;
}

export interface AppTranslation {
  title: string;
  subtitle: string;
  exploreCategories: string;
  readWithAudio: string;
  readAlone: string;
  backToHome: string;
  nextPage: string;
  prevPage: string;
  pageOf: string;
  premiumStatusSection: string;
  unlockPremium: string;
  parentsArea: string;
  safetyMathTitle: string;
  safetyMathDesc: string;
  solveToProceed: string;
  correctAnswer: string;
  incorrectAnswer: string;
  close: string;
  charactersTitle: string;
  premiumRequiredTitle: string;
  premiumRequiredText: string;
  subscribeNow: string;
  monthlyPlanPrice: string;
  choosePlan: string;
  freePlan: string;
  proPlan: string;
  premiumUnlockSuccess: string;
  completedStoryMessage: string;
  repeatPage: string;
  autoScroll: string;
  narrationSpeed: string;
  voiceSelect: string;
  voiceMale: string;
  voiceFemale: string;
  guideWel: string;
  playMusic: string;
  adjustVolume: string;
}
