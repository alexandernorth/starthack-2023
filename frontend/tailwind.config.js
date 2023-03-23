const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.emerald,
          DEFAULT: colors.emerald[600],
        },
        secondary: {
          ...colors.amber,
          DEFAULT: colors.amber[600],
        },
        accent: {
          ...colors.red,
          DEFAULT: colors.red[600],
        },
        brown: {
          50: '#f6eeec',
          100: '#eeded8',
          200: '#ddbcb1',
          300: '#cb9b8a',
          400: '#ba7963',
          500: '#a9583c',
          600: '#874630',
          700: '#653524',
          800: '#442318',
          900: '#22120c',
        },
      },
      backgroundImage: {
        landscape: "url('../public/images/bg.jpg')",
      },
    },
  },
  plugins: [],
};
