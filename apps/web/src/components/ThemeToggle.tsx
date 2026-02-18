import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      className="rounded-full border border-borderglass bg-glass px-3 py-1 text-sm"
      onClick={() => setDark((v) => !v)}
      type="button"
    >
      {dark ? 'Light' : 'Dark'} mode
    </button>
  );
};
