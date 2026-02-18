import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PromptCard } from '../components/PromptCard';
import { PromptFilters } from '../components/PromptFilters';
import { defaultFilters, usePrompts } from '../hooks/usePrompts';

export const CategoryPage = () => {
  const { categorySlug = 'art' } = useParams();
  const [filters, setFilters] = useState(defaultFilters);
  const prompts = usePrompts(filters, undefined, categorySlug);

  return (
    <main className="premium-section">
      <h1 className="text-3xl font-semibold capitalize">{categorySlug} prompts</h1>
      <p className="mt-2 text-slate-300">Curated {categorySlug} prompt recipes with proven structure and reliable generation consistency.</p>
      <PromptFilters filters={filters} setFilters={setFilters} />
      <div className="grid gap-4 md:grid-cols-3">
        {prompts.map((prompt) => <PromptCard key={prompt.id} prompt={prompt} onUnlock={() => undefined} />)}
      </div>
    </main>
  );
};
