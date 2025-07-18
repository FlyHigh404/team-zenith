/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // poppins: ['Poppins', 'sans-serif'],
        dm_sans: ['DM Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
}
