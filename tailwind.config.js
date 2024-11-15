/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Naskh Arabic', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};