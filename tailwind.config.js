const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ["./src/**/*.js"],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    container: {
      center: true
    },
    fontFamily: {
      display: ['Montserrat', 'sans-serif'],
      body: ['Montserrat', 'sans-serif'],
    },
    extend: {
      colors: {
        blue: {
          ...colors.blue,
          '500': '#1e96fc',
        }
      }
    }
  },
  variants: {},
  plugins: [],
}
