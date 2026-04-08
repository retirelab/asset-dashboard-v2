/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        surface: {
          bg:    '#0f0f0e',
          card:  '#181816',
          hover: '#222220',
          line:  'rgba(255,255,255,0.07)',
        },
        ink: {
          primary:   '#f0ede8',
          secondary: '#9c9890',
          muted:     '#5c5a56',
          label:     '#7a7770',
        },
        accent: {
          blue:   '#4b8ef5',
          green:  '#4caf82',
          amber:  '#e8a94b',
          red:    '#e05555',
          teal:   '#38b6b6',
        },
      },
    },
  },
  plugins: [],
}
