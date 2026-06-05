import { Category } from '../types';

export interface ReadingActivity {
  date: string; // YYYY-MM-DD
  category: Category;
  durationMinutes: number;
}

// Map categories to beautiful kids-friendly theme hex codes
export const CATEGORY_COLORS: Record<Category, string> = {
  bedtime: '#E29B35',    // Cozy night amber
  animals: '#4299FF',    // Cute soft blue
  ventures: '#A2C76A',   // Magical lime green
  education: '#B36DFF',  // Smart purple
  fantasy: '#FF69B4',    // Fairy pink
  space: '#00D2D3',      // Sky teal
  royals: '#FFD700',     // Golden royal
};

// Map categories to friendly labels
export const CATEGORY_LABELS: Record<Category, { pt: string; en: string }> = {
  bedtime: { pt: 'Dormir', en: 'Bedtime' },
  animals: { pt: 'Animais Mágicos', en: 'Magical Animals' },
  ventures: { pt: 'Aventuras', en: 'Adventures' },
  education: { pt: 'Educação', en: 'Learning' },
  fantasy: { pt: 'Fantasia', en: 'Fantasy' },
  space: { pt: 'Espaço', en: 'Outer Space' },
  royals: { pt: 'Realeza', en: 'Royalty & Kings' },
};

const STORAGE_KEY = 'estorinhas_reading_activities_v1';

// Seed realistic data for the last 7 days
export function seedReadingActivities(): ReadingActivity[] {
  const activities: ReadingActivity[] = [];
  const categories: Category[] = ['bedtime', 'animals', 'ventures', 'education', 'fantasy', 'space'];
  
  // Create entries for each of the last 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Pick 1-3 categories read per day with realistic duration sizes (3 to 12 minutes)
    const numCategories = Math.floor(Math.random() * 2) + 1; // 1 or 2 categories
    const dailyCats = [...categories].sort(() => 0.5 - Math.random()).slice(0, numCategories);
    
    dailyCats.forEach(cat => {
      // Bedtime is more read on nights, space during mornings etc.
      // Let's draw realistic randomized value
      const baseMins = cat === 'bedtime' ? 6 : 4;
      const randomMins = Math.floor(Math.random() * 6) + 2; // 2 to 7 mins
      
      activities.push({
        date: dateStr,
        category: cat,
        durationMinutes: baseMins + randomMins
      });
    });
  }
  
  return activities;
}

// Get all reading activities, seeding if empty
export function getReadingActivities(): ReadingActivity[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading reading activities', e);
  }
  
  // If empty, seed and save
  const seeded = seedReadingActivities();
  saveReadingActivities(seeded);
  return seeded;
}

// Save reading activities
export function saveReadingActivities(activities: ReadingActivity[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  } catch (e) {
    console.error('Error saving reading activities', e);
  }
}

// Log a reading session
export function logReadingSession(category: Category, durationSeconds: number): void {
  if (durationSeconds <= 0) return;
  
  const activities = getReadingActivities();
  const todayStr = new Date().toISOString().split('T')[0];
  const minutesToAdd = parseFloat((durationSeconds / 60).toFixed(2));
  
  // Find if an entry already exists for today & category
  const existingIndex = activities.findIndex(
    act => act.date === todayStr && act.category === category
  );
  
  if (existingIndex >= 0) {
    activities[existingIndex].durationMinutes = parseFloat(
      (activities[existingIndex].durationMinutes + minutesToAdd).toFixed(2)
    );
  } else {
    activities.push({
      date: todayStr,
      category,
      durationMinutes: minutesToAdd
    });
  }
  
  // Limit database size to last 30 days of data
  // Clean up dates older than 30 days to avoid clogging localStorage
  const checkDate = new Date();
  checkDate.setDate(checkDate.getDate() - 30);
  const cutoffStr = checkDate.toISOString().split('T')[0];
  
  const filteredActivities = activities.filter(act => act.date >= cutoffStr);
  
  saveReadingActivities(filteredActivities);
}
