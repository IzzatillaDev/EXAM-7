/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "text-red-500",
        blue: "#2389DA",
      }
    },
  },
  plugins: [],
}

