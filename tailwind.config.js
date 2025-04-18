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
        'kaizens-text-secondary': '#e1e1e6',
        'kaizens-text-tertiary': '#a1a1b3',
      },
      fontFamily: {
        sans: ['Kinetika', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}