import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { seedPrompts } from '../data/seedPrompts';

export const AccountPage = () => {
  const { user, profile } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  const favorites = seedPrompts.filter((p) => profile?.favorites?.includes(p.id));

  return (
    <main className="premium-section">
      <h1 className="text-3xl font-semibold">Account</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="glass-card rounded-2xl p-4"><p className="text-sm text-slate-300">Subscription status</p><p className="mt-2 text-xl capitalize">{profile?.subscriptionStatus ?? 'inactive'}</p></article>
        <article className="glass-card rounded-2xl p-4"><p className="text-sm text-slate-300">Favorites</p><p className="mt-2 text-xl">{favorites.length}</p></article>
        <article className="glass-card rounded-2xl p-4"><p className="text-sm text-slate-300">Recently viewed</p><p className="mt-2 text-xl">Persist via /views collection</p></article>
      </div>
    </main>
  );
};
