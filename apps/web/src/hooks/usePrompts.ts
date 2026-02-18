import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { seedPrompts } from '../data/seedPrompts';
import { db } from '../lib/firebase';
import { PromptItem, SortType } from '../types';

interface Filters {
  search: string;
  type: string;
  modelSlug: string;
  categorySlug: string;
  freeOnly: boolean;
  sort: SortType;
}

export const defaultFilters: Filters = {
  search: '',
  type: 'all',
  modelSlug: 'all',
  categorySlug: 'all',
  freeOnly: false,
  sort: 'popular',
};

export const usePrompts = (filters: Filters, model?: string, category?: string) => {
  const [prompts, setPrompts] = useState<PromptItem[]>(seedPrompts);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        let q = query(collection(db, 'prompts'), where('isPublished', '==', true));
        if (model) q = query(q, where('modelSlug', '==', model));
        if (category) q = query(q, where('categorySlug', '==', category));
        const snaps = await getDocs(q);
        if (!snaps.empty) {
          setPrompts(snaps.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }) as PromptItem));
          return;
        }
      } catch {
        // fallback seed data
      }
      setPrompts(seedPrompts);
    };
    void fetchPrompts();
  }, [model, category]);

  return useMemo(() => {
    const sorted = [...prompts]
      .filter((p) => (model ? p.modelSlug === model : true))
      .filter((p) => (category ? p.categorySlug === category : true))
      .filter((p) => (filters.type === 'all' ? true : p.type === filters.type))
      .filter((p) => (filters.modelSlug === 'all' ? true : p.modelSlug === filters.modelSlug))
      .filter((p) => (filters.categorySlug === 'all' ? true : p.categorySlug === filters.categorySlug))
      .filter((p) => (filters.freeOnly ? p.isFree : true))
      .filter((p) => {
        const s = filters.search.toLowerCase();
        return !s || p.title.toLowerCase().includes(s) || p.tags.some((t) => t.toLowerCase().includes(s));
      });

    if (filters.sort === 'hot') sorted.sort((a, b) => b.viewCount - a.viewCount);
    if (filters.sort === 'recent') sorted.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    if (filters.sort === 'trending') sorted.sort((a, b) => b.trendingScore - a.trendingScore);
    if (filters.sort === 'popular') sorted.sort((a, b) => b.likeCount - a.likeCount);

    return sorted;
  }, [prompts, filters, model, category]);
};
