/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nanum Gothic"', 'SUIT', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        // ── 라이트 (index__3_.html 스타일) ──
        lt: {
          bg:     '#F8FAFC',   // slate-50
          card:   '#FFFFFF',
          card2:  '#F8FAFC',
          border: '#E2E8F0',   // slate-200
          text:   '#0F172A',   // slate-900
          sub:    '#475569',   // slate-600
          muted:  '#94A3B8',   // slate-400
        },
        // ── 다크 (기존 유지) ──
        dk: {
          bg:     '#0A0A0B',
          card:   '#111113',
          card2:  '#1A1A1C',
          border: '#2A2A2E',
          text:   '#FFFFFF',
          sub:    '#B0B0B8',
          muted:  '#6B6B75',
        },
        accent: {
          blue:   '#3182F6',
          green:  '#0DC381',
          red:    '#F04452',
          orange: '#FF6B00',
          purple: '#A259FF',
          amber:  '#FF9F0A',
          yellow: '#FFD700',
          rose:   '#F43F5E',
        },
      },
      maxWidth: { app: '430px' },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}