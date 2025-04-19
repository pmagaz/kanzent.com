/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kaizens-light-blue': '#70b6f3',
        'kaizens-medium-blue': '#3480e3',
        'kaizens-dark-blue': '#0039c6',
        'kaizens-bg-dark': '#0d0e17',
        'kaizens-bg-darker': '#080912',
        'kaizens-bg-light': '#13141f',
        'kaizens-text-secondary': '#419FEF',
        'kaizens-text-tertiary': '#a1a1b3',
        'primary': '#03304ffe',
        'secondary': '#419FEF',
        'tertiary': '#0E37C0',
        'accent': '#FF499E',
        'background': '#F8FAFB',
      },
      fontFamily: {
        sans: ['Kinetika', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}