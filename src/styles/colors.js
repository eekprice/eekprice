const colors = require('tailwindcss/colors')

const customColors = {
  primary: {
    surface: colors.teal[50],
    foreground: colors.teal[900],
    outline: colors.teal[400],
  },
  text: {
    primary: '#003347',
  }
}

module.exports = customColors

// Usage guide:
// bg-primary (background)
// text-primary (text)
// border-primary (borders) 