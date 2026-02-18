import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PromptCard } from '../components/PromptCard';
import { PromptFilters } from '../components/PromptFilters';
import { defaultFilters, usePrompts } from '../hooks/usePrompts';

export const ModelPage = () => {
  const { modelSlug = 'sora' } = useParams();
  const [filters, setFilters] = useState(defaultFilters);
  const prompts = usePrompts(filters, modelSlug);

  return (
    <main className="premium-section">
      <h1 className="text-3xl font-semibold capitalize">{modelSlug} prompts</h1>
      <p className="mt-2 text-slate-300">Production-ready {modelSlug} prompts tuned for higher-quality outputs and faster iterations.</p>
      <PromptFilters filters={filters} setFilters={setFilters} />
      <h2 className="mb-4 mt-6 text-xl">Most popular in {modelSlug}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {prompts.map((prompt) => <PromptCard key={prompt.id} prompt={prompt} onUnlock={() => undefined} />)}
      </div>
    </main>
  );
};
