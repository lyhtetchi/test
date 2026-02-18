import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getLockedPromptText } from '../lib/promptAccess';
import { PromptItem } from '../types';

interface Props {
  prompt: PromptItem;
  onUnlock: () => void;
}

export const PromptCard = ({ prompt, onUnlock }: Props) => {
  const { profile, user } = useAuth();
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg)');
  const unlocked = Boolean(prompt.isFree || profile?.subscriptionStatus === 'active');
  const text = useMemo(() => getLockedPromptText(prompt.promptText, unlocked), [prompt.promptText, unlocked]);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="glass-card group relative overflow-hidden rounded-2xl"
      onPointerMove={(e) => {
        if (window.matchMedia('(hover: hover)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
          const dx = ((e.clientX - r.left) / r.width - 0.5) * 8;
          const dy = ((e.clientY - r.top) / r.height - 0.5) * -8;
          setTransform(`perspective(800px) rotateX(${dy}deg) rotateY(${dx}deg)`);
        }
      }}
      onPointerLeave={() => setTransform('perspective(800px) rotateX(0deg) rotateY(0deg)')}
      style={{ transform }}
    >
      <div className="absolute inset-y-0 -left-1/2 w-1/2 rotate-12 bg-white/20 blur-lg transition-transform duration-700 group-hover:translate-x-[240%]" />
      <img alt={prompt.title} className="h-44 w-full object-cover" loading="lazy" src={prompt.previewMediaUrl} />
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold">{prompt.title}</h3>
          <span className="text-xs uppercase text-slate-300">{prompt.modelSlug}</span>
        </div>
        <p className="text-sm">
          {text.visible} <span className={unlocked ? '' : 'select-none blur-sm'}>{text.hidden}</span>
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-slate-300">
          {prompt.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-borderglass px-2 py-1">#{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Link className="rounded-lg border border-borderglass px-3 py-1" to={`/p/${prompt.id}`}>Open</Link>
          {unlocked ? (
            <button className="rounded-lg bg-emerald-500 px-3 py-1 text-black" type="button" onClick={() => navigator.clipboard.writeText(prompt.promptText)}>Copy</button>
          ) : (
            <button className="rounded-lg bg-violet-500 px-3 py-1" type="button" onClick={onUnlock}>Unlock</button>
          )}
          <button className="rounded-lg border border-borderglass px-2 py-1" disabled={!user} title={user ? 'Like' : 'Login required'} type="button">❤ {prompt.likeCount}</button>
        </div>
      </div>
    </motion.article>
  );
};
