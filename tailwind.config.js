/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [],
  theme: {
    extend: {
      colors: {
        main: "#f03a17",
      },
      fontFamily: {
        sans: "'Inter', sans-serif",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
