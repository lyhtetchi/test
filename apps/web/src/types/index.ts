export type PromptType = 'video' | 'image' | 'text';
export type SortType = 'popular' | 'hot' | 'recent' | 'trending';

export interface PromptItem {
  id: string;
  title: string;
  type: PromptType;
  modelSlug: string;
  categorySlug: string;
  tags: string[];
  promptText: string;
  previewMediaUrl: string;
  previewMediaType: 'video' | 'image';
  isFree: boolean;
  isPublished: boolean;
  createdAt: string;
  likeCount: number;
  viewCount: number;
  trendingScore: number;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'user' | 'admin';
  subscriptionStatus: 'active' | 'inactive' | 'trialing' | 'canceled';
  favorites: string[];
}
