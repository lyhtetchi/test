import { Link } from 'react-router-dom';
import { Hero3D } from '../components/Hero3D';
import { PromptCard } from '../components/PromptCard';
import { seedPrompts } from '../data/seedPrompts';

export const LandingPage = () => {
  const freePrompt = seedPrompts.find((p) => p.isFree) ?? seedPrompts[0];
  const popular = [...seedPrompts].sort((a, b) => b.likeCount - a.likeCount).slice(0, 4);

  return (
    <main>
      <section className="premium-section relative overflow-hidden">
        <Hero3D />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
        <div className="relative z-10 mt-[-260px] md:mt-[-220px]">
          <p className="text-sm text-violet-300">Stop burning tokens on bad prompts.</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold md:text-6xl">Copy proven prompts. Ship better videos faster.</h1>
          <p className="mt-4 max-w-2xl text-slate-300">Unlock the prompt library creators use to go viral.</p>
          <div className="mt-8 flex gap-3">
            <Link className="rounded-xl bg-violet-500 px-5 py-3 font-semibold" to="/explore">Explore library</Link>
            <a className="rounded-xl border border-borderglass px-5 py-3" href="#pricing">$11.99/month</a>
          </div>
        </div>
      </section>

      <section className="premium-section">
        <h2 className="mb-4 text-2xl font-semibold">Free Prompt of the Day</h2>
        <PromptCard prompt={freePrompt} onUnlock={() => undefined} />
      </section>

      <section className="premium-section">
        <h2 className="mb-4 text-2xl font-semibold">Popular This Month</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {popular.map((p) => <PromptCard key={p.id} prompt={p} onUnlock={() => undefined} />)}
        </div>
      </section>

      <section className="premium-section">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {['Browse proven prompts', 'Unlock with one subscription', 'Copy and generate faster'].map((s, i) => (
            <article key={s} className="glass-card rounded-2xl p-4">
              <p className="text-sm text-violet-300">Step {i + 1}</p>
              <h3 className="mt-2 text-lg">{s}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="premium-section" id="pricing">
        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-semibold">Save hours of trial-and-error — for $11.99/month.</h2>
          <p className="mt-2 text-slate-300">One subscription. Thousands of high-performing prompts.</p>
        </div>
      </section>

      <footer className="border-t border-borderglass px-4 py-8 text-center text-sm text-slate-400">© {new Date().getFullYear()} CopyPrompts.ai · Terms · Privacy · DMCA</footer>
    </main>
  );
};
