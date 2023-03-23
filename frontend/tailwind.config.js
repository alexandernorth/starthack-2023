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
      },
      backgroundImage: {
        landscape: "url('../public/images/bg.jpg')",
      },
    },
  },
  plugins: [],
};
