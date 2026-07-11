export type MoodCategory = 'love' | 'sad' | 'attitude' | 'friendship' | 'life' | 'inspiration';

export interface Shayari {
  id: string;
  hindi: string;
  englishTranslit: string;
  translation: string;
  meaning: string;
  category: MoodCategory;
  author: string;
  isAiGenerated?: boolean;
}

export interface ShayariResponse {
  success: boolean;
  data?: Shayari;
  error?: string;
}

export interface ShayariListResponse {
  success: boolean;
  data: Shayari[];
}

export interface MoodConfig {
  category: MoodCategory;
  label: string;
  emoji: string;
  hindiLabel: string;
  gradient: string; // Tailwind class gradient
  ambientColor: string; // Primary base color for UI elements
  description: string;
}
