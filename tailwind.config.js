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
    },
  },
  plugins: [],
}