import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { SEED_SHAYARIS } from './src/data/shayariData';
import { Shayari } from './src/types';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Google Gemini API
const hasApiKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY';
let ai: GoogleGenAI | null = null;

if (hasApiKey) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
  console.log('Gemini AI initialized successfully.');
} else {
  console.log('Gemini API key is not configured. Running in fallback mode with local curated database.');
}

// In-memory cache for the "Shayari of the Day"
interface DailyCache {
  date: string;
  shayari: Shayari;
}
let dailyCache: DailyCache | null = null;

// Helper to pick a seed shayari based on date string (stable fallback)
function getStableDailyFallback(dateStr: string): Shayari {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % SEED_SHAYARIS.length;
  return SEED_SHAYARIS[index];
}

// Endpoint: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasApiKey });
});

// Endpoint: Get all pre-seeded shayaris
app.get('/api/shayaris', (req, res) => {
  res.json({ success: true, data: SEED_SHAYARIS });
});

// Endpoint: Get curated Daily Shayari
app.get('/api/shayaris/daily', async (req, res) => {
  const todayStr = new Date().toDateString();

  // If we have a cached shayari for today, return it
  if (dailyCache && dailyCache.date === todayStr) {
    return res.json({ success: true, data: dailyCache.shayari });
  }

  // Generate new Daily Shayari using Gemini if key is present
  if (ai) {
    try {
      console.log('Generating fresh Curated Shayari of the Day from Gemini...');
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `Generate an incredibly beautiful, profound and heart-touching Hindi Shayari of the Day. 
Choose a random deep poetic mood (like bittersweet Love, deep philosophy of Life, Hope/Inspiration, or Friendship).
Ensure the verse has timeless depth. Give it a title or author attribution in the 'author' field like 'Classic Poet' or 'AI Shair'.`,
        config: {
          systemInstruction: 'You are a master bilingual Urdu/Hindi poet (Shair). Write an exceptionally beautiful shayari that resonates with human soul. Return only valid JSON according to the response schema.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hindi: {
                type: Type.STRING,
                description: 'The shayari in Hindi Devanagari script (usually a 2-line couplet or a 4-line ghazal-verse).'
              },
              englishTranslit: {
                type: Type.STRING,
                description: 'The transliteration of the Hindi shayari in Roman English script.'
              },
              translation: {
                type: Type.STRING,
                description: 'An elegant, deeply poetic translation of the shayari in English.'
              },
              meaning: {
                type: Type.STRING,
                description: 'A brief, heartfelt explanation of the emotional depth, metaphors, and feelings conveyed in this verse.'
              },
              category: {
                type: Type.STRING,
                description: 'The category: love, sad, attitude, friendship, life, or inspiration.'
              },
              author: {
                type: Type.STRING,
                description: 'Author attribution. E.g., Mirza Ghalib, Ahmad Faraz, Jaun Elia, Kabir, or "AI Shair" if fully original.'
              }
            },
            required: ['hindi', 'englishTranslit', 'translation', 'meaning', 'category', 'author']
          }
        }
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        const dailyShayari: Shayari = {
          id: `daily-${Date.now()}`,
          hindi: parsed.hindi,
          englishTranslit: parsed.englishTranslit,
          translation: parsed.translation,
          meaning: parsed.meaning,
          category: (parsed.category || 'life').toLowerCase() as any,
          author: parsed.author || 'AI Shair',
          isAiGenerated: true,
        };

        dailyCache = { date: todayStr, shayari: dailyShayari };
        return res.json({ success: true, data: dailyShayari });
      }
    } catch (error) {
      console.error('Error generating daily curated shayari from Gemini, using stable fallback:', error);
    }
  }

  // Fallback to stable seeded shayari if generation fails or API key is absent
  const fallback = getStableDailyFallback(todayStr);
  dailyCache = { date: todayStr, shayari: fallback };
  return res.json({ success: true, data: fallback });
});

// Endpoint: Generate custom or mood-based shayari on the fly
app.post('/api/shayaris/generate', async (req, res) => {
  const { category, prompt } = req.body;

  if (!category) {
    return res.status(400).json({ success: false, error: 'Category/mood is required.' });
  }

  if (ai) {
    try {
      console.log(`Generating custom Shayari for category "${category}" with prompt "${prompt || 'None'}"...`);
      
      let promptText = `Generate a highly beautiful and original Shayari in Hindi.
Category/Mood: ${category}.
`;
      if (prompt) {
        promptText += `Context/Topic: The shayari should incorporate or be inspired by this topic: "${prompt}".\n`;
      }
      promptText += `Please write an emotionally rich verse in correct Devanagari script. Make it match the vibe of the mood perfectly.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: promptText,
        config: {
          systemInstruction: `You are a legendary Hindi-Urdu poet. Generate a fresh, premium shayari for the requested mood and custom topic. 
Return ONLY JSON complying with the requested response schema. Provide deeply emotional, resonant, and grammatically perfect verses.`,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hindi: {
                type: Type.STRING,
                description: 'The shayari in Hindi Devanagari script (typically a 2-line couplet or 4-line verse).'
              },
              englishTranslit: {
                type: Type.STRING,
                description: 'The romanized transliteration of the Hindi verse so it is easy to read.'
              },
              translation: {
                type: Type.STRING,
                description: 'A poetic English translation that captures the soul of the poem.'
              },
              meaning: {
                type: Type.STRING,
                description: 'A brief, beautiful explanation of the underlying metaphors and feelings.'
              },
              author: {
                type: Type.STRING,
                description: 'Return "AI Shair" or name a classical poet whose style inspired this.'
              }
            },
            required: ['hindi', 'englishTranslit', 'translation', 'meaning', 'author']
          }
        }
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        const customShayari: Shayari = {
          id: `ai-${Date.now()}`,
          hindi: parsed.hindi,
          englishTranslit: parsed.englishTranslit,
          translation: parsed.translation,
          meaning: parsed.meaning,
          category: category.toLowerCase() as any,
          author: parsed.author || 'AI Shair',
          isAiGenerated: true,
        };
        return res.json({ success: true, data: customShayari });
      }
    } catch (error: any) {
      console.error('Error generating custom shayari:', error);
      // Let it fall through to the mock generator or error out
    }
  }

  // If Gemini API is missing or fails, we generate a pseudo-custom shayari by picking a random one from SEED_SHAYARIS
  console.log('Gemini API unavailable or failed. Picking a random fallback shayari from seed...');
  const candidates = SEED_SHAYARIS.filter(s => s.category === category);
  const pool = candidates.length > 0 ? candidates : SEED_SHAYARIS;
  const randomIndex = Math.floor(Math.random() * pool.length);
  const selected = { ...pool[randomIndex] };
  
  // Make it look generated for the user experience
  selected.id = `fallback-${Date.now()}`;
  selected.isAiGenerated = true;
  if (prompt) {
    selected.meaning = `[Local Fallback Mode] Since the AI generator is offline, we handpicked this classic for you inspired by "${prompt}": ${selected.meaning}`;
  } else {
    selected.meaning = `[Local Fallback Mode] Here is a hand-selected curated masterpiece: ${selected.meaning}`;
  }

  return res.json({ success: true, data: selected });
});

// Vite & Static assets configuration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite Dev server middleware loaded.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production build assets.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
