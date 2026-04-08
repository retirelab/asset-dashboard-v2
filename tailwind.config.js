/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SUIT', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        surface: {
          bg:    '#F2F4F6',
          card:  '#FFFFFF',
          hover: '#F8F9FA',
          line:  'rgba(0,0,0,0.06)',
        },
        ink: {
          primary:   '#191F28',
          secondary: '#4E5968',
          muted:     '#8B95A1',
          label:     '#6B7684',
        },
        accent: {
          blue:   '#3182F6',
          green:  '#0DC381',
          amber:  '#FF9F0A',
          red:    '#F04452',
          teal:   '#00B4D8',
        },
      },
    },
  },
  plugins: [],
}