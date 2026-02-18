import { doc, increment, updateDoc } from 'firebase/firestore';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PromptCard } from '../components/PromptCard';
import { useAuth } from '../contexts/AuthContext';
import { seedPrompts } from '../data/seedPrompts';
import { db } from '../lib/firebase';
import { getLockedPromptText } from '../lib/promptAccess';

export const PromptDetailsPage = () => {
  const { promptId } = useParams();
  const { profile } = useAuth();
  const prompt = seedPrompts.find((p) => p.id === promptId) ?? seedPrompts[0];
  const unlocked = prompt.isFree || profile?.subscriptionStatus === 'active';
  const text = useMemo(() => getLockedPromptText(prompt.promptText, Boolean(unlocked)), [prompt.promptText, unlocked]);

  const recordView = async () => {
    try {
      await updateDoc(doc(db, 'prompts', prompt.id), { viewCount: increment(1) });
    } catch {
      // noop in local seed mode
    }
  };

  void recordView();

  return (
    <main className="premium-section">
      <img className="h-80 w-full rounded-2xl object-cover" src={prompt.previewMediaUrl} alt={prompt.title} />
      <h1 className="mt-6 text-3xl font-semibold">{prompt.title}</h1>
      <p className="mt-2 text-sm text-slate-300">{prompt.modelSlug} · {prompt.categorySlug} · {prompt.createdAt}</p>
      <article className="glass-card mt-6 rounded-2xl p-5">
        <h2 className="text-xl font-semibold">Prompt</h2>
        <p className="mt-3">{text.visible} <span className={unlocked ? '' : 'blur-sm'}>{text.hidden}</span></p>
      </article>
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">Related prompts</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {seedPrompts.filter((p) => p.id !== prompt.id).slice(0, 3).map((p) => <PromptCard key={p.id} prompt={p} onUnlock={() => undefined} />)}
        </div>
      </section>
    </main>
  );
};
