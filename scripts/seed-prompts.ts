import { initializeApp } from 'firebase/app';
import { collection, doc, setDoc, getFirestore, serverTimestamp } from 'firebase/firestore';

const prompts = Array.from({ length: 12 }).map((_, i) => ({
  id: `seed-${i + 1}`,
  title: `Seed Prompt ${i + 1}`,
  type: i % 2 === 0 ? 'video' : 'image',
  modelSlug: ['sora', 'veo', 'kling', 'midjourney', 'flux', 'dalle'][i % 6],
  categorySlug: ['art', 'photography', 'marketing', '3d'][i % 4],
  tags: ['seed', 'library', 'optimized'],
  promptText: 'Premium prompt structure for consistent quality output with cinematic framing and intentional style direction.',
  previewMediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  previewMediaType: 'image',
  isFree: i === 0,
  isPublished: true,
  likeCount: 0,
  viewCount: 0,
  trendingScore: 0,
}));

const app = initializeApp({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
});

const db = getFirestore(app);

const run = async () => {
  for (const prompt of prompts) {
    await setDoc(doc(collection(db, 'prompts'), prompt.id), {
      ...prompt,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
  console.log(`Seeded ${prompts.length} prompts.`);
};

void run();
