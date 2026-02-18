import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../lib/firebase';

export const AdminUploaderPage = () => {
  const { user, profile } = useAuth();
  const [title, setTitle] = useState('');
  const [promptText, setPromptText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  if (!user) return <Navigate to="/login" replace />;
  if (profile?.role !== 'admin') return <main className="premium-section">Admin only.</main>;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const mediaRef = ref(storage, `previews/${Date.now()}-${file.name}`);
    await uploadBytes(mediaRef, file);
    const previewMediaUrl = await getDownloadURL(mediaRef);

    await addDoc(collection(db, 'prompts'), {
      title,
      type: 'video',
      modelSlug: 'sora',
      categorySlug: 'marketing',
      tags: ['admin-uploaded'],
      promptText,
      previewMediaUrl,
      previewMediaType: 'image',
      isFree: false,
      isPublished: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likeCount: 0,
      viewCount: 0,
      trendingScore: 0,
    });
    setTitle('');
    setPromptText('');
  };

  return (
    <main className="premium-section max-w-2xl">
      <h1 className="text-3xl font-semibold">Admin uploader</h1>
      <form className="glass-card mt-6 space-y-4 rounded-2xl p-6" onSubmit={onSubmit}>
        <input className="w-full rounded-lg bg-slate-900 px-3 py-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="h-28 w-full rounded-lg bg-slate-900 px-3 py-2" placeholder="Prompt text" value={promptText} onChange={(e) => setPromptText(e.target.value)} />
        <input accept="image/*,video/*" type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button className="rounded-lg bg-violet-500 px-5 py-2 font-medium" type="submit">Publish</button>
      </form>
    </main>
  );
};
