/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#03304ffe',
        'secondary': '#419FEF',
        'tertiary': '#2B5170',
        'quaternary': '#9BA5AD',
        'accent': '#FF499E',
        'background': '#FDFCF9',
        'background': '#FDFCF9',
      },
      fontFamily: {
        sans: ['Kinetika', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}