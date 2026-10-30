/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        floatcard: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatdelayed: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-9px) rotate(1deg)' },
        },
        scrollcue: {
          '0%': { opacity: '1', top: '8px' },
          '70%': { opacity: '0', top: '22px' },
          '100%': { opacity: '0', top: '8px' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blobdrift: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(24px, -28px) scale(1.06)' },
          '66%': { transform: 'translate(-18px, 18px) scale(0.96)' },
        },
      },
      animation: {
        'float-card': 'floatcard 5s ease-in-out infinite',
        'float-delayed': 'floatdelayed 6.2s ease-in-out 1.2s infinite',
        'scroll-cue': 'scrollcue 1.8s ease infinite',
        'marquee': 'marquee 28s linear infinite',
        'blob-drift': 'blobdrift 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
