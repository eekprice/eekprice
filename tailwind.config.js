/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ['Merriweather', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        backdrop: {
          background: {
            light: colors.white,
            dark: colors.slate[800],
          },
        },
        blockHighlight: {
          outlineSurface: {
            light: colors.blue[300],
            dark: colors.blue[200],
          },
          outlineFill: {
            light: colors.white,
            dark: colors.slate[800],
          },
        },
        surface: {
          background100: {
            light: colors.white,
            dark: colors.slate[800],
          },
          background200: {
            light: colors.slate[50],
            dark: colors.slate[700],
          },
          background300: {
            light: colors.purple[50],
            dark: colors.purple[800],
          },
          foreground100: {
            light: colors.slate[800],
            dark: colors.slate[200],
          },
          foreground200: {
            light: colors.slate[600],
            dark: colors.slate[200],
          },
          foreground300: {
            light: colors.slate[900],
            dark: colors.slate[200],
          },
          foreground400: {
            light: colors.slate[400],
            dark: colors.slate[400],
          },
          outline: {
            light: colors.gray[200],
            dark: colors.slate[600],
          },
        },
        primary: {
          surface: {
            light: colors.teal[50],
            dark: colors.teal[900],
          },
          foreground: {
            light: colors.teal[900],
            dark: colors.teal[100],
          },
          outline: {
            light: colors.teal[400],
            dark: colors.teal[500],
          },
        },
        highlight: {
          backgroundTextHighlight: {
            light: colors.yellow[200],
            dark: colors.yellow[100],
          },
          foregroundTextHighlight: {
            light: colors.slate[900],
            dark: colors.slate[700],
          },
          backgroundSticky: {
            light: colors.yellow[200],
            dark: colors.yellow[400],
          },
          foregroundSticky: {
            light: colors.slate[800],
            dark: colors.slate[600],
          },
          outline: {
            light: colors.yellow[300],
            dark: colors.yellow[700],
          },
        },
      },
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
      animationDelay: {
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  variants: {
    extend: {
      // Extend variants here if needed
    },
  },
  plugins: [],
}