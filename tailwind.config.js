/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['SUIT', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        lt: {
          bg:     '#F2F4F6',
          card:   '#FFFFFF',
          border: 'rgba(0,0,0,0.07)',
          text:   '#191F28',
          sub:    '#4E5968',
          muted:  '#8B95A1',
        },
        dk: {
          bg:     '#0A0A0B',
          card:   '#111113',
          border: '#222226',
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
        },
      },
      maxWidth: { app: '430px' },
    },
  },
  plugins: [],
}