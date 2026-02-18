import { useState } from 'react';
import { PricingModal } from '../components/PricingModal';
import { PromptCard } from '../components/PromptCard';
import { PromptFilters } from '../components/PromptFilters';
import { defaultFilters, usePrompts } from '../hooks/usePrompts';

export const ExplorePage = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const prompts = usePrompts(filters);
  const [pricingOpen, setPricingOpen] = useState(false);

  return (
    <main className="premium-section">
      <h1 className="mb-4 text-3xl font-semibold">Marketplace</h1>
      <PromptFilters filters={filters} setFilters={setFilters} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {prompts.map((prompt) => <PromptCard key={prompt.id} prompt={prompt} onUnlock={() => setPricingOpen(true)} />)}
      </div>
      <PricingModal
        open={pricingOpen}
        onClose={() => setPricingOpen(false)}
        onCheckout={() => {
          window.alert('Dev stub: call Firebase function createCheckoutSession then redirect to Stripe Checkout.');
          setPricingOpen(false);
        }}
      />
    </main>
  );
};
