/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        vuejs: "#287a05",
      },
      fontSize: {
        base: "18px"
      },
    },
  },
  plugins: [],
}

