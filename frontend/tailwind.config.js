/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This ensures Tailwind scans all components/pages
  ],
  theme: {
    extend: {
      colors: {
        brand: '#3B82F6', // Example: Add matchPal brand colors here
      },
    },
  },
  plugins: [],
}