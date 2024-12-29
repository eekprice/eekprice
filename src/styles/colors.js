const colors = require('tailwindcss/colors')

const customColors = {
  action: {
    BackPrimary: colors.teal[50],
    FrontPrimary: colors.teal[900],
    OutlinePrimary: colors.teal[400],
  },
  text: {
    primary: '#003347',
    secondary: colors.gray[400] || '#9CA3AF',
  },
  surface: {
    BackPrimary: colors.white,
    FrontPrimary: colors.teal[900],
    outlinePrimary: colors.gray[300],
    BackSecondary: colors.gray[100],
  },
}

module.exports = customColors

// Usage guide:
// bg-primary (background)
// text-primary (text)
// border-primary (borders) 