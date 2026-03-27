/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        neon: {
          green: '#39FF14',
          pink: '#FF69B4',
          cyan: '#00FFFF',
        },
        kitsch: {
          bg: '#0a0a0a',
          card: '#111111',
          border: '#333333',
        },
      },
      screens: {
        'mo': { 'max': '767px' },
        'pc': { 'min': '768px' },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
    },
  },
  plugins: [],
}
