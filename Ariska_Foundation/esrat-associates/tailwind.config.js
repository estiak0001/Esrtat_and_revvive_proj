/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: '#0D1B2A',
        gold: '#C9A84C',
        'gold-light': '#E8C97A',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

