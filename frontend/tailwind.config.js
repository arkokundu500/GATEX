/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        'primary': '#09BB2A',
        'secondary': '#2E4CFF',
      }
    },
  },
  plugins: [],
}