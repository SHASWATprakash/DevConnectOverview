/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'fb-bg': '#f0f2f5',
        'fb-blue': '#1877f2',
        'fb-dark': '#1c1e21',
        'fb-text': '#050505',
        'fb-muted': '#65676b',
      },
    },
  },
  plugins: [],
}
