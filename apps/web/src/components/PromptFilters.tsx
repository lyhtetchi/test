import { SortType } from '../types';

interface Props {
  filters: {
    search: string;
    type: string;
    modelSlug: string;
    categorySlug: string;
    freeOnly: boolean;
    sort: SortType;
  };
  setFilters: React.Dispatch<React.SetStateAction<Props['filters']>>;
}

export const PromptFilters = ({ filters, setFilters }: Props) => {
  const set = (key: keyof Props['filters'], value: string | boolean) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="glass-card mb-6 grid gap-3 rounded-2xl p-4 md:grid-cols-6">
      <input className="rounded-lg bg-slate-900 px-3 py-2 md:col-span-2" placeholder="Search prompts" value={filters.search} onChange={(e) => set('search', e.target.value)} />
      <select className="rounded-lg bg-slate-900 px-3 py-2" value={filters.type} onChange={(e) => set('type', e.target.value)}>
        <option value="all">All types</option><option value="video">Video</option><option value="image">Image</option><option value="text">Text</option>
      </select>
      <input className="rounded-lg bg-slate-900 px-3 py-2" placeholder="Model" value={filters.modelSlug === 'all' ? '' : filters.modelSlug} onChange={(e) => set('modelSlug', e.target.value || 'all')} />
      <input className="rounded-lg bg-slate-900 px-3 py-2" placeholder="Category" value={filters.categorySlug === 'all' ? '' : filters.categorySlug} onChange={(e) => set('categorySlug', e.target.value || 'all')} />
      <select className="rounded-lg bg-slate-900 px-3 py-2" value={filters.sort} onChange={(e) => set('sort', e.target.value as SortType)}>
        <option value="popular">Popular</option><option value="hot">Hot</option><option value="recent">Recent</option><option value="trending">Trending</option>
      </select>
      <label className="md:col-span-6 flex items-center gap-2 text-sm"><input type="checkbox" checked={filters.freeOnly} onChange={(e) => set('freeOnly', e.target.checked)} /> Free only</label>
    </div>
  );
};
