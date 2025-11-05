// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        islamic: {
          green: "#0a5c36",
          gold: "#d4af37",
          cream: "#fef9f0",
        },
      },
      fontFamily: {
        arabic: ["Scheherazade New", "serif"],
      },
    },
  },
  plugins: [],
};
