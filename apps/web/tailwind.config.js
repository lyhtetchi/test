/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.08)',
        borderglass: 'rgba(255,255,255,0.15)',
      },
      boxShadow: {
        glow: '0 8px 32px rgba(15,23,42,0.45)',
      },
      animation: {
        sweep: 'sweep 2s ease-in-out infinite',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateX(-110%)' },
          '100%': { transform: 'translateX(110%)' },
        },
      },
    },
  },
  plugins: [],
};
