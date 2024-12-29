/** @type {import('tailwindcss').Config} */
const customColors = require('./src/styles/colors.js')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ['Merriweather', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: customColors,
      animation: {
        flyInTop: 'flyInTop 1s ease-out forwards',
        flyInBottom: 'flyInBottom 2s ease-out forwards',
        alignRight: 'alignRight 1s ease-out forwards',
        moveUp: 'moveUp 0.5s forwards',
        slideUp: 'slideUp 0.5s forwards',
        moveUpMore: 'moveUpMore 0.7s ease-in-out forwards',
      },
      keyframes: {
        flyInTop: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        flyInBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        alignRight: {
          '0%': { transform: 'translateX(0)', textAlign: 'center' },
          '100%': { transform: 'translateX(50%)', textAlign: 'right' },
        },
        moveUp: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-20px)' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        moveUpMore: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-40px)' },
        },
      },
      extend: {
        animationDelay: {
          '200': '200ms',
          '400': '400ms',
          '600': '600ms',
        },
      },
    },
  },
  plugins: [],
}