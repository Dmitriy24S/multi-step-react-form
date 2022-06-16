/** @type {import('tailwindcss').Config} */

const { screens } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "420px",
      ...screens,
    },
    extend: {},
  },
  plugins: [],
};
